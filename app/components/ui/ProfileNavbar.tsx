"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { deleteCookies } from "@/helper/cookies"
import { LogOut, User, FileText, Droplet, Users, Shield, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"

interface ProfileNavbarProps {
  role: "admin" | "customer"
}

export default function ProfileNavbar({ role }: ProfileNavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      await deleteCookies("token")
      router.push("/sign-in")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const adminLinks = [
    { name: "Profile", href: "/admin/profile", icon: <Shield size={18} /> },
    { name: "Layanan", href: "/admin/services", icon: <Droplet size={18} /> },
    { name: "Customers", href: "/admin/customer", icon: <Users size={18} /> },
    { name: "Bills", href: "/admin/bills", icon: <FileText size={18} /> },
    { name: "Payments", href: "/admin/payments", icon: <CreditCard size={18} /> },
  ]

  const customerLinks = [
    { name: "Profile", href: "/customer/profile", icon: <User size={18} /> },
    { name: "Bills", href: "/customer/bills", icon: <FileText size={18} /> },
    { name: "Payments", href: "/customer/payments", icon: <CreditCard size={18} /> },
  ]

  const links = role === "admin" ? adminLinks : customerLinks

  if (!mounted) return null // Prevent hydration mismatch if using active states

  return (
    <nav className="w-full px-4 py-3 md:py-4 bg-[#0a0f1e]/70 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 flex justify-center">
      <div className={`w-full flex items-center justify-between gap-4 md:gap-6 ${role === "admin" ? "max-w-[1000px]" : "max-w-[1100px]"}`}>
        
        {/* Navigation Links (Horizontally Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mask-edge">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/")
            const activeBg = role === "admin" ? "bg-[#38bdf8]/15 border-[#38bdf8]/30 text-[#38bdf8]" : "bg-[#4ade80]/15 border-[#4ade80]/30 text-[#4ade80]"
            const inactiveBg = "bg-transparent border-transparent text-white/60 hover:bg-white/5"

            return (
              <Link key={link.name} href={link.href} className="no-underline shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border text-sm transition-all duration-200 ${isActive ? `font-bold ${activeBg}` : `font-semibold ${inactiveBg}`}`}>
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="shrink-0 flex items-center gap-2 px-4 py-2 md:py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 text-sm font-bold transition-all duration-200 hover:bg-red-500/20 hover:-translate-y-[1px]"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
      <style>{`
        .mask-edge {
          mask-image: linear-gradient(to right, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
        }
        @media (min-width: 768px) {
          .mask-edge {
            mask-image: none;
            -webkit-mask-image: none;
          }
        }
      `}</style>
    </nav>
  )
}
