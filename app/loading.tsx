import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#05070A",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: "20px"
    }}>
      <div style={{
        width: "64px", height: "64px", borderRadius: "22px", 
        background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 30px rgba(99,102,241,0.15)"
      }}>
        <Loader2 size={32} color="#6366F1" className="animate-spin" />
      </div>
      <div style={{ fontSize: "12px", fontWeight: 800, color: "rgba(99,102,241,0.8)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        INITIALIZING SYSTEM...
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}
