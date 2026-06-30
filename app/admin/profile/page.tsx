import { getCookies } from "@/helper/cookies";
import Link from "next/link";
import { Shield, User, Phone, Calendar, Activity, Users, FileText, Droplet } from "lucide-react";

export interface ResponAdminProfile {
  success: boolean;
  message: string;
  data: Admin;
}

export interface Admin {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
}

export interface UserProfile {
  id: number;
  username: string;
  password: string;
  role: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

async function getAdminProfile(): Promise<Admin | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admins/me`;
    const appKey = (process.env.APP_KEY || "").trim();
    const token = await getCookies("token");

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "app-key": appKey,
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log(`Admin Profile Fetch Status: ${response.status}`);
    const responseData: ResponAdminProfile = await response.json();
    
    if (!response.ok) {
      console.log("Admin Profile Fetch Failed:", responseData.message);
      return null;
    }

    return responseData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function AdminProfilePage() {
  const adminProfile = await getAdminProfile();

  if (adminProfile == null) {
    return (
      <div className="min-h-screen w-full bg-[#0a0f1e] flex items-center justify-center p-6 relative">
        <div className="bg-white/[0.03] backdrop-blur-[20px] p-10 rounded-[24px] border border-white/10 text-center max-w-[400px]">
          <h2 className="text-[20px] font-bold text-[#38bdf8] mb-3">
            Sesi Berakhir
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Silakan masuk kembali untuk mengakses profil administrator Anda.
          </p>
          <Link href="/sign-in" className="inline-block px-6 py-3 bg-[#38bdf8] text-[#0a0f1e] rounded-xl font-bold no-underline">
            Kembali ke Masuk
          </Link>
        </div>
      </div>
    );
  }

  const joinDate = new Date(adminProfile.createdAt).toLocaleDateString("id-ID", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div className="min-h-screen w-full bg-[#0a0f1e] py-[60px] px-6 relative overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="absolute w-[600px] h-[600px] rounded-full top-[-200px] left-[-200px] bg-[#38bdf8]/15 blur-[120px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bottom-[-150px] right-[-150px] bg-[#4ade80]/10 blur-[100px] pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* ── Header ── */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end gap-6">
          <div className="w-[100px] h-[100px] rounded-[24px] bg-[#38bdf8]/10 border border-[#38bdf8]/25 shadow-[0_0_32px_rgba(56,189,248,0.2)] flex items-center justify-center shrink-0">
            <Shield size={48} className="text-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          </div>
          <div>
            <h1 className="text-[36px] font-black text-white m-0 tracking-[-0.02em] leading-tight">
              {adminProfile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-2">
              <span className="px-3 py-1 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-black uppercase tracking-[0.05em]">
                {adminProfile?.user?.role || "ADMIN"}
              </span>
              <span className="text-white/40 text-sm">
                Profil Administrator
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          
          {/* Main Info Column */}
          <div className="flex flex-col gap-8">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard 
                label="Nama Pengguna" 
                value={adminProfile?.user?.username || "N/A"} 
                icon={<User size={20} />} 
                color="#38bdf8" 
              />
              <InfoCard 
                label="Nomor Telepon" 
                value={adminProfile.phone} 
                icon={<Phone size={20} />} 
                color="#4ade80" 
              />
              <InfoCard 
                label="Anggota Sejak" 
                value={joinDate} 
                icon={<Calendar size={20} />} 
                color="#f472b6" 
                fullWidth
              />
            </div>

            {/* Quick Actions Container */}
            <div className="bg-white/[0.03] backdrop-blur-[20px] rounded-[24px] border border-white/5 p-6 sm:p-10">
              <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3">
                <Activity size={20} className="text-[#38bdf8]" />
                Fitur Admin
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ActionCard 
                  href="/admin/services" 
                  title="Layanan" 
                  desc="Kelola layanan PDAM" 
                  icon={<Droplet size={24} />} 
                  color="#38bdf8" 
                />
                <ActionCard 
                  href="/admin/customer" 
                  title="Pelanggan" 
                  desc="Kelola data pelanggan" 
                  icon={<Users size={24} />} 
                  color="#4ade80" 
                />
                <ActionCard 
                  href="/admin/bills" 
                  title="Tagihan" 
                  desc="Operasi penagihan" 
                  icon={<FileText size={24} />} 
                  color="#fbbf24" 
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Status */}
          <div className="flex flex-col gap-8">
            <div className="bg-gradient-to-br from-[#38bdf8]/10 to-[#4ade80]/10 rounded-[24px] border border-[#38bdf8]/20 p-8 text-center">
              <div className="w-[60px] h-[60px] rounded-full bg-[#4ade80]/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-3 h-3 rounded-full bg-[#4ade80] shadow-[0_0_12px_#4ade80]" />
              </div>
              <h3 className="text-base font-bold text-white m-0">Sistem Aktif</h3>
              <p className="text-[13px] text-white/40 mt-2">
                Hak istimewa administratif Anda saat ini aktif dan aman.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-[60px] text-center text-white/20 text-[13px]">
          PDAM Baru © 2024 • Pusat Kontrol Admin
        </div>
      </div>
      <style>{`
          .action-card {
            transition: all 0.3s ease !important;
          }
          .action-card:hover {
            transform: translateY(-5px) !important;
            background: rgba(255,255,255,0.06) !important;
            box-shadow: 0 10px 30px -10px var(--hover-shadow) !important;
          }
        `}</style>
    </div>
  );
}

function InfoCard({ label, value, icon, color, fullWidth = false }: any) {
  return (
    <div className={`bg-white/[0.02] rounded-[20px] border border-white/5 p-6 ${fullWidth ? "sm:col-span-2" : "col-span-1"}`}>
      <div className="flex items-center gap-2.5 mb-3" style={{ color: color }}>
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>
      <div className="text-lg font-bold text-white">
        {value}
      </div>
    </div>
  );
}

function ActionCard({ href, title, desc, icon, color }: any) {
  return (
    <Link href={href} className="no-underline">
      <div 
        className="action-card bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 flex flex-col gap-3 h-full"
        style={{
          // @ts-ignore
          "--hover-shadow": color + "22",
        } as React.CSSProperties}
      >
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: color + "15",
            border: "1px solid " + color + "33",
            color: color,
          }}
        >
          {icon}
        </div>
        <div>
          <div className="text-[15px] font-bold text-white leading-tight">{title}</div>
          <div className="text-xs text-white/40 mt-1 leading-snug">{desc}</div>
        </div>
      </div>
    </Link>
  );
}
