"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Stethoscope, ShoppingCart, Mail } from "lucide-react";
import { track } from "@vercel/analytics/react";

const WhatsappIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const HighwayIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 21L9 3" />
    <path d="M20 21L15 3" />
    <path d="M12 3v2" />
    <path d="M12 10v2" />
    <path d="M12 17v2" />
  </svg>
);

const DATA = {
  title: "Rumah Dijual di Graha Raya Bintaro — Kiwi Residence",
  eyebrow: "PRIVATE LISTING • BINTARO",
  locationLabel: "Graha Raya, Bintaro",
  address: "Cluster Kiwi Residence, Graha Raya, Bintaro Jaya, Tangerang Selatan",
  coords: { lat: -6.25828, lng: 106.686848 },
  priceLabel: "Rp 1,050 M",
  priceNote: "nego",
  contact: {
    name: "Idham",
    phoneIntl: "6285929867810",
    email: "cnorson@gmail.com",
  },
  heroDescription:
    "Rumah siap huni di cluster asri Kiwi Residence. Cocok untuk keluarga muda yang butuh akses cepat ke tol dan pusat kota.",
  pois: [
    {
      icon: HighwayIcon,
      label: "2 Menit ke Pintu Tol Parigi",
      sub: "Akses langsung ke JORR dan Jakarta"
    },
    {
      icon: Stethoscope,
      label: "5 Menit ke RSPI Bintaro",
      sub: "Rumah sakit internasional terdekat"
    },
    {
      icon: ShoppingCart,
      label: "10 Menit ke BXchange",
      sub: "Pusat perbelanjaan dan hiburan keluarga"
    },
  ],
  highlights: [
    { label: "Electricity", value: "2200 watt" },
    { label: "Water", value: "PDAM" },
    { label: "Certificate", value: "SHM" },
    { label: "Parking", value: "Carport 1 mobil" },
  ],
  stats: [
    { value: "2", label: "Bedrooms" },
    { value: "1+", label: "Mezzanine" },
    { value: "60m²", label: "LT" },
  ],
  images: [
    { src: "/house-1.jpeg", alt: "Tampak depan rumah dijual Bintaro", caption: "Fasad" },
    { src: "/house-2.jpeg", alt: "Living Room", caption: "Living Room" },
    { src: "/house-3.jpeg", alt: "Kitchen modern", caption: "Kitchen" },
    { src: "/house-4.jpeg", alt: "Kamar tidur utama", caption: "Kamar Utama" },
    { src: "/house-5.jpeg", alt: "Kamar tidur anak", caption: "Kamar Anak" },
    { src: "/house-6.jpeg", alt: "Kamar mandi", caption: "Kamar Mandi" },
  ],
};

