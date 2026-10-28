import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LinkArrow } from "@/components/ui/LinkArrow";

export default function NavigationRows() {
  const isResumeConfigured = Boolean(
    siteConfig.resumeUrl &&
      siteConfig.resumeUrl.trim() !== "" &&
      siteConfig.resumeUrl !== "#" &&
      (siteConfig.resumeUrl.startsWith("http://") ||
        siteConfig.resumeUrl.startsWith("https://"))
  );

  const rowLinkClasses =
    "group flex items-center justify-between py-6 sm:py-7 md:py-8 transition-colors duration-150 select-none cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40";

  return (
    <nav className="w-full" aria-label="Main Navigation">
      <div className="divide-y divide-[#28251F]/15 border-b border-[#28251F]/15">
        {/* Row 01: Projects */}
        <Link
          href="/projects"
          className={rowLinkClasses}
          aria-label="Projects — Things I've built"
        >
          <div className="flex items-start">
            <span className="font-mono text-sm sm:text-base text-[#79746A] w-12 sm:w-20 shrink-0 pt-0.5">
              01
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-[#28251F] tracking-tight group-hover:text-black transition-colors">
                Projects
              </h2>
              <p className="text-xs sm:text-sm text-[#79746A] mt-1 font-normal">
                Things I&apos;ve built
              </p>
            </div>
          </div>
          <div className="text-[#28251F] pl-4">
            <LinkArrow className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </Link>

        {/* Row 02: Resume */}
        {isResumeConfigured ? (
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={rowLinkClasses}
            aria-label="Resume — Experience & education (opens Google Drive in a new tab)"
          >
            <div className="flex items-start">
              <span className="font-mono text-sm sm:text-base text-[#79746A] w-12 sm:w-20 shrink-0 pt-0.5">
                02
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-normal text-[#28251F] tracking-tight group-hover:text-black transition-colors">
                  Resume
                </h2>
                <p className="text-xs sm:text-sm text-[#79746A] mt-1 font-normal">
                  Experience &amp; education
                </p>
              </div>
            </div>
            <div className="text-[#28251F] pl-4">
              <LinkArrow className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>
        ) : (
          <div
            className="group flex items-center justify-between py-6 sm:py-7 md:py-8 transition-colors duration-150 select-none cursor-default"
            aria-label="Resume — Experience & education (Resume link not configured)"
            aria-disabled="true"
            title="Resume link not configured"
          >
            <div className="flex items-start">
              <span className="font-mono text-sm sm:text-base text-[#79746A] w-12 sm:w-20 shrink-0 pt-0.5">
                02
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-normal text-[#28251F] tracking-tight transition-colors">
                  Resume
                </h2>
                <p className="text-xs sm:text-sm text-[#79746A] mt-1 font-normal">
                  Experience &amp; education
                </p>
              </div>
            </div>
            <div className="text-[#28251F] pl-4">
              <LinkArrow className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        )}

        {/* Row 03: Contact */}
        <Link
          href="/contact"
          className={rowLinkClasses}
          aria-label="Contact — Get in touch"
        >
          <div className="flex items-start">
            <span className="font-mono text-sm sm:text-base text-[#79746A] w-12 sm:w-20 shrink-0 pt-0.5">
              03
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-[#28251F] tracking-tight group-hover:text-black transition-colors">
                Contact
              </h2>
              <p className="text-xs sm:text-sm text-[#79746A] mt-1 font-normal">
                Get in touch
              </p>
            </div>
          </div>
          <div className="text-[#28251F] pl-4">
            <LinkArrow className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </Link>
      </div>
    </nav>
  );
}

export { NavigationRows };
