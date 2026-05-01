"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import gsap from "gsap";
import HeroOrb from "./HeroOrb";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { d } = useLanguage();

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid Animation - más sutil
      gsap.to(".retro-grid", {
        backgroundPosition: "0px 40px",
        ease: "none",
        duration: 3,
        repeat: -1,
      });

      // Orb Float Animation
      gsap.to(".accent-orb", {
        y: -20,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Entrance Stagger Animation
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.fromTo(
        ".hero-stagger",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, delay: 0.2 },
      );

      tl.fromTo(
        ".accent-orb-container",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden pt-16 lg:pt-24"
      aria-label="Hero section"
    >
      {/* ── Enhanced Background con colores verdes y blancos ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient base mejorado - más luminoso */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0a1515] via-bg-deep to-bg-deep" />

        {/* Glow superior con verdes */}
        <div className="absolute -top-1/4 left-1/4 w-200 h-150 rounded-full bg-linear-to-b from-accent/15 via-accent-secondary/10 to-transparent blur-[100px] pointer-events-none" />

        {/* Glow secundario derecha */}
        <div className="absolute -top-1/3 right-0 w-150 h-100 rounded-full bg-linear-to-l from-accent-secondary/8 to-transparent blur-[120px] pointer-events-none" />

        {/* Perspective Grid mejorado */}
        <div
          className="absolute bottom-0 w-full h-[60vh] lg:h-[70vh] origin-bottom"
          style={{ perspective: "1000px" }}
        >
          <div
            className="retro-grid w-[200%] h-[150%] absolute bottom-0 left-[-50%]"
            style={{
              transform: "rotateX(75deg) translateY(50px)",
              backgroundImage:
                "linear-gradient(transparent 39px, rgba(94, 210, 156, 0.12) 40px), linear-gradient(90deg, transparent 39px, rgba(94, 210, 156, 0.12) 40px)",
              backgroundSize: "40px 40px",
              borderTop: "2px solid rgba(94, 210, 156, 0.4)",
              boxShadow:
                "0 -20px 60px rgba(94, 210, 156, 0.15), inset 0 0 80px rgba(94, 210, 156, 0.08)",
            }}
          />
          {/* Grid fade - más suave */}
          <div className="absolute inset-0 bg-linear-to-t from-bg-deep via-bg-deep/30 to-transparent" />
        </div>
    </div>

      {/* ── Main content (Two Column Layout) ── */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 items-center justify-between py-12 lg:py-0">
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col items-start justify-center flex-1 max-w-2xl w-full text-left">
          {/* Eyebrow */}
          <p className="hero-stagger text-accent-secondary font-bold tracking-widest uppercase mb-4 text-xs lg:text-sm font-display">
            {d.hero.eyebrow}
          </p>

          {/* Main headline */}
          <h1 className="hero-stagger font-black uppercase tracking-tight leading-[1.05] mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-[72px]">
            {d.hero.headline1}
            <br />
            {d.hero.headline2}
            <span className="text-accent">.</span>
          </h1>

          {/* Description */}
          <p className="hero-stagger text-white/75 leading-relaxed mb-8 lg:mb-10 max-w-xl text-sm sm:text-base lg:text-lg font-body">
            {d.hero.description}
          </p>

          {/* Registration CTA Card */}
          <div className="hero-stagger liquid-glass-card w-full max-w-md p-5 sm:p-6 rounded-2xl mb-6 lg:mb-8 flex flex-col gap-4 border border-white/5 hover:border-accent/20 transition-all duration-300">
            <div>
              <h3 className="text-white font-semibold text-lg sm:text-xl font-display leading-tight mb-1">
                Join the job simulation
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-body">
                Master real-world skills. Next cohort starting soon.
              </p>
            </div>

            <a
              href="#cta"
              className="bg-accent text-bg-deep hover:bg-accent-secondary transition-all duration-300 font-semibold px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 w-full group shadow-[0_0_20px_rgba(94,210,156,0.2)] hover:shadow-[0_0_30px_rgba(94,210,156,0.4)]"
            >
              Register Now
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* Secondary Buttons */}
          <div className="hero-stagger flex items-center justify-start gap-4 w-full">
            <a
              href="#features"
              className="text-white/60 hover:text-accent-secondary transition-colors text-xs sm:text-sm font-semibold flex items-center underline-offset-4 hover:underline"
            >
              {d.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right Column: Accent Visual */}
        <div className="accent-orb-container hidden md:flex flex-1 w-full items-center justify-center mt-12 lg:mt-0 lg:pl-8 xl:pl-16">
          <div className="relative flex items-center justify-center">
            <HeroOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
