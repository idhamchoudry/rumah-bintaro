import type { Metadata } from "next";
import HouseListing from "./HouseListing";
export const metadata: Metadata = {
  title:
    "Rumah Dijual Bintaro – Graha Raya (Kiwi Residence) | Turun Harga di Bawah Pasaran",
  description:
    "Rumah dijual cepat di Bintaro/Graha Raya. 2 KT, 1 KM, SHM, furnished. Dekat tol Parigi, RSPI, Fresh Market, BXchange, Alam Sutera, BSD.",
  keywords: [
    "Rumah dijual Bintaro",
    "Rumah dijual Graha Raya",
    "Rumah Bintaro",
    "Graha Raya",
    "Kiwi Residence",
    "Rumah dijual Tangerang Selatan",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title:
      "Rumah Dijual Bintaro – Graha Raya (Kiwi Residence) | Turun Harga di Bawah Pasaran",
    description:
      "Rumah dijual cepat di Bintaro/Graha Raya. 2 KT, 1 KM, SHM, furnished. Akses tol, RSPI, BXchange, Alam Sutera, BSD.",
    images: [{ url: "/house-1.jpeg", width: 1200, height: 630 }],
    locale: "id_ID",
    siteName: "Rumah Dijual Bintaro — Graha Raya",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Rumah Dijual Bintaro – Graha Raya (Kiwi Residence) | Turun Harga di Bawah Pasaran",
    description:
      "Rumah dijual cepat di Bintaro/Graha Raya. 2 KT, 1 KM, SHM, semi furnished.",
    images: ["/house-1.jpeg",],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <HouseListing />;
}
