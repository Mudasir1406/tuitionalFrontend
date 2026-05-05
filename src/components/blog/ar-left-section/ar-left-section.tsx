"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Input from "@/components/input/Input";

const ArAccordion = dynamic(() => import("../ar-accordion/Ar-Accordion"), { ssr: true });

interface Props {
  categories?: { name: { en: string; ar: string }; id: string }[];
  tags: { name: { en: string; ar: string }; id: string }[];
}

function ArLeftSection({ categories, tags }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const arabicCategories = categories?.map((cat) => ({
    name: cat.name.ar || cat.name.en,
    id: cat.id,
  }));
  const arabicTags = tags?.map((tag) => ({
    name: tag.name.ar || tag.name.en,
    id: tag.id,
  }));

  const accordionData = [
    { title: "التصنيف", items: arabicCategories },
    { title: "الوسم", items: arabicTags },
  ];

  const handleSearch = () => {
    if (search) {
      const params = new URLSearchParams(window.location.search);
      params.set("search", search);
      router.replace(`/ar/blog?${params.toString()}`);
    }
  };

  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-card">
        <Input
          name="search"
          value={search}
          onChange={(_, value) => setSearch(value as string)}
          placeholder="ابحث في مدونتنا"
          className="flex-1 border-0 bg-transparent"
        />
        <Button onClick={handleSearch} variant="primary" size="sm" className="font-heading">
          بحث
        </Button>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {accordionData.map((data, index) => (
          <ArAccordion key={index} title={data.title} items={data.items} />
        ))}
      </div>
    </div>
  );
}

export default ArLeftSection;
