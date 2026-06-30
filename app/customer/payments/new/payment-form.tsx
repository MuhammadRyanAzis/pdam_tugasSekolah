"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import { ArrowLeft, CreditCard, UploadCloud, FileImage, Loader2, CheckCircle2 } from "lucide-react"

export interface PendingBill {
  id: number | string
  month: number
  year: number
  amount: number
}

export default function PaymentForm({ pendingBills }: { pendingBills: PendingBill[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [billId, setBillId] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Pre-select bill if ?bill_id= is in the URL
  useEffect(() => {
    const id = searchParams.get("bill_id")
    if (id) setBillId(id)
  }, [searchParams])

  const MONTHS = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!billId) {
      setError("Silakan pilih tagihan yang ingin dibayar.")
      return
    }
    if (!file) {
      setError("Silakan unggah gambar bukti pembayaran.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("bill_id", billId)
      formData.append("file", file)

      const response = await fetch(`/api-proxy/payments`, {
        method: "POST",
        headers: {
          // Note: browser sets Content-Type automatically for FormData including boundary
        },
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pembayaran")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/customer/payments")
        router.refresh()
      }, 2000)

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan. Silakan coba lagi.")
      } else {
        setError("Terjadi kesalahan yang tidak terduga.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 md:mb-8 flex flex-row items-center gap-4">
        <Link 
          href="/customer/payments" 
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all shrink-0"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl md:text-[28px] font-black text-white m-0 tracking-[-0.01em]">Kirim Pembayaran</h1>
          <p className="text-xs md:text-sm text-white/40 mt-1 mb-0">Unggah struk pembayaran Anda secara aman.</p>
        </div>
      </div>

      {success ? (
        <div className="rounded-[20px] p-6 md:p-10 text-center bg-[#4ade80]/5 border border-[#4ade80]/20">
          <div className="w-[60px] h-[60px] rounded-full bg-[#4ade80]/10 border border-[#4ade80]/25 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={30} className="text-[#4ade80]" />
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-[#4ade80] m-0 mb-2.5">Pembayaran Terkirim</h2>
          <p className="text-xs md:text-sm text-white/50 m-0">Bukti pembayaran Anda telah diunggah dan sedang menunggu verifikasi. Mengalihkan...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl md:rounded-[24px] p-5 md:p-8 bg-white/5 border border-[#a855f7]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a855f7] via-[#38bdf8] to-transparent" />

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs md:text-sm font-semibold mb-6 flex items-center gap-2.5">
              <div className="w-1 h-4 bg-red-500 rounded-sm shrink-0" />
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="flex items-center gap-2 text-xs font-bold text-white/70 mb-2.5 uppercase tracking-wider">
              <CreditCard size={14} className="text-[#a855f7]" />
              Pilih Tagihan untuk Dibayar
            </label>
            <div className="relative">
              <select
                value={billId}
                onChange={(e) => setBillId(e.target.value)}
                className={`w-full p-3 md:p-4 rounded-xl bg-[#0a0f1e]/50 border border-white/10 text-xs md:text-sm appearance-none cursor-pointer outline-none transition-all ${billId ? 'text-white' : 'text-white/30'}`}
              >
                <option value="" disabled>-- Pilih tagihan yang belum dibayar --</option>
                {pendingBills.length === 0 && (
                  <option disabled>Tidak ada tagihan tertunda.</option>
                )}
                {pendingBills.map(bill => (
                  <option key={bill.id} value={bill.id} className="text-black">
                    {MONTHS[bill.month]} {bill.year} - Rp {bill.amount.toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <label className="flex items-center gap-2 text-xs font-bold text-white/70 mb-2.5 uppercase tracking-wider">
              <FileImage size={14} className="text-[#38bdf8]" />
              Unggah Bukti Pembayaran
            </label>
            <label className={`flex flex-col items-center justify-center w-full h-[160px] md:h-[180px] rounded-xl bg-[#0a0f1e]/50 border-2 border-dashed border-white/10 cursor-pointer transition-all ${file ? 'border-[#38bdf8]/40 bg-[#38bdf8]/5' : 'hover:border-white/20'}`}>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-3 md:mb-4">
                <UploadCloud size={20} className={file ? "text-[#38bdf8]" : "text-white/40"} />
              </div>
              <span className={`text-xs md:text-sm font-semibold mb-1.5 text-center px-4 ${file ? 'text-[#38bdf8]' : 'text-white/60'}`}>
                {file ? file.name : "Klik untuk melampirkan file gambar"}
              </span>
              <span className="text-[10px] md:text-xs text-white/30">PNG, JPG, JPEG maksimal 5MB</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !billId || !file}
            className={`w-full flex items-center justify-center gap-2.5 p-3.5 md:p-4 rounded-xl text-sm md:text-[15px] font-bold border-none transition-all ${loading || !billId || !file ? 'bg-white/5 text-white/30 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-white cursor-pointer shadow-[0_8px_24px_rgba(168,85,247,0.3)] hover:opacity-90 hover:scale-[1.01]'}`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Pembayaran"
            )}
          </button>
        </form>
      )}
    </div>
  )
}
