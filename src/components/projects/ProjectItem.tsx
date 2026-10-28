import React from "react";
import { Project } from "@/types";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { ProjectVisual } from "@/components/projects/ProjectVisual";

interface ProjectItemProps {
  project: Project;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  // Alternate columns on desktop: even indices have info on left, odd on right
  const isReversed = index % 2 === 1;

  const infoSection = (
    <div className="flex flex-col justify-center">
      {/* Small Technical Project Identifier */}
      <div className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#79746A] mb-3 select-none">
        PROJECT // {project.number}
      </div>

      {/* Project Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#28251F] leading-[1.15]">
        {project.title}
      </h2>

      {/* Description */}
      <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#555047] leading-relaxed font-normal">
        {project.description}
      </p>

      {/* Technology Stack */}
      <div className="mt-6 sm:mt-8 pt-5 border-t border-[#28251F]/10">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#79746A] mb-2 select-none">
          TECHNOLOGIES
        </div>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-mono text-[#28251F]/85">
          {project.technologies.map((tech, i) => (
            <span key={tech} className="inline-flex items-center">
              <span>{tech}</span>
              {i < project.technologies.length - 1 && (
                <span className="ml-2.5 text-[#8C877D]/60 select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links (Repository & Live Demo) */}
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 text-sm font-medium">
        {project.repositoryUrl ? (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
            className="group inline-flex items-center gap-1.5 text-[#28251F] underline underline-offset-[5px] decoration-[#28251F]/40 hover:decoration-[#28251F] transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40 rounded-xs"
          >
            <span>GitHub</span>
            <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span className="font-mono text-xs text-[#79746A] italic select-none">
            Repository URL pending
          </span>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demonstration (opens in a new tab)`}
            className="group inline-flex items-center gap-1.5 text-[#28251F] hover:opacity-75 transition-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40 rounded-xs"
          >
            <span>Live Demo</span>
            <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );

  const visualSection = (
    <div className="w-full flex items-center justify-center">
      <ProjectVisual
        type={project.visualType}
        title={project.title}
        number={project.number}
        imageSrc={project.imageSrc}
        imageAlt={project.imageAlt}
      />
    </div>
  );

  return (
    <article
      className="py-12 sm:py-16 md:py-20 border-b border-[#28251F]/15"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* On desktop: alternate columns if isReversed */}
        {isReversed ? (
          <>
            {/* Visual on Left on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-6 w-full">
              {visualSection}
            </div>
            {/* Info on Right on desktop */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              {infoSection}
            </div>
          </>
        ) : (
          <>
            {/* Info on Left on desktop */}
            <div className="order-1 lg:col-span-6">{infoSection}</div>
            {/* Visual on Right on desktop */}
            <div className="order-2 lg:col-span-6 w-full">
              {visualSection}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export { ProjectItem };
