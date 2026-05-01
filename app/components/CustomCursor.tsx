"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Make the cursor visible on mount if it's a fine pointer
    gsap.set(cursor, { opacity: 1 });

    const onMouseMove = (e: MouseEvent) => {
      // Use gsap ticker or to for smooth trailing
      // Animate transform only
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9999] opacity-0"
      style={{
        background: "radial-gradient(circle, rgba(94, 210, 156, 0.15) 0%, rgba(94, 210, 156, 0) 70%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen"
      }}
      aria-hidden="true"
    />
  );
}
