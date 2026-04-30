import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";

export const metadata: Metadata = {
  title: "CodeNest — Launch Your Coding Career",
  description:
    "CodeNest is a programming academy offering job simulations, immersive bootcamps, and on-demand courses taught by industry professionals. Start your coding career today.",
  keywords: [
    "coding bootcamp",
    "programming academy",
    "learn to code",
    "job simulation",
    "software engineering",
    "web development",
    "career change",
    "tech education",
  ],
  authors: [{ name: "CodeNest Academy" }],
  openGraph: {
    title: "CodeNest — Launch Your Coding Career",
    description:
      "Master in-demand coding skills through job simulations, bootcamps, and on-demand courses taught by industry professionals.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNest — Launch Your Coding Career",
    description:
      "Master in-demand coding skills through job simulations, bootcamps, and on-demand courses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-bg-deep">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
