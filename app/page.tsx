import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "./components/header";
import { SiteFooter } from "./components/footer";

const steps = [
  "Brief",
  "Diagnosis",
  "Creative territories",
  "Campaign canvas",
  "Iteration",
];

const scatteredBerries = [
  { top: "3%", right: "2%", size: 38, rotate: -10, opacity: 0.75 },
  { top: "18%", right: "7%", size: 22, rotate: 16, opacity: 0.6 },
  { top: "32%", right: "1%", size: 18, rotate: -6, opacity: 0.55 },
  { bottom: "10%", right: "3%", size: 30, rotate: 8, opacity: 0.7 },
  { bottom: "22%", right: "9%", size: 16, rotate: -20, opacity: 0.5 },
];

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />

      <main className="relative flex flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        {scatteredBerries.map((b, i) => (
          <Image
            key={i}
            src="/strawberry.png"
            alt=""
            width={b.size}
            height={b.size}
            aria-hidden="true"
            className="pointer-events-none absolute select-none"
            style={{
              top: b.top,
              bottom: b.bottom,
              right: b.right,
              opacity: b.opacity,
              transform: `rotate(${b.rotate}deg)`,
            }}
          />
        ))}

        <div className="relative mx-auto w-full max-w-3xl">
          <h1
            className="font-body font-black text-ink"
            style={{ lineHeight: 1.15 }}
          >
            <span
              className="animate-rise block whitespace-nowrap"
              style={{
                fontSize: "clamp(24px, 4.2vw, 44px)",
                animationDelay: "0ms",
              }}
            >
              Explore freely.
            </span>
            <span
              className="animate-rise block whitespace-nowrap"
              style={{
                fontSize: "clamp(24px, 4.2vw, 44px)",
                animationDelay: "90ms",
              }}
            >
              Commit deliberately.
            </span>
            <span
              className="animate-rise block whitespace-nowrap"
              style={{
                fontSize: "clamp(24px, 4.2vw, 44px)",
                animationDelay: "180ms",
              }}
            >
              Change fearlessly.
            </span>
          </h1>

          <p
            className="animate-rise mt-8 max-w-md text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "280ms" }}
          >
            Rippl helps you explore campaign directions with AI, then keeps
            every decision you make exactly as you left it, even as the work
            keeps changing.
          </p>

          <div
            className="animate-rise mt-10"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-paper transition-colors hover:bg-ink"
            >
              Start a campaign
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          className="animate-rise relative mx-auto mt-24 flex w-full max-w-3xl flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft"
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