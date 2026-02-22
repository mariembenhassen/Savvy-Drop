import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeProduct(url) {
    console.log("[scrapeProduct] Starting for URL:", url);
  
    if (!process.env.FIRECRAWL_API_KEY) {
      console.error("[scrapeProduct] FIRECRAWL_API_KEY is missing!");
      return null;
    }
  
    try {
      console.log("[scrapeProduct] Calling firecrawl.scrape...");
      const result = await firecrawl.scrape(url, {
        onlyMainContent: true,
        timeout: 60000,
        formats: [
          {
            type: "json",
            prompt: "Extract product data from this e-commerce page: product name/title, current price as number/string without symbol, currency code (USD/EUR/TND/...), main product image URL. Return empty strings if not found.",
            schema: {
              type: "object",
              properties: {
                productName: { type: "string" },
                currentPrice: { type: "string" },
                currencyCode: { type: "string" },
                productImageUrl: { type: "string" }
              },
              required: ["productName", "currentPrice"]
            }
          }
        ]
      });
  
      console.log("[scrapeProduct] Raw Firecrawl result:", JSON.stringify(result, null, 2));
  
      // Try common paths where extracted JSON hides
      const extracted =
        result?.json ||
        result?.data?.json ||
        result?.extract ||
        result?.data?.extract ||
        result?.llm_extraction ||
        null;
  
      console.log("[scrapeProduct] Extracted JSON:", extracted);
  
      if (!extracted || !extracted.productName || !extracted.currentPrice) {
        return null;
      }
  
      return extracted;
  
    } catch (err) {
      console.error("[scrapeProduct] FAILED:", err.message, err.stack);
      return null;
    }
  }