import Link from "next/link";
import { SiteHeader } from "./components/header";
import { SiteFooter } from "./components/footer";

const steps = [
  "Brief",
  "Diagnosis",
  "Creative territories",
  "Campaign canvas",
  "Iteration",
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="font-display text-5xl leading-[1.1] text-ink sm:text-6xl md:text-7xl">
            <span className="animate-rise block" style={{ animationDelay: "0ms" }}>
              Explore freely.
            </span>
            <span className="animate-rise block" style={{ animationDelay: "90ms" }}>
              Commit deliberately.
            </span>
            <span className="animate-rise block" style={{ animationDelay: "180ms" }}>
              Change fearlessly.
            </span>
          </h1>

          <p
            className="animate-rise mt-8 max-w-md text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "280ms" }}
          >
            AI Campaign Studio helps you explore campaign directions with AI,
            then keeps every decision you make exactly as you left it, even
            as the work keeps changing.
          </p>

          <div className="animate-rise mt-10" style={{ animationDelay: "360ms" }}>
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-base text-paper transition-colors hover:bg-ink"
            >
              Start a campaign
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          className="animate-rise mx-auto mt-24 flex w-full max-w-3xl flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft"
          style={{ animationDelay: "440ms" }}
        >
          {steps.map((step, i) => (
            <span key={step} className="flex items-center gap-6">
              {step}
              {i < steps.length - 1 && (
                <span className="h-3 w-px bg-line" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}