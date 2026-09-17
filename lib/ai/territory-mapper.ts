import type { Territory, MapAxes } from "../territory-types";
import type { ValidatedTerritory } from "./validation/territory-validation";

const PALETTE = [
  { color: "#C43F63", textColor: "#C43F63" },
  { color: "#DCA83A", textColor: "#B08326" },
  { color: "#A992C9", textColor: "#8267A3" },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function toPercent(pos: { x: number; y: number }) {
  return {
    x: 50 + clamp(pos.x, -1, 1) * 38,
    y: 50 - clamp(pos.y, -1, 1) * 38,
  };
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

const MIN_SEPARATION = 24;

function ensureSeparation(points: { x: number; y: number }[]) {
  for (let i = 1; i < points.length; i++) {
    for (let j = 0; j < i; j++) {
      if (distance(points[i], points[j]) < MIN_SEPARATION) {
        const angle = (Math.PI * 2 * i) / points.length;
        points[i] = {
          x: clamp(points[j].x + Math.cos(angle) * MIN_SEPARATION, 8, 92),
          y: clamp(points[j].y + Math.sin(angle) * MIN_SEPARATION, 8, 92),
        };
      }
    }
  }
  return points;
}

export function mapAiTerritoriesToApp(data: {
  axes: MapAxes;
  territories: ValidatedTerritory[];
}): { axes: MapAxes; territories: Territory[] } {
  const rawPositions = data.territories.map((t) => toPercent(t.axis_position));
  const positions = ensureSeparation(rawPositions);

  const territories: Territory[] = data.territories.map((t, i) => ({
    id: t.id,
    name: t.name,
    color: PALETTE[i % PALETTE.length].color,
    textColor: PALETTE[i % PALETTE.length].textColor,
    x: positions[i].x,
    y: positions[i].y,
    insight: t.insight,
    angle: t.emotional_angle,
    tagline: t.tagline_seed,
    visualWorld: t.visual_direction_seed,
    strategicRegister: t.strategic_register,
    primaryMechanism: t.primary_mechanism,
    bigIdeaSeed: t.big_idea_seed,
  }));

  return { axes: data.axes, territories };
}