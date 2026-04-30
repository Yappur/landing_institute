"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

function FeatureCard({
  feature,
  index,
}: {
  feature: {
    tag: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    metrics: { label: string; value: string }[];
    accent: boolean;
  };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
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
    <div
      ref={cardRef}
      className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      {/* Tag + icon row */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-white/20 font-mono text-xs tracking-widest font-body">
          {feature.tag}
        </span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5">
          {feature.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className={`font-bold mb-1 text-2xl font-display ${feature.accent ? "text-accent" : "text-white"}`}>
        {feature.title}
      </h3>
      <p className="text-white/40 mb-4 text-xs font-body">
        {feature.subtitle}
      </p>

      {/* Description */}
      <p className="text-white/60 leading-relaxed mb-8 text-sm font-body">
        {feature.description}
      </p>

      {/* Metrics */}
      <div className="flex gap-6 pt-6 border-t border-white/10">
        {feature.metrics.map((m) => (
          <div key={m.label}>
            <p className="font-black text-white mb-0.5 text-xl font-display">
              {m.value}
            </p>
            <p className="text-white/35 uppercase tracking-wider text-[10px] font-body">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { d } = useLanguage();

  const featuresData = [
    {
      id: "simulations",
      tag: "01",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2" stroke="#5ed29c" strokeWidth="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        </svg>
      ),
      title: d.features.sim.title,
      subtitle: d.features.sim.subtitle,
      description: d.features.sim.description,
      metrics: [
        { label: d.features.sim.metric1Label, value: "240+" },
        { label: d.features.sim.metric2Label, value: "60+" },
      ],
      accent: true,
    },
    {
      id: "bootcamps",
      tag: "02",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      title: d.features.boot.title,
      subtitle: d.features.boot.subtitle,
      description: d.features.boot.description,
      metrics: [
        { label: d.features.boot.metric1Label, value: "12" },
        { label: d.features.boot.metric2Label, value: "8" },
      ],
      accent: false,
    },
    {
      id: "courses",
      tag: "03",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <path d="M12 7V12L15 15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: d.features.courses.title,
      subtitle: d.features.courses.subtitle,
      description: d.features.courses.description,
      metrics: [
        { label: d.features.courses.metric1Label, value: "1,800+" },
        { label: d.features.courses.metric2Label, value: "300+" },
      ],
      accent: false,
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 lg:py-32"
      aria-labelledby="features-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-accent font-bold uppercase tracking-widest mb-4 text-xs font-display">
              {d.features.eyebrow}
            </p>
            <h2
              id="features-heading"
              className="font-black uppercase text-white leading-none tracking-tight text-4xl md:text-5xl lg:text-6xl font-body"
            >
              {d.features.headline1}
              <br />
              {d.features.headline2}{" "}
              <span className="font-serif italic text-accent font-normal text-4xl md:text-5xl lg:text-6xl">
                {d.features.headlineItalic}
              </span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm leading-relaxed text-sm font-body">
            {d.features.description}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
