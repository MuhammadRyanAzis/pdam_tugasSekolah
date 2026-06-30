"use client";
import { motion, Variants, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testis = [
  {
    initials: "AS",
    name: "Andi Santoso",
    loc: "Malang Selatan",
    quote: "Semenjak beralih ke PDAM Baru, pasokan air kami tidak pernah terganggu. Pembayaran tagihan online sangat mudah.",
    color: "#38bdf8",
  },
  {
    initials: "RW",
    name: "Rina Wulandari",
    loc: "Blimbing",
    quote: "Proses pengajuan sambungan baru sangat cepat dan mudah. Pelayanannya profesional dan responsif.",
    color: "#4ade80",
  },
  {
    initials: "BH",
    name: "Budi Hartono",
    loc: "Lowokwaru",
    quote: "Laporan gangguan saya ditindaklanjuti dalam hitungan jam. Sangat puas dengan layanan PDAM Baru!",
    color: "#38bdf8",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Animated counter ──────────────────────────────────────────────────────────
interface StatItem { val: string; label: string; numericEnd: number; suffix: string; decimals?: number }

const stats: StatItem[] = [
  { val: "4.9/5",  label: "Rata-rata Penilaian",   numericEnd: 4.9,  suffix: "/5",  decimals: 1 },
  { val: "2,400+", label: "Ulasan",           numericEnd: 2400, suffix: "+",  decimals: 0 },
  { val: "98%",    label: "Tingkat Kepuasan", numericEnd: 98,   suffix: "%",  decimals: 0 },
];

function AnimatedStat({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [display, setDisplay] = useState("0");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const duration = 1800; // ms
    const startTime = performance.now();
    const end = stat.numericEnd;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * end;

      if (stat.decimals && stat.decimals > 0) {
        setDisplay(current.toFixed(stat.decimals));
      } else {
        setDisplay(Math.floor(current).toLocaleString("en-US"));
      }

      if (progress < 1) requestAnimationFrame(tick);
      else {
        // Snap to exact final value
        if (stat.decimals && stat.decimals > 0) setDisplay(end.toFixed(stat.decimals));
        else setDisplay(end.toLocaleString("en-US"));
      }
    }

    requestAnimationFrame(tick);
  }, [inView, stat]);

  return (
    <span className="text-[22px] font-black text-[#38bdf8] block drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">
      {display}{stat.suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialSection() {
  const trustBarRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustBarRef, { once: true, amount: 0.6 });

  return (
    <section
      id="testimonials"
      className="relative z-10 py-24 px-6 md:px-12 border-y border-[#38bdf8]/[0.08] bg-[#38bdf8]/[0.018]"
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header — slides up */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-14 text-center sm:text-left"
        >
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#4ade80] m-0 mb-2.5">
            Apa kata pelanggan
          </p>

          <h2 className="text-[clamp(32px,5vw,48px)] font-black leading-[1.1] text-[#38bdf8] m-0 mb-3 drop-shadow-[0_0_24px_rgba(56,189,248,0.28)]">
            Testimoni
          </h2>

          <p className="text-[15px] text-white/45 m-0">
            Dipercaya oleh ribuan rumah tangga di seluruh wilayah.
          </p>
        </motion.div>

        {/* Cards Grid — each card slides up with stagger */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.18 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testis.map(({ initials, name, loc, quote, color }) => {
            const isBlue = color === "#38bdf8";

            return (
              <motion.div
                key={name}
                variants={cardVariants}
                className={`rounded-[20px] p-7 bg-white/[0.025] border relative transition-all duration-300 flex flex-col gap-0 group ${
                  isBlue
                    ? "border-[#38bdf8]/[0.22] hover:-translate-y-1 hover:border-[#38bdf8]/45 hover:shadow-[0_0_24px_rgba(56,189,248,0.12)]"
                    : "border-[#4ade80]/[0.22] hover:-translate-y-1 hover:border-[#4ade80]/45 hover:shadow-[0_0_24px_rgba(74,222,128,0.12)]"
                }`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[1px] ${
                  isBlue ? "bg-gradient-to-r from-[#38bdf8]/50 to-transparent" : "bg-gradient-to-r from-[#4ade80]/50 to-transparent"
                }`} />

                {/* Quote mark */}
                <div className={`text-[56px] leading-none opacity-15 font-[Georgia,serif] -mt-2 mb-1 ${
                  isBlue ? "text-[#38bdf8]" : "text-[#4ade80]"
                }`}>
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-[5px] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-[11px] h-[11px] ${
                        isBlue ? "bg-[#38bdf8] shadow-[0_0_6px_rgba(56,189,248,0.6)]" : "bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.6)]"
                      }`}
                      style={{
                        clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                      }}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm leading-[1.75] text-white/65 italic m-0 mb-6 flex-1">
                  "{quote}"
                </p>

                {/* Divider */}
                <div className="h-[1px] bg-white/[0.06] mb-5" />

                {/* Author row */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border text-xs font-black shrink-0 ${
                    isBlue 
                      ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]"
                      : "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                  }`}>
                    {initials}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white m-0 mb-0.5">
                      {name}
                    </p>
                    <p className="text-xs text-white/35 m-0">
                      {loc}
                    </p>
                  </div>

                  {/* Verified badge */}
                  <div className={`ml-auto text-[10px] font-bold border px-2.5 py-1 rounded-full tracking-[0.06em] whitespace-nowrap ${
                    isBlue
                      ? "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25"
                      : "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/25"
                  }`}>
                    ✓ Terverifikasi
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust bar — slides up + numbers count from 0 */}
        <motion.div
          ref={trustBarRef}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 lg:gap-12">
              <div className="text-center">
                <AnimatedStat stat={stat} inView={trustInView} />
                <span className="text-[11px] text-white/35 uppercase tracking-[0.1em]">
                  {stat.label}
                </span>
              </div>
              {i < 2 && (
                <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}