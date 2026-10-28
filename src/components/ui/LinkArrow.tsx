interface LinkArrowProps {
  className?: string;
}

export default function LinkArrow({ className = "w-3.5 h-3.5" }: LinkArrowProps) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="2.5" y1="11.5" x2="11.5" y2="2.5" />
      <polyline points="4.5 2.5 11.5 2.5 11.5 9.5" />
    </svg>
  );
}

export { LinkArrow };
