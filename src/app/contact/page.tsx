import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import EmailComposer from "@/components/contact/EmailComposer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.displayName}`,
  description:
    "Have a project in mind, a question, or just want to talk engineering? My inbox is open.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#28251F] flex flex-col justify-between selection:bg-[#28251F] selection:text-[#F3EBDD]">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex-1 flex flex-col">
        {/* Existing shared site header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 pt-10 sm:pt-14 pb-12 sm:pb-16">
          {/* Small Monospace Label */}
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#6E695F] mb-4 sm:mb-6 select-none">
            03 / CONNECT
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#28251F] leading-[1.08]">
            Write me a note.
          </h1>

          {/* Supporting Text */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#555047] leading-relaxed max-w-2xl font-normal">
            Have a project in mind, a question, or just want to talk engineering?
            My inbox is open.
          </p>

          {/* Email Composer Interface */}
          <div className="mt-8 sm:mt-10">
            <EmailComposer />
          </div>

          {/* Bottom Back Navigation */}
          <div className="pt-8 sm:pt-10 border-t border-[#28251F]/15 flex items-center justify-between text-xs sm:text-sm">
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
          </div>
        </main>

        {/* Existing shared footer */}
        <Footer />
      </div>
    </div>
  );
}
