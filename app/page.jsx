import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/ProductCard";
import {
  ArrowDownToLine,
  BellRing,
  Globe,
  Lock,
  Sparkles,
  History,
  TrendingDown,
} from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];
  const FEATURES = [
    {
      icon: ArrowDownToLine,
      title: "Price Drops Caught",
      description: "Detects real discounts instantly",
    },
    {
      icon: BellRing,
      title: "Never Miss a Deal",
      description: "Instant alerts on your phone or email",
    },
    {
      icon: Globe,
      title: "Global Stores",
      description: "Amazon, Jumia, AliExpress, Noon & 100+ more",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "No selling your data — ever",
    },
    {
      icon: Sparkles,
      title: "Smart History",
      description: "See price graphs & all-time lows",
    },
    {
      icon: History,
      title: "Always On",
      description: "24/7 monitoring — even when you sleep",
    },
  ];
  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/70 shadow-sm transition-shadow duration-300">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo with background */}
            <div className="flex items-center">
              <div
                className="
            rounded-xl 
            bg-gradient-to-br from-orange-50 to-teal-50/60 
            px-3 py-2 sm:px-4 sm:py-2.5 "
              >
                <Image
                  src="/logo-new.png"
                  alt="Savvy Drop – Price Tracker"
                  width={900}
                  height={300}
                  className="
              h-10 sm:h-13 md:h-15 lg:h-15 
              w-auto 
            "
                  priority
                />
              </div>
            </div>

            {/* Auth button */}
            <div className="flex items-center">
              <AuthButton user={user} />
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 px-5 md:px-8 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:20px_20px]" />
    </div>

    <div className="relative max-w-6xl mx-auto text-center z-10">
      <div className="inline-flex mb-5 md:mb-6 px-5 py-2 bg-orange-100/80 backdrop-blur-sm text-orange-700 font-semibold rounded-full text-sm md:text-base border border-orange-200/50 shadow-sm">
        Prices refresh hourly , Stop overpaying!
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5 md:mb-7">
        Catch the{" "}
        <span className="text-orange-600">best deals</span>
        <br className="sm:hidden" /> before they vanish
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
        Instant drop alerts from Jumia • Amazon • AliExpress • Shein • Zara • Mytek…
        <br className="hidden sm:block" />
        Thousands of Tunisians are already saving — <span className="font-semibold text-gray-900">join them</span>.
      </p>

      {/* Quick CTA – very helpful for conversion */}
      {!user && (
        <div className="mt-8 md:mt-10">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
            Start Tracking Deals →
          </Button>
        </div>
      )}
    </div>
  </section>
  <div className="relative z-10">
{/* Add Product Form */}
<section className="max-w-4xl mx-auto px-5 md:px-8 -mt-8 md:-mt-12">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
        <AddProductForm user={user} />
      </div>
      </section>
   {/* Logged-in: User's products */}
    {user && (
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {products.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Tracked Products</h2>
              <span className="text-sm md:text-base text-gray-600 font-medium">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-white border-2 border-dashed border-orange-200/50 rounded-2xl p-10 md:p-12">
              <TrendingDown className="w-16 h-16 md:w-20 md:h-20 text-orange-400 mx-auto mb-6 opacity-80" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                No products tracked yet
              </h3>
              <p className="text-gray-600 md:text-lg">
                Add your first item above and start saving!
              </p>
            </div>
          </div>
        )}
      </section>
    )}

    {/* Features – only for non-logged-in or no products */}
    {(!user || products.length === 0) && (
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-teal-50/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">
          Why Tunisians Love Savvy Drop
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/70 backdrop-blur-sm border border-gray-200/70 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-100/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-200/60 transition-colors">
                <feature.icon className="w-8 h-8 md:w-9 md:h-9 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
</main>
  );
}
