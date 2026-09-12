"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/footer";
import { CreativeMap } from "../components/creative-map";
import { mockTerritories } from "../../lib/territory-types";
import { BriefFormData } from "../../lib/brief-types";

export default function CreativeMapPage() {
  const [brief, setBrief] = useState<BriefFormData | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("campaign-brief");
    if (stored) {
      setBrief(JSON.parse(stored) as BriefFormData);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 px-6 py-10 sm:px-10">
        <div className="mx-auto mb-6 w-full max-w-2xl">
          <div className="mb-6 flex items-baseline justify-between">
            <p className="text-sm text-ink-soft">
              {brief
                ? `for: ${brief.product}, ${brief.audience}`
                : "no brief found"}
            </p>
            <p className="text-sm text-ink-soft">3 territories</p>
          </div>

          <h1 className="font-display text-2xl text-ink sm:text-3xl">
            Choose a creative direction
          </h1>
        </div>

        <CreativeMap territories={mockTerritories} />

        <div className="mx-auto mt-8 w-full max-w-2xl">
          <Link
            href="/brief"
            className="text-sm text-accent underline underline-offset-4"
          >
            ← back to the brief
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}