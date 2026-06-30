import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#05070A",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        borderRadius: "32px", padding: "48px", background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)", maxWidth: "420px", width: "100%", textAlign: "center",
        backdropFilter: "blur(20px)"
      }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "22px", background: "rgba(255,255,255,0.05)", 
          border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", 
          justifyContent: "center", margin: "0 auto 24px",
        }}>
          <FileQuestion size={28} color="rgba(255,255,255,0.8)" />
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: 900, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.04em" }}>
          404
        </h1>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.8)", margin: "0 0 16px" }}>
          Target Not Found
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 32px", lineHeight: 1.6 }}>
          The requested system node does not exist or has been relocated.
        </p>
        
        <Link href="/" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          padding: "16px", borderRadius: "16px", background: "#6366F1",
          border: "none", color: "#fff", fontSize: "14px", 
          fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(99,102,241,0.3)"
        }}>
          <Home size={16} /> Return to Home
        </Link>
      </div>
    </div>
  )
}
