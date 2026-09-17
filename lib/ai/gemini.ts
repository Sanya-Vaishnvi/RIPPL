import { GoogleGenAI } from "@google/genai";
import type { AiProvider } from "./provider";
import type { BriefFormData } from "../brief-types";
import { GEMINI_MODEL } from "./config";
import {
  buildTerritorySystemPrompt,
  buildTerritoryUserPrompt,
} from "./prompts/territory-prompt";
import { territoryResponseSchema } from "./schemas/territory-schema";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment.");
}

const ai = new GoogleGenAI({ apiKey });

export const geminiProvider: AiProvider = {
  async generateCreativeTerritories(brief: BriefFormData, correction?: string) {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildTerritoryUserPrompt(brief, correction),
      config: {
        systemInstruction: buildTerritorySystemPrompt(),
        responseMimeType: "application/json",
        responseSchema: territoryResponseSchema,
      },
    });

    if (!response.text) {
  throw new Error("Gemini returned an empty response.");
}

return JSON.parse(response.text);
  },
};

// This is the single line the rest of the app depends on — swapping
// providers later means changing this export, not touching the route.
export const generateCreativeTerritories =
  geminiProvider.generateCreativeTerritories;