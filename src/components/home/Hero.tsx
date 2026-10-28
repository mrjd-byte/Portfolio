import { HeroIllustration } from "@/components/home/HeroIllustration";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-10 sm:pt-14 pb-14 sm:pb-16 lg:pb-20">
        {/* Left Column (55-60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Monospace Topic Label */}
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#6E695F] mb-6 sm:mb-8 select-none">
            COMPUTER SCIENCE · AI &amp; ML · SYSTEM DESIGN
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
