import type { CampaignContent } from "./campaign-mock";
import { mockAlternatives, mockTransformations } from "./campaign-mock";
import type { ParsedRequest } from "./direction-types";
import { DEPENDENCY_MAP } from "./dependency-map";

export interface TransformResult {
  kind: "transform";
  next: CampaignContent;
  changedFields: (keyof CampaignContent)[];
}

export interface AlternativesResult {
  kind: "alternatives";
  field: keyof CampaignContent;
  options: string[];
}

export interface UnavailableResult {
  kind: "unavailable";
  message: string;
}

export type ApplyResult = TransformResult | AlternativesResult | UnavailableResult;

export function applyRequest(
  territoryId: string,
  current: CampaignContent,
  request: ParsedRequest
): ApplyResult {
  if (request.kind === "alternatives") {
    const options = mockAlternatives[territoryId]?.[request.field];
    if (!options) {
      return {
        kind: "unavailable",
        message: "No alternatives are available for that field yet.",
      };
    }
    return { kind: "alternatives", field: request.field, options };
  }

  if (request.type === "tagline-only") {
    const options = mockAlternatives[territoryId]?.tagline ?? [];
    if (options.length === 0) {
      return { kind: "unavailable", message: "No tagline alternatives available yet." };
    }
    const currentIndex = options.indexOf(current.tagline);
    const nextTagline = options[(currentIndex + 1) % options.length];
    return {
      kind: "transform",
      next: { ...current, tagline: nextTagline },
      changedFields: ["tagline"],
    };
  }

  const allowedFields = DEPENDENCY_MAP[request.type];
  const transformation = mockTransformations[territoryId]?.[request.type];

  if (!transformation) {
    return {
      kind: "unavailable",
      message: "No mock transformation is defined for this territory yet.",
    };
  }

  const next: CampaignContent = { ...current };
  const changedFields: (keyof CampaignContent)[] = [];

  for (const field of allowedFields) {
    const value = transformation[field];
    if (value !== undefined && value !== current[field]) {
      next[field] = value;
      changedFields.push(field);
    }
  }

  return { kind: "transform", next, changedFields };
}