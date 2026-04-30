"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Input from "@/components/input/Input";

const BlogSidebarForm = dynamic(() => import("./BlogSidebarForm"), { ssr: false });

interface Props {
  categories?: { name: { en: string; ar: string }; id: string }[];
  tags: { name: { en: string; ar: string }; id: string }[];
}

function LeftSection({ categories, tags }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search) {
      const params = new URLSearchParams(window.location.search);
      params.set("search", search);
      router.replace(`/blog?${params.toString()}`);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-card">
        <Input
          name="search"
          value={search}
          onChange={(_, value) => setSearch(value as string)}
          placeholder="Search Our Blog"
          className="flex-1 border-0 bg-transparent"
        />
        <Button onClick={handleSearch} variant="primary" size="sm">
          Search
        </Button>
      </div>
      <div className="mt-5">
        <BlogSidebarForm />
      </div>
    </div>
  );
}

export default LeftSection;
