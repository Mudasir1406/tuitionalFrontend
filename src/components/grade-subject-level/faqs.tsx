"use client";

import React, { useState } from "react";
import Image from "next/image";

import { cn } from "@/utils/cn";
import { PageData } from "@/types/grade-subject-level.types";
import upicon from "../../../public/assets/images/svg/Upicon.svg";
import downicon from "../../../public/assets/images/static/Downicon.png";

type IProps = { data: PageData["Faqs"] };

const FrequentlyQuestions: React.FC<IProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<number>(0);
  const HeaderTag = ((data?.headerTag || "h3").toLowerCase()) as
    | "h2"
    | "h3"
    | "h4";

  return (
    <div className="mx-[1vh] lg:mx-[4vh]">
      <HeaderTag
        className="text-center font-heading font-semibold text-ink-900 text-h2-mobile sm:text-h2-tablet md:text-h2 lg:text-h2"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div
        className="mx-auto text-center font-heading font-normal text-[#2D2D2D] text-[0.875rem] leading-[1.5] py-[2vh] sm:p-[2vh] lg:w-[55%]"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      <div className="mx-auto w-full max-w-full md:max-w-[80vw] lg:px-[2vh]">
        <div className="flex flex-col gap-2">
          {data?.faqs.map((item, index) => {
            const isOpen = expanded === index;
            return (
              <div
                key={index}
                className={cn(
                  "min-w-[300px] w-full box-border rounded-[2vh] p-[3vh] mt-[3vh] backdrop-blur-[5px] transition-colors",
                  isOpen ? "bg-brand-200" : "bg-[#F3FBFF]",
                )}
              >
                <div className="flex items-center justify-between">
                  <p
                    className="m-0 font-heading font-medium uppercase tracking-[0.05em] text-[0.875rem] leading-[1.4] text-ink-900"
                    dangerouslySetInnerHTML={{ __html: item?.question }}
                  />
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? 0 : index)}
                    className="cursor-pointer shrink-0"
                    aria-label="Toggle answer"
                    aria-expanded={isOpen}
                  >
                    <Image
                      src={isOpen ? upicon : downicon}
                      alt=""
                      className="h-[4vh] w-[4vh]"
                    />
                  </button>
                </div>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className="m-0 mt-[2vh] font-heading font-normal text-[0.875rem] leading-[1.5] text-ink-700"
                      dangerouslySetInnerHTML={{ __html: item?.answer }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyQuestions;
