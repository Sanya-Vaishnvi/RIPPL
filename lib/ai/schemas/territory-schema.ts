import { Type } from "@google/genai";

// Gemini's responseSchema uses an OpenAPI-subset format (via the SDK's Type
// enum), not standard JSON Schema — this is NOT interchangeable with an
// OpenAI-style schema. Array length (exactly 3) is enforced in our own
// validation layer below, not here, since Gemini's array constraints are
// less reliable across SDK versions than a plain application-side check.

const STRATEGIC_REGISTERS = [
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

export const territoryResponseSchema = {
  type: Type.OBJECT,
  properties: {
    axes: {
      type: Type.OBJECT,
      properties: {
        x: {
          type: Type.OBJECT,
          properties: {
            low: { type: Type.STRING },
            high: { type: Type.STRING },
          },
          required: ["low", "high"],
        },
        y: {
          type: Type.OBJECT,
          properties: {
            low: { type: Type.STRING },
            high: { type: Type.STRING },
          },
          required: ["low", "high"],
        },
      },
      required: ["x", "y"],
    },
    territories: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          strategic_register: { type: Type.STRING, enum: STRATEGIC_REGISTERS },
          primary_mechanism: { type: Type.STRING, enum: MECHANISMS },
          insight: { type: Type.STRING },
          emotional_angle: { type: Type.STRING },
          big_idea_seed: { type: Type.STRING },
          tagline_seed: { type: Type.STRING },
          visual_direction_seed: { type: Type.STRING },
          axis_position: {
            type: Type.OBJECT,
            properties: {
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER },
            },
            required: ["x", "y"],
          },
        },
        required: [
          "id",
          "name",
          "strategic_register",
          "primary_mechanism",
          "insight",
          "emotional_angle",
          "big_idea_seed",
          "tagline_seed",
          "visual_direction_seed",
          "axis_position",
        ],
        propertyOrdering: [
          "id",
          "name",
          "strategic_register",
          "primary_mechanism",
          "insight",
          "emotional_angle",
          "big_idea_seed",
          "tagline_seed",
          "visual_direction_seed",
          "axis_position",
        ],
      },
    },
  },
  required: ["axes", "territories"],
};