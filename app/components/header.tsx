import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex items-baseline justify-between px-6 py-6 sm:px-10 sm:py-8">
      <Link href="/" className="font-display text-lg tracking-tight text-ink">
        AI Campaign Studio
      </Link>
      <span className="hidden text-sm text-ink-soft sm:inline">
        a creative direction workspace
      </span>
    </header>
  );
}