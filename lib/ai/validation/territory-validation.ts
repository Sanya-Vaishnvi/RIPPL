import type { MapAxes } from "../../territory-types";

const TONE_AXES: [string, string][] = [
  ["calm", "wild"],
  ["serious", "silly"],
  ["quiet", "loud"],
];

const EMOTIONAL_AXES: [string, string][] = [
  ["practical", "emotional"],
  ["simple", "dramatic"],
  ["solo", "social"],
];

const MECHANISMS = [
  "Exaggerate",
  "Reverse",
  "Metaphor",
  "Contrast",
  "Format Subversion",
  "Ritual Creation",
  "Constraint-as-Feature",
  "Participate",
  "Personalize",
  "Hijack",
];

const REGISTERS = [
  "identity",
  "emotional",
  "behavioral",
  "social",
  "cultural",
  "product",
  "provocative",
  "utility",
  "humor",
];

function normalize(s: unknown) {
  return typeof s === "string" ? s.trim().toLowerCase() : "";
}

function matchesApprovedPair(
  low: unknown,
  high: unknown,
  approved: [string, string][]
) {
  const l = normalize(low);
  const h = normalize(high);
  return approved.some(([a, b]) => (a === l && b === h) || (a === h && b === l));
}

export interface ValidatedTerritory {
  id: string;
  name: string;
  strategic_register: string;
  primary_mechanism: string;
  insight: string;
  emotional_angle: string;
  big_idea_seed: string;
  tagline_seed: string;
  visual_direction_seed: string;
  axis_position: { x: number; y: number };
}

export interface ValidationSuccess {
  ok: true;
  data: { axes: MapAxes; territories: ValidatedTerritory[] };
}

export interface ValidationFailure {
  ok: false;
  reason: string;
}

export function validateTerritoryResponse(
  raw: unknown
): ValidationSuccess | ValidationFailure {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "Response was not a valid object." };
  }

  const data = raw as Record<string, unknown>;
  const axes = data.axes as
    | { x?: { low?: unknown; high?: unknown }; y?: { low?: unknown; high?: unknown } }
    | undefined;

  if (!axes || !axes.x || !axes.y) {
    return { ok: false, reason: "Missing axes definition." };
  }

  if (!matchesApprovedPair(axes.x.low, axes.x.high, TONE_AXES)) {
    return {
      ok: false,
      reason: `Invalid x-axis pair "${axes.x.low}"/"${axes.x.high}". Use exactly one approved tone pair: calm/wild, serious/silly, or quiet/loud.`,
    };
  }

  if (!matchesApprovedPair(axes.y.low, axes.y.high, EMOTIONAL_AXES)) {
    return {
      ok: false,
      reason: `Invalid y-axis pair "${axes.y.low}"/"${axes.y.high}". Use exactly one approved emotional pair: practical/emotional, simple/dramatic, or solo/social.`,
    };
  }

  if (normalize(axes.x.low) === normalize(axes.y.low) || normalize(axes.x.high) === normalize(axes.y.high)) {
    return { ok: false, reason: "The x-axis and y-axis must be different dimensions." };
  }

  const territories = data.territories as unknown;
  if (!Array.isArray(territories) || territories.length !== 3) {
    return { ok: false, reason: "Response must contain exactly 3 territories." };
  }

  const mechanismsUsed = new Set<string>();
  const registersUsed = new Set<string>();
  const idsUsed = new Set<string>();
  const requiredStrings = [
    "id",
    "name",
    "strategic_register",
    "primary_mechanism",
    "insight",
    "emotional_angle",
    "big_idea_seed",
    "tagline_seed",
    "visual_direction_seed",
  ];

  for (const t of territories as Record<string, unknown>[]) {
    if (!t || typeof t !== "object") {
      return { ok: false, reason: "A territory entry was not a valid object." };
    }
    for (const key of requiredStrings) {
      const value = t[key];
      if (typeof value !== "string" || value.trim().length === 0) {
        return { ok: false, reason: `Territory field "${key}" was missing or empty.` };
      }
    }

    const id = t.id as string;
    if (idsUsed.has(id)) {
      return { ok: false, reason: "Territory IDs must be unique." };
    }
    idsUsed.add(id);

    const mechanism = t.primary_mechanism as string;
    const register = t.strategic_register as string;

    if (!MECHANISMS.includes(mechanism)) {
      return { ok: false, reason: `"${mechanism}" is not an approved creative mechanism.` };
    }
    if (!REGISTERS.includes(register)) {
      return { ok: false, reason: `"${register}" is not an approved strategic register.` };
    }

    const pos = t.axis_position as { x?: unknown; y?: unknown };
    if (
      !pos ||
      typeof pos.x !== "number" ||
      typeof pos.y !== "number" ||
      !Number.isFinite(pos.x) ||
      !Number.isFinite(pos.y) ||
      pos.x < -1 ||
      pos.x > 1 ||
      pos.y < -1 ||
      pos.y > 1
    ) {
      return { ok: false, reason: "A territory's axis_position was missing or out of range [-1, 1]." };
    }

    if (mechanismsUsed.has(mechanism)) {
      return {
        ok: false,
        reason: "Two territories used the same primary creative mechanism. Each must be different.",
      };
    }
    mechanismsUsed.add(mechanism);
    registersUsed.add(register);
  }

  if (registersUsed.size < 3) {
    return { ok: false, reason: "Territories must use three distinct strategic registers." };
  }

  return {
    ok: true,
    data: {
      axes: {
        x: { low: normalize(axes.x.low), high: normalize(axes.x.high) },
        y: { low: normalize(axes.y.low), high: normalize(axes.y.high) },
      },
      territories: territories as ValidatedTerritory[],
    },
  };
}