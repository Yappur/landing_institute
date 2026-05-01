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

  // Prevent hydration mismatch by using mounted state
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          locale: "es",
          setLocale: () => {},
          d: translations.es,
        }}
      >
        <div suppressHydrationWarning>{children}</div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
