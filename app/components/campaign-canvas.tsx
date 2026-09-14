import { Territory } from "../../lib/territory-types";
import { CampaignContent } from "../../lib/campaign-mock";

interface CampaignCanvasProps {
  territory: Territory;
  campaign: CampaignContent;
}

function axisLabel(x: number, y: number) {
  const horizontal = x >= 50 ? "wild" : "calm";
  const vertical = y <= 50 ? "emotional" : "practical";
  return `${vertical} • ${horizontal}`;
}

export function CampaignCanvas({ territory, campaign }: CampaignCanvasProps) {
  const tint = `${territory.color}1A`;

  return (
    <div>
      <div className="mb-8 flex items-baseline gap-3">
        <span
          style={{ color: territory.textColor }}
          className="font-display text-2xl font-medium"
        >
          {territory.name}
        </span>
        <span className="text-sm text-ink-soft">
          [{axisLabel(territory.x, territory.y)}]
        </span>
      </div>

      <div className="mb-8">
        <p className="mb-2 text-xs tracking-wide text-ink-soft">big idea</p>
        <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
          &ldquo;{campaign.bigIdea}&rdquo;
        </p>
        <div
          style={{ backgroundColor: territory.color }}
          className="mt-4 h-1 w-16 rounded-full"
        />
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-5">
        <div className="rounded-lg bg-paper-raised px-5 py-6 sm:col-span-2">
          <p className="mb-2 text-xs tracking-wide text-ink-soft">tagline</p>
          <p className="font-display text-xl font-medium text-ink">
            &ldquo;{campaign.tagline}&rdquo;
          </p>
        </div>

        <div
          style={{ backgroundColor: tint }}
          className="flex flex-col justify-end rounded-lg px-5 py-6 sm:col-span-3"
        >
          <p className="mb-2 text-xs tracking-wide text-ink-soft">
            hero visual
          </p>
          <p className="text-sm leading-relaxed text-ink-soft italic">
            {campaign.heroVisual}
          </p>
        </div>
      </div>

      <div
        style={{ borderLeftColor: territory.color }}
        className="mb-8 rounded-md border-l-[3px] bg-paper-raised px-5 py-4"
      >
        <p className="mb-2 text-xs tracking-wide text-ink-soft">
          visual world
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">
          {campaign.visualWorld}
        </p>
      </div>

      <div
        style={{ backgroundColor: tint }}
        className="rounded-lg px-5 py-6 sm:max-w-md"
      >
        <p className="mb-2 text-xs tracking-wide text-ink-soft">
          social asset
        </p>
        <p className="text-sm leading-relaxed text-ink-soft italic">
          {campaign.socialAsset}
        </p>
      </div>
    </div>
  );
}