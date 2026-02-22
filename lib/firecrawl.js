import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY});

export  async function scrapeProduct(url) {
    try{
        const result = await firecrawl.scrape(url, { formats: [
           { type : "json" ,
            prompt: "Carefully read the entire page content. Extract the name of the company or brand and a concise summary of what the company does, its main products/services, mission, or about section description. Be accurate, factual, and only use information present on the page. If no clear company name or description is found, return empty strings or null.",
            schema: {
                "type": "object",
                "required": ["productName" , "currentPrice"],
                "properties": {
                    "company_name": {
                        "type": "string"
                      },
                    "company_description": {
                        "type": "string"
                    }
                }
            }}] });

            const extractedData= result.json;
            if(!extractedData  || !extractedData.productName) {
                throw new Error("No data extracted from URL");
            }
            return extractedData;
    } catch(error){
        console.error("Scraping failed:", error);
        throw error;
    }
}