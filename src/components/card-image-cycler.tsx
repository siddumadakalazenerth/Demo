import { useEffect, useRef, useState } from "react";

/**
 * Stand-in for a hover video preview (no real video hosting in this demo): on
 * hover/long-press, cycles through a few of the property's gallery photos like a
 * slideshow instead of a single static image.
 */
export function CardImageCycler({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const frames = images.slice(0, 3);

  useEffect(() => {
    if (!hovering || frames.length <= 1) return;
    timer.current = setInterval(() => setActive((v) => (v + 1) % frames.length), 700);
    return () => clearInterval(timer.current);
  }, [hovering, frames.length]);

  useEffect(() => {
    if (!hovering) setActive(0);
  }, [hovering]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={() => setHovering(true)}
      onTouchEnd={() => setHovering(false)}
      aria-label="Hover to preview more photos of this property"
    >
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          width={900}
          height={700}
          loading="lazy"
          className={`${className ?? ""} ${i === active ? "opacity-100" : "opacity-0"} ${
            i === 0 ? "" : "absolute inset-0"
          } transition-opacity duration-300`}
        />
      ))}
    </div>
  );
}
