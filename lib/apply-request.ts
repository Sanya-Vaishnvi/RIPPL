import type { CampaignContent } from "./campaign-mock";
import { mockAlternatives, mockTransformations } from "./campaign-mock";
import type { ParsedRequest } from "./direction-types";
import { FIELD_LABELS } from "./direction-types";
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
  request: ParsedRequest,
  lockedFields: (keyof CampaignContent)[] = []
): ApplyResult {
  if (request.kind === "alternatives") {
    if (lockedFields.includes(request.field)) {
      return {
        kind: "unavailable",
        message: `${FIELD_LABELS[request.field]} is locked. Unlock it first.`,
      };
    }
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
    if (lockedFields.includes("tagline")) {
      return {
        kind: "unavailable",
        message: "Tagline is locked. Unlock it first.",
      };
    }
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

  const requestedFields = DEPENDENCY_MAP[request.type];
  const allowedFields = requestedFields.filter(
    (field) => !lockedFields.includes(field)
  );
  const transformation = mockTransformations[territoryId]?.[request.type];

  if (!transformation) {
    return {
      kind: "unavailable",
      message: "No mock transformation is defined for this territory yet.",
    };
  }

  if (allowedFields.length === 0) {
    return {
      kind: "unavailable",
      message: "Every field this change would touch is currently locked.",
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

  if (changedFields.length === 0) {
    return {
      kind: "unavailable",
      message: "That change wouldn't affect any unlocked fields.",
    };
  }

  return { kind: "transform", next, changedFields };
}