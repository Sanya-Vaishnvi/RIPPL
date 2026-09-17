export interface AxisPair {
  low: string;
  high: string;
}

export interface MapAxes {
  x: AxisPair;
  y: AxisPair;
}

export interface Territory {
  id: string;
  name: string;
  color: string;
  textColor: string;
  x: number;
  y: number;
  insight: string;
  angle: string;
  tagline: string;
  visualWorld: string;
  strategicRegister?: string;
  primaryMechanism?: string;
  bigIdeaSeed?: string;
}

export const DEFAULT_AXES: MapAxes = {
  x: { low: "calm", high: "wild" },
  y: { low: "practical", high: "emotional" },
};

export const mockTerritories: Territory[] = [
  {
    id: "exam-fuel",
    name: "exam fuel",
    color: "#C43F63",
    textColor: "#C43F63",
    x: 68,
    y: 22,
    insight:
      "students want convenience without feeling like they're overspending",
    angle: "turns exam stress into a shared food ritual",
    tagline: "your brain called. it wants biryani.",
    visualWorld: "chaotic, high-contrast, meme-adjacent",
  },
  {
    id: "hostel-hero",
    name: "hostel hero",
    color: "#DCA83A",
    textColor: "#B08326",
    x: 30,
    y: 35,
    insight: "hostel life runs on small daily wins and shared jokes",
    angle: "the discount becomes a badge of hostel survival",
    tagline: "the only thing cheaper than your excuses.",
    visualWorld: "warm, communal, dorm-room energy",
  },
  {
    id: "emergency",
    name: "₹99 emergency",
    color: "#A992C9",
    textColor: "#8267A3",
    x: 78,
    y: 72,
    insight: "the price itself can become the punchline, not just the pitch",
    angle: "treats the order like a break-glass emergency service",
    tagline: "in case of hunger, break ₹99.",
    visualWorld: "absurd, deadpan, mock-official signage",
  },
];