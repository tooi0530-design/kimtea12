import { GoogleGenAI } from "@google/genai";
import { GeneratedImage, WallpaperOptions, WALLPAPER_STYLES } from "../types";

// Helper to get the AI client
const getAiClient = () => {
  // Always create a new instance to ensure we pick up the latest injected API Key
  // especially after the user selects a key via window.aistudio.openSelectKey()
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const enhanceUserPrompt = async (originalPrompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert prompt engineer for AI image generation. 
      Rewrite the following simple user idea into a detailed, descriptive, and artistic prompt suitable for a high-quality smartphone wallpaper.
      Keep it under 100 words. Focus on visual description, lighting, and composition.
      
      User Idea: "${originalPrompt}"
      
      Output ONLY the enhanced prompt text, no explanations.`,
    });
    return response.text?.trim() || originalPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return originalPrompt; // Fallback to original if enhancement fails
  }
};

export const generateWallpaper = async (options: WallpaperOptions): Promise<GeneratedImage> => {
  const ai = getAiClient();
  
  let finalPrompt = options.prompt;
  
  // Append style modifiers
  const selectedStyle = WALLPAPER_STYLES.find(s => s.id === options.style);
  if (selectedStyle) {
    finalPrompt += `, ${selectedStyle.promptSuffix}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: finalPrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: options.aspectRatio,
          imageSize: options.resolution,
        }
      }
    });

    // Extract image from response
    let imageUrl = '';
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in response");
    }

    return {
      id: crypto.randomUUID(),
      url: imageUrl,
      prompt: options.prompt, // Store original prompt for display
      style: options.style,
      timestamp: Date.now(),
    };

  } catch (error) {
    console.error("Error generating wallpaper:", error);
    throw error;
  }
};
