"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Droplet } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY < 300) setActiveTab("home");
      else if (window.scrollY < 1200) setActiveTab("services");
      else if (window.scrollY < 2000) setActiveTab("testimonials");
      else setActiveTab("about");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const scrollToSection = (targetId: string) => {
    setDrawerOpen(false);
    setActiveTab(targetId);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }, 50);
  };

  const navLinks = [
    { id: "home",         label: "Beranda" },
    { id: "services",     label: "Layanan" },
    { id: "testimonials", label: "Testimoni" },
    { id: "about",        label: "Tentang" },
  ];

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-[#4ade80]/15 shadow-[0_2px_32px_rgba(56,189,248,0.07)]" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="h-[68px] flex items-center justify-between px-4 md:px-12 max-w-[1280px] mx-auto w-full">

          {/* ── Left: Hamburger + Logo ── */}
          <div className="flex items-center gap-3">
            {/* Hamburger (Mobile Only) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/65 transition-all hover:text-[#38bdf8] hover:border-[#38bdf8]/30 hover:bg-[#38bdf8]/10 shrink-0"
            >
              <Menu size={18} />
            </button>

            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 group"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center bg-[#38bdf8]/10 border border-[#38bdf8]/25 shadow-[0_0_14px_rgba(56,189,248,0.18)] group-hover:scale-105 transition-transform">
                <Droplet size={18} className="text-[#38bdf8] drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              </div>
              <span className="text-base md:text-[17px] font-black text-[#38bdf8] tracking-[-0.02em] drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                PDAM Baru
              </span>
            </button>
          </div>

          {/* ── Center: Nav Pills (Desktop Only) ── */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                    isActive 
                      ? "border border-[#38bdf8]/25 bg-[#38bdf8]/10 text-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.12)]" 
                      : "border-transparent text-white/50 hover:bg-white/5 hover:text-white/85"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ── Right: Auth Buttons (Desktop Only) ── */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link href="/sign-in" className="no-underline">
              <button className="px-5 py-2 rounded-xl bg-transparent border border-white/10 text-white/65 text-[13px] font-semibold transition-all hover:text-[#38bdf8] hover:border-[#38bdf8]/30 hover:bg-[#38bdf8]/10">
                Masuk
              </button>
            </Link>
            <Link href="/sign-up" className="no-underline">
              <button className="px-5 py-2 rounded-xl bg-[#38bdf8] text-[#0a0f1e] text-[13px] font-bold border-none transition-all shadow-[0_0_18px_rgba(56,189,248,0.4)] hover:shadow-[0_0_28px_rgba(56,189,248,0.7)] hover:scale-105">
                Daftar
              </button>
            </Link>
          </div>

        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-[1001] bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Left Drawer ── */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-screen w-[300px] z-[1002] flex flex-col bg-[#0a0f1e] border-r border-[#38bdf8]/15 shadow-[6px_0_48px_rgba(56,189,248,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top accent gradient */}
        <div className="h-[2px] shrink-0 bg-gradient-to-r from-[#38bdf8] via-[#4ade80] to-transparent" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 px-6 shrink-0 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-xl flex items-center justify-center bg-[#38bdf8]/10 border border-[#38bdf8]/25">
              <Droplet size={17} className="text-[#38bdf8] drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
            </div>
            <span className="text-base font-black text-[#38bdf8] tracking-[-0.02em]">
              PDAM Baru
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/45 transition-all hover:text-[#38bdf8] hover:border-[#38bdf8]/30 hover:bg-[#38bdf8]/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation label */}
        <div className="pt-5 px-6 pb-2 shrink-0">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.14em] m-0">
            Navigasi
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-1 overflow-y-auto">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-3 w-full p-3 mb-1 rounded-xl text-left text-sm font-semibold transition-all ${
                  isActive 
                    ? "border border-[#38bdf8]/20 border-l-2 border-l-[#38bdf8] bg-[#38bdf8]/10 text-[#38bdf8]" 
                    : "border border-transparent text-white/55 hover:bg-white/5 hover:text-white/85"
                }`}
              >
                {/* Dot indicator */}
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                  isActive ? "bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" : "bg-white/15"
                }`} />

                <span className="flex-1">{link.label}</span>

                {/* Active arrow */}
                {isActive && (
                  <span className="text-[13px] text-[#38bdf8]/55">→</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-6 h-[1px] shrink-0 bg-white/5" />

        {/* Account label */}
        <div className="pt-4 px-6 pb-2 shrink-0">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.14em] m-0">
            Akun
          </p>
        </div>

        {/* Drawer Footer */}
        <div className="px-6 pt-2 pb-7 shrink-0 flex flex-col gap-2.5">
          {/* Login */}
          <Link href="/sign-in" onClick={() => setDrawerOpen(false)} className="no-underline">
            <button className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-semibold transition-all hover:text-[#38bdf8] hover:border-[#38bdf8]/30 hover:bg-[#38bdf8]/10">
              Masuk
            </button>
          </Link>

          {/* Register */}
          <Link href="/sign-up" onClick={() => setDrawerOpen(false)} className="no-underline">
            <button className="w-full p-3 rounded-xl bg-[#38bdf8] text-[#0a0f1e] text-sm font-bold border-none transition-all shadow-[0_0_20px_rgba(56,189,248,0.38)] hover:shadow-[0_0_30px_rgba(56,189,248,0.65)] hover:scale-[1.02]">
              Daftar
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}