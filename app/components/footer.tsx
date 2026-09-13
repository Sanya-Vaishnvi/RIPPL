import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="flex items-center gap-2.5 border-t border-line px-6 py-6 sm:px-10">
      <Image
        src="/strawberry.png"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
      <span className="text-sm text-ink-soft">
        <span className="font-wordmark text-raspberry">rippl</span>. Built for
        the direction, not just the output.
      </span>
    </footer>
  );
}