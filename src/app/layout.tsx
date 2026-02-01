import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Rumah Dijual Bintaro — Graha Raya | Kiwi Residence",
  description:
    "Rumah dijual di Bintaro, Graha Raya (Kiwi Residence). LT 60 m², LB ± 50 m², 2 KT, 1 KM, listrik 2200W, 1 lantai + mezanine, carport 1. Furnished & SHM.",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${fraunces.variable} bg-[var(--color-bg)] text-[var(--color-text)] antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
