"use client";
import { motion, Variants } from "framer-motion";
import { Droplet, CreditCard, PlusCircle, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Droplet,
    color: "#38bdf8",
    title: "Pasokan Air Bersih",
    desc: "Distribusi air bersih harian yang andal ke setiap rumah tangga di area layanan.",
  },
  {
    icon: CreditCard,
    color: "#4ade80",
    title: "Pembayaran Tagihan",
    desc: "Bayar tagihan air bulanan Anda dengan cepat dan aman melalui portal online kami.",
  },
  {
    icon: PlusCircle,
    color: "#38bdf8",
    title: "Sambungan Baru",
    desc: "Ajukan sambungan saluran air baru untuk rumah atau bisnis Anda dengan mudah.",
  },
  {
    icon: MessageCircle,
    color: "#4ade80",
    title: "Penanganan Keluhan",
    desc: "Kirim masalah dan lacak status penyelesaian secara real-time melalui akun Anda.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-20 md:py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#4ade80] mb-2.5">
            Apa yang kami tawarkan
          </p>

          <h2 className="text-[clamp(32px,5vw,48px)] font-black leading-[1.1] text-[#38bdf8] m-0 mb-3 drop-shadow-[0_0_24px_rgba(56,189,248,0.28)]">
            Layanan Kami
          </h2>

          <p className="text-sm md:text-[15px] text-white/45 m-0 max-w-lg">
            Semua yang Anda butuhkan untuk manajemen air bersih — di satu tempat.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map(({ icon: Icon, color, title, desc }) => {
            const isBlue = color === "#38bdf8";
            
            return (
              <motion.div
                key={title}
                variants={cardVariants}
                className={`relative rounded-2xl p-7 pb-9 bg-white/[0.025] border transition-all duration-300 group ${
                  isBlue 
                    ? "border-[#38bdf8]/25 hover:border-[#38bdf8]/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.2)]" 
                    : "border-[#4ade80]/25 hover:border-[#4ade80]/50 hover:shadow-[0_0_28px_rgba(74,222,128,0.2)]"
                } hover:-translate-y-1.5`}
              >
                {/* Icon box */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${
                  isBlue 
                    ? "bg-[#38bdf8]/[0.08] border-[#38bdf8]/25 text-[#38bdf8]" 
                    : "bg-[#4ade80]/[0.06] border-[#4ade80]/25 text-[#4ade80]"
                }`}>
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-white m-0 mb-2.5">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-[1.7] text-white/45 m-0">
                  {desc}
                </p>

                {/* Arrow indicator */}
                <div className={`absolute bottom-5 right-5 text-lg opacity-35 transition-opacity group-hover:opacity-100 ${
                  isBlue ? "text-[#38bdf8]" : "text-[#4ade80]"
                }`}>
                  →
                </div>

                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[1px] rounded-full ${
                  isBlue ? "bg-gradient-to-r from-[#38bdf8]/40 to-transparent" : "bg-gradient-to-r from-[#4ade80]/40 to-transparent"
                }`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#4ade80]/20" />
          <p className="text-xs md:text-[13px] text-white/30 m-0 whitespace-nowrap text-center">
            Semua layanan tersedia 24/7 secara online
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#4ade80]/20 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}