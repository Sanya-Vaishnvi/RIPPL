import type { CampaignContent } from "./campaign-mock";

export type RequestType =
  | "funnier"
  | "chaotic"
  | "premium"
  | "audience"
  | "tagline-only";

export type ParsedRequest =
  | { kind: "transform"; type: RequestType }
  | { kind: "alternatives"; field: keyof CampaignContent };

export const FIELD_LABELS: Record<keyof CampaignContent, string> = {
  bigIdea: "big idea",
  tagline: "tagline",
  visualWorld: "visual world",
  heroVisual: "hero visual",
  socialAsset: "social asset",
};

export const REQUEST_LABELS: Record<RequestType, string> = {
  funnier: "Make it funnier",
  chaotic: "Make it more chaotic",
  premium: "Make it more premium",
  audience: "Change the audience",
  "tagline-only": "Change only the tagline",
};