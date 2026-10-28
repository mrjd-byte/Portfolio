interface LinkArrowProps {
  className?: string;
}

export default function LinkArrow({ className }: LinkArrowProps) {
  return (
    <span className={className} aria-hidden="true">
      ↗
    </span>
  );
}

export { LinkArrow };
