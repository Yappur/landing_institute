"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { d } = useLanguage();

  const footerLinks = {
    [d.footer.programs]: [
      { label: d.footer.jobSims, href: "#" },
      { label: d.footer.bootcamps, href: "#" },
      { label: d.footer.onDemand, href: "#" },
      { label: d.footer.careerServices, href: "#" },
    ],
    [d.footer.company]: [
      { label: d.footer.about, href: "#" },
      { label: d.footer.blog, href: "#" },
      { label: d.footer.careers, href: "#" },
      { label: d.footer.press, href: "#" },
    ],
    [d.footer.resources]: [
      { label: d.footer.docs, href: "#" },
      { label: d.footer.community, href: "#" },
      { label: d.footer.newsletter, href: "#" },
      { label: d.footer.roadmaps, href: "#" },
    ],
  };

  return (
    <footer
      className="relative border-t border-white/5 pt-20 pb-10 mt-auto"
      aria-label="Site footer"
    >
      {/* Ambient top line glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-[500px] h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(94,210,156,0.25), transparent)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-6 group" aria-label="CodeNest home">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
                <rect width="28" height="28" rx="7" fill="#5ed29c" />
                <path d="M8 10L5 14L8 18" stroke="#070b0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 10L23 14L20 18" stroke="#070b0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 8L12 20" stroke="#070b0a" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-white font-bold text-lg tracking-tight font-display">
                Code<span className="text-accent">Nest</span>
              </span>
            </a>

            <p className="text-white/40 leading-relaxed mb-8 max-w-xs text-sm font-body">
              {d.footer.tagline}
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-white/60 mb-3 text-xs font-semibold font-display">
                {d.footer.newsletterLabel}
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  placeholder={d.footer.newsletterPlaceholder}
                  className="flex-1 px-4 py-2.5 rounded-xl text-white bg-white/5 border border-white/10 focus:border-accent/40 focus:outline-none transition-colors text-sm font-body"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  id="newsletter-submit"
                  className="bg-accent text-bg-deep hover:bg-accent-secondary transition-colors font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-white/30 uppercase tracking-widest mb-5 text-[10px] font-display">
                {category}
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-accent transition-colors duration-200 text-sm font-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/30 text-xs font-body">
            © {new Date().getFullYear()} {d.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            {[d.footer.privacy, d.footer.terms, d.footer.cookies].map((label) => (
              <a
                key={label}
                href="#"
                className="text-white/30 hover:text-white/60 transition-colors text-xs font-body"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
