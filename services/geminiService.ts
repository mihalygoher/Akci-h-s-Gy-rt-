import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in process.env");
  }
  return new GoogleGenAI({ apiKey });
};

const fileToGenericPart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateActionFigureImage = async (
  file: File,
  name: string,
  profession: string,
  superpower: string
): Promise<string> => {
  const ai = getClient();
  
  // Convert file to base64 inline data
  const imagePart = await fileToGenericPart(file);

  // Prompt engineering for the action figure effect
  const prompt = `
    Create a photorealistic image of a custom action figure in its packaging (blister pack).
    The action figure itself should physically resemble the person in the provided image (face, hair, build), but styled as a high-quality articulated toy.
    
    Theme details:
    - Character Name on box: "${name}"
    - Profession/Role theme: ${profession}
    - Accessories included: Items related to "${superpower}"
    
    Style details:
    - The packaging should look professional, colorful, and collectible.
    - The box art should be vibrant.
    - Lighting should be studio product photography style, highlighting the plastic texture of the toy and the gloss of the cardboard backing.
    - Ensure the face of the toy looks like a caricature or toy version of the input photo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using the "nano banana" model as requested/appropriate for image editing/gen
      contents: {
        parts: [
            imagePart,
            { text: prompt }
        ]
      },
      config: {
          // No need for tools or specialized configs for this model variant usually, 
          // but we ensure we get a good result by relying on the model's default capabilities.
      }
    });

    // Parse response to find the image
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("Nem sikerült képet generálni. Próbáld újra.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};