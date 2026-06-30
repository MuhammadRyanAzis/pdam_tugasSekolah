import { getCookies } from "@/helper/cookies";
import Link from "next/link";
import { User, Hash, Phone, MapPin, Calendar, ArrowRight, FileText, Droplet } from "lucide-react";

export interface ResponseCustomerProfile {
  success: boolean;
  message: string;
  data: Customer;
}

export interface Customer {
  id: number;
  user_id: number;
  customer_number: string;
  name: string;
  phone: string;
  address: string;
  service_id: number;
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

async function getCustomerProfile(): Promise<Customer | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers/me`;
    const appKey = (process.env.APP_KEY || "").trim();
    const token = await getCookies("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "app-key": appKey,
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log(`Customer Profile Fetch Status: ${response.status}`);
    const responseData: ResponseCustomerProfile = await response.json();
    
    if (!response.ok) {
      console.log("Customer Profile Fetch Failed:", responseData.message);
      return null;
    }
    return responseData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function ProfilePage() {
  const customerProfile = await getCustomerProfile();

  if (customerProfile == null) {
    return (
      <div className="min-h-screen w-full bg-[#0a0f1e] flex items-center justify-center p-6 relative">
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 text-center max-w-[400px]">
          <h2 className="text-xl font-bold text-[#4ade80] mb-3">Profile Not Found</h2>
          <p className="text-white/50 text-sm mb-6">We couldn't retrieve your customer profile at this moment.</p>
          <Link href="/sign-in" className="inline-block px-6 py-3 bg-[#4ade80] text-[#0a0f1e] rounded-xl font-bold no-underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const joinDate = new Date(customerProfile.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div className="min-h-screen w-full bg-[#0a0f1e] py-10 md:py-[60px] px-4 md:px-6 relative overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full -top-[100px] -left-[100px] md:-top-[200px] md:-left-[200px] bg-[#38bdf8]/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full -bottom-[100px] -right-[100px] md:-bottom-[150px] md:-right-[150px] bg-[#4ade80]/10 blur-[100px] pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* ── Main Layout Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 md:gap-8 items-start">
          
          {/* Sidebar: Profile Summary */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] border border-white/5 p-8 md:p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-[#38bdf8]/15 to-[#4ade80]/15 border border-[#38bdf8]/30 flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(56,189,248,0.15)]">
              <span className="text-3xl md:text-[44px] font-black text-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                {customerProfile.name?.charAt(0)}
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-black text-white m-0 tracking-[-0.01em]">
              {customerProfile.name}
            </h1>
            <p className="text-white/40 text-xs md:text-sm mt-2 mb-5">
              Customer User
            </p>
            
            <div className="p-3 md:p-4 rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/15 flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase text-[#38bdf8] tracking-widest">
                ID Pelanggan
              </span>
              <span className="text-sm md:text-base font-extrabold text-white font-mono break-all">
                {customerProfile.customer_number}
              </span>
            </div>

            <div className="mt-6 md:mt-8">
               <Link href="/customer/bills" 
                 className="flex items-center justify-center gap-2.5 w-full p-4 rounded-2xl bg-[#4ade80] text-[#0a0f1e] font-extrabold no-underline transition-all shadow-[0_10px_25px_rgba(74,222,128,0.25)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(74,222,128,0.4)] hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
               >
                 <FileText size={18} />
                 View Tagihan Saya
                 <ArrowRight size={16} />
               </Link>
            </div>
          </div>

          {/* Main Content: Detailed Info */}
          <div className="flex flex-col gap-6 md:gap-8">
            
            <div className="bg-white/5 backdrop-blur-xl rounded-[28px] border border-white/5 p-6 md:p-10">
              <h2 className="text-lg md:text-xl font-extrabold text-white mb-6 md:mb-8 flex items-center gap-3">
                <div className="w-2 h-6 bg-[#38bdf8] rounded-md" />
                Account Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <DetailItem 
                  label="Username" 
                  value={customerProfile?.user?.username || customerProfile?.name || "N/A"} 
                  icon={<User size={18} />} 
                  color="#38bdf8" 
                />
                <DetailItem label="Phone Connection" value={customerProfile.phone} icon={<Phone size={18} />} color="#4ade80" />
                <DetailItem label="Alamat Layanan" value={customerProfile.address} icon={<MapPin size={18} />} color="#fbbf24" fullWidth />
                <DetailItem label="Registered Since" value={joinDate} icon={<Calendar size={18} />} color="#f472b6" fullWidth />
              </div>
            </div>

            {/* Service Status Mini Card */}
            <div className="bg-gradient-to-r from-[#38bdf8]/10 to-transparent rounded-[20px] border border-[#38bdf8]/15 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                <Droplet size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="text-sm md:text-[15px] font-bold text-white m-0">Active Connection</h3>
                <p className="text-[11px] md:text-xs text-white/40 mt-1 mb-0">Your water service is currently operational and monitoring usage.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 md:mt-[60px] text-center text-white/20 text-xs md:text-[13px]">
            Terima kasih telah menggunakan layanan PDAM Baru • 2024
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon, color, fullWidth = false }: any) {
  return (
    <div className={`bg-white/5 rounded-[20px] border border-white/5 p-5 md:p-6 flex flex-col md:flex-row items-start gap-3 md:gap-4 ${fullWidth ? "sm:col-span-2" : "col-span-1"}`}>
      <div 
        className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + "15", border: "1px solid " + color + "33", color: color }}
      >
        {icon}
      </div>
      <div className="w-full">
        <div className="text-[10px] md:text-[11px] font-extrabold uppercase text-white/35 tracking-widest mb-1 md:mb-1.5 break-all">
          {label}
        </div>
        <div className="text-sm md:text-base font-bold text-white leading-[1.4] break-words">
          {value}
        </div>
      </div>
    </div>
  );
}