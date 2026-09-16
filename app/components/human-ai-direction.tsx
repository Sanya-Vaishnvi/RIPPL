"use client";

import { useState } from "react";
import type { Territory } from "../../lib/territory-types";
import { REQUEST_LABELS, FIELD_LABELS } from "../../lib/direction-types";
import type { RequestType } from "../../lib/direction-types";
import { parseFreeText } from "../../lib/request-interpreter";
import type { useCampaignDirection } from "../../lib/use-campaign-direction";

interface HumanAIDirectionProps {
  territory: Territory;
  direction: ReturnType<typeof useCampaignDirection>;
}

const QUICK_ACTIONS: RequestType[] = ["funnier", "premium", "chaotic", "audience"];

export function HumanAIDirection({ territory, direction }: HumanAIDirectionProps) {
  const [freeText, setFreeText] = useState("");
  const disabled = direction.hasPendingDiff || direction.pendingAlternatives !== null;

  function handleQuickAction(type: RequestType) {
    if (disabled) return;
    direction.runRequest({ kind: "transform", type }, REQUEST_LABELS[type]);
  }

  function handleGiveAlternatives() {
    if (disabled) return;
    direction.runRequest(
      { kind: "alternatives", field: "tagline" },
      "Give tagline alternatives"
    );
  }

  function handleFreeTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled || !freeText.trim()) return;
    const parsed = parseFreeText(freeText);
    if (!parsed) {
      direction.reportUnrecognized();
      return;
    }
    const label =
      parsed.kind === "transform"
        ? REQUEST_LABELS[parsed.type]
        : `Give ${FIELD_LABELS[parsed.field]} alternatives`;
    direction.runRequest(parsed, label);
    setFreeText("");
  }

  return (
    <div className="mt-12 border-t border-line pt-8">
      <p className="mb-4 text-xs tracking-wide text-ink-soft">direct the creative</p>

      <div className="mb-4 flex flex-wrap gap-2.5">
        {QUICK_ACTIONS.map((type) => (
          <button
            key={type}
            type="button"
            disabled={disabled}
            onClick={() => handleQuickAction(type)}
            className="rounded-full border border-line bg-paper-raised px-4 py-2 text-sm text-ink transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {REQUEST_LABELS[type]}
          </button>
        ))}
        <button
          type="button"
          disabled={disabled}
          onClick={handleGiveAlternatives}
          className="rounded-full border border-line bg-paper-raised px-4 py-2 text-sm text-ink transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          Give tagline alternatives
        </button>
      </div>

      <form onSubmit={handleFreeTextSubmit} className="mb-2 flex gap-2">
        <input
          type="text"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          disabled={disabled}
          placeholder="Ask the creative director..."
          className="flex-1 border-0 border-b border-line bg-transparent py-2 text-sm text-ink placeholder:italic placeholder:text-ink-soft/70 focus:border-accent focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !freeText.trim()}
          className="px-4 py-2 text-sm text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          send
        </button>
      </form>

      {direction.message && (
        <p className="mb-4 text-sm text-ink-soft">
          {direction.message} Try a direction like &ldquo;make it
          funnier&rdquo; or &ldquo;change only the tagline&rdquo;.
        </p>
      )}

      {direction.pendingAlternatives && (
        <div className="mt-4 rounded-md bg-paper-raised px-5 py-4">
          <p className="mb-3 text-xs tracking-wide text-ink-soft">
            {FIELD_LABELS[direction.pendingAlternatives.field]} options
          </p>
          <div className="space-y-2">
            {direction.pendingAlternatives.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  direction.selectAlternative(direction.pendingAlternatives!.field, option)
                }
                className="block w-full rounded-md border border-line bg-paper px-4 py-3 text-left text-sm text-ink transition-colors hover:border-accent"
              >
                &ldquo;{option}&rdquo;
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={direction.dismissAlternatives}
            className="mt-3 text-xs text-ink-soft underline underline-offset-4"
          >
            cancel
          </button>
        </div>
      )}

      {direction.hasPendingDiff && direction.previousCampaign && (
        <div
          style={{ borderLeftColor: territory.color }}
          className="mt-4 rounded-md border-l-[3px] bg-paper-raised px-5 py-4"
        >
          <p className="mb-3 text-sm font-medium text-ink">
            {direction.changedFields.length}{" "}
            {direction.changedFields.length === 1 ? "thing" : "things"} changed
            {direction.lastRequestLabel ? ` — ${direction.lastRequestLabel}` : ""}
          </p>

          <div className="mb-4 space-y-3">
            {direction.changedFields.map((field) => (
              <div key={field}>
                <p className="text-xs tracking-wide text-ink-soft">
                  {FIELD_LABELS[field]}
                </p>
                <p className="text-sm text-ink-soft line-through opacity-70">
                  {direction.previousCampaign![field]}
                </p>
                <p className="text-sm font-medium text-ink">
                  {direction.campaign[field]}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={direction.keepChanges}
              className="bg-accent px-4 py-2 text-sm text-paper transition-colors hover:bg-ink"
            >
              Keep changes
            </button>
            <button
              type="button"
              onClick={direction.revert}
              className="border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent"
            >
              Revert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}