"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PaymentData } from "./page"
import { Clock, CheckCircle2, AlertCircle, X, Check, Eye } from "lucide-react"

function StatusBadge({ verified }: { verified: boolean }) {
  if (verified) return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ade80]/[0.08] border border-[#4ade80]/30">
      <CheckCircle2 size={12} className="text-[#4ade80]" />
      <span className="text-[10px] font-bold text-[#4ade80] tracking-[0.1em] uppercase">Terverifikasi</span>
    </div>
  )
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eab308]/[0.08] border border-[#eab308]/30">
      <Clock size={12} className="text-[#eab308]" />
      <span className="text-[10px] font-bold text-[#eab308] tracking-[0.1em] uppercase">Tertunda</span>
    </div>
  )
}

export default function AdminPaymentsList({ initialData }: { initialData: PaymentData[] }) {
  const router = useRouter()
  const [payments, setPayments] = useState<PaymentData[]>(initialData)
  const [selectedProof, setSelectedProof] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  
  const handleVerify = async (paymentId: number) => {
    setLoadingId(paymentId)
    try {
      const response = await fetch(`/api-proxy/payments/${paymentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ verified: true })
      })

      if (response.ok) {
        setPayments(prev => prev.map(p => 
          p.id === paymentId ? { ...p, verified: true } : p
        ))
        router.refresh()
      } else {
        alert("Verifikasi gagal.")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat memverifikasi pembayaran.")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <>
      <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.025] border border-[#a855f7]/[0.18] mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#38bdf8] opacity-50" />

        {payments.length === 0 ? (
          <div className="text-center py-16 px-5 text-white/40">
            <p>Tidak ada pembayaran ditemukan dalam sistem.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {payments.map(payment => (
              <div 
                key={payment.id} 
                className="rounded-[20px] p-6 bg-white/[0.03] border border-white/5 flex flex-col gap-4 transition-all hover:bg-white/[0.04] hover:border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="m-0 mb-1 text-base text-white font-bold">Pembayaran #{payment.id}</h3>
                    <p className="m-0 text-xs text-white/50">ID Tagihan: {payment.bill_id}</p>
                    {payment.total_amount != null && (
                      <p className="m-0 mt-1 text-[13px] text-[#4ade80] font-semibold">Rp {payment.total_amount.toLocaleString("id-ID")}</p>
                    )}
                  </div>
                  <StatusBadge verified={payment.verified} />
                </div>
                
                {payment.bill?.customer && (
                  <div className="bg-[#0a0f1e]/50 p-3 rounded-xl">
                    <p className="m-0 mb-1 text-[13px] text-white/80 font-semibold">{payment.bill.customer.name}</p>
                    <p className="m-0 text-[11px] text-white/40">ID: {payment.bill.customer.customer_number}</p>
                  </div>
                )}

                <div className="flex gap-2.5 mt-auto">
                  <button 
                    onClick={() => setSelectedProof(payment.payment_proof)}
                    className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold cursor-pointer transition-all hover:bg-[#38bdf8]/20"
                  >
                    <Eye size={14} /> Lihat Bukti
                  </button>
                  {!payment.verified && (
                    <button 
                      onClick={() => handleVerify(payment.id)}
                      disabled={loadingId === payment.id}
                      className={`flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                        loadingId === payment.id
                          ? "bg-gray-500/10 border-gray-500/20 text-gray-400 cursor-not-allowed"
                          : "bg-[#4ade80]/10 border-[#4ade80]/20 text-[#4ade80] cursor-pointer hover:bg-[#4ade80]/20"
                      }`}
                    >
                      {loadingId === payment.id ? (
                        <span className="flex items-center gap-1.5">Tunggu...</span>
                      ) : (
                        <><Check size={14} /> Verifikasi</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {selectedProof && (
        <div 
          className="fixed inset-0 z-[9999] bg-[#0a0f1e]/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedProof(null)}
        >
          <div 
            className="relative bg-[#0a0f1e] border border-white/10 p-2 rounded-2xl max-w-[90%] max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setSelectedProof(null)} 
                className="bg-[#ef4444]/10 border-none text-[#ef4444] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ef4444]/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`/api-proxy/payment-proof/${selectedProof}`} 
              alt="Bukti Pembayaran" 
              className="max-w-full max-h-[calc(90vh-16px)] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
