"use client";

import Image from "next/image";
import React from "react";
import counsling from "../../../public/assets/images/static/Guidence.png";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";
import Tag from "../tag/Tag";
import { redirectToExternal } from "@/utils/helper";

const WhyChoose: React.FunctionComponent<{
  data: PageData["why_igsce"];
}> = ({ data }) => {
  const SectionTag = (data.sectionTag ?? "h3") as "h2" | "h3" | "h4";
  const HeaderTag = (data.headerTag ?? "h3") as "h2" | "h3" | "h4";
  const reverse = !!data?.right_to_left;

  const buttonClass =
    "my-[2vh] w-full rounded-[10px] px-[3vh] py-[1.5vh] text-[1.8vh] font-bold sm:px-[4vh] sm:py-[2vh] sm:text-[2vh] md:text-[2vh] lg:py-[1.5vh] lg:text-[2vh]";
  const buttonStyle: React.CSSProperties = {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    color: "white",
  };

  return (
    <div>
      <div className="px-[5vw]">
        {data?.subjects && data?.subjects?.length > 0 && (
          <SectionTag
            className={`${leagueSpartan.className} text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900`}
            dangerouslySetInnerHTML={{ __html: data?.section }}
          />
        )}
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
          <div className={reverse ? "order-1 lg:order-2" : "order-1 lg:order-1"}>
            <HeaderTag
              className={`${leagueSpartan.className} w-[80vw] py-[2vh] font-heading text-h3-mobile sm:py-[2.5vh] sm:text-h3-tablet md:py-[3vh] lg:w-[40vw] lg:py-[3vh] lg:text-h3 text-ink-900`}
              dangerouslySetInnerHTML={{ __html: data?.header }}
            />
            <p
              className={`${leagueSpartan.className} w-[80vw] font-heading text-body text-ink-900 lg:w-[40vw]`}
              dangerouslySetInnerHTML={{ __html: data?.paragraph }}
            />
            <div className="mr-auto flex max-w-full flex-col justify-between md:max-w-[90%] lg:flex-row">
              {data?.subjects && data?.subjects?.length > 0 && (
                <div className={data?.buttonLink ? "w-auto lg:w-3/4" : "w-auto"}>
                  <p
                    className={`${leagueSpartan.className} w-[80vw] py-[2vh] font-heading text-h6 sm:py-[2.5vh] md:py-[3vh] lg:w-[40vw] lg:py-[3vh] text-ink-900`}
                  >
                    {data?.focusArea}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data?.subjects?.map((tag, index) => (
                      <Tag
                        key={index}
                        label={tag.name}
                        link={tag?.link}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              {data?.buttonLink && (
                <div className="flex items-end">
                  {data?.buttonLink === "popup" ? (
                    <PopUpButton
                      text={data?.buttonText}
                      href="popup"
                      className={buttonClass}
                      style={buttonStyle}
                    />
                  ) : (
                    data?.buttonText && (
                      <button
                        type="button"
                        onClick={() => redirectToExternal(data?.buttonLink)}
                        className={`${leagueSpartan.className} ${buttonClass}`}
                        style={buttonStyle}
                      >
                        {data?.buttonText}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={reverse ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
            <Image
              src={data?.image ? data?.image : counsling}
              alt="Counseling Image"
              width={counsling.width}
              height={Math.floor(counsling.height / 1.4)}
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
