import type { ParsedRequest } from "./direction-types";
import type { CampaignContent } from "./campaign-mock";

const FIELD_KEYWORDS: Record<string, keyof CampaignContent> = {
  tagline: "tagline",
  "big idea": "bigIdea",
  "hero visual": "heroVisual",
  "social asset": "socialAsset",
  "visual world": "visualWorld",
};

export function parseFreeText(input: string): ParsedRequest | null {
  const text = input.trim().toLowerCase();
  if (!text) return null;

  if (/make (it|this)( more)? funnier/.test(text)) {
    return { kind: "transform", type: "funnier" };
  }
  if (/make (it|this) more chaotic/.test(text)) {
    return { kind: "transform", type: "chaotic" };
  }
  if (/make (it|this) more premium/.test(text)) {
    return { kind: "transform", type: "premium" };
  }
  if (/change (the )?audience/.test(text)) {
    return { kind: "transform", type: "audience" };
  }
  if (/change only the tagline/.test(text)) {
    return { kind: "transform", type: "tagline-only" };
  }
  if (/give( me)?.*(options|alternatives)/.test(text)) {
    for (const [keyword, field] of Object.entries(FIELD_KEYWORDS)) {
      if (text.includes(keyword)) {
        return { kind: "alternatives", field };
      }
    }
    return { kind: "alternatives", field: "tagline" };
  }

  return null;
}