import { siteConfig } from "@/config/site";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { HeroIllustration } from "@/components/home/HeroIllustration";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-10 sm:pt-14 pb-14 sm:pb-16 lg:pb-20">
        {/* Left Column (55-60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Monospace Topic Label */}
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#6E695F] mb-6 sm:mb-8 select-none">
            COMPUTER SCIENCE · AI &amp; ML
          </div>

          {/* Main Headline with intentional line breaks */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-normal tracking-tight text-[#28251F] leading-[1.08]">
            Building real-world
            <br />
            systems. Learning
            <br />
            by building.
          </h1>

          {/* Supporting Paragraph */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-[#555047] leading-relaxed max-w-xl font-normal">
            I enjoy exploring how things work, turning ideas into working
            software, and understanding the systems, algorithms, and trade-offs
            behind them.
          </p>

          {/* Understated Text Links */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8 text-sm sm:text-base font-normal">
            {siteConfig.githubUrl ? (
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="group inline-flex items-center gap-1.5 text-[#28251F] underline underline-offset-[5px] decoration-[#28251F]/40 hover:decoration-[#28251F] transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
              >
                <span>GitHub</span>
                <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="group inline-flex items-center gap-1.5 text-[#28251F]/60 underline underline-offset-[5px] decoration-[#28251F]/20 cursor-default select-none"
              >
                <span>GitHub</span>
                <LinkArrow className="w-3.5 h-3.5 opacity-60" />
              </span>
            )}

            {siteConfig.linkedInUrl ? (
              <a
                href={siteConfig.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="group inline-flex items-center gap-1.5 text-[#28251F] hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
              >
                <span>LinkedIn</span>
                <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="group inline-flex items-center gap-1.5 text-[#28251F]/60 cursor-default select-none"
              >
                <span>LinkedIn</span>
                <LinkArrow className="w-3.5 h-3.5 opacity-60" />
              </span>
            )}

            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Send email to ${siteConfig.email}`}
                className="group inline-flex items-center gap-1.5 text-[#28251F] hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
              >
                <span>Email</span>
                <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="group inline-flex items-center gap-1.5 text-[#28251F]/60 cursor-default select-none"
              >
                <span>Email</span>
                <LinkArrow className="w-3.5 h-3.5 opacity-60" />
              </span>
            )}
          </div>
        </div>

        {/* Right Column (40-45% width on desktop) */}
        <div className="lg:col-span-5 flex items-center justify-center w-full">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

export { Hero };
