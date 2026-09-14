import { Suspense } from "react";
import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/footer";
import { CanvasContent } from "./canvas-content";

export default function CanvasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-6 py-10 sm:px-10">
        <Suspense fallback={null}>
          <CanvasContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}