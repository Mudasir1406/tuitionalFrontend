import React from "react";
import Image from "next/image";

import PopUpButton from "../pop-up-button";
import { PageData } from "@/types/grade-subject-level.types";
import elpse1 from "../../../public/assets/images/svg/elpse-white1.svg";
import elpse2 from "../../../public/assets/images/svg/elpse-white2.svg";

const BlogCta: React.FC<{ data: PageData["blog_CTA"] }> = ({ data }) => {
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="relative my-[10vh] px-[5vw]">
      <HeaderTag
        className="w-full text-start font-heading text-h3-mobile sm:w-[90%] sm:text-h3-tablet lg:h-[10vh] lg:w-[70vw] lg:text-h2 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="flex flex-col items-center justify-between gap-[2vh] lg:flex-row lg:gap-0">
        <div
          className="w-full py-[2vh] text-justify font-heading text-body-mobile text-ink-700 lg:w-[55vw] lg:py-[8vh] lg:pb-[5vh] lg:text-start lg:text-body"
          dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
        />
        <div>
          <PopUpButton
            href={data.link}
            text={data.buttonText}
            className="my-[3vh] w-full sm:my-[2vh] lg:mb-0 lg:me-[20vh] lg:ms-0 lg:mt-[5vh] lg:w-auto"
            style={{
              boxShadow: "1px 4px 24px 0px #38B6FFB2",
              backgroundColor: "#38B6FF",
              fontSize: "2vh",
              fontWeight: 700,
              paddingTop: "1.5vh",
              paddingBottom: "1.5vh",
              paddingLeft: "4vh",
              paddingRight: "4vh",
              borderRadius: "10px",
              color: "white",
            }}
          />
        </div>
      </div>

      <div className="absolute right-5 top-5 hidden lg:block">
        <Image src={elpse1} alt="" aria-hidden="true" />
      </div>
      <div className="absolute right-0 hidden lg:block">
        <Image src={elpse2} alt="" aria-hidden="true" className="h-[14vh]" />
      </div>
    </div>
  );
};

export default BlogCta;
