"use server";

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}
export async function addProduct(formData) {
  console.log("addProduct action STARTED", { url: formData.get("url") });

  const url = formData.get("url");
  if (!url) {
    console.log("Missing URL");
    return { error: "URL is required" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Not authenticated" };
    }

    const productData = await scrapeProduct(url);

    if (!productData?.productName || !productData?.currentPrice) {
      return { error: "Could not extract product information from this URL" };
    }

    // Price cleaning
    let priceRaw = productData.currentPrice.trim().replace(/[^\d.,]/g, "");
    const priceNormalized = priceRaw.replace(",", ".");
    const newPrice = parseFloat(priceNormalized);

    console.log("Raw price:", productData.currentPrice, "| Parsed:", newPrice);

    if (isNaN(newPrice) || newPrice <= 0) {
      return { error: "Could not parse a valid price" };
    }

    const currency = productData.currencyCode?.trim() || "TND";

    let imageUrl = productData.productImageUrl?.trim() || null;
    if (imageUrl && imageUrl.includes("?")) {
      imageUrl = imageUrl.split("?")[0];
    }

    // Check existing
    const { data: existingProduct } = await supabase
      .from("products")
      .select("id, current_price")
      .eq("user_id", user.id)
      .eq("url", url)
      .maybeSingle();

    const isUpdate = !!existingProduct;

    // Payload
    const payload = {
      user_id: user.id,
      url,
      name: productData.productName,
      current_price: newPrice,
      currency,
      image_url: imageUrl,
      updated_at: new Date().toISOString(),
    };

    console.log("UPSERT PAYLOAD:", JSON.stringify(payload, null, 2));

    const { data: product, error } = await supabase
      .from("products")
      .upsert(payload, {
        onConflict: "user_id,url",
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Upsert error:", error);
      throw error;
    }

    // History
    const shouldAddHistory =
      !isUpdate ||
      Math.abs((existingProduct?.current_price || 0) - newPrice) > 0.01;

    if (shouldAddHistory) {
      await supabase.from("price_history").insert({
        product_id: product.id,
        price: newPrice,
        currency,
      });
    }

    revalidatePath("/");
    return {
      success: true,
      product,
      message: isUpdate ? "Product updated!" : "Product added!",
    };
  } catch (error) {
    console.error("Add product error:", error);
    return { error: error.message || "Failed to add product" };
  }
}
export async function deleteProduct(productId) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProducts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Get products error:", error);
    return [];
  }
}

export async function getPriceHistory(productId) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", productId)
      .order("checked_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Get price history error:", error);
    return [];
  }
}
