import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import DropCustomerButton from "./drop"
import { Plus, User, MapPin, Phone, Hash, Filter, Search as SearchIcon, Info, Users } from "lucide-react"

export const dynamic = "force-dynamic"

export interface CustomersResponse {
  success: boolean
  message: string
  data: CustomerData[]
  count: number
}

export interface CustomerData {
  id: number
  user_id: number
  customer_number: string
  name: string
  phone: string
  address: string
  service_id: number
  owner_token: string
  createdAt: string
  updatedAt: string
  user: UserData
  service: ServiceData
}

export interface UserData {
  id: number
  username: string
  password: string
  role: string
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface ServiceData {
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

// fetch customers
async function getCustomers(): Promise<CustomersResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "app-key": process.env.APP_KEY || "",
          "Authorization": `Bearer ${await getCookies("token")}`
        }
      }
    )

    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        message: data?.message || "Gagal mengambil data pelanggan",
        data: [],
        count: 0
      }
    }

    return await response.json()
  } catch {
    return {
      success: false,
      message: "Gagal mengambil data pelanggan",
      data: [],
      count: 0
    }
  }
}

export default async function customersPage(props: {
  searchParams: Promise<{ search: string }>
}) {
  const { search } = await props.searchParams
  const { success, message, data, count } = await getCustomers()

  if (!success) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-6 text-white">
        <div className="rounded-2xl p-10 bg-[#ef4444]/[0.06] border border-[#ef4444]/20 max-w-[400px] w-full text-center">
          <div className="w-14 h-14 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/25 flex items-center justify-center mx-auto mb-4">
            <Info size={24} className="text-[#ef4444]" />
          </div>
          <h1 className="text-[22px] font-black text-[#ef4444] m-0 mb-2">
            Terjadi Kesalahan
          </h1>
          <p className="text-sm text-white/40 m-0 mb-6">
            {message}
          </p>
          <Link href="/admin/profile" className="inline-block px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 text-[13px] font-semibold no-underline">
            Kembali ke Dasbor
          </Link>
        </div>
      </div>
    )
  }

  const filteredData =
    search && search.trim() !== ""
      ? data.filter(customer =>
        customer.name.toLowerCase().includes(search.toLowerCase())
      )
      : data

  const displayCount = filteredData.length

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full top-[-150px] right-[-150px] bg-[#38bdf8]/[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bottom-[-100px] left-[-100px] bg-[#10b981]/[0.06] blur-[100px] pointer-events-none" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 py-10 px-6 sm:px-12 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-11 gap-5">
          <div className="flex items-center gap-4.5">
            <div className="w-[54px] h-[54px] rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/25 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.15)] shrink-0">
              <Users size={24} className="text-[#38bdf8]" />
            </div>
            <div>
              <h1 className="text-[clamp(24px,4vw,36px)] font-black text-[#38bdf8] m-0 tracking-[-0.02em] drop-shadow-[0_0_24px_rgba(56,189,248,0.3)]">
                Database Pelanggan
              </h1>
              <p className="text-[13px] text-white/40 mt-1.5 flex items-center gap-1.5 m-0">
                <Hash size={14} className="text-[#38bdf8]" />
                {displayCount} pelanggan terdaftar
              </p>
            </div>
          </div>

          <Link href="/admin/customer/add" className="no-underline w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#38bdf8] text-[#0a0f1e] text-sm font-bold border-none cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-200 hover:scale-105">
              <Plus size={16} />
              Daftar Pelanggan Baru
            </button>
          </Link>
        </div>

        {/* Search Container */}
        <div className="bg-white/[0.025] rounded-3xl p-6 sm:p-8 border border-[#4ade80]/[0.18] mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#38bdf8] to-[#4ade80] opacity-50" />

          <div className="flex items-center gap-2.5 mb-4">
            <Filter size={16} className="text-[#4ade80]" />
            <h2 className="text-[13px] font-bold text-[#4ade80] uppercase tracking-[0.1em] m-0">
              Filter Pelanggan
            </h2>
          </div>
          <Search search={search} />
        </div>

        {/* Grid Content */}
        {displayCount === 0 ? (
          <div className="py-20 px-6 text-center rounded-[32px] bg-white/[0.02] border border-white/5">
            <div className="w-[72px] h-[72px] rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-5">
              <SearchIcon size={32} className="text-white/20" />
            </div>
            <h3 className="text-[22px] font-bold text-white/70 m-0 mb-2.5">
              Pencarian Tidak Menemukan Hasil
            </h3>
            <p className="text-sm text-white/35 max-w-[400px] mx-auto leading-[1.6]">
              {search && search.trim() !== ''
                ? `Nol kecocokan untuk "${search}". Periksa ejaan atau gunakan kata kunci lain.`
                : "Database pelanggan saat ini kosong. Mulai pendaftaran pertama Anda."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredData.map(customer => (
              <div
                key={customer.id}
                className="rounded-3xl p-7 bg-white/[0.028] border border-[#38bdf8]/20 relative overflow-hidden hover:border-[#38bdf8]/40 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] transition-all duration-300 group"
              >
                {/* Accent stripe */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-[#38bdf8]/30 to-transparent" />

                <div className="flex justify-between items-start mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#38bdf8]/[0.08] border border-[#38bdf8]/15 flex items-center justify-center">
                    <User size={20} className="text-[#38bdf8]" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#10b981]/[0.08] border border-[#10b981]/20 text-[10px] font-black text-[#10b981] uppercase tracking-[0.12em]">
                    #{customer.customer_number}
                  </div>
                </div>

                <h3 className="text-[19px] font-black text-white m-0 mb-4 truncate group-hover:text-[#38bdf8] transition-colors">
                  {customer.name}
                </h3>

                <div className="flex flex-col gap-3.5 mb-7">
                  <div className="flex items-start gap-2.5">
                    <Phone size={14} className="text-white/30 mt-1" />
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/30 font-bold uppercase tracking-[0.05em]">Telepon</span>
                      <span className="text-[13px] text-white/75 font-medium">{customer.phone || "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-white/30 mt-1" />
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/30 font-bold uppercase tracking-[0.05em]">Alamat</span>
                      <span className="text-[13px] text-white/75 font-medium line-clamp-2">
                        {customer.address || "—"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-3.5 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-white/30 font-bold uppercase tracking-[0.05em]">Paket Layanan</span>
                    <span className="px-2 py-1 rounded-md bg-[#38bdf8]/[0.06] border border-[#38bdf8]/15 text-[11px] font-bold text-[#38bdf8]">
                      {customer.service?.name || "Standard"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 relative z-20">
                  <Link
                    href={`/admin/customer/edit/${customer.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 no-underline"
                  >
                    <svg className="h-4 w-4 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Ubah
                  </Link>
                  <DropCustomerButton selectedData={customer.id} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Statistics */}
        <div className="rounded-[20px] p-5 sm:px-7 bg-white/[0.015] border border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#38bdf8]/[0.08] border border-[#38bdf8]/15 flex items-center justify-center shrink-0">
              <Info size={18} className="text-[#38bdf8]" />
            </div>
            <span className="text-sm text-white/40">
              Menampilkan <span className="text-white font-bold">{displayCount}</span> dari <span className="text-white font-bold">{count}</span> total pelanggan
            </span>
          </div>
          {search?.trim() && (
            <div className="px-4 py-2 rounded-xl bg-[#38bdf8]/5 border border-[#38bdf8]/15 text-xs text-white/30 text-center">
              Memfilter kata kunci: <span className="text-[#38bdf8] font-bold">"{search}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
