"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Territory, MapAxes, DEFAULT_AXES } from "../../lib/territory-types";

interface CreativeMapProps {
  territories: Territory[];
  axes?: MapAxes;
}

export function CreativeMap({ territories, axes = DEFAULT_AXES }: CreativeMapProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [whyOpen, setWhyOpen] = useState(false);

  const selected = territories.find((t) => t.id === selectedId) ?? null;

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        className="relative rounded-xl border-2 bg-paper px-8 py-10 sm:px-10 sm:py-12"
        style={{ borderColor: "rgba(196, 63, 99, 0.65)" }}
      >
        <p className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 text-xs text-ink-soft">
          {axes.y.high}
        </p>
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-ink-soft">
          {axes.y.low}
        </p>
        <p className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 -rotate-90 text-xs text-ink-soft">
          {axes.x.low}
        </p>
        <p className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 -rotate-90 text-xs text-ink-soft">
          {axes.x.high}
        </p>

        <div className="relative h-72">
          <div className="absolute top-0 left-1/2 h-full w-px bg-line" aria-hidden="true" />
          <div className="absolute top-1/2 left-0 h-px w-full bg-line" aria-hidden="true" />

          {territories.map((t) => {
            const isSelected = t.id === selectedId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              >
                <span
                  style={{
                    backgroundColor: t.color,
                    boxShadow: isSelected
                      ? `0 0 0 4px var(--color-paper), 0 0 0 6px ${t.color}`
                      : "0 0 0 4px var(--color-paper)",
                  }}
                  className={`block rounded-full transition-all ${
                    isSelected ? "h-4 w-4" : "h-3.5 w-3.5"
                  }`}
                />
                <span
                  style={{ color: t.textColor }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setWhyOpen((v) => !v)}
        className="mt-3 flex items-center gap-2 text-sm text-ink-soft"
      >
        <span aria-hidden="true">{whyOpen ? "▾" : "▸"}</span>
        why these axes?
      </button>
      {whyOpen && (
        <div className="mt-1.5 rounded-md bg-paper-raised px-3 py-2.5">
          <p className="text-sm leading-relaxed text-ink-soft">
            these dimensions were chosen because they're where your three
            directions actually differ from each other.
          </p>
        </div>
      )}

      {selected && (
        <div
          style={{ borderLeftColor: selected.color }}
          className="mt-4 rounded-md border-l-[3px] bg-paper-raised px-5 py-4"
        >
          <p className="font-display text-base font-medium text-ink">
            {selected.name}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="text-ink-soft">insight — </span>
            {selected.insight}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="text-ink-soft">angle — </span>
            {selected.angle}
          </p>
          <p className="font-display mt-3 text-lg font-medium text-ink">
            &ldquo;{selected.tagline}&rdquo;
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="text-ink-soft">visual world — </span>
            {selected.visualWorld}
          </p>
          <button
            type="button"
            onClick={() => router.push(`/canvas?territory=${selected.id}`)}
            className="mt-4 bg-accent px-5 py-2.5 text-sm text-paper transition-colors hover:bg-ink"
          >
            build this campaign
          </button>
        </div>
      )}
    </div>
  );
}