import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const SEEN_KEY = "zenrth:introSeen";

/** First-load animated brand entry (roadmap 1.1) — plays once, skippable, cached via localStorage. */
export function BrandIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(SEEN_KEY)) return;
    setVisible(true);
    const timer = setTimeout(dismiss, 1400);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    window.localStorage.setItem(SEEN_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid cursor-pointer place-items-center bg-background transition-opacity duration-300"
      onClick={dismiss}
      role="button"
      aria-label="Skip intro"
    >
      <div className="flex flex-col items-center gap-3 animate-fade-in">
        <img
          src={logo}
          alt="Zenrth"
          width={88}
          height={88}
          className="size-20 rounded-full object-cover"
        />
        <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Zenrth
        </span>
        <span className="h-0.5 w-16 animate-[scale-in_1s_ease-out_forwards] rounded-full bg-primary" />
        <span className="text-xs text-muted-foreground">Find your next home in India</span>
      </div>
    </div>
  );
}
