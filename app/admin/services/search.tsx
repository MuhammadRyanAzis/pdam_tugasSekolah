"use client"
import { KeyboardEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";

type Props = { search: string }

export default function Search({ search }: Props) {
  const [keyword, setKeyword] = useState<string>(search || "");
  const router = useRouter();

  useEffect(() => {
    setKeyword(search || "");
  }, [search]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() === "") {
      const params = new URLSearchParams(window.location.search);
      params.delete("search");
      router.push(`?${params.toString()}`);
    }
  }

  function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const params = new URLSearchParams(window.location.search);
      if (keyword.trim() === "") {
        params.delete("search");
      } else {
        params.set("search", keyword.trim());
      }
      router.push(`?${params.toString()}`);
    }
  }

  function clearSearch() {
    setKeyword("");
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="w-full relative group">
      {/* Search icon */}
      <div 
        className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center transition-colors duration-200 pointer-events-none z-10 ${
          keyword ? "text-[#38bdf8]" : "text-[#38bdf8]/45"
        }`}
      >
        <SearchIcon size={18} />
      </div>

      <input
        type="text"
        id="search"
        placeholder="Cari nama layanan... (tekan Enter)"
        value={keyword}
        onChange={handleInputChange}
        onKeyUp={handleSearch}
        className={`w-full py-[13px] pr-12 pl-[46px] rounded-xl text-sm text-white outline-none transition-all duration-200 box-border placeholder:text-white/20 focus:border-[#38bdf8]/50 focus:bg-[#38bdf8]/[0.04] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)] ${
          keyword
            ? "border border-[#38bdf8]/40 bg-[#38bdf8]/[0.04] shadow-[0_0_0_3px_rgba(56,189,248,0.07)]"
            : "border border-[#4ade80]/20 bg-white/[0.04]"
        }`}
      />

      {/* Clear button */}
      {keyword && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full bg-white/[0.07] border border-white/10 text-white/45 flex items-center justify-center cursor-pointer transition-all duration-200 z-10 hover:bg-[#ef4444]/15 hover:border-[#ef4444]/30 hover:text-[#ef4444]"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
