"use client";
import React, { useState } from "react";
import styles from "./ar-left-section.module.css";
import dynamic from "next/dynamic";
import Input from "@/components/input/Input";
import { AccordionProps } from "../accordion/Accordion";
import { leagueSpartan } from "@/app/fonts";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ArAccordion = dynamic(() => import("../ar-accordion/Ar-Accordion"), {
  ssr: true,
});

interface Props {
  categories?: { name: { en: string; ar: string }; id: string }[];
  tags: { name: { en: string; ar: string }; id: string }[];
}

function ArLeftSection({ categories, tags }: Props) {
  console.log("ArLeftSection", categories, "tags", tags);
  const router = useRouter();
  const [formData, setFormData] = useState({
    search: "",
  });
  // Convert bilingual data to Arabic display format
  const arabicCategories = categories?.map(cat => ({
    name: cat.name.ar || cat.name.en,
    id: cat.id
  }));

  const arabicTags = tags?.map(tag => ({
    name: tag.name.ar || tag.name.en, 
    id: tag.id
  }));

  const accordionData = [
    {
      title: "التصنيف",
      items: arabicCategories,
    },
    {
      title: "الوسم",
      items: arabicTags,
    },
  ];

  const handleChange = (key: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSearch = () => {
    if (formData.search) {
      // Update the query parameter in the URL
      const params = new URLSearchParams(window.location.search);
      params.set("search", formData.search);
      const newUrl = `/ar/blog?${params.toString()}`;
      router.replace(newUrl);
    }
  };
  return (
    <div>
      <div>
        <Input
          name="search"
          value={formData.search}
          onChange={handleChange}
          placeholder={"ابحث في مدونتنا"}
          className={`${styles.input} ${leagueSpartan.className}`}
        />

        <Button
          variant="contained"
          type="submit"
          className={`${leagueSpartan.className} ${styles.containedButton}`}
          onClick={handleSearch}
        >
          بحث
        </Button>
      </div>
      <div>
        {accordionData.map((data, index) => (
          <ArAccordion key={index} title={data.title} items={data.items} />
        ))}
      </div>
    </div>
  );
}

export default ArLeftSection;