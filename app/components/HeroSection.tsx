"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { d } = useLanguage();

  useEffect(() => {
    const src = "https://player.mux.com/01pO2mGYcHTPtzU34xdvZNRHVgWDSJAW2jvTZ158gE6A";

    if (typeof window === "undefined") return;

    const setupVideo = async () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari / native HLS
        video.src = src;
        video.play().catch(() => {});
        return;
      }

      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: false });
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
        }
      } catch {
        // hls.js unavailable — silently fallback
      }
    };

    setupVideo();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background video ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden="true"
      />

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,11,10,0.8) 0%, rgba(7,11,10,0.4) 40%, #070b0a 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Vertical grid lines (desktop) ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        <div className="grid-line" style={{ left: "25%" }} />
        <div className="grid-line" style={{ left: "50%" }} />
        <div className="grid-line" style={{ left: "75%" }} />
      </div>

      {/* ── Central glow ellipse ── */}
      <div
        className="absolute pointer-events-none animate-pulse-glow"
        style={{ top: "-60px", left: "50%", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <svg
          width="900"
          height="180"
          viewBox="0 0 900 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
            </filter>
          </defs>
          <ellipse
            cx="450"
            cy="90"
            rx="420"
            ry="55"
            fill="url(#glow-gradient)"
            filter="url(#glow-blur)"
          />
          <defs>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d2e25" stopOpacity="0" />
              <stop offset="30%" stopColor="#5ed29c" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#1de9b6" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#5ed29c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0d2e25" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 items-center justify-center text-center">
        
       

        <div className="flex flex-col items-center justify-center flex-1 max-w-4xl mx-auto w-full">
          {/* Eyebrow */}
          <p className="text-accent font-bold tracking-widest uppercase mb-6 animate-fade-in-up text-xs lg:text-sm font-display opacity-0 [animation-delay:100ms]">
            {d.hero.eyebrow}
          </p>

          {/* Main headline */}
          <h1 className="font-black uppercase tracking-tight leading-none mb-8 animate-fade-in-up text-5xl md:text-7xl lg:text-[80px] opacity-0 [animation-delay:200ms]">
            {d.hero.headline1}
            <br />
            {d.hero.headline2}<span className="text-accent">.</span>
          </h1>

          {/* Description */}
          <p className="text-white/70 leading-relaxed mb-12 max-w-2xl text-base md:text-lg animate-fade-in-up opacity-0 [animation-delay:350ms]">
            {d.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 [animation-delay:500ms] w-full sm:w-auto">
            <a
              href="#cta"
              className="bg-accent text-bg-deep hover:bg-accent-secondary transition-colors font-semibold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {d.hero.ctaPrimary}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#features"
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-semibold px-8 py-4 rounded-xl text-sm flex items-center justify-center w-full sm:w-auto"
            >
              {d.hero.ctaSecondary}
            </a>
          </div>
          
        </div>

        

        {/* Bottom stat strip */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20 pt-16 border-t border-white/10 w-full animate-fade-in-up opacity-0 [animation-delay:650ms]">
          {[
            { number: "12K+", label: d.hero.statGraduates },
            { number: "94%", label: d.hero.statHireRate },
            { number: "3×", label: d.hero.statSalary },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center gap-2">
              <span className="font-black text-white text-4xl font-display">
                {stat.number}
              </span>
              <span className="text-white/40 uppercase tracking-widest text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div> */}
      </div>

  

       <div
          className="liquid-glass-card animate-float mb-12 flex flex-col justify-center p-5 max-w-xs text-left self-center lg:absolute lg:left-12 lg:top-1/3"
          aria-label="Featured highlight"
        >

          <span className="inline-block text-white/50 tracking-widest text-sm font-display mb-2">
            {d.hero.cardYear}
          </span>


          <div className="flex-1 flex flex-col justify-center gap-1">
            <p className="text-white font-semibold leading-snug text-lg font-display">
              {d.hero.cardTitle1}{" "}
              <span className="font-serif italic text-accent text-xl">
                {d.hero.cardItalic}
              </span>{" "}
              {d.hero.cardTitle2}
            </p>
          </div>

     
          <p className="text-white/45 leading-relaxed text-xs mt-2">
            {d.hero.cardDesc}
          </p>
        </div>
    </section>
  );
}
