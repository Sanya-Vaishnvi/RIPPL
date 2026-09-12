"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/footer";
import { BriefField } from "../components/brief-field";
import {
  BriefFormData,
  emptyBrief,
  REQUIRED_BRIEF_FIELDS,
} from "../../lib/brief-types";

export default function BriefPage() {
  const router = useRouter();
  const [brief, setBrief] = useState<BriefFormData>(emptyBrief);

  const update = (field: keyof BriefFormData) => (value: string) => {
    setBrief((prev) => ({ ...prev, [field]: value }));
  };

  const answeredRequired = REQUIRED_BRIEF_FIELDS.filter(
    (field) => brief[field].trim().length > 0
  ).length;
  const totalRequired = REQUIRED_BRIEF_FIELDS.length;
  const isComplete = answeredRequired === totalRequired;

  function handleContinue() {
    if (!isComplete) return;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("campaign-brief", JSON.stringify(brief));
    }
    router.push("/creative-map");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 px-6 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-10 flex items-baseline justify-between">
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              Tell us about the campaign
            </h1>
            <span className="text-sm text-ink-soft">
              {answeredRequired} of {totalRequired}
            </span>
          </div>

          <div>
            <BriefField
              id="product"
              label="What are you promoting?"
              placeholder="e.g. 10-minute grocery delivery"
              value={brief.product}
              onChange={update("product")}
            />
            <BriefField
              id="audience"
              label="Who is it for?"
              placeholder="e.g. college students living away from home"
              value={brief.audience}
              onChange={update("audience")}
            />
            <BriefField
              id="objective"
              label="What do you want them to do?"
              placeholder="e.g. try the app for the first time"
              value={brief.objective}
              onChange={update("objective")}
            />
            <BriefField
              id="tone"
              label="What should it feel like?"
              placeholder="e.g. witty, warm, chaotic"
              value={brief.tone}
              onChange={update("tone")}
            />
            <BriefField
              id="platform"
              label="Where will the campaign live?"
              placeholder="e.g. Instagram and out-of-home posters"
              value={brief.platform}
              onChange={update("platform")}
            />
            <BriefField
              id="avoid"
              label="What should we avoid?"
              placeholder="e.g. corporate tone, generic stock photos"
              value={brief.avoid}
              onChange={update("avoid")}
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm text-ink-soft">
              A bit more, if you have it.
            </p>
            <BriefField
              id="brandPersonality"
              label="Brand personality or existing voice"
              placeholder="e.g. confident but never takes itself too seriously"
              value={brief.brandPersonality}
              onChange={update("brandPersonality")}
              optional
            />
            <BriefField
              id="brandKnownFor"
              label="What is the brand known for?"
              placeholder="e.g. speed, or nothing yet, we're just starting out"
              value={brief.brandKnownFor}
              onChange={update("brandKnownFor")}
              optional
            />
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isComplete}
              className="bg-accent px-6 py-3 text-base text-paper transition-colors enabled:hover:bg-ink disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
            >
              Continue
            </button>
            {!isComplete && (
              <span className="text-sm text-ink-soft">
                {totalRequired - answeredRequired} more to go
              </span>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}