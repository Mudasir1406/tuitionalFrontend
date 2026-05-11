"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function SearchBar({
  searchQuery,
  type,
}: {
  searchQuery: string;
  type?: string;
}) {
  const [search, setSearch] = useState(searchQuery);
  const router = useRouter();
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith("/ar");
  const blogBaseUrl = isArabicRoute ? "/ar/blog" : "/blog";
  const placeholder = isArabicRoute ? "ابحث في مدونتنا" : "Search Our Blog";
  const searchLabel = isArabicRoute ? "بحث" : "Search";

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", search);
    router.replace(`${blogBaseUrl}?${params.toString()}`);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center w-full h-[5.5vh] lg:h-[8.5vh] bg-white rounded-[2vh]
          shadow-[0px_-5px_5px_0px_rgba(0,0,0,0.2)_inset,0px_4px_5px_0px_rgba(0,0,0,0.25)_inset]"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-[60%] h-full bg-transparent border-0 px-4 font-heading text-form-input text-ink-900 outline-none placeholder:text-ink-400"
        />
        <Button
          onClick={handleSearch}
          variant="primary"
          className="w-[40%] h-full rounded-l-none rounded-r-[14px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.2)_inset] hover:scale-[1.02] hover:shadow-[1px_4px_14px_0px_rgba(56,182,255,0.54)] transition-all duration-500"
        >
          {searchLabel}
        </Button>
      </div>
      {type === "all" && searchQuery && (
        <div className="mt-4">
          <h4 className="font-heading text-h4">
            <span className="font-heading text-h4">{isArabicRoute ? "بحث:" : "Search:"}</span>{" "}
            {searchQuery}
          </h4>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
