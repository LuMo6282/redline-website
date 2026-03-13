"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mx", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--my", `${e.clientY}px`);
        spotlightRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Fixed grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Cursor-reactive spotlight on grid */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          opacity: 0,
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(220,38,38,0.06), transparent 40%)",
        }}
      />

      {/* Animated scanline */}
      <div className="scanline" />
    </>
  );
}
