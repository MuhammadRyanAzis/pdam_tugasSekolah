"use client";

import { Droplet, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const quickLinks = [
  { label: "Beranda",         href: "#home" },
  { label: "Layanan",     href: "#services" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Tentang Kami",     href: "#about" },
];

const supportLinks = [
  { label: "Pusat Bantuan",      href: "#" },
  { label: "Status Layanan",   href: "#" },
  { label: "Hubungi Kami",       href: "#" },
  { label: "Syarat dan Ketentuan", href: "#" },
  { label: "Kebijakan Privasi",   href: "#" },
];

const contacts = [
  { icon: MapPin, value: "Jl. Sumber Air No. 1, Malang, East Java" },
  { icon: Phone,  value: "(0341) 123-4567" },
  { icon: Mail,   value: "info@pdambaru.id" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon,  label: "Facebook" },
  { icon: XIcon,         label: "X" },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#4ade80]/10">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8] to-[#4ade80] opacity-50" />

      {/* Orbs */}
      <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-150px] left-[-100px] bg-[#38bdf8]/[0.07] blur-[90px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full top-[-80px] right-[-80px] bg-[#4ade80]/[0.05] blur-[80px] pointer-events-none" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto pt-[72px] pb-10 px-6 md:px-12">

        {/* ── Main Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14 lg:gap-[48px]"
        >

          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 mb-5 group"
            >
              <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center bg-[#38bdf8]/10 border border-[#38bdf8]/25 shadow-[0_0_16px_rgba(56,189,248,0.18)] transition-transform group-hover:scale-105">
                <Droplet size={18} className="text-[#38bdf8] drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              </div>
              <span className="text-lg font-black text-[#38bdf8] tracking-[-0.02em] drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                PDAM Baru
              </span>
            </button>

            <p className="text-[13px] leading-[1.75] text-white/40 max-w-[240px] m-0 mb-6">
              Memodernisasi manajemen air untuk masa depan yang berkelanjutan. Air yang andal, bersih, dan mudah diakses untuk semua.
            </p>

            {/* Social buttons */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  title={label}
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[#4ade80]/5 border border-[#4ade80]/20 text-[#4ade80] cursor-pointer transition-all duration-200 hover:bg-[#4ade80]/[0.12] hover:border-[#4ade80]/45 hover:shadow-[0_0_12px_rgba(74,222,128,0.2)] hover:-translate-y-0.5"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 className="text-[11px] font-bold text-[#4ade80] uppercase tracking-[0.12em] m-0 mb-5">
              Jelajahi
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="bg-transparent border-none cursor-pointer p-0 text-[13px] text-white/45 transition-all duration-200 text-left flex items-center gap-1.5 hover:text-[#38bdf8] hover:translate-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#38bdf8]/50 shrink-0 transition-colors" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Support ── */}
          <div>
            <h3 className="text-[11px] font-bold text-[#4ade80] uppercase tracking-[0.12em] m-0 mb-5">
              Dukungan
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] text-white/45 no-underline transition-all duration-200 flex items-center gap-1.5 hover:text-[#38bdf8] hover:translate-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#38bdf8]/50 shrink-0 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h3 className="text-[11px] font-bold text-[#4ade80] uppercase tracking-[0.12em] m-0 mb-5">
              Kontak
            </h3>

            <div className="flex flex-col gap-3.5">
              {contacts.map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-start gap-3">
                  <div className="w-[30px] h-[30px] rounded-lg shrink-0 flex items-center justify-center bg-[#38bdf8]/[0.07] border border-[#38bdf8]/[0.18] mt-px">
                    <Icon size={13} className="text-[#38bdf8]" />
                  </div>
                  <span className="text-[13px] leading-[1.6] text-white/45">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link href="/sign-up" className="no-underline inline-block">
                <button
                  className="px-5 py-2.5 rounded-[10px] bg-[#38bdf8] text-[#0a0f1e] text-[13px] font-bold border-none cursor-pointer shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-all duration-200 hover:shadow-[0_0_28px_rgba(56,189,248,0.65)] hover:scale-105"
                >
                  Mulai Sekarang →
                </button>
              </Link>
            </div>
          </div>

        </motion.div>

        {/* ── Divider ── */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#4ade80]/15 to-[#38bdf8]/15 mb-7 opacity-50" />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-between items-center flex-col sm:flex-row flex-wrap gap-4"
        >
          <p className="text-xs text-white/25 m-0 text-center sm:text-left">
            © {currentYear}{" "}
            <span className="text-[#38bdf8] font-bold">PDAM Baru</span>
            . Hak cipta dilindungi.
          </p>

          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4ade80]/[0.06] border border-[#4ade80]/[0.18]">
            <div className="w-[7px] h-[7px] rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#4ade80]">
              Semua sistem operasional
            </span>
          </div>

          <p className="text-xs text-white/20 m-0 text-center sm:text-left">
            Didesain dengan{" "}
            <span className="text-[#ef4444]">♥</span>
            {" "}untuk sistem air yang lebih baik.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}