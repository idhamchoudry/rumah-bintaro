import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className="bg-[#0b0c10] text-[#e8e8ea] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
