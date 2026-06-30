import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import { CreditCard, Hash, Info } from "lucide-react"
import AdminPaymentsList from "./payments-list"

export const dynamic = "force-dynamic"

export interface PaymentsResponse {
  success: boolean
  message: string
  data: PaymentData[]
  count: number
}

export interface PaymentData {
  id: number
  bill_id: number
  payment_proof: string
  verified: boolean
  total_amount: number
  payment_date: string
  owner_token: string
  createdAt: string
  updatedAt: string
  bill?: {
    id: number
    month: number
    year: number
    usage_value: number
    paid: boolean
    customer_id: number
    customer?: {
      name: string
      customer_number: string
    }
  }
}

async function getAllPayments(page = 1, quantity = 50, search = ""): Promise<PaymentsResponse> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`)
    url.searchParams.append("page", page.toString())
    url.searchParams.append("quantity", quantity.toString())
    if (search) url.searchParams.append("search", search)

    const response = await fetch(url.toString(), {
      method: "GET", cache: "no-store",
      headers: {
        "app-key": process.env.APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    const data: PaymentsResponse = await response.json()
    if (!response.ok) return { success: false, message: data?.message || "Gagal mengambil data pembayaran", data: [], count: 0 }
    return data
  } catch (err: any) {
    return { success: false, message: err.message || "Gagal mengambil data pembayaran", data: [], count: 0 }
  }
}

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const search = (Array.isArray(resolvedSearchParams.search) ? resolvedSearchParams.search[0] : resolvedSearchParams.search) || ""

  const { success, message, data, count } = await getAllPayments(1, 50, search)

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

  const displayCount = data ? data.length : 0

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white relative overflow-hidden pb-[60px]">
      {/* Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full top-[-120px] right-[-120px] bg-[#38bdf8]/[0.09] blur-[110px] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bottom-[-100px] left-[-100px] bg-[#a855f7]/[0.07] blur-[100px] pointer-events-none" />
      {/* Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative z-10 py-10 px-6 sm:px-12 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-5">
          <div className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/25 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex items-center justify-center shrink-0">
              <CreditCard size={22} className="text-[#a855f7]" />
            </div>
            <div>
              <h1 className="text-[clamp(24px,4vw,36px)] font-black text-[#a855f7] m-0 tracking-[-0.02em] drop-shadow-[0_0_24px_rgba(168,85,247,0.3)]">
                Manajemen Pembayaran
              </h1>
              <p className="text-[13px] text-white/40 mt-1 flex items-center gap-1.5 m-0">
                <Hash size={13} className="text-[#38bdf8]" />
                {displayCount} pembayaran ditemukan
              </p>
            </div>
          </div>
        </div>

        {/* List wrapped in Client Component */}
        <AdminPaymentsList initialData={data || []} />

      </div>
    </div>
  )
}
