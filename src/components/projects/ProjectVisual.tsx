import React from "react";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

export interface ProjectVisualProps {
  type: string;
  title: string;
  number: string;
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * Check safely on the server if the screenshot file exists in public/
 * Prevents 404 network requests, browser console errors, and broken-image icons.
 */
function checkImageFileExists(imageSrc?: string): boolean {
  if (!imageSrc || imageSrc.trim() === "") return false;
  try {
    const relativePath = imageSrc.replace(/^\//, "");
    const fullPath = path.join(process.cwd(), "public", relativePath);
    return fs.existsSync(fullPath);
  } catch {
    return false;
  }
}

/**
 * DebateHubVisual:
 * Architectural schematic wireframe representing the structured discussion hierarchy.
 * Preserved for reference.
 */
export function DebateHubVisual() {
  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-4 sm:p-5 font-mono select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[#28251F]/15 text-[10px] sm:text-[11px] tracking-wider text-[#6E695F]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C69]" />
          <span>SCHEMATIC // STRUCTURED DEBATE UI</span>
        </div>
        <div>HIERARCHY: TWO-SIDED</div>
      </div>

      <div className="mt-3.5 p-3 bg-[#F3EBDD] border border-[#28251F]/15">
        <div className="text-[9px] uppercase tracking-widest text-[#79746A]">
          ACTIVE DISCUSSION THREAD
        </div>
        <div className="mt-1 font-sans text-xs sm:text-sm font-medium text-[#28251F] leading-snug">
          Architectural evaluation of single-binary systems vs distributed service meshes.
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-[#79746A] pt-2 border-t border-[#28251F]/10">
          <span>STANCE RATIO: 58% SUPPORT · 42% OPPOSITION</span>
          <span className="hidden sm:inline">VERIFIED CITATIONS REQUIRED</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-[#F3EBDD]/90 border-l-2 border-l-[#6B7C69] border-t border-r border-b border-[#28251F]/15">
          <div className="flex items-center justify-between text-[9px] text-[#6B7C69] font-semibold tracking-wider">
            <span>// SUPPORTING [04]</span>
            <span>STANCE A</span>
          </div>
          <div className="mt-2 text-[11px] font-sans text-[#28251F] leading-snug">
            Reduced serialization overhead and deterministic transaction boundaries.
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[9px] text-[#79746A]">
            <span className="px-1 py-0.5 bg-[#E2D8C6] border border-[#28251F]/15 text-[8px]">
              REF #01
            </span>
            <span>Rebuttal Thread (3 replies)</span>
          </div>
        </div>

        <div className="p-3 bg-[#F3EBDD]/90 border-l-2 border-l-[#28251F]/60 border-t border-r border-b border-[#28251F]/15">
          <div className="flex items-center justify-between text-[9px] text-[#28251F]/70 font-semibold tracking-wider">
            <span>// OPPOSING [03]</span>
            <span>STANCE B</span>
          </div>
          <div className="mt-2 text-[11px] font-sans text-[#28251F] leading-snug">
            Decoupled fault domains and localized horizontal scaling boundaries.
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[9px] text-[#79746A]">
            <span className="px-1 py-0.5 bg-[#E2D8C6] border border-[#28251F]/15 text-[8px]">
              REF #02
            </span>
            <span>Counter-point (2 replies)</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#28251F]/15 flex items-center justify-between text-[9px] text-[#79746A]">
        <span>INPUT: FORMAL ARGUMENT &amp; CITATION</span>
        <span className="tracking-widest">STATE: DEBATE_ACTIVE</span>
      </div>
    </div>
  );
}

/**
 * MemoryAllocatorVisual:
 * Technical notebook diagram illustrating heap memory blocks, headers, and free list links.
 * Preserved for reference.
 */
export function MemoryAllocatorVisual() {
  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-4 sm:p-5 font-mono select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[#28251F]/15 text-[10px] sm:text-[11px] tracking-wider text-[#6E695F]">
        <div>FIG 02 // HEAP MEMORY BLOCK METADATA</div>
        <div>ALIGNMENT: 8-BYTE</div>
      </div>

      <div className="mt-3.5 space-y-2.5">
        <div className="border border-[#28251F]/30 bg-[#F3EBDD] p-2.5">
          <div className="flex items-center justify-between text-[9px] text-[#79746A] border-b border-[#28251F]/10 pb-1.5">
            <span className="text-[#28251F] font-semibold">BLOCK 0 [0x1000]</span>
            <span className="px-1.5 py-0.5 bg-[#28251F] text-[#F3EBDD] text-[8px]">
              ALLOCATED (free = 0)
            </span>
          </div>
          <div className="mt-2 grid grid-cols-12 gap-1 text-[9px]">
            <div className="col-span-4 bg-[#DDD4C4] border border-[#28251F]/20 p-1.5 text-center">
              <div className="text-[8px] text-[#79746A]">HEADER</div>
              <div className="font-semibold text-[#28251F]">24 Bytes</div>
            </div>
            <div className="col-span-8 bg-[#28251F]/85 text-[#F3EBDD] border border-[#28251F] p-1.5 text-center">
              <div className="text-[8px] opacity-70">PAYLOAD REGION</div>
              <div className="font-semibold">64 Bytes (In Use)</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#79746A]">
          <span>↓</span>
          <span className="text-[8px] tracking-wider">meta-&gt;next (0x1058)</span>
          <span>↓</span>
        </div>

        <div className="border-2 border-dashed border-[#6B7C69] bg-[#E5ECE4]/70 p-2.5">
          <div className="flex items-center justify-between text-[9px] text-[#6B7C69] border-b border-[#6B7C69]/30 pb-1.5">
            <span className="font-semibold text-[#3C523A]">BLOCK 1 [0x1058]</span>
            <span className="px-1.5 py-0.5 bg-[#6B7C69] text-[#F3EBDD] text-[8px] font-semibold">
              FREE (free = 1)
            </span>
          </div>
          <div className="mt-2 grid grid-cols-12 gap-1 text-[9px]">
            <div className="col-span-4 bg-[#D1DEC0] border border-[#6B7C69]/40 p-1.5 text-center">
              <div className="text-[8px] text-[#3C523A]">HEADER</div>
              <div className="font-semibold text-[#2F422D]">24 Bytes</div>
            </div>
            <div className="col-span-8 bg-[#DFEBDD] border border-dashed border-[#6B7C69] p-1.5 text-center">
              <div className="text-[8px] text-[#3C523A]">AVAILABLE FOR SPLIT</div>
              <div className="font-semibold text-[#2F422D]">128 Bytes Free</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#79746A]">
          <span>↓</span>
          <span className="text-[8px] tracking-wider">meta-&gt;next (0x10F0)</span>
          <span>↓</span>
        </div>

        <div className="border border-[#28251F]/30 bg-[#F3EBDD] p-2.5">
          <div className="flex items-center justify-between text-[9px] text-[#79746A] border-b border-[#28251F]/10 pb-1.5">
            <span className="text-[#28251F] font-semibold">BLOCK 2 [0x10F0]</span>
            <span className="px-1.5 py-0.5 bg-[#28251F] text-[#F3EBDD] text-[8px]">
              ALLOCATED (free = 0)
            </span>
          </div>
          <div className="mt-2 grid grid-cols-12 gap-1 text-[9px]">
            <div className="col-span-4 bg-[#DDD4C4] border border-[#28251F]/20 p-1.5 text-center">
              <div className="text-[8px] text-[#79746A]">HEADER</div>
              <div className="font-semibold text-[#28251F]">24 Bytes</div>
            </div>
            <div className="col-span-8 bg-[#28251F]/85 text-[#F3EBDD] border border-[#28251F] p-1.5 text-center">
              <div className="text-[8px] opacity-70">PAYLOAD REGION</div>
              <div className="font-semibold">32 Bytes (In Use)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#28251F]/15 flex items-center justify-between text-[9px] text-[#79746A]">
        <span>ALGORITHM: FIRST-FIT SCAN</span>
        <span className="tracking-widest">COALESCING: BIDIRECTIONAL</span>
      </div>
    </div>
  );
}

/**
 * PlaceholderVisual:
 * Clean editorial blueprint placeholder with technical registration marks.
 * Preserved for reference.
 */
export function PlaceholderVisual() {
  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-6 sm:p-8 font-mono select-none flex flex-col justify-between min-h-[220px]">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-wider text-[#6E695F] pb-3 border-b border-[#28251F]/15">
        <div>FIG 03 // ARCHITECTURAL DRAFT</div>
        <div>STATUS: SCOPE DEFINITION</div>
      </div>

      <div className="my-6 border border-dashed border-[#28251F]/30 bg-[#F3EBDD]/60 p-6 flex flex-col items-center justify-center text-center">
        <div className="text-xs text-[#28251F] font-semibold tracking-wider">
          PROJECT ARCHITECTURE IN PROGRESS
        </div>
        <p className="mt-2 text-[11px] text-[#79746A] max-w-xs font-sans">
          Technical specifications, source repository, and visual overview will be configured upon project release.
        </p>
        <div className="mt-4 flex items-center gap-3 text-[9px] text-[#6B7C69] tracking-widest uppercase">
          <span>+ APPLIED AI</span>
          <span>·</span>
          <span>SYSTEMS</span>
          <span>·</span>
          <span>FULL-STACK +</span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#28251F]/15 flex items-center justify-between text-[9px] text-[#79746A]">
        <span>REGISTRATION: 03-DRAFT</span>
        <span className="tracking-widest">COORDINATES: [00, 00, 00]</span>
      </div>
    </div>
  );
}

/**
 * ProjectVisual:
 * Unified visual component for all projects.
 * Displays screenshots centered with object-fit: contain when present in public/images/projects/.
 * Renders an understated editorial placeholder if the screenshot file is pending.
 */
export default function ProjectVisual({
  title,
  number,
  imageSrc,
  imageAlt,
}: ProjectVisualProps) {
  const hasImageFile = checkImageFileExists(imageSrc);

  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-2.5 sm:p-3 font-mono select-none">
      {/* Technical Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#28251F]/15 text-[10px] sm:text-[11px] tracking-wider text-[#6E695F]">
        <div>FIG // {number} — {title.toUpperCase()}</div>
        <div>{hasImageFile ? "SCREENSHOT // CAPTURE" : "INTERFACE // PENDING"}</div>
      </div>

      {/* Visual Container (Aspect 16:10, cream background, subtle border) */}
      <div className="relative w-full aspect-16/10 overflow-hidden border border-[#28251F]/15 bg-[#F3EBDD] flex items-center justify-center">
        {hasImageFile && imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || `${title} project interface`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center p-2 sm:p-3"
            priority={number === "01"}
          />
        ) : (
          /* Understated Editorial Placeholder when screenshot is missing */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
            {/* Crosshair registration icon */}
            <div className="w-10 h-10 border border-dashed border-[#28251F]/25 flex items-center justify-center mb-3 bg-[#F3EBDD]">
              <span className="text-xs text-[#28251F]/40 font-mono">+</span>
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#28251F]/75 font-medium">
              SCREENSHOT PENDING
            </div>
            {imageSrc && (
              <p className="mt-1 font-mono text-[9px] sm:text-[10px] text-[#79746A]/80 tracking-wider">
                {imageSrc}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { ProjectVisual };
