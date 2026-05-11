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

  const HeaderTag = ((data?.headerTag?.trim() || "h3").toLowerCase()) as "h2" | "h3" | "h4";
  const LeftTag = (data?.subTextLeftTag || "h4") as "h3" | "h4" | "h5";
  const RightTag = (data?.subTextRightTag || "h4") as "h3" | "h4" | "h5";

  const renderBox = (
    box: { name: string; paragraph: string },
    index: number,
    expanded: boolean,
    toggle: (i: number) => void,
  ) => (
    <div
      key={index}
      className={cn(
        "mb-4 flex w-[90%] flex-row items-start justify-between rounded-[2vh] p-6 shadow-benefit-box transition-colors duration-300",
        expanded ? "bg-[#D3EFFF]" : "bg-white",
      )}
    >
      <div className="flex-1">
        <p className="font-heading text-small font-medium text-ink-900">{box.name}</p>
        {expanded && (
          <p className="mt-[1vh] font-heading text-caption text-ink-700">{box.paragraph}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => toggle(index)}
        className="ml-3 shrink-0"
        aria-label={expanded ? "Collapse" : "Expand"}
      >
        <Image src={minusIcon} alt="" className="h-[5vh] w-[5vh]" />
      </button>
    </div>
  );

  return (
    <div className="self-center bg-benefit-fade px-3 sm:px-4 md:px-6">
      <HeaderTag
        className="mb-[1vh] text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="flex w-full flex-col justify-center min-[992px]:flex-row min-[992px]:gap-x-6">
        <div className="my-3 flex flex-col items-center min-[992px]:my-9 min-[992px]:flex-[0.4]">
          <LeftTag
            className="mb-[1vh] text-center font-heading text-h4-mobile text-ink-900 sm:text-h4-tablet lg:text-h4"
            dangerouslySetInnerHTML={{ __html: data?.subTextLeft ?? "" }}
          />
          {data?.listArray.slice(0, 3)?.map((box, index) =>
            renderBox(box, index, !!expandedBoxes[index], toggleBox),
          )}
        </div>
        <div className="my-3 flex flex-col items-center min-[992px]:my-9 min-[992px]:flex-[0.4]">
          <RightTag
            className="mb-[1vh] text-center font-heading text-h4-mobile text-ink-900 sm:text-h4-tablet lg:text-h4"
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
