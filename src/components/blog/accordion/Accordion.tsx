"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface AccordionProps {
  title: string;
  items: { name: string; id: string }[] | undefined;
}

const Accordion: React.FC<AccordionProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith("/ar");
  const blogBaseUrl = isArabicRoute ? "/ar/blog" : "/blog";

  return (
    <div className="rounded-md border border-ink-200 bg-white p-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-heading font-bold"
      >
        <b>{title}</b>
        <span>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </button>
      {isOpen && (
        <ul className="mt-2 flex flex-col gap-1">
          {items?.map((item, index) => {
            const queryKey =
              title.toLowerCase() === "category" || title.toLowerCase() === "التصنيفات"
                ? "category"
                : "tag";
            return (
              <a href={`${blogBaseUrl}/${queryKey}/${item.id}`} key={index}>
                <li className="font-heading text-small text-ink-700 hover:text-brand-500">
                  {item?.name}
                </li>
              </a>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Accordion;
