import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import DropServiceButton from "./drop"
import { Plus, Zap, Settings, Info, Package, Filter, Search as SearchIcon } from "lucide-react"

export interface ServiceResponse {
  success: boolean
  message: string
  data: ServiceType[]
  count: number
}

export interface ServiceType {
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

async function getServices(): Promise<ServiceResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services`, {
      method: "GET",
      headers: {
        "app-key": process.env.APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
      next: { revalidate: 0 },
    })
    const data: ServiceResponse = await response.json()
    if (!response.ok) return { success: false, message: data.message, data: [], count: 0 }
    return data
  } catch {
    return { success: false, message: "Gagal mengambil layanan", data: [], count: 0 }
  }
}

type PageProps = { searchParams: Promise<{ search: string }> }

export default async function ServicePage(props: PageProps) {
  const { search } = await props.searchParams
  const { success, message, data, count } = await getServices()

  if (!success) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-6 text-white">
        <div className="rounded-2xl p-10 bg-[#ef4444]/[0.06] border border-[#ef4444]/20 max-w-[400px] w-full text-center">
          <div className="w-14 h-14 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/25 flex items-center justify-center mx-auto mb-4">
            <Info size={24} className="text-[#ef4444]" />
          </div>
          <h1 className="text-[22px] font-black text-[#ef4444] m-0 mb-2">Terjadi Kesalahan</h1>
          <p className="text-sm text-white/40 m-0 mb-6">{message}</p>
          <Link href="/admin/profile" className="inline-block px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 text-[13px] font-semibold no-underline">
            Kembali ke Dasbor
          </Link>
        </div>
      </div>
    )
  }

  const filteredData = search && search.trim() !== ""
    ? data.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    : data
  const displayCount = filteredData.length

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full top-[-120px] right-[-120px] bg-[#38bdf8]/[0.09] blur-[110px] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bottom-[-100px] left-[-100px] bg-[#4ade80]/[0.07] blur-[100px] pointer-events-none" />
      {/* Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`,
          backgroundSize: "60px 60px"
        }} 
      />

      <div className="relative z-10 py-10 px-6 sm:px-12 max-w-[1280px] mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/25 shadow-[0_0_20px_rgba(56,189,248,0.15)] flex items-center justify-center shrink-0">
              <Zap size={22} className="text-[#38bdf8]" />
            </div>
            <div>
              <h1 className="text-[clamp(24px,4vw,36px)] font-black text-[#38bdf8] m-0 tracking-[-0.02em] drop-shadow-[0_0_24px_rgba(56,189,248,0.3)]">
                Manajemen Layanan
              </h1>
              <p className="text-[13px] text-white/40 mt-1 flex items-center gap-1.5 m-0">
                <Package size={13} className="text-[#4ade80]" />
                {displayCount} layanan aktif saat ini tersedia
              </p>
            </div>
          </div>

          <Link href="/admin/services/add" className="no-underline w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#38bdf8] text-[#0a0f1e] text-sm font-bold border-none cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-200 hover:scale-105">
              <Plus size={16} />
              Tambah Layanan Baru
            </button>
          </Link>

        </div>

        {/* ── Main Card ── */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.025] border border-[#4ade80]/[0.18] mb-6 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#38bdf8] to-[#4ade80] opacity-50" />

          {/* Search */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-3">
              <Filter size={16} className="text-[#4ade80]" />
              <h2 className="text-[13px] font-bold text-[#4ade80] uppercase tracking-[0.1em] m-0">
                Filter Layanan
              </h2>
            </div>
            <Search search={search} />
          </div>

          {/* Empty state */}
          {displayCount === 0 ? (
            <div className="py-16 px-6 text-center rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                <SearchIcon size={28} className="text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white/60 m-0 mb-2">
                Tidak Ada Layanan Ditemukan
              </h3>
              <p className="text-sm text-white/30 max-w-[380px] mx-auto leading-[1.7]">
                {search?.trim()
                  ? `Tidak ada layanan yang cocok dengan "${search}". Coba kata kunci lain.`
                  : "Belum ada layanan. Klik 'Tambah Layanan Baru' untuk memulai."}
              </p>
            </div>
          ) : (
            /* ── Service Cards Grid ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredData.map(service => (
                <div
                  key={service.id}
                  className="rounded-[20px] p-6 bg-white/[0.025] border border-[#38bdf8]/[0.18] relative overflow-hidden transition-all duration-300 hover:border-[#38bdf8]/40 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(56,189,248,0.1)] group"
                >
                  {/* Card top accent */}
                  <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-[#38bdf8]/30 to-transparent" />

                  {/* Card header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-[42px] h-[42px] rounded-xl bg-[#38bdf8]/[0.08] border border-[#38bdf8]/20 flex items-center justify-center">
                      <Settings size={18} className="text-[#38bdf8]" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-[#4ade80]/[0.08] border border-[#4ade80]/30 text-[10px] font-bold text-[#4ade80] uppercase tracking-[0.1em]">
                      Aktif
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white m-0 mb-4 group-hover:text-[#38bdf8] transition-colors">
                    {service.name}
                  </h3>

                  {/* Stats */}
                  <div className="mb-5">
                    {[
                      { label: "Penggunaan Min", value: `${service.min_usage} m³` },
                      { label: "Penggunaan Maks", value: `${service.max_usage} m³` },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 text-[13px]">
                        <span className="text-white/40">{item.label}</span>
                        <span className="text-white/80 font-semibold">{item.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">
                        Harga Dasar
                      </span>
                      <span className="text-lg font-black text-[#4ade80] drop-shadow-[0_0_12px_rgba(74,222,128,0.4)]">
                        Rp {service.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2.5">
                    <Link
                      href={`/admin/services/edit/${service.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-bold rounded-lg bg-[#38bdf8]/[0.07] hover:bg-[#38bdf8]/[0.15] text-[#38bdf8] border border-[#38bdf8]/20 transition-all duration-300 no-underline"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Ubah
                    </Link>
                    <DropServiceButton selectedData={service.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer Stats ── */}
        <div className="rounded-2xl p-4 sm:px-6 bg-white/[0.02] border border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/[0.08] border border-[#38bdf8]/20 flex items-center justify-center shrink-0">
              <Info size={16} className="text-[#38bdf8]" />
            </div>
            <span className="text-sm text-white/50">
              Menampilkan <span className="text-white font-bold">{displayCount}</span> dari <span className="text-white font-bold">{count}</span> layanan
            </span>
          </div>
          {search?.trim() && (
            <div className="px-3.5 py-1.5 rounded-lg bg-[#38bdf8]/[0.06] border border-[#38bdf8]/[0.18] text-xs text-white/40">
              Memfilter: <span className="text-[#38bdf8] font-bold">"{search}"</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}