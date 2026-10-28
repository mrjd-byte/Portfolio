import { siteConfig } from "@/config/site";
import { LinkArrow } from "@/components/ui/LinkArrow";

export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-16 sm:pb-20 text-[#28251F]">
      <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-normal">
        {siteConfig.githubUrl ? (
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="group inline-flex items-center gap-1 hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
          >
            <span>GitHub</span>
            <LinkArrow className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1 text-[#28251F]/60 cursor-default select-none"
          >
            <span>GitHub</span>
            <LinkArrow className="w-3 h-3 opacity-60" />
          </span>
        )}

        <span className="text-[#8C877D] select-none" aria-hidden="true">
          ·
        </span>

        {siteConfig.linkedInUrl ? (
          <a
            href={siteConfig.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="group inline-flex items-center gap-1 hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
          >
            <span>LinkedIn</span>
            <LinkArrow className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1 text-[#28251F]/60 cursor-default select-none"
          >
            <span>LinkedIn</span>
            <LinkArrow className="w-3 h-3 opacity-60" />
          </span>
        )}

        <span className="text-[#8C877D] select-none" aria-hidden="true">
          ·
        </span>

        {siteConfig.email ? (
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label={`Send email to ${siteConfig.email}`}
            className="group inline-flex items-center gap-1 hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
          >
            <span>Email</span>
            <LinkArrow className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1 text-[#28251F]/60 cursor-default select-none"
          >
            <span>Email</span>
            <LinkArrow className="w-3 h-3 opacity-60" />
          </span>
        )}
      </div>
    </footer>
  );
}

export { Footer };
