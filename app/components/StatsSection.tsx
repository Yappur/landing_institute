"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

function AnimatedNumber({
  target,
  suffix,
  visible,
}: {
  target: string;
  suffix: string;
  visible: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const startTime = useRef<number | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!visible) return;

    // Handle non-numeric targets like "3×"
    const numericStr = target.replace(/,/g, "");
    const numeric = parseFloat(numericStr);
    if (isNaN(numeric)) {
      setDisplay(target);
      return;
    }

    const duration = 1800;
    const hasComma = target.includes(",");

    const tick = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);

      setDisplay(hasComma ? current.toLocaleString() : String(current));

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [visible, target]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { d } = useLanguage();

  const statsData = [
    {
      id: "graduates",
      number: "12,000",
      suffix: "+",
      label: d.stats.graduatesLabel,
      description: d.stats.graduatesDesc,
    },
    {
      id: "hire-rate",
      number: "94",
      suffix: "%",
      label: d.stats.hireLabel,
      description: d.stats.hireDesc,
    },
    {
      id: "salary",
      number: "3×",
      suffix: "",
      label: d.stats.salaryLabel,
      description: d.stats.salaryDesc,
    },
    {
      id: "mentors",
      number: "180",
      suffix: "+",
      label: d.stats.mentorsLabel,
      description: d.stats.mentorsDesc,
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      aria-labelledby="stats-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(94,210,156,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <h2 id="stats-heading" className="sr-only">
          {d.stats.heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <div
              key={stat.id}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, background-color 0.3s ease`,
              }}
            >
              <p className="font-black text-white leading-none mb-3 text-4xl lg:text-5xl font-display">
                <AnimatedNumber
                  target={stat.number}
                  suffix={stat.suffix}
                  visible={visible}
                />
              </p>
              <p className="text-accent font-semibold uppercase tracking-wider mb-3 text-xs font-display">
                {stat.label}
              </p>
              <p className="text-white/40 leading-relaxed text-sm font-body">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
