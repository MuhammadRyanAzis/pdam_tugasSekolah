"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const timeline = [
  { year: "1985", title: "Didirikan di Malang",       desc: "Mulai melayani 200 rumah tangga di distrik inti." },
  { year: "2005", title: "Ekspansi Regional",      desc: "Memperluas jaringan pipa di 5 kecamatan." },
  { year: "2020", title: "Peluncuran Platform Digital", desc: "Meluncurkan portal penagihan dan pelanggan online." },
];

const contacts = [
  { icon: Phone,  label: "Telepon",   value: "(0341) 123-4567" },
  { icon: Mail,   label: "Email",   value: "info@pdambaru.id" },
  { icon: MapPin, label: "Alamat", value: "Jl. Sumber Air No. 1, Malang" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon,  label: "Facebook" },
  { icon: XIcon,         label: "X / Twitter" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#4ade80] m-0 mb-2.5">
            Kenali kami lebih dekat
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black leading-[1.1] text-[#38bdf8] m-0 mb-3 drop-shadow-[0_0_24px_rgba(56,189,248,0.28)]">
            Tentang Kami
          </h2>
          <p className="text-[15px] text-white/45 m-0">
            Puluhan tahun dedikasi untuk air bersih bagi semua.
          </p>
        </motion.div>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: History + Timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-[#4ade80] m-0 mb-3.5">
              Sejarah Kami
            </h3>

            <p className="text-sm leading-[1.8] text-white/50 m-0 mb-9">
              PDAM Baru didirikan dengan satu misi: memastikan setiap
              rumah tangga memiliki akses ke air bersih dan aman. Selama beberapa dekade
              kami telah berkembang dari utilitas lokal kecil menjadi institusi layanan publik
              tepercaya yang melayani ribuan pelanggan di seluruh wilayah.
            </p>

            {/* Timeline */}
            <div className="flex flex-col">
              {timeline.map(({ year, title, desc }, i) => (
                <div key={year} className={`flex gap-4 md:gap-5 relative ${i < timeline.length - 1 ? "pb-7" : ""}`}>
                  
                  {/* Vertical connector line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-0 w-[1px] bg-gradient-to-b from-[#4ade80]/30 to-[#4ade80]/5" />
                  )}

                  {/* Year dot */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#4ade80]/[0.07] border border-[#4ade80]/35 shadow-[0_0_12px_rgba(74,222,128,0.1)] text-[10px] font-black text-[#4ade80] tracking-[0.04em]">
                    {year.slice(2)}
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <div className="flex flex-wrap items-center gap-2 md:gap-2.5 mb-1">
                      <p className="text-sm font-bold text-white/90 m-0">
                        {title}
                      </p>
                      <span className="text-[10px] font-bold text-[#4ade80] bg-[#4ade80]/[0.08] border border-[#4ade80]/20 px-2 py-0.5 rounded-full tracking-[0.06em]">
                        {year}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.65] text-white/40 m-0">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Contact + Socials ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >

            {/* Contact card */}
            <div className="rounded-[20px] border border-[#4ade80]/20 bg-white/[0.025] overflow-hidden relative">
              {/* Top accent */}
              <div className="h-[2px] bg-gradient-to-r from-[#4ade80] via-[#38bdf8]/50 to-transparent" />

              <div className="py-2">
                {contacts.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3.5 px-6 py-3.5 transition-colors duration-200 hover:bg-white/[0.03] ${
                      i < contacts.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-[#38bdf8]/[0.08] border border-[#38bdf8]/20">
                      <Icon size={15} className="text-[#38bdf8]" />
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-[10px] font-semibold text-white/30 m-0 mb-1 uppercase tracking-[0.08em]">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-white/85 m-0">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials card */}
            <div className="rounded-[20px] border border-[#4ade80]/20 bg-white/[0.02] p-6 relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-[#4ade80]/40 to-transparent" />

              <h3 className="text-[13px] font-bold text-[#4ade80] m-0 mb-4 uppercase tracking-[0.1em]">
                Ikuti Kami
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                {socials.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#4ade80]/30 text-[#4ade80] bg-[#4ade80]/[0.04] text-xs font-semibold cursor-pointer transition-all duration-250 hover:bg-[#4ade80]/10 hover:border-[#4ade80]/50 hover:shadow-[0_0_14px_rgba(74,222,128,0.2)] hover:-translate-y-0.5"
                  >
                    <Icon />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Office hours card */}
            <div className="rounded-[20px] border border-[#38bdf8]/20 bg-[#38bdf8]/[0.025] p-5 md:px-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {/* Pulse indicator */}
                <div className="relative shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80] animate-pulse" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white/85 m-0 mb-0.5">
                    Layanan Pelanggan Buka
                  </p>
                  <p className="text-xs text-white/40 m-0">
                    Senin – Sabtu · 08:00 – 17:00 WIB
                  </p>
                </div>
              </div>
              <div className="sm:ml-auto self-start sm:self-auto text-[11px] font-bold text-[#4ade80] bg-[#4ade80]/[0.08] border border-[#4ade80]/25 px-3 py-1 rounded-full">
                Online
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}