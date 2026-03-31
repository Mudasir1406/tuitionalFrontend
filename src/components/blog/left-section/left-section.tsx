"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import dynamic from "next/dynamic";
import Input from "@/components/input/Input";
import { leagueSpartan } from "@/app/fonts";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const BlogSidebarForm = dynamic(() => import("./BlogSidebarForm"), {
  ssr: false,
});

interface Props {
  categories?: { name: { en: string; ar: string }; id: string }[];
  tags: { name: { en: string; ar: string }; id: string }[];
}

function LeftSection({ categories, tags }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (key: string, value: string | string[]) => {
    setSearch(value as string);
  };

  const handleSearch = () => {
    if (search) {
      const params = new URLSearchParams(window.location.search);
      params.set("search", search);
      router.replace(`/blog?${params.toString()}`);
    }
  };

  return (
    <div>
      <div>
        <Input
          name="search"
          value={search}
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
      <div style={{ marginTop: "20px" }}>
        <BlogSidebarForm />
      </div>
    </div>
  );
}

export default LeftSection;
