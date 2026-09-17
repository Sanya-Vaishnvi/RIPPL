import type { BriefFormData } from "../brief-types";

// This is the boundary the rest of the app depends on — not Gemini directly.
// Swapping providers later means writing a new file matching this shape
// and changing one import in the API route, nothing else.
export interface AiProvider {
  generateCreativeTerritories(
    brief: BriefFormData,
    correction?: string
  ): Promise<unknown>;
}