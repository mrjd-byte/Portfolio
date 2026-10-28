import React from "react";
import Image from "next/image";

export interface ProjectVisualProps {
  type: string;
  title: string;
  number: string;
  imageSrc?: string;
}

/**
 * DebateHubVisual:
 * A restrained architectural schematic wireframe representing the structured discussion hierarchy.
 * Preserved as an independent component and fallback.
 */
export function DebateHubVisual() {
  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-4 sm:p-5 font-mono select-none">
      {/* Top Technical Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#28251F]/15 text-[10px] sm:text-[11px] tracking-wider text-[#6E695F]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C69]" />
          <span>SCHEMATIC // STRUCTURED DEBATE UI</span>
        </div>
        <div>HIERARCHY: TWO-SIDED</div>
      </div>

      {/* Mock Debate Topic Banner */}
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

      {/* Two-Column Argument Layout */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Supporting Arguments (Muted Sage Accent) */}
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

        {/* Opposing Arguments (Muted Graphite Accent) */}
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

      {/* Bottom Technical Status Bar */}
      <div className="mt-3 pt-2.5 border-t border-[#28251F]/15 flex items-center justify-between text-[9px] text-[#79746A]">
        <span>INPUT: FORMAL ARGUMENT &amp; CITATION</span>
        <span className="tracking-widest">STATE: DEBATE_ACTIVE</span>
      </div>
    </div>
  );
}

/**
 * MemoryAllocatorVisual:
 * A technical notebook diagram illustrating heap memory blocks, headers, and free list links.
 * Preserved as an independent component and fallback.
 */
export function MemoryAllocatorVisual() {
  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-4 sm:p-5 font-mono select-none">
      {/* Top Technical Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#28251F]/15 text-[10px] sm:text-[11px] tracking-wider text-[#6E695F]">
        <div>FIG 02 // HEAP MEMORY BLOCK METADATA</div>
        <div>ALIGNMENT: 8-BYTE</div>
      </div>

      {/* Memory Segment Vector Diagram */}
      <div className="mt-3.5 space-y-2.5">
        {/* Block 0: Allocated */}
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

        {/* Pointer Link Indicator */}
        <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#79746A]">
          <span>↓</span>
          <span className="text-[8px] tracking-wider">meta-&gt;next (0x1058)</span>
          <span>↓</span>
        </div>

        {/* Block 1: Free Block (Candidate for Splitting) */}
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

        {/* Pointer Link Indicator */}
        <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#79746A]">
          <span>↓</span>
          <span className="text-[8px] tracking-wider">meta-&gt;next (0x10F0)</span>
          <span>↓</span>
        </div>

        {/* Block 2: Allocated */}
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

      {/* Bottom Technical Status Bar */}
      <div className="mt-3 pt-2.5 border-t border-[#28251F]/15 flex items-center justify-between text-[9px] text-[#79746A]">
        <span>ALGORITHM: FIRST-FIT SCAN</span>
        <span className="tracking-widest">COALESCING: BIDIRECTIONAL</span>
      </div>
    </div>
  );
}

/**
 * PlaceholderVisual:
 * A clean editorial blueprint placeholder with technical registration marks.
 * Preserved as an independent component and fallback.
 */
export function PlaceholderVisual() {
  return (
    <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-6 sm:p-8 font-mono select-none flex flex-col justify-between min-h-[220px]">
      {/* Top Technical Header */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-wider text-[#6E695F] pb-3 border-b border-[#28251F]/15">
        <div>FIG 03 // ARCHITECTURAL DRAFT</div>
        <div>STATUS: SCOPE DEFINITION</div>
      </div>

      {/* Central Blueprint Wireframe Cage */}
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

      {/* Bottom Technical Status Bar */}
      <div className="pt-3 border-t border-[#28251F]/15 flex items-center justify-between text-[9px] text-[#79746A]">
        <span>REGISTRATION: 03-DRAFT</span>
        <span className="tracking-widest">COORDINATES: [00, 00, 00]</span>
      </div>
    </div>
  );
}

/**
 * ProjectVisual:
 * Dispatches to an Image component if imageSrc is supplied, or the preserved technical fallback illustration.
 */
export default function ProjectVisual({
  type,
  title,
  number,
  imageSrc,
}: ProjectVisualProps) {
  // If a screenshot image is provided from public/images/projects/, render it preserving dimensions and borders
  if (imageSrc && imageSrc.trim() !== "") {
    return (
      <div className="w-full bg-[#EAE2D3]/70 border border-[#28251F]/15 p-2.5 sm:p-3 font-mono select-none">
        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#28251F]/15 text-[10px] sm:text-[11px] tracking-wider text-[#6E695F]">
          <div>FIG // {number} — {title.toUpperCase()}</div>
          <div>SCREENSHOT // CAPTURE</div>
        </div>
        {/* Image Container with Restrained Aspect Ratio & Border */}
        <div className="relative w-full aspect-16/10 overflow-hidden border border-[#28251F]/15 bg-[#F3EBDD]">
          <Image
            src={imageSrc}
            alt={`${title} project interface preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  // Fallback to the preserved editorial technical illustration
  if (type === "debatehub") {
    return <DebateHubVisual />;
  }
  if (type === "memory-allocator") {
    return <MemoryAllocatorVisual />;
  }
  return <PlaceholderVisual />;
}

export { ProjectVisual };
