import type { RequestType } from "./direction-types";

export interface CampaignContent {
  bigIdea: string;
  tagline: string;
  visualWorld: string;
  heroVisual: string;
  socialAsset: string;
}

export const mockCampaigns: Record<string, CampaignContent> = {
  "exam-fuel": {
    bigIdea: "Your brain has a deadline. Your hunger doesn't.",
    tagline: "Fuel the final stretch.",
    visualWorld:
      "Chaotic, high-contrast, meme-adjacent, late-night desk lamps, energy drink cans, highlighter yellow against deep shadow.",
    heroVisual:
      "A cluttered study desk at 2am, one hand reaching for a delivery bag mid highlight-stroke.",
    socialAsset:
      "A mock Instagram story: an exam countdown timer, caption reads 'biryani over breakdown.'",
  },
  "hostel-hero": {
    bigIdea:
      "The real MVP isn't who studies hardest. It's who orders first.",
    tagline: "Hostel legend, one order at a time.",
    visualWorld:
      "Warm, communal, dorm-room energy, string lights, shared thalis, worn hostel corridors.",
    heroVisual:
      "A hostel doorway with three roommates crowding around one delivery bag.",
    socialAsset:
      "A mock group-chat screenshot deciding who's ordering, ending on the app icon.",
  },
  emergency: {
    bigIdea: "Hunger is an emergency. We treat it like one.",
    tagline: "In case of hunger, break ₹99.",
    visualWorld:
      "Absurd, deadpan, mock-official signage, red emergency typography, glass-break iconography, exit-sign aesthetics.",
    heroVisual:
      "An 'in case of emergency, break glass' box mounted on a hostel wall, holding a delivery bag instead of an axe.",
    socialAsset:
      "A mock out-of-home poster styled like an evacuation sign, redirecting to '10 minutes away.'",
  },
};

type Transformation = Partial<CampaignContent>;
type TransformationMap = Partial<Record<RequestType, Transformation>>;

export const mockTransformations: Record<string, TransformationMap> = {
  "exam-fuel": {
    funnier: {
      bigIdea:
        "Your brain has 47 tabs open. At least one should be about food.",
      tagline: "Feed the deadline.",
      socialAsset:
        "A mock notes app screenshot where 'revise chapter 4' is crossed out and replaced with 'order food, obviously.'",
    },
    chaotic: {
      bigIdea: "Panic is not a food group. Order something.",
      visualWorld:
        "Overexposed flash photography, scattered flashcards, energy drink cans knocked over, timestamps flashing 3:47am.",
      heroVisual:
        "A blurry, chaotic desk shot mid-panic, papers flying, phone lit up with the delivery app.",
      socialAsset:
        "A mock story with a shaky countdown timer at '00:00' and the caption 'send help (and biryani).'",
    },
    premium: {
      tagline: "Precision fuel, delivered on time.",
      visualWorld:
        "Clean minimal desk, single warm lamp, muted tones, delivery bag placed with quiet intention.",
      heroVisual:
        "A tidy study space, one hand calmly setting down a neatly packed delivery bag beside an open notebook.",
    },
    audience: {
      bigIdea: "Deadlines don't care about your meal plan. We do.",
      tagline: "Built for the ones pulling all-nighters.",
      visualWorld:
        "Shifted from chaotic student-dorm energy to a broader working-professional late-night grind: laptops, office lamps, quiet urgency.",
      socialAsset:
        "A mock LinkedIn-style post: 'shipped the deck at 1am, ordered dinner at 1:02am.'",
    },
  },
  "hostel-hero": {
    funnier: {
      bigIdea:
        "You didn't cook. You didn't clean. You did order, though. Legend.",
      tagline: "Zero effort. Full legend status.",
      socialAsset:
        "A mock group chat where someone sends '10 mins away' and the room erupts in all-caps gratitude.",
    },
    chaotic: {
      bigIdea:
        "Six roommates. One order. Complete chaos, resolved in ten minutes.",
      visualWorld:
        "Overlapping voices, crowded doorway, someone's already grabbing plates before the bag is even opened.",
      heroVisual:
        "A blurred, energetic shot of a hostel room mid-scramble as the delivery arrives.",
      socialAsset:
        "A mock story of five thumbs-up reactions stacked on a single 'ordered!' message.",
    },
    premium: {
      tagline: "Reliably there, every single time.",
      visualWorld:
        "Warm but composed lighting, tidy shared space, a single tray placed thoughtfully on a clean table.",
      heroVisual:
        "A calm, well-lit hostel common room, one tray set down with quiet ceremony.",
    },
    audience: {
      bigIdea: "New city. New room. One thing that already feels like home.",
      tagline: "The first friend your new hostel makes.",
      visualWorld:
        "Shifted from established hostel in-jokes to a first-week, still-settling-in energy: unopened boxes, unfamiliar hallways, one reliable delivery bag.",
      socialAsset:
        "A mock story captioned 'day 1 in a new city, first order already placed.'",
    },
  },
  emergency: {
    funnier: {
      bigIdea: "This is not a drill. Your stomach called it first.",
      tagline: "Break glass. Break bread.",
      socialAsset:
        "A mock 'incident report' form with 'cause of emergency: skipped lunch' filled in.",
    },
    chaotic: {
      bigIdea: "Sirens optional. Hunger is not.",
      visualWorld:
        "Flashing red emergency lights, exaggerated caution tape, mock alarm graphics layered over delivery imagery.",
      heroVisual:
        "An emergency box being smashed open in dramatic slow motion, delivery bag mid-fall.",
      socialAsset:
        "A mock 'emergency broadcast' story graphic interrupting a normal feed with 'HUNGER ALERT.'",
    },
    premium: {
      tagline: "Handled, quietly and quickly.",
      visualWorld:
        "Restrained emergency-service styling, muted red-on-cream palette, quiet authority rather than alarm.",
      heroVisual:
        "A composed, well-lit emergency box mounted discreetly, opened with quiet efficiency.",
    },
    audience: {
      bigIdea: "Late meetings don't pause for dinner. Neither do we.",
      tagline: "Your 9-to-9 emergency line.",
      visualWorld:
        "Shifted from hostel-emergency staging to office-emergency staging: break rooms, meeting-room glass, corporate signage repurposed.",
      socialAsset:
        "A mock 'in case of missed lunch, break here' sign mounted near an office pantry.",
    },
  },
};

type AlternativesMap = Partial<Record<keyof CampaignContent, string[]>>;

export const mockAlternatives: Record<string, AlternativesMap> = {
  "exam-fuel": {
    tagline: [
      "Fuel the final stretch.",
      "Your deadline called. It wants snacks.",
      "Study hard. Eat harder.",
    ],
  },
  "hostel-hero": {
    tagline: [
      "Hostel legend, one order at a time.",
      "The only reliable roommate.",
      "Zero effort. Full legend status.",
    ],
  },
  emergency: {
    tagline: [
      "In case of hunger, break ₹99.",
      "Handled, quietly and quickly.",
      "Break glass. Break bread.",
    ],
  },
};