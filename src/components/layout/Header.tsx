import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Header() {
  const displayYear = siteConfig.year || 2026;

  return (
    <header className="w-full">
      <div className="flex items-center justify-between pt-8 pb-5 sm:pt-10 sm:pb-6 border-b border-[#28251F]/15">
        <Link
          href="/"
          className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium text-[#28251F] select-none hover:opacity-80 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40 rounded-xs"
          aria-label="J. / PORTFOLIO — Home"
        >
          J. / PORTFOLIO
        </Link>
        <div className="font-mono text-[11px] sm:text-xs tracking-[0.15em] text-[#28251F] select-none">
          {displayYear}
        </div>
      </div>
    </header>
  );
}

export { Header };
