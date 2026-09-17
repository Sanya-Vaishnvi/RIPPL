import type { Territory } from "./territory-types";
import type { CampaignContent } from "./campaign-mock";

export function buildFallbackCampaign(territory: Territory): CampaignContent {
  return {
    bigIdea: territory.bigIdeaSeed ?? territory.insight,
    tagline: territory.tagline,
    visualWorld: territory.visualWorld,
    heroVisual: `A visual expression of: ${territory.visualWorld}`,
    socialAsset: `A social post built around the line: "${territory.tagline}"`,
  };
}
