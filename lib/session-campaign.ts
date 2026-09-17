import type { MapAxes, Territory } from "./territory-types";
import { DEFAULT_AXES, mockTerritories } from "./territory-types";

export interface StoredTerritoryData {
  source: "ai" | "fallback";
  notice?: string;
  axes: MapAxes;
  territories: Territory[];
}

const KEY = "campaign-territories";

export function saveTerritoryData(response: {
  success: boolean;
  fallback?: boolean;
  notice?: string;
  axes: MapAxes;
  territories: Territory[];
}) {
  if (typeof window === "undefined") return;
  const data: StoredTerritoryData = {
    source: response.success ? "ai" : "fallback",
    notice: response.notice,
    axes: response.axes,
    territories: response.territories,
  };
  window.sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function loadTerritoryData(): StoredTerritoryData {
  if (typeof window !== "undefined") {
    const stored = window.sessionStorage.getItem(KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as StoredTerritoryData;
      } catch {
        // fall through
      }
    }
  }
  return { source: "fallback", axes: DEFAULT_AXES, territories: mockTerritories };
}