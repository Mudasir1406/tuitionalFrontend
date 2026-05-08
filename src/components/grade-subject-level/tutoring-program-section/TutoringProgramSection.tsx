"use client";

import React from "react";
import PopUpButton from "@/components/pop-up-button";

interface props {
  data: {
    headerTag: string;
    header: string;
    paragraph: string;
    buttonTitle: string;
    buttonLink: string;
  };
}

const HEADER_SIZE: Record<"h2" | "h3" | "h4", string> = {
  h2: "text-h2-mobile sm:text-h2-tablet lg:text-h2",
  h3: "text-h3-mobile sm:text-h3-tablet lg:text-h3",
  h4: "text-h4-mobile sm:text-h4-tablet lg:text-h4",
};

const BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center justify-center rounded-[10px] bg-[#009bf5] px-[25px] py-[1.5vh] font-heading text-sm font-normal normal-case leading-[23px] tracking-[-0.02em] text-white shadow-[1px_15px_34px_0_rgba(0,0,0,0.2)] transition-colors hover:bg-[#009bf5] md:px-[22px] md:py-[2vh] lg:px-[25px]";

function TutoringProgramSection({ data }: props) {
  const tag = (data?.headerTag?.trim() || "h3").toLowerCase() as "h2" | "h3" | "h4";
  const HeaderTag = tag;
  const handleRedirect = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="bg-[linear-gradient(to_top,#d7f0ff,rgba(255,255,255,0.7))] px-[5vw] pb-[5vh] text-center sm:pb-[7vh]">
      <HeaderTag
        className={`font-heading text-[rgba(0,0,0,0.87)] ${HEADER_SIZE[tag]}`}
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div
        className="mt-[2.5vh] font-heading text-[0.875rem] leading-[1.43] text-[rgba(0,0,0,0.87)]"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      {data?.buttonTitle && (
        <div className="mt-6 flex justify-center">
          {data?.buttonLink === "popup" ? (
            <PopUpButton
              text={data.buttonTitle}
              href="popup"
              className={BUTTON_CLASSES}
            />
          ) : (
            <button
              type="button"
              onClick={() => handleRedirect(data.buttonLink)}
              className={BUTTON_CLASSES}
            >
              {data.buttonTitle}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TutoringProgramSection;
