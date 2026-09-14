import type { CampaignContent } from "./campaign-mock";
import type { RequestType } from "./direction-types";

// NOTE: "audience" also conceptually touches campaign strategy (audience
// tension, opportunity) per the long-term data model, but strategy/diagnosis
// fields don't exist in the app yet — that milestone hasn't been built.
// Scoped here to the visible canvas fields only; add "strategy" once it exists.
export const DEPENDENCY_MAP: Record<RequestType, (keyof CampaignContent)[]> = {
  funnier: ["bigIdea", "tagline", "socialAsset"],
  chaotic: ["bigIdea", "visualWorld", "heroVisual", "socialAsset"],
  premium: ["tagline", "visualWorld", "heroVisual"],
  audience: ["bigIdea", "tagline", "visualWorld", "socialAsset"],
  "tagline-only": ["tagline"],
};