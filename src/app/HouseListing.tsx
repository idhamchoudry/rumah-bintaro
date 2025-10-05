"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react"; // make sure lucide-react is installed
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { MapIcon } from "lucide-react";

export default function HouseListing() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const DATA = {
    title: "Rumah Dijual Bintaro — Graha Raya | Kiwi Residence",
    address: "Cluster Kiwi Residence, Graha Raya, Bintaro",
    coords: { lat: -6.258280, lng: 106.686848 },
    priceLabel: "Rp 1,1 M (Nego)",
    contact: {
      name: "Idham",
      phoneIntl: "6285929867810",
      email: "idham@example.com",
    },
    description: `Dijual cepat dan turun harga jauh di bawah pasaran.
Lokasi Cluster Kiwi Residence Graha Raya Bintaro.
`,
    pois: [
      "2 menit Pintu Tol Parigi",
      "5 menit RSPI & Fresh Market Bintaro",
      "10 menit Mall BXChane",
      "10 menit Alam Sutera",
      "15 menit BSD",
    ],
    specs: [
      { label: "Luas Tanah", value: "60 m²" },
      { label: "Luas Bangunan", value: "± 50 m²" },
      { label: "Kamar Tidur", value: "2" },
      { label: "Kamar Mandi", value: "1" },
      { label: "Listrik", value: "2200 watt" },
      { label: "Lantai", value: "1 + Mezzanine" },
      { label: "Air", value: "PDAM" },
      { label: "Carport", value: "1 mobil" },
      { label: "Sertifikat", value: "SHM" },
    ],
    images: [
      "/house-1.jpeg",
      "/house-2.jpeg",
      "/house-3.jpeg",
      "/house-4.jpeg",
      "/house-5.jpeg",
      "/house-6.jpeg",
    ],
  };

  const whatsappHref = `https://wa.me/${DATA.contact.phoneIntl}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan rumah di ${DATA.address}. Apakah masih tersedia?`
  )}`;

  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${
    DATA.coords.lng - 0.01
  }%2C${DATA.coords.lat - 0.01}%2C${DATA.coords.lng + 0.01}%2C${
    DATA.coords.lat + 0.01
  }&layer=mapnik&marker=${DATA.coords.lat}%2C${DATA.coords.lng}`;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(
    () =>
      setSelectedIndex((i) =>
        i === null ? null : (i - 1 + DATA.images.length) % DATA.images.length
      ),
    [DATA.images.length]
  );
  const showNext = useCallback(
    () =>
      setSelectedIndex((i) =>
        i === null ? null : (i + 1) % DATA.images.length
      ),
    [DATA.images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  // Touch swipe handling
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!selectedIndex && selectedIndex !== 0) return;
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) diff > 0 ? showPrev() : showNext();
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedIndex, showNext, showPrev]);

  return (
    <main>
      <div className="mx-auto max-w-[1100px] p-6 text-[var(--color-text)]">
        <div className="rounded-2xl border border-[var(--color-surface)] bg-[var(--color-surface)] shadow-[0_10px_30px_rgba(0,0,0,.25)]">

          {/* ===== Header Section ===== */}
          <div className="p-5 md:p-6">

            {/* Full-width Title */}
            <div className="mb-6">
              <span className="inline-block rounded-full border border-transparent bg-[var(--color-accent)] px-3 py-1 text-xs font-bold text-[var(--color-accent-text)]">
                Dijual Cepat
              </span>

              <h1 className="mt-2 text-[36px] md:text-[40px] font-extrabold leading-tight text-[var(--color-heading)]">
                {DATA.title}
              </h1>

              <div className="mt-1 text-2xl font-bold text-[var(--color-accent)]">
                {DATA.priceLabel}
              </div>

              <div className="mb-3 mt-1 font-bold text-[var(--color-text)]">
                {DATA.address}
              </div>

              {/* Description */}
              <p className="mb-3 whitespace-pre-line leading-relaxed">
                {DATA.description}
              </p>

              {/* Nearby POIs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {DATA.pois.map((poi) => (
                  <span
                    key={poi}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-chip)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-heading)] shadow-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-text)] transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {poi}
                  </span>
                ))}
              </div>
            </div>

            {/* Two Columns Below */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Left: Specs & Buttons */}
              <div>
                <div className="mb-3 flex flex-wrap gap-3">
                  {DATA.specs.map((f) => (
                    <div
                      key={f.label}
                      className="min-w-[180px] flex-1 rounded-xl border border-[var(--color-chip)] bg-[var(--color-chip)] p-4"
                    >
                      <b className="mb-1 block text-xs text-[var(--color-chip-text)]">
                        {f.label}
                      </b>
                      <div className="text-[var(--color-chip-text)]">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-[var(--color-cta)] px-4 py-3 font-semibold text-[var(--color-heading)]"
                    href={whatsappHref}
                    target="_blank"
                  >
                    <Phone className="w-5 h-5" />
                    Hubungi via WhatsApp
                  </a>
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-3 font-bold text-[var(--color-accent-text)]"
                    href={`mailto:${DATA.contact.email}?subject=${encodeURIComponent(
                      "Tanya: Rumah Dijual Bintaro — Graha Raya"
                    )}`}
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-3 font-bold text-[var(--color-accent-text)] hover:opacity-90 transition"
                    href={`https://www.google.com/maps?q=${DATA.coords.lat},${DATA.coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MapIcon className="w-5 h-5" />
                    Lokasi  
                </a>
                </div>
              </div>

              {/* Right: Main Image */}
              <div className="flex justify-center md:justify-end">
                <Image
                  className="rounded-xl border border-transparent max-h-[380px] w-full object-cover"
                  src={DATA.images[0]}
                  alt="Rumah dijual Bintaro Graha Raya - tampak depan"
                  width={800}
                  height={520}
                  priority
                />
              </div>
            </div>
          </div>

          {/* ===== Gallery Section ===== */}
          <div className="p-5 md:p-6">
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-heading)]">Galeri</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {DATA.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setSelectedIndex(i)}
                  className="focus:outline-none"
                  aria-label={`Lihat foto ${i + 1}`}
                >
                  <Image
                    className="h-[220px] w-full rounded-xl border border-transparent object-cover transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                    src={src}
                    alt={`Rumah dijual Bintaro Graha Raya - foto ${i + 1}`}
                    width={600}
                    height={420}
                  />
                </button>
              ))}
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={closeLightbox}
              >
                <div
                  className="relative max-h-[90vh] max-w-[90vw] animate-scaleIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={DATA.images[selectedIndex]}
                    alt="Preview"
                    width={1200}
                    height={800}
                    className="max-h-[90vh] w-auto rounded-2xl object-contain"
                  />
                  {/* Close */}
                  <button
                    className="absolute -top-10 right-0 text-3xl font-bold text-white"
                    onClick={closeLightbox}
                  >
                    ×
                  </button>

                  {/* Arrows */}
                  <button
                    onClick={showPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
                  >
                    ◀
                  </button>
                  <button
                    onClick={showNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===== Map Section ===== */}
          <div id="map" className="overflow-hidden rounded-b-2xl">
            <iframe
              className="h-[420px] w-full border-0"
              title="Peta Lokasi"
              loading="lazy"
              src={osmEmbed}
            />
          </div>
        </div>

        {/* ===== Footer ===== */}
        <div className="py-8 text-center text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {DATA.contact.name}. Target kata kunci:
          Rumah dijual Bintaro, Rumah dijual Graha Raya, Rumah Bintaro, Graha Raya.
        </div>
      </div>
    </main>
  );
}
