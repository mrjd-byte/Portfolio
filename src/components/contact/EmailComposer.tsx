"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { LinkArrow } from "@/components/ui/LinkArrow";

export default function EmailComposer() {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{
    fromEmail?: string;
    subject?: string;
    message?: string;
    general?: string;
  }>({});

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [openedClient, setOpenedClient] = useState(false);

  const recipientEmail = siteConfig.email?.trim() || "";

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!recipientEmail) {
      newErrors.general =
        "The recipient email address is not configured in site settings.";
    }

    if (!fromEmail.trim()) {
      newErrors.fromEmail = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fromEmail.trim())) {
        newErrors.fromEmail = "Please enter a valid email address.";
      }
    }

    if (!subject.trim()) {
      newErrors.subject = "Please enter a subject line.";
    }

    if (!message.trim()) {
      newErrors.message = "Please write a message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!validate()) {
      return;
    }

    // Construct the mailto URI with prefilled fields
    const bodyContent = `From: ${fromEmail.trim()}\n\n${message.trim()}`;
    const mailtoUrl = `mailto:${encodeURIComponent(
      recipientEmail
    )}?subject=${encodeURIComponent(
      subject.trim()
    )}&body=${encodeURIComponent(bodyContent)}`;

    setOpenedClient(true);

    // Open default mail client
    window.location.href = mailtoUrl;
  };

  return (
    <div className="w-full">
      {/* Email Composer Container */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full border border-[#28251F]/20 bg-[#F3EBDD] select-none"
        aria-label="Email composer form"
      >
        <div className="divide-y divide-[#28251F]/15">
          {/* Row 1: FROM */}
          <div className="flex flex-col sm:flex-row sm:items-center px-4 sm:px-6 py-3.5 sm:py-4.5 gap-2 sm:gap-4">
            <label
              htmlFor="from-email"
              className="font-mono text-xs sm:text-[13px] tracking-wider uppercase text-[#79746A] w-20 sm:w-28 shrink-0 select-none"
            >
              FROM
            </label>
            <div className="flex-1">
              <input
                id="from-email"
                type="email"
                value={fromEmail}
                onChange={(e) => {
                  setFromEmail(e.target.value);
                  if (hasAttemptedSubmit) setErrors((prev) => ({ ...prev, fromEmail: undefined }));
                }}
                placeholder="your@email.com"
                aria-required="true"
                aria-invalid={Boolean(errors.fromEmail)}
                aria-describedby={errors.fromEmail ? "from-email-error" : undefined}
                className="w-full bg-transparent text-sm sm:text-base text-[#28251F] placeholder:text-[#79746A]/60 focus:outline-hidden font-normal"
              />
              {errors.fromEmail && (
                <p
                  id="from-email-error"
                  className="font-mono text-xs text-[#A14336] mt-1 select-none"
                  role="alert"
                >
                  {errors.fromEmail}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: TO (Read-only configured recipient) */}
          <div className="flex flex-col sm:flex-row sm:items-center px-4 sm:px-6 py-3.5 sm:py-4.5 gap-2 sm:gap-4">
            <span className="font-mono text-xs sm:text-[13px] tracking-wider uppercase text-[#79746A] w-20 sm:w-28 shrink-0 select-none">
              TO
            </span>
            <div className="flex-1 text-sm sm:text-base text-[#28251F] font-normal select-all">
              {recipientEmail || "email@example.com"}
            </div>
          </div>

          {/* Row 3: SUBJECT */}
          <div className="flex flex-col sm:flex-row sm:items-center px-4 sm:px-6 py-3.5 sm:py-4.5 gap-2 sm:gap-4">
            <label
              htmlFor="subject"
              className="font-mono text-xs sm:text-[13px] tracking-wider uppercase text-[#79746A] w-20 sm:w-28 shrink-0 select-none"
            >
              SUBJECT
            </label>
            <div className="flex-1">
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (hasAttemptedSubmit) setErrors((prev) => ({ ...prev, subject: undefined }));
                }}
                placeholder="What's on your mind?"
                aria-required="true"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className="w-full bg-transparent text-sm sm:text-base text-[#28251F] placeholder:text-[#79746A]/60 focus:outline-hidden font-normal"
              />
              {errors.subject && (
                <p
                  id="subject-error"
                  className="font-mono text-xs text-[#A14336] mt-1 select-none"
                  role="alert"
                >
                  {errors.subject}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: MESSAGE */}
          <div className="flex flex-col px-4 sm:px-6 py-4 sm:py-5">
            <label
              htmlFor="message"
              className="font-mono text-xs sm:text-[13px] tracking-wider uppercase text-[#79746A] select-none mb-2"
            >
              MESSAGE
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (hasAttemptedSubmit) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
              placeholder="Write your message here..."
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full bg-transparent text-sm sm:text-base text-[#28251F] placeholder:text-[#79746A]/60 focus:outline-hidden resize-y min-h-[140px] sm:min-h-[180px] leading-relaxed font-normal"
            />
            {errors.message && (
              <p
                id="message-error"
                className="font-mono text-xs text-[#A14336] mt-1 select-none"
                role="alert"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Row 5: Action Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-3.5 sm:py-4.5 bg-[#EAE2D3]/35">
            <div className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-[#79746A] select-none">
              PLAIN TEXT · EMAIL
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 bg-[#28251F] text-[#F3EBDD] px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-black transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#28251F]/40 cursor-pointer select-none"
            >
              <span>Send message</span>
              <LinkArrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </form>

      {/* General validation error notice if email is not configured */}
      {errors.general && (
        <div
          className="mt-4 p-3 bg-[#EAE2D3]/60 border border-[#A14336]/40 text-[#A14336] font-mono text-xs select-none"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      {/* Post-submission guidance note (Honest: does not claim email was sent) */}
      {openedClient && (
        <div className="mt-4 p-3.5 bg-[#EAE2D3]/60 border border-[#28251F]/20 text-[#555047] font-mono text-xs sm:text-[13px] leading-relaxed select-none">
          <span className="text-[#6B7C69] font-semibold">// EMAIL CLIENT OPENED: </span>
          Your email application should now be open with your prefilled message draft. Please click send in your application to complete delivery. If your client didn&apos;t open automatically, you can write directly to{" "}
          <a
            href={`mailto:${recipientEmail}`}
            className="text-[#28251F] underline underline-offset-2 hover:opacity-80"
          >
            {recipientEmail}
          </a>.
        </div>
      )}

      {/* Beneath the Composer: Social Links */}
      <div className="mt-8 sm:mt-10 font-mono text-xs sm:text-[13px] tracking-wider uppercase text-[#79746A]">
        <span>ALSO FIND ME ON </span>
        {siteConfig.githubUrl ? (
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#28251F] underline underline-offset-4 decoration-[#28251F]/40 hover:decoration-[#28251F] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
            aria-label="GitHub profile (opens in a new tab)"
          >
            GITHUB
          </a>
        ) : (
          <span className="text-[#28251F]/50">GITHUB</span>
        )}
        <span className="mx-2 select-none" aria-hidden="true">
          ·
        </span>
        {siteConfig.linkedInUrl ? (
          <a
            href={siteConfig.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#28251F] underline underline-offset-4 decoration-[#28251F]/40 hover:decoration-[#28251F] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#28251F]/40"
            aria-label="LinkedIn profile (opens in a new tab)"
          >
            LINKEDIN
          </a>
        ) : (
          <span className="text-[#28251F]/50">LINKEDIN</span>
        )}
      </div>
    </div>
  );
}
