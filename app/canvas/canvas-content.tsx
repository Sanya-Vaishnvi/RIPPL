"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CampaignCanvas } from "../components/campaign-canvas";
import { HumanAIDirection } from "../components/human-ai-direction";
import { mockTerritories } from "../../lib/territory-types";
import { mockCampaigns } from "../../lib/campaign-mock";
import { useCampaignDirection } from "../../lib/use-campaign-direction";

export function CanvasContent() {
  const searchParams = useSearchParams();
  const territoryId = searchParams.get("territory");

  const territory =
    mockTerritories.find((t) => t.id === territoryId) ?? mockTerritories[0];
  const initialCampaign = mockCampaigns[territory.id];

  const direction = useCampaignDirection(territory.id, initialCampaign);
  const interactionDisabled =
    direction.hasPendingDiff || direction.pendingAlternatives !== null;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 flex items-center justify-between text-sm text-ink-soft">
        <Link href="/creative-map" className="underline underline-offset-4">
          ← back to directions
        </Link>
        <span>Creative Map / {territory.name}</span>
      </div>

      <h1 className="font-display mb-8 text-2xl text-ink sm:text-3xl">
        Build the campaign
      </h1>

      <CampaignCanvas
        territory={territory}
        campaign={direction.campaign}
        lockedFields={direction.lockedFields}
        onToggleLock={direction.toggleLock}
        disabled={interactionDisabled}
      />

      <HumanAIDirection territory={territory} direction={direction} />
    </div>
  );
}