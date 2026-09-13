import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/strawberry.png"
          alt=""
          width={30}
          height={30}
          className="h-[30px] w-[30px] object-contain"
        />
        <span>
          <span className="font-wordmark block text-xl leading-none text-raspberry">
            rippl
          </span>
          <span className="mt-0.5 block text-[11px] leading-none text-ink-soft">
            ai campaign studio
          </span>
        </span>
      </Link>
      <span className="hidden text-sm text-ink-soft sm:inline">
        a creative direction workspace
      </span>
    </header>
  );
}