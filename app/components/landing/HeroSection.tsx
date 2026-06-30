"use client";
import { motion } from "framer-motion";
import { Droplet, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Animated stat counter (fires on mount after a delay) ─────────────────────
interface HeroStat { v: string; l: string; numericEnd?: number; suffix?: string; decimals?: number; isK?: boolean }

function AnimatedHeroStat({ stat, startDelay }: { stat: HeroStat; startDelay: number }) {
  const [display, setDisplay] = useState("0");
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || stat.numericEnd === undefined) return;
    const timer = setTimeout(() => {
      startedRef.current = true;
      const duration = 1600;
      const startTime = performance.now();
      const end = stat.numericEnd!;

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = eased * end;

        if (stat.isK) {
          setDisplay(Math.floor(current / 1000) + "K" + (stat.suffix || ""));
        } else if (stat.decimals && stat.decimals > 0) {
          setDisplay(current.toFixed(stat.decimals) + (stat.suffix || ""));
        } else {
          setDisplay(Math.floor(current).toLocaleString("en-US") + (stat.suffix || ""));
        }

        if (progress < 1) requestAnimationFrame(tick);
        else {
          if (stat.isK) setDisplay(Math.round(end / 1000) + "K" + (stat.suffix || ""));
          else if (stat.decimals && stat.decimals > 0) setDisplay(end.toFixed(stat.decimals) + (stat.suffix || ""));
          else setDisplay(end.toLocaleString("en-US") + (stat.suffix || ""));
        }
      }
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [stat, startDelay]);

  // Non-numeric stats display as-is
  if (stat.numericEnd === undefined) {
    return <span className="text-xl md:text-[26px] font-black text-[#38bdf8] block leading-none">{stat.v}</span>;
  }

  return <span className="text-xl md:text-[26px] font-black text-[#38bdf8] block leading-none">{display}</span>;
}
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="bg-transparent min-h-screen relative z-10 overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content wrapper */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 min-h-[calc(100vh-80px)] md:min-h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full pt-16 lg:pt-20 pb-10">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-start w-full z-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full mb-6 border border-[#4ade80]/40 text-[#4ade80] bg-[#4ade80]/5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80] animate-pulse" />
              Layanan Air Publik
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(44px,8vw,88px)] font-black leading-[1] tracking-tight m-0 mb-4 text-[#38bdf8] drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]"
            >
              PDAM
              <br />
              <span className="text-white drop-shadow-none">Baru</span>
            </motion.h1>

            {/* Green accent line */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-12 h-0.5 md:w-14 mb-5 md:mb-6 origin-left bg-gradient-to-r from-[#4ade80] to-transparent shadow-[0_0_10px_rgba(74,222,128,0.6)]"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base leading-relaxed text-white/50 max-w-[420px] m-0 mb-8 md:mb-9"
            >
              Air bersih yang disalurkan secara andal — mengelola layanan utilitas publik untuk komunitas yang lebih cerdas dan berkelanjutan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 w-full md:w-auto mb-10 md:mb-12"
            >
              <Link href="/sign-up" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3.5 md:px-7 md:py-3 rounded-xl bg-[#38bdf8] text-[#0a0f1e] text-sm font-bold border-none cursor-pointer shadow-[0_0_24px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_rgba(56,189,248,0.75)] tracking-wide">
                  Daftar Sekarang
                </button>
              </Link>

              <button
                onClick={() => scrollTo("services")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 md:px-7 md:py-3 rounded-xl text-[#4ade80] text-sm font-semibold border border-[#4ade80]/40 bg-[#4ade80]/5 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:bg-[#4ade80]/10"
              >
                Layanan Kami
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-0"
            >
              {([
                { v: "10K+", l: "Pelanggan", numericEnd: 10000, suffix: "+", isK: true },
                { v: "24/7", l: "Dukungan" },
                { v: "99%",  l: "Waktu Aktif",    numericEnd: 99,    suffix: "%"  },
              ] as HeroStat[]).map((s, i) => (
                <div
                  key={s.l}
                  className={`px-4 md:px-8 ${i < 2 ? 'border-r border-white/10' : ''} ${i === 0 ? 'pl-0' : ''} ${i === 2 ? 'pr-0' : ''}`}
                >
                  <AnimatedHeroStat stat={s} startDelay={700 + i * 150} />
                  <span className="text-[9px] md:text-[10px] text-white/35 uppercase tracking-widest mt-1 block">
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN — Orbital Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex justify-center items-center h-[300px] md:h-[420px] mt-8 lg:mt-0"
          >
            {/* Outer ring — green, rotating clockwise */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full border border-[#4ade80]/20"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_12px_#4ade80,0_0_24px_rgba(74,222,128,0.5)]" />
            </motion.div>

            {/* Middle ring — blue, rotating counter-clockwise */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute w-[170px] h-[170px] md:w-[240px] md:h-[240px] rounded-full border border-[#38bdf8]/20"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#38bdf8] shadow-[0_0_12px_#38bdf8,0_0_24px_rgba(56,189,248,0.5)]" />
            </motion.div>

            {/* Inner ring — faint */}
            <div className="absolute w-[110px] h-[110px] md:w-[155px] md:h-[155px] rounded-full border border-[#4ade80]/10" />

            {/* Center icon box */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-[20px] md:rounded-[24px] flex items-center justify-center bg-[#38bdf8]/[0.07] border border-[#38bdf8]/25 shadow-[0_0_40px_rgba(56,189,248,0.18),inset_0_0_30px_rgba(56,189,248,0.06)]"
            >
              <Droplet
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] text-[#38bdf8] drop-shadow-[0_0_16px_rgba(56,189,248,0.9)]"
              />
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}