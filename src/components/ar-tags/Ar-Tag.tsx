"use client";
import React from "react";
import { leagueSpartan } from "@/app/fonts";

interface TagProps {
  label: string;
  link?: string;
}

const ArTag: React.FC<TagProps> = ({ label, link }) => {
  return (
    <a href={`${link}`} className="no-underline">
      <p
        className={`${leagueSpartan.className} me-2 mb-2 inline-block cursor-pointer rounded bg-[#08b463] px-2 py-1 font-heading text-caption text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]`}
      >
        {label}
      </p>
    </a>
  );
};

export default ArTag;
