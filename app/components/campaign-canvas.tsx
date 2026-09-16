import { Territory } from "../../lib/territory-types";
import { CampaignContent } from "../../lib/campaign-mock";

interface CampaignCanvasProps {
  territory: Territory;
  campaign: CampaignContent;
  lockedFields: (keyof CampaignContent)[];
  onToggleLock: (field: keyof CampaignContent) => void;
  disabled?: boolean;
}

function axisLabel(x: number, y: number) {
  const horizontal = x >= 50 ? "wild" : "calm";
  const vertical = y <= 50 ? "emotional" : "practical";
  return `${vertical} • ${horizontal}`;
}

function FieldLabel({
  text,
  field,
  lockedFields,
  onToggleLock,
  disabled,
}: {
  text: string;
  field: keyof CampaignContent;
  lockedFields: (keyof CampaignContent)[];
  onToggleLock: (field: keyof CampaignContent) => void;
  disabled?: boolean;
}) {
  const locked = lockedFields.includes(field);
  return (
    <div className="mb-2 flex items-center">
      <p className="text-xs tracking-wide text-ink-soft">{text}</p>
      <button
        type="button"
        onClick={() => onToggleLock(field)}
        disabled={disabled}
        className={`ml-2 rounded-full border px-2.5 py-0.5 text-[11px] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          locked
            ? "border-accent bg-accent text-paper"
            : "border-line text-ink-soft hover:border-accent hover:text-accent"
        }`}
      >
        {locked ? "locked" : "lock"}
      </button>
    </div>
  );
}

export function CampaignCanvas({
  territory,
  campaign,
  lockedFields,
  onToggleLock,
  disabled,
}: CampaignCanvasProps) {
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
        <FieldLabel
          text="big idea"
          field="bigIdea"
          lockedFields={lockedFields}
          onToggleLock={onToggleLock}
          disabled={disabled}
        />
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
          <FieldLabel
            text="tagline"
            field="tagline"
            lockedFields={lockedFields}
            onToggleLock={onToggleLock}
            disabled={disabled}
          />
          <p className="font-display text-xl font-medium text-ink">
            &ldquo;{campaign.tagline}&rdquo;
          </p>
        </div>

        <div
          style={{ backgroundColor: tint }}
          className="flex flex-col justify-end rounded-lg px-5 py-6 sm:col-span-3"
        >
          <FieldLabel
            text="hero visual"
            field="heroVisual"
            lockedFields={lockedFields}
            onToggleLock={onToggleLock}
            disabled={disabled}
          />
          <p className="text-sm leading-relaxed text-ink-soft italic">
            {campaign.heroVisual}
          </p>
        </div>
      </div>

      <div
        style={{ borderLeftColor: territory.color }}
        className="mb-8 rounded-md border-l-[3px] bg-paper-raised px-5 py-4"
      >
        <FieldLabel
          text="visual world"
          field="visualWorld"
          lockedFields={lockedFields}
          onToggleLock={onToggleLock}
          disabled={disabled}
        />
        <p className="text-sm leading-relaxed text-ink-soft">
          {campaign.visualWorld}
        </p>
      </div>

      <div
        style={{ backgroundColor: tint }}
        className="rounded-lg px-5 py-6 sm:max-w-md"
      >
        <FieldLabel
          text="social asset"
          field="socialAsset"
          lockedFields={lockedFields}
          onToggleLock={onToggleLock}
          disabled={disabled}
        />
        <p className="text-sm leading-relaxed text-ink-soft italic">
          {campaign.socialAsset}
        </p>
      </div>
    </div>
  );
}