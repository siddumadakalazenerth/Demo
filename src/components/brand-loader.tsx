/** Branded circular loader — replaces plain spinners across the app (roadmap 1.2). */
export function BrandLoader({ size = 40, label = "Loading" }: { size?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="grid place-items-center p-6">
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className="animate-spin">
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          className="text-secondary"
        />
        <path
          d="M22 4a18 18 0 0 1 18 18"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-primary"
        />
        <circle cx="22" cy="22" r="6" className="fill-accent" />
      </svg>
      <span className="sr-only">{label}…</span>
    </div>
  );
}
