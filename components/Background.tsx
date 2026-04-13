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
      {/* Deep base wash — subtle vignette from center */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #0a0a0a 0%, #050505 60%, #030303 100%)",
        }}
      />

      {/* Fixed grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,241,232,0.022) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,241,232,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 120% 100% at 50% 40%, #000 0%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 100% at 50% 40%, #000 0%, #000 55%, transparent 100%)",
        }}
      />

      {/* Cursor-reactive red spotlight */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          opacity: 0,
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(239,43,45,0.1), transparent 45%)",
        }}
      />

      {/* Film grain noise */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[2] noise"
      />

      {/* Animated scanline */}
      <div className="scanline" />
    </>
  );
}
