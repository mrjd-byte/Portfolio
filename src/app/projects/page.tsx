import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectItem } from "@/components/projects/ProjectItem";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.displayName}`,
  description:
    "A collection of projects exploring software development, systems programming, and applied AI.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#28251F] flex flex-col justify-between selection:bg-[#28251F] selection:text-[#F3EBDD]">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex-1 flex flex-col">
        {/* Existing shared site header */}
        <Header />

        {/* Page Introduction */}
        <main className="flex-1">
          <section className="pt-10 sm:pt-14 pb-10 sm:pb-14 border-b border-[#28251F]/15">
            {/* Small Monospace Label */}
            <div className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#6E695F] mb-4 sm:mb-6 select-none">
              SELECTED WORK · 2024–2026
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#28251F] leading-[1.08]">
              Things I&apos;ve built.
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#555047] leading-relaxed max-w-2xl font-normal">
              A collection of projects exploring software development, systems
              programming, and applied AI.
            </p>
          </section>

          {/* Vertically Arranged Editorial Project Entries */}
          <section aria-label="Selected Projects">
            {projects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </section>

          {/* GitHub Call-to-Action Closing Section */}
          <section
            className="py-12 sm:py-16 border-b border-[#28251F]/15"
            aria-label="More Work on GitHub"
          >
            <div className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#6E695F] mb-3 select-none">
              MORE WORK
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#28251F] leading-snug">
              More projects, experiments, and code.
            </h2>
            <p className="mt-3 text-base text-[#555047] font-normal max-w-xl">
              Explore more of what I&apos;m building on GitHub.
            </p>
            <div className="mt-6">
              {siteConfig.githubUrl ? (
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#28251F] underline underline-offset-[5px] decoration-[#28251F]/40 hover:decoration-[#28251F] transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40 rounded-xs"
                  aria-label="Explore my GitHub profile (opens in a new tab)"
                >
                  <span>Explore my GitHub</span>
                  <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="font-mono text-xs text-[#79746A] italic select-none">
                  GitHub profile pending configuration
                </span>
              )}
            </div>
          </section>

          {/* Bottom Navigation & Index Indicator */}
          <div className="pt-10 sm:pt-12 pb-6 flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-medium text-[#28251F] hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
              aria-label="Back to homepage"
            >
              <span
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              >
                ←
              </span>
              <span>Back to homepage</span>
            </Link>
            <div className="font-mono text-[11px] sm:text-xs tracking-widest text-[#79746A] uppercase select-none">
              INDEX // {projects.length.toString().padStart(2, "0")} ENTRIES
            </div>
          </div>
        </main>

        {/* Existing shared footer */}
        <Footer />
      </div>
    </div>
  );
}
