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
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="mx-[1vh] lg:mx-[4vh]">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div
        className="mx-auto p-[2vh] text-center font-heading text-body text-ink-900 lg:w-[55%]"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      <div className="mx-auto max-w-full md:max-w-[80vw] lg:px-[2vh]">
        <div className="flex flex-col gap-2">
          {data?.faqs.map((item, index) => (
            <div
              key={index}
              className={cn(
                "min-w-[300px] rounded-[2vh] p-[3vh] backdrop-blur-sm transition-colors mt-[1vh] md:mt-[3vh]",
                expanded === index ? "bg-brand-200" : "bg-[#F3FBFF]",
              )}
            >
              <div className="flex items-center justify-between">
                <p
                  className="font-heading text-h6 font-semibold text-ink-900"
                  dangerouslySetInnerHTML={{ __html: item?.question }}
                />
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === index ? 0 : index)}
                  className="cursor-pointer"
                  aria-label="Toggle answer"
                >
                  <Image
                    src={expanded === index ? upicon : downicon}
                    alt=""
                    className="h-[4vh] w-[4vh]"
                  />
                </button>
              </div>
              {expanded === index && (
                <p
                  className="mt-[2vh] font-heading text-body text-ink-700"
                  dangerouslySetInnerHTML={{ __html: item?.answer }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyQuestions;
