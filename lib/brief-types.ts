export interface BriefFormData {
  product: string;
  audience: string;
  objective: string;
  tone: string;
  platform: string;
  avoid: string;
  brandPersonality: string;
  brandKnownFor: string;
}

export const emptyBrief: BriefFormData = {
  product: "",
  audience: "",
  objective: "",
  tone: "",
  platform: "",
  avoid: "",
  brandPersonality: "",
  brandKnownFor: "",
};

export const REQUIRED_BRIEF_FIELDS: (keyof BriefFormData)[] = [
  "product",
  "audience",
  "objective",
  "tone",
  "platform",
  "avoid",
];