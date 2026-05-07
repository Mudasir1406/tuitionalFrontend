import React from "react";
import { leagueSpartan } from "@/app/fonts";

type TagProps = {
  label: string;
  index: number;
  link?: string;
  isClickable?: boolean;
};

const COLORS = [
  "bg-[#f8d7da] text-[#721c24]",
  "bg-[#d4edda] text-[#155724]",
  "bg-[#d1ecf1] text-[#0c5460]",
  "bg-[#fff3cd] text-[#856404]",
  "bg-[#e2e3e5] text-[#383d41]",
];

const Tag: React.FC<TagProps> = ({ label, index, link, isClickable }) => {
  const colorClass = COLORS[index % COLORS.length];
  const shouldRenderLink = isClickable !== false && Boolean(link);

  const className = `${leagueSpartan.className} ${colorClass} inline-flex h-6 my-1 select-none items-center whitespace-nowrap rounded-md px-2 font-heading text-[11px] font-medium leading-none`;

  if (shouldRenderLink) {
    return (
      <a href={link} className="no-underline">
        <span className={className}>{label}</span>
      </a>
    );
  }

  return <span className={className}>{label}</span>;
};

export default Tag;
