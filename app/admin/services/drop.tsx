"use client"
import { getCookies } from "@/helper/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DropServiceButton({ selectedData }: { selectedData: number }) {
  const [isLoading, setIsLoading]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError]     = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api-proxy/services/${selectedData}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${await getCookies("token")}`,
          },
        }
      );
      if (!response.ok) {
        setErrorMessage("Gagal menghapus layanan");
        setShowError(true);
        setIsLoading(false);
        return;
      }
      setShowSuccess(true);
      setTimeout(() => router.refresh(), 2000);
    } catch {
      setErrorMessage("Terjadi kesalahan saat menghapus layanan");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── shared modal wrapper ── */
  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      {children}
    </div>
  );

  const ModalCard = ({
    accentColorClass, accentLineClass, shadowClass, children,
  }: {
    accentColorClass: string;
    accentLineClass: string;
    shadowClass: string;
    children: React.ReactNode;
  }) => (
    <div className={`rounded-3xl p-9 bg-[#0a0f1e] border ${accentColorClass} ${shadowClass} text-center max-w-[360px] w-full relative overflow-hidden`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentLineClass} to-transparent opacity-80`} />
      {children}
    </div>
  );

  return (
    <>
      {/* ── Delete Button ── */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 border ${
          isLoading
            ? "bg-[#ef4444]/[0.07] border-[#ef4444]/25 text-[#ef4444] opacity-50 cursor-not-allowed"
            : "bg-[#ef4444]/[0.07] border-[#ef4444]/25 text-[#ef4444] cursor-pointer hover:bg-[#ef4444]/[0.14] hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {isLoading ? "Menghapus..." : "Hapus"}
      </button>

      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <Overlay>
          <ModalCard 
            accentColorClass="border-[#eab308]/30" 
            accentLineClass="from-[#eab308]" 
            shadowClass="shadow-[0_0_60px_rgba(234,179,8,0.12)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#eab308]/10 border border-[#eab308]/30 shadow-[0_0_24px_rgba(234,179,8,0.15)] flex items-center justify-center mx-auto mb-4.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h2 className="text-xl font-black text-[#eab308] m-0 mb-2 drop-shadow-[0_0_16px_rgba(234,179,8,0.35)]">
              Hapus Layanan?
            </h2>
            <p className="text-sm text-white/40 m-0 mb-7 leading-[1.65]">
              Apakah Anda yakin ingin menghapus layanan{" "}
              <span className="text-white font-bold">
                #{selectedData}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/70 text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
              >
                Simpan
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 p-3 rounded-xl bg-[#ef4444] text-white text-sm font-bold border-none cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:scale-[1.02]"
              >
                Hapus
              </button>
            </div>
          </ModalCard>
        </Overlay>
      )}

      {/* ── Success Modal ── */}
      {showSuccess && (
        <Overlay>
          <ModalCard 
            accentColorClass="border-[#4ade80]/30" 
            accentLineClass="from-[#4ade80]" 
            shadowClass="shadow-[0_0_60px_rgba(74,222,128,0.12)]"
          >
            <div className="w-14 h-14 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/35 shadow-[0_0_24px_rgba(74,222,128,0.2)] flex items-center justify-center mx-auto mb-4.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-[#4ade80] m-0 mb-2 drop-shadow-[0_0_16px_rgba(74,222,128,0.4)]">
              Berhasil Dihapus!
            </h2>
            <p className="text-sm text-white/40 m-0">
              Layanan telah berhasil dihapus dari sistem.
            </p>
          </ModalCard>
        </Overlay>
      )}

      {/* ── Error Modal ── */}
      {showError && (
        <Overlay>
          <ModalCard 
            accentColorClass="border-[#ef4444]/30" 
            accentLineClass="from-[#ef4444]" 
            shadowClass="shadow-[0_0_60px_rgba(239,68,68,0.12)]"
          >
            <div className="w-14 h-14 rounded-full bg-[#ef4444]/[0.08] border border-[#ef4444]/30 flex items-center justify-center mx-auto mb-4.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-[#ef4444] m-0 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-sm text-white/40 m-0 mb-6 leading-[1.65]">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              className="w-full p-3 rounded-xl bg-[#ef4444]/[0.08] border border-[#ef4444]/30 text-[#ef4444] text-sm font-bold cursor-pointer transition-all duration-200 hover:bg-[#ef4444]/15"
            >
              Mengerti
            </button>
          </ModalCard>
        </Overlay>
      )}
    </>
  );
}

