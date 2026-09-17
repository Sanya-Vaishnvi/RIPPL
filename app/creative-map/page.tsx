"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/footer";
import { CreativeMap } from "../components/creative-map";
import { loadTerritoryData, StoredTerritoryData } from "../../lib/session-campaign";
import { BriefFormData } from "../../lib/brief-types";

const scatteredBerries = [
  { top: "2%", left: "3%", size: 26, rotate: -12, opacity: 0.55 },
  { top: "6%", right: "4%", size: 30, rotate: 14, opacity: 0.6 },
  { top: "28%", left: "2%", size: 20, rotate: 8, opacity: 0.5 },
  { top: "34%", right: "3%", size: 24, rotate: -18, opacity: 0.55 },
  { top: "55%", left: "5%", size: 18, rotate: 16, opacity: 0.45 },
  { top: "60%", right: "6%", size: 22, rotate: -10, opacity: 0.5 },
  { bottom: "10%", left: "4%", size: 28, rotate: 10, opacity: 0.6 },
  { bottom: "6%", right: "5%", size: 20, rotate: -8, opacity: 0.5 },
];

export default function CreativeMapPage() {
  const [brief, setBrief] = useState<BriefFormData | null>(null);
  const [territoryData, setTerritoryData] = useState<StoredTerritoryData | null>(null);

  useEffect(() => {
    const storedBrief = window.sessionStorage.getItem("campaign-brief");
    if (storedBrief) setBrief(JSON.parse(storedBrief) as BriefFormData);
    setTerritoryData(loadTerritoryData());
  }, []);

  if (!territoryData) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="relative flex-1 overflow-hidden px-6 py-10 sm:px-10">
        {scatteredBerries.map((b, i) => (
          <Image
            key={i}
            src="/strawberry.png"
            alt=""
            width={b.size}
            height={b.size}
            aria-hidden="true"
            className="pointer-events-none absolute z-0 select-none"
            style={{
              top: b.top,
              bottom: b.bottom,
              left: b.left,
              right: b.right,
              opacity: b.opacity,
              transform: `rotate(${b.rotate}deg)`,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto mb-6 w-full max-w-2xl">
          <div className="mb-6 flex items-baseline justify-between">
            <p className="text-sm text-ink-soft">
              {brief ? `for: ${brief.product}, ${brief.audience}` : "no brief found"}
            </p>
            <p className="text-sm text-ink-soft">3 territories</p>
          </div>

          <h1 className="font-display text-2xl text-ink sm:text-3xl">
            Choose a creative direction
          </h1>

          {territoryData.source === "fallback" && territoryData.notice && (
            <p className="mt-3 text-sm text-ink-soft italic">{territoryData.notice}</p>
          )}
        </div>

        <div className="relative z-10">
          <CreativeMap
            territories={territoryData.territories}
            axes={territoryData.axes}
          />
        </div>

        <div className="relative z-10 mx-auto mt-8 w-full max-w-2xl">
          <Link href="/brief" className="text-sm text-accent underline underline-offset-4">
            ← back to the brief
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}