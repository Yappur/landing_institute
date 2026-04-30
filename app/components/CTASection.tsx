"use client";

import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { d } = useLanguage();

  const tracks = [
    {
      id: "fullstack",
      label: d.cta.trackFullstack,
      duration: "12 weeks",
      mode: d.cta.modeBootcamp,
      level: d.cta.levelBeginner,
      color: "#5ed29c",
    },
    {
      id: "aiml",
      label: d.cta.trackAiml,
      duration: "16 weeks",
      mode: d.cta.modeBootcamp,
      level: d.cta.levelMidSenior,
      color: "#1de9b6",
    },
    {
      id: "systems",
      label: d.cta.trackSystems,
      duration: "Self-paced",
      mode: d.cta.modeOndemand,
      level: d.cta.levelMidSenior,
      color: "#5ed29c",
    },
    {
      id: "sim-eng",
      label: d.cta.trackSim,
      duration: "4 weeks",
      mode: d.cta.modeSim,
      level: d.cta.levelAll,
      color: "#1de9b6",
    },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(94,210,156,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Decorative top border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-[800px] h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(94,210,156,0.35), transparent)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: headline + CTA */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <p className="text-accent font-bold uppercase tracking-widest mb-5 text-xs font-display">
              {d.cta.eyebrow}
            </p>
            <h2
              id="cta-heading"
              className="font-black uppercase text-white leading-none tracking-tight mb-6 text-4xl md:text-5xl lg:text-6xl font-body"
            >
              {d.cta.headline1}
              <br />
              {d.cta.headline2}
              <br />
              {d.cta.headline3} <span className="text-accent">{d.cta.headlineAccent}</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-10 max-w-md text-base font-body">
              {d.cta.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#"
                id="cta-primary-button"
                className="bg-accent text-bg-deep hover:bg-accent-secondary transition-colors font-semibold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                {d.cta.primary}
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a
                href="#features"
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-semibold px-8 py-4 rounded-xl text-sm flex items-center justify-center"
              >
                {d.cta.secondary}
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {["PN", "MW", "YT", "SO"].map((initials) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-[#070b0a] flex items-center justify-center font-bold text-[9px] text-[#070b0a] font-display"
                    style={{
                      background: "linear-gradient(135deg, #5ed29c, #1de9b6)",
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs font-body">
                {d.cta.socialProofPrefix}{" "}
                <span className="text-white/70 font-semibold">{d.cta.socialProofCount}</span>{" "}
                {d.cta.socialProofSuffix}
              </p>
            </div>
          </div>

          {/* Right: track list */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {tracks.map((track, i) => (
              <a
                key={track.id}
                href="#"
                id={`cta-track-${track.id}`}
                className="group flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.6s ease ${i * 0.1 + 0.3}s, transform 0.6s ease ${i * 0.1 + 0.3}s, border-color 0.3s ease, background 0.3s ease`,
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Color dot */}
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: track.color }}
                  />
                  <div>
                    <p className="text-white font-semibold group-hover:text-accent transition-colors duration-200 text-sm md:text-base font-display">
                      {track.label}
                    </p>
                    <p className="text-white/40 text-xs font-body mt-0.5">
                      {track.mode} · {track.level}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs font-body">
                    {track.duration}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
