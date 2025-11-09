
import { GoogleGenAI } from "@google/genai";
import type { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getProductRecommendations = async (query: string, products: Product[]): Promise<string> => {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. Please check the API key configuration.";
  }
  
  const model = 'gemini-2.5-flash';
  
  const productInfo = products.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Brand: ${p.brand}, Price: $${p.price.toFixed(2)}, Description: ${p.shortDescription}`
  ).join('\n');

  const prompt = `
    You are an expert electronics sales assistant for an e-commerce store called 'Marso Electronic'.
    A customer is asking for product recommendations.
    Their query is: "${query}"

    Based on the following list of available products, provide a helpful and concise recommendation.
    - Analyze the user's query to understand their needs (e.g., "gaming laptop", "cheap phone", "best headphones for running").
    - Suggest one or two products that best match their needs.
    - Briefly explain why you are recommending each product, referencing its features from the provided list.
    - Mention the product name and price.
    - Be friendly and conversational.
    - If no products match, politely state that you couldn't find a suitable product and suggest they browse the categories.
    - Do not recommend products that are not in the list.
    - Do not invent product details.
    - Format your response as clean markdown. Start with a friendly greeting.
    - DO NOT include the product ID in your response.

    Available Products:
    ${productInfo}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while trying to find recommendations. Please try again later.";
  }
};
