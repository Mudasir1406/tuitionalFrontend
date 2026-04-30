"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function ArSearchBar({
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

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", search);
    router.replace(`${blogBaseUrl}?${params.toString()}`);
  };

  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-card">
        <input
          type="text"
          placeholder="ابحث في مدونتنا"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1 bg-transparent px-2 py-1 font-body text-form-input text-ink-900 outline-none placeholder:text-ink-400"
        />
        <Button onClick={handleSearch} variant="primary" size="sm">
          بحث
        </Button>
      </div>
      {type === "all" && searchQuery && (
        <div className="mt-4">
          <h4 className="font-heading text-h4">
            <span className="font-heading text-h4">البحث:</span> {searchQuery}
          </h4>
        </div>
      )}
    </div>
  );
}

export default ArSearchBar;
