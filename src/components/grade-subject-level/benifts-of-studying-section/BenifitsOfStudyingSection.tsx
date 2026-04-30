"use client";

import React, { useState } from "react";
import Image from "next/image";

import { cn } from "@/utils/cn";
import { PageData } from "@/types/grade-subject-level.types";
import minusIcon from "../../../../public/assets/images/svg/blueminusicon.svg";

type IProps = { data: PageData["igcse_in_dubai"] };

const BenifitsOfStudyingSection: React.FC<IProps> = ({ data }) => {
  const [expandedBoxes, setExpandedBoxes] = useState<Record<number, boolean>>({ 0: true });
  const [expandedRequirement, setExpandedRequirement] = useState<Record<number, boolean>>({ 0: true });

  const toggleBox = (index: number) =>
    setExpandedBoxes((prev) => ({ ...prev, [index]: !prev[index] }));
  const toggleRequirement = (index: number) =>
    setExpandedRequirement((prev) => ({ ...prev, [index]: !prev[index] }));

  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";
  const LeftTag = (data?.subTextLeftTag ?? "h4") as "h3" | "h4" | "h5";
  const RightTag = (data?.subTextRightTag ?? "h4") as "h3" | "h4" | "h5";

  const renderBox = (
    box: { name: string; paragraph: string },
    index: number,
    expanded: boolean,
    toggle: (i: number) => void,
  ) => (
    <div
      key={index}
      className={cn(
        "flex items-start justify-between gap-4 rounded-md p-4 shadow-card transition-colors",
        expanded ? "bg-brand-50" : "bg-white",
      )}
    >
      <div className="flex-1">
        <p className="font-heading text-h5 font-semibold text-ink-900">{box.name}</p>
        {expanded && (
          <p className="mt-2 font-heading text-small text-ink-700">{box.paragraph}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => toggle(index)}
        className="shrink-0"
        aria-label={expanded ? "Collapse" : "Expand"}
      >
        <Image src={minusIcon} alt="" className="h-[5vh] w-[5vh]" />
      </button>
    </div>
  );

  return (
    <div className="px-6 py-12 lg:py-16">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <LeftTag
            className="font-heading text-h4-mobile sm:text-h4-tablet lg:text-h4 text-ink-900"
            dangerouslySetInnerHTML={{ __html: data?.subTextLeft ?? "" }}
          />
          {data?.listArray.slice(0, 3)?.map((box, index) =>
            renderBox(box, index, !!expandedBoxes[index], toggleBox),
          )}
        </div>
        <div className="flex flex-col gap-3">
          <RightTag
            className="font-heading text-h4-mobile sm:text-h4-tablet lg:text-h4 text-ink-900"
            dangerouslySetInnerHTML={{ __html: data?.subTextRight ?? "" }}
          />
          {data?.listArray.slice(-3)?.map((box, index) =>
            renderBox(box, index, !!expandedRequirement[index], toggleRequirement),
          )}
        </div>
      </div>
    </div>
  );
};

export default BenifitsOfStudyingSection;
