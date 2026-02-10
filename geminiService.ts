
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePetBio = async (name: string, species: string, breed: string, traits: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma bio divertida e criativa para o perfil social de um pet. 
      Nome: ${name}
      Espécie: ${species}
      Raça: ${breed}
      Características: ${traits}
      A bio deve ser em primeira pessoa (como se o pet estivesse falando) e em português do Brasil. Máximo 150 caracteres.`,
    });
    return response.text || "Olá! Sou um pet feliz no PetLife!";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Olá! Sou um pet muito especial.";
  }
};

export const generatePetPortrait = async (name: string, species: string, breed: string, style: string): Promise<string | null> => {
  try {
    const prompt = `A professional, high-quality, cute artistic portrait of a ${breed} ${species} named ${name}. 
    Style: ${style}. Vibrant colors, studio lighting, detailed fur, very cute expression. 
    The background should be soft and complementary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating portrait:", error);
    return null;
  }
};
