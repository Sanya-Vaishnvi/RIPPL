import { Suspense } from "react";
import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/footer";
import { CanvasContent } from "./canvas-content";

export default async function CanvasPage({
  searchParams,
}: {
  searchParams: Promise<{ territory?: string }>;
}) {
  const { territory } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-6 py-10 sm:px-10">
        <Suspense fallback={null}>
          <CanvasContent key={territory ?? "default"} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}