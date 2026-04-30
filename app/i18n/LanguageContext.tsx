"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import translations, { type Locale, type LocaleDict } from "./translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  d: LocaleDict; // shorthand: d.nav.cta, d.hero.headline1, etc.
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "es" || saved === "en" || saved === "pt")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  };

  const value: LanguageContextValue = {
    locale,
    setLocale,
    d: translations[locale],
  };

  // Prevent hydration mismatch by returning a loader or nothing on first render
  // but for SEO and generic SSR it's better to just render with default language
  // and accept potential text pop-in, or render as-is and just suppress hydration warning on root
  return (
    <LanguageContext.Provider value={value}>
      <div style={{ visibility: mounted ? "visible" : "hidden", width: "100%", height: "100%" }}>
         {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
