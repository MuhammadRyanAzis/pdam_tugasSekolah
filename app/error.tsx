'use client'

import { useEffect } from 'react'
import { ShieldAlert, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#05070A",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        borderRadius: "32px", padding: "48px", background: "rgba(244,63,94,0.03)",
        border: "1px solid rgba(244,63,94,0.15)", maxWidth: "420px", width: "100%", textAlign: "center",
        backdropFilter: "blur(20px)"
      }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "22px", background: "rgba(244,63,94,0.1)", 
          border: "1px solid rgba(244,63,94,0.2)", display: "flex", alignItems: "center", 
          justifyContent: "center", margin: "0 auto 24px",
        }}>
          <ShieldAlert size={28} color="#F43F5E" />
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
          System Error
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: "0 0 32px", lineHeight: 1.6 }}>
          {error.message || "A critical error occurred while processing your request."}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => reset()} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "16px", borderRadius: "16px", background: "#F43F5E",
            border: "none", color: "#fff", fontSize: "14px", fontWeight: 800, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(244,63,94,0.3)"
          }}>
            <RefreshCcw size={16} /> Try Again
          </button>
          <Link href="/" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: "14px", 
            fontWeight: 700, textDecoration: "none",
          }}>
            <Home size={16} /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
