
import { GoogleGenAI } from "@google/genai";

// Fixed: Correct initialization with named parameter and direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePetBio = async (name: string, species: string, breed: string, traits: string): Promise<string> => {
  try {
    // Fixed: Using the recommended gemini-3-flash-preview model and direct prompt string
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma bio divertida e criativa para o perfil social de um pet. 
      Nome: ${name}
      Espécie: ${species}
      Raça: ${breed}
      Características: ${traits}
      A bio deve ser em primeira pessoa (como se o pet estivesse falando) e em português do Brasil. Máximo 150 caracteres.`,
    });
    // Fixed: Correct access to .text property from GenerateContentResponse
    return response.text || "Olá! Sou um pet feliz no PetLife!";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Olá! Sou um pet muito especial.";
  }
};