export default function HouseListing() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const whatsappHref = `https://wa.me/${DATA.contact.phoneIntl}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan rumah di ${DATA.address}. Apakah masih tersedia?`
  )}`;

  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${DATA.coords.lng - 0.005
    }%2C${DATA.coords.lat - 0.005}%2C${DATA.coords.lng + 0.005}%2C${DATA.coords.lat + 0.005
    }&layer=mapnik&marker=${DATA.coords.lat}%2C${DATA.coords.lng}`;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(
    () =>
      setSelectedIndex((i) =>
        i === null ? null : (i - 1 + DATA.images.length) % DATA.images.length
      ),
    []
  );
  const showNext = useCallback(
    () =>
      setSelectedIndex((i) => (i === null ? null : (i + 1) % DATA.images.length)),
    []
  );

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

  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (selectedIndex === null) return;
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

  // Scroll Spy for Navigation Highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Don't highlight on initial load / top of page
      if (window.scrollY < 50) {
        setActiveSection(null);
        return;
      }

      const sections = ["home", "location", "gallery"];
      let current = null;
      const offset = 100; // Offset for sticky header

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (window.scrollY + offset >= top && window.scrollY + offset < top + height) {
            current = section;
          }
        }
      }

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id); // Immediate visual feedback
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Header height offset
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20 selection:bg-[var(--color-accent)] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white">
              <span className="font-serif text-lg font-bold">Kiwi</span>
            </div>
            <span className="font-serif text-lg font-semibold tracking-tight text-[var(--color-accent)]">
              Residence
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[var(--color-muted)] md:flex">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className={`transition hover:text-[var(--color-heading)] ${activeSection === 'home' ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-heading)]' : ''
                }`}
            >
              Home
            </a>
            <a
              href="#location"
              onClick={(e) => scrollToSection(e, 'location')}
              className={`transition hover:text-[var(--color-heading)] ${activeSection === 'location' ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-heading)]' : ''
                }`}
            >
              Location
            </a>
            <a
              href="#gallery"
              onClick={(e) => scrollToSection(e, 'gallery')}
              className={`transition hover:text-[var(--color-heading)] ${activeSection === 'gallery' ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-heading)]' : ''
                }`}
            >
              Gallery
            </a>
          </nav>

          {/* CTA Right */}
          <a
            href="#inquire"
            className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
          >
            Inquire Now
          </a>
        </div>
      </header >

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — 2-column with floating stats
      ═══════════════════════════════════════════════════════════════════ */}
      < section id="home" className="mx-auto max-w-7xl px-6 pb-20 pt-16" >
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]"
            >
              {DATA.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 font-serif text-[2.75rem] leading-[1.1] text-[var(--color-heading)] md:text-[3.5rem]"
            >
              Your New<br />
              <em className="font-normal italic text-[var(--color-accent)]">Modern</em><br />
              Sanctuary
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-muted)]"
            >
              {DATA.heroDescription}
            </motion.p>

            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 inline-flex flex-col items-start gap-1"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Starting Price
              </span>
              <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-3">
                <span className="text-lg font-semibold text-white">{DATA.priceLabel}</span>
                <span className="text-sm text-white/80">{DATA.priceNote}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Whatsapp")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition hover:shadow-xl"
              >
                <WhatsappIcon className="h-5 w-5" />
                Hubungi via Whatsapp
              </a>
              <a
                href={`mailto:${DATA.contact.email}?subject=${encodeURIComponent("Tanya: Rumah Dijual Bintaro — Graha Raya")}`}
                onClick={() => track("Email")}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-accent)]"
              >
                <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                Email
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — Hero Image with floating stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <Image
              src={DATA.images[0].src}
              alt={DATA.images[0].alt}
              width={700}
              height={520}
              priority
              className="h-[420px] w-full rounded-3xl object-cover shadow-2xl md:h-[480px]"
            />

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 left-6 right-6 flex justify-center gap-0 rounded-2xl border border-[var(--color-border)] bg-white/95 shadow-xl backdrop-blur-sm md:left-8 md:right-8"
            >
              {DATA.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-1 flex-col items-center py-5 ${i !== DATA.stats.length - 1 ? "border-r border-[var(--color-border)]" : ""
                    }`}
                >
                  <span className="text-2xl font-semibold text-[var(--color-heading)]">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* ═══════════════════════════════════════════════════════════════════
          DETAILS CARD — Single white card with dividers (matching reference)
      ═══════════════════════════════════════════════════════════════════ */}
      < section className="bg-[var(--color-bg)] py-12" >
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white px-8 py-8 shadow-sm"
          >
            {/* Header with decorative lines */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-muted)]">
                Details
              </span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            {/* 4-column grid with vertical dividers */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {DATA.highlights.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex flex-col px-4 py-2 ${i !== DATA.highlights.length - 1 ? "border-r border-[var(--color-border)] md:border-r" : ""
                    } ${i === 1 ? "border-r-0 md:border-r" : ""}`}
                >
                  <span className="text-sm text-[var(--color-muted)]">
                    {item.label}
                  </span>
                  <span className="mt-1 text-lg font-semibold text-[var(--color-heading)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section >

      {/* ═══════════════════════════════════════════════════════════════════
          LOCATION SECTION — 2-column with map preview
      ═══════════════════════════════════════════════════════════════════ */}
      < section id="location" className="mx-auto max-w-7xl px-6 py-20" >
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative order-2 h-full min-h-[400px] overflow-hidden rounded-3xl border border-[var(--color-border)] lg:order-1 lg:min-h-full"
          >
            {/* Clickable Overlay */}
            <a
              href={`https://www.google.com/maps?q=${DATA.coords.lat},${DATA.coords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open in Google Maps"
            />

            <iframe
              src={osmEmbed}
              title="Lokasi Rumah di Graha Raya Bintaro"
              loading="lazy"
              className="h-full w-full border-0 object-cover pointer-events-none"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm pointer-events-none">
              <p className="text-xs text-[var(--color-muted)]">View Location</p>
              <span className="text-sm font-semibold text-[var(--color-accent)]">
                Open in Google Maps →
              </span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)]">
              {DATA.locationLabel}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[var(--color-heading)] md:text-4xl">
              Unrivaled Access in<br />
              <span className="text-[var(--color-accent)]">Bintaro South</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Lokasi strategis di Graha Raya Bintaro. Akses tol dekat, lingkungan tenang, dan fasilitas lengkap dalam jangkauan.
            </p>

            {/* POIs */}
            <ul className="mt-8 space-y-4">
              {DATA.pois.map((poi) => (
                <li key={poi.label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-heading)]">
                    <poi.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      {poi.label}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">{poi.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section >

      {/* ═══════════════════════════════════════════════════════════════════
          CURATED DETAILS / GALLERY
      ═══════════════════════════════════════════════════════════════════ */}
      < section id="gallery" className="bg-[var(--color-surface-alt)] py-20" >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="font-serif text-3xl italic text-[var(--color-heading)] md:text-4xl">
              Curated Details
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
              Setiap sudut didesain untuk kenyamanan. Intip suasana rumah ini.
            </p>
          </div>

          {/* Gallery Grid — Proportional layout matching reference */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {/* Row 1 */}
            {/* Large left image - spans 2 rows */}
            <figure
              className="group cursor-pointer md:row-span-2"
              onClick={() => setSelectedIndex(1)}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl md:h-full md:aspect-auto">
                <Image
                  src={DATA.images[1].src}
                  alt={DATA.images[1].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
                {DATA.images[1].caption}
              </figcaption>
            </figure>

            {/* Top right - image 1 */}
            <figure className="group cursor-pointer" onClick={() => setSelectedIndex(2)}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={DATA.images[2].src}
                  alt={DATA.images[2].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
                {DATA.images[2].caption}
              </figcaption>
            </figure>

            {/* Top right - image 2 */}
            <figure className="group cursor-pointer" onClick={() => setSelectedIndex(3)}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={DATA.images[3].src}
                  alt={DATA.images[3].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
                {DATA.images[3].caption}
              </figcaption>
            </figure>

            {/* Row 2 */}
            {/* Bottom right - image 3 */}
            <figure className="group cursor-pointer" onClick={() => setSelectedIndex(0)}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={DATA.images[0].src}
                  alt={DATA.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
                {DATA.images[0].caption}
              </figcaption>
            </figure>

            {/* Bottom right - image 4 */}
            <figure className="group cursor-pointer" onClick={() => setSelectedIndex(4)}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={DATA.images[4].src}
                  alt={DATA.images[4].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
                {DATA.images[4].caption}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Lightbox */}
        {
          selectedIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <div
                className="relative max-h-[90vh] max-w-[92vw] animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={DATA.images[selectedIndex].src}
                  alt={DATA.images[selectedIndex].alt}
                  width={1400}
                  height={900}
                  className="max-h-[85vh] w-auto rounded-3xl object-contain"
                />
                <button
                  className="absolute -top-12 right-0 text-3xl font-bold text-white transition hover:opacity-70"
                  onClick={closeLightbox}
                  aria-label="Tutup galeri"
                >
                  ×
                </button>
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-4 py-3 text-white backdrop-blur-sm transition hover:bg-white/30"
                  aria-label="Foto sebelumnya"
                >
                  ◀
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-4 py-3 text-white backdrop-blur-sm transition hover:bg-white/30"
                  aria-label="Foto berikutnya"
                >
                  ▶
                </button>
              </div>
            </div>
          )
        }
      </section >

      {/* ═══════════════════════════════════════════════════════════════════
          DARK CTA FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      < section id="inquire" className="bg-[var(--color-accent)] py-20" >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                Get In Touch
              </p>
              <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">
                Siap lihat langsung?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                Hubungi langsung untuk jadwalkan kunjungan ke rumah di Kiwi Residence, Graha Raya Bintaro.
              </p>
            </div>

            <div className="grid gap-6 text-sm text-white/90 md:grid-cols-2">
              {/* Phone */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Phone</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("Whatsapp")}
                  className="mt-2 block font-semibold transition hover:text-white"
                >
                  +62 859-2986-7810
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Email</p>
                <a
                  href={`mailto:${DATA.contact.email}`}
                  onClick={() => track("Email")}
                  className="mt-2 block font-semibold transition hover:text-white"
                >
                  {DATA.contact.email}
                </a>
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Location</p>
                <a
                  href={`https://www.google.com/maps?q=${DATA.coords.lat},${DATA.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-semibold transition hover:text-white"
                >
                  {DATA.address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      < footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-6" >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-[var(--color-muted)] md:flex-row">
          <span>
            © {new Date().getFullYear()} {DATA.contact.name}. Rumah dijual Bintaro — Graha Raya — Kiwi Residence.
          </span>
          <span className="flex items-center gap-2">
            <span>Designed with care for modern living</span>
          </span>
        </div>
      </footer >
    </div>
  );
}
