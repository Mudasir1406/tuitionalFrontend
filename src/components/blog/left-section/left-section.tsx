"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import dynamic from "next/dynamic";
import Input from "@/components/input/Input";
import { AccordionProps } from "../accordion/Accordion";
import { leagueSpartan } from "@/app/fonts";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Accordion = dynamic(() => import("../accordion/Accordion"), {
  ssr: true,
});

interface Props {
  categories?: { name: { en: string; ar: string }; id: string }[];
  tags: { name: { en: string; ar: string }; id: string }[];
}

function LeftSection({ categories, tags }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    search: "",
  });
  // Convert bilingual data to English display format
  const englishCategories = categories?.map(cat => ({
    name: cat.name.en,
    id: cat.id
  }));

  const englishTags = tags?.map(tag => ({
    name: tag.name.en, 
    id: tag.id
  }));

  const accordionData = [
    {
      title: "Category",
      items: englishCategories,
    },
    {
      title: "Tag",
      items: englishTags,
    },
  ];

  const handleChange = (key: string, value: string | string[]) => {
    //   if (key === "lastName" && typeof value === "string") {
    //     newErrors.lastName = isNotEmpty(value) ? "" : "Last Name cannot be empty";
    //   }

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
      const newUrl = `/blog?${params.toString()}`;
      router.replace(newUrl);
      // window.history.pushState({}, "", newUrl);
      // setQuerySearch(formData.search);
    }
  };
  return (
    <div>
      <div>
        <Input
          name="search"
          value={formData.search}
          onChange={handleChange}
          placeholder={"Search Our Blog"}
          className={`${styles.input} ${leagueSpartan.className}`}
        />

        <Button
          variant="contained"
          type="submit"
          className={`${leagueSpartan.className} ${styles.containedButton}`}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div>
        {accordionData.map((data, index) => (
          <Accordion key={index} title={data.title} items={data.items} />
        ))}
      </div>
    </div>
  );
}

export default LeftSection;
