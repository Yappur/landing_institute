"use client";

import { useLanguage } from "../i18n/LanguageContext";

const logos = [
  { name: "Google", width: 80 },
  { name: "Meta", width: 64 },
  { name: "Stripe", width: 72 },
  { name: "Vercel", width: 80 },
  { name: "Linear", width: 72 },
  { name: "Figma", width: 60 },
  { name: "GitHub", width: 76 },
  { name: "Notion", width: 72 },
];

function LogoSVG({ name }: { name: string }) {
  // Minimalist wordmark-style logos using text SVG
  return (
    <svg
      viewBox="0 0 120 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-7"
      aria-label={name}
      role="img"
    >
      <text
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="20"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        {name}
      </text>
    </svg>
  );
}

export default function TrustBar() {
  const { d } = useLanguage();

  return (
    <section
      id="trust"
      className="relative py-14 overflow-hidden"
      aria-label="Trusted by graduates from top companies"
    >
      <div className="w-full h-px bg-white/5 mb-10" />

      <p className="text-center text-white/30 uppercase tracking-widest mb-10 text-[10px] font-display">
        {d.trust.label}
      </p>

      {/* Marquee */}
      <div
        className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_12%,black_88%,transparent_100%)]"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center mx-10 opacity-40 hover:opacity-70 transition-opacity duration-300 min-w-[120px]"
            >
              <LogoSVG name={logo.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-white/5 mt-10" />
    </section>
  );
}
