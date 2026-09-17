import { NextResponse } from "next/server";
import { generateCreativeTerritories } from "../../../lib/ai/gemini";
import { validateTerritoryResponse } from "../../../lib/ai/validation/territory-validation";
import { mapAiTerritoriesToApp } from "../../../lib/ai/territory-mapper";
import { mockTerritories, DEFAULT_AXES } from "../../../lib/territory-types";
import type { BriefFormData } from "../../../lib/brief-types";

const FALLBACK_RESPONSE = {
  success: false as const,
  fallback: true as const,
  notice:
    "Rippl couldn't generate custom directions this time — showing example directions.",
  axes: DEFAULT_AXES,
  territories: mockTerritories,
};

export async function POST(request: Request) {
  let body: { brief?: BriefFormData };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const brief = body?.brief;
  if (!brief || !brief.product || !brief.audience) {
    return NextResponse.json(
      { error: "Brief is missing required fields." },
      { status: 400 }
    );
  }

  try {
    let raw = await generateCreativeTerritories(brief);
    let validation = validateTerritoryResponse(raw);

    if (!validation.ok) {
      raw = await generateCreativeTerritories(brief, validation.reason);
      validation = validateTerritoryResponse(raw);
    }

    if (!validation.ok) {
      return NextResponse.json(FALLBACK_RESPONSE);
    }

    const mapped = mapAiTerritoriesToApp(validation.data);
    return NextResponse.json({
      success: true as const,
      axes: mapped.axes,
      territories: mapped.territories,
    });
  } catch (err) {
    console.error("generate-territories failed:", err);
    return NextResponse.json(FALLBACK_RESPONSE);
  }
}