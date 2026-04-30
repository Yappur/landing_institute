"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { type Locale } from "../i18n/translations";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, d } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: d.nav.projects, href: "#projects" },
    { label: d.nav.bootcamps, href: "#features" },
    { label: d.nav.about, href: "#about" },
    { label: d.nav.blog, href: "#blog" },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-[#070b0a]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="CodeNest home"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <rect width="28" height="28" rx="7" fill="#5ed29c" />
              <path
                d="M8 10L5 14L8 18"
                stroke="#070b0a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 10L23 14L20 18"
                stroke="#070b0a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8L12 20"
                stroke="#070b0a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white font-bold text-lg tracking-tight font-display">
              Code<span className="text-accent">Nest</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Globe size={16} />
              <select
                value={locale}
                onChange={handleLanguageChange}
                className="bg-transparent text-xs font-medium outline-none cursor-pointer appearance-none uppercase"
                aria-label="Select language"
              >
                <option value="es" className="text-black uppercase">ES</option>
                <option value="en" className="text-black uppercase">EN</option>
                <option value="pt" className="text-black uppercase">PT</option>
              </select>
            </div>
            
            <a href="#features" className="text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide">
              {d.nav.login}
            </a>
            <a
              href="#cta"
              className="bg-accent text-bg-deep hover:bg-accent-secondary transition-colors font-semibold px-5 py-2.5 rounded-lg text-xs"
            >
              {d.nav.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="bg-white/10 text-white text-xs font-medium outline-none cursor-pointer px-2 py-1 rounded appearance-none uppercase"
              aria-label="Select language"
            >
              <option value="es" className="text-black uppercase">ES</option>
              <option value="en" className="text-black uppercase">EN</option>
              <option value="pt" className="text-black uppercase">PT</option>
            </select>
            <button
              id="mobile-menu-toggle"
              className="p-2 rounded-lg text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#070b0a] flex flex-col items-center justify-center pt-20 pb-10 px-6 overflow-y-auto"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Logo inside mobile menu */}
          <a
            href="#"
            className="flex items-center gap-2.5 mb-12"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="7" fill="#5ed29c" />
              <path d="M8 10L5 14L8 18" stroke="#070b0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 10L23 14L20 18" stroke="#070b0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8L12 20" stroke="#070b0a" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-white font-bold text-xl font-display">
              Code<span className="text-accent">Nest</span>
            </span>
          </a>

          <nav className="flex flex-col items-center gap-8 w-full" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold tracking-widest text-white/70 hover:text-accent transition-colors font-display"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-12 flex flex-col items-center gap-6 w-full">
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors text-lg font-medium"
            >
              {d.nav.login}
            </a>
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="bg-accent text-bg-deep hover:bg-accent-secondary transition-colors font-semibold px-8 py-4 rounded-xl text-sm w-full max-w-xs text-center"
            >
              {d.nav.cta}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
