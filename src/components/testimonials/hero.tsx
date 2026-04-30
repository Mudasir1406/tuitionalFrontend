"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/language-context";
import { redirectToTrustpilot, scrollToTestimonials } from "@/utils/helper";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";

const Hero: React.FC = () => {
  const { t } = useI18n();
  const tail = t("testimonials.hero.heading_line_2_tail");

  return (
    <div className="w-full">
      <h1 className="mt-[3vh] text-center font-heading text-h1-mobile sm:text-h1-tablet lg:w-[90%] lg:text-start lg:text-h1 text-black">
        {t("testimonials.hero.heading_line_1")} <br />
        {t("testimonials.hero.heading_line_2_lead")}
        <span className="relative inline text-success">
          {t("testimonials.hero.heading_line_2_accent")}
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute end-0 -top-[2.5vh] z-10 h-[1.9vh] w-[2vh] object-contain md:hidden"
          />
          <Image
            src={lines}
            alt=""
            aria-hidden="true"
            className="absolute end-0 -top-[3vh] z-10 hidden h-[4.3vh] w-[4.3vh] object-contain md:block"
          />
        </span>
        {tail}
      </h1>

      <p className="mt-[3vh] px-[2vh] text-center font-body text-body-mobile sm:text-body lg:mt-[1vh] lg:px-0 lg:text-start text-black">
        {t("testimonials.hero.description")}
      </p>

      <div className="mt-[3vh] flex w-full items-center justify-center lg:mt-[9vh] lg:mb-[19vh] lg:block lg:w-[70%]">
        <Button
          variant="primary"
          onClick={scrollToTestimonials}
          className="w-1/2 rounded-[1vh] px-0 py-[2vh] shadow-[0.5vh_0.5vh_2.5vh_0px_#38B6FFB2]"
        >
          {t("testimonials.hero.cta_view_more")}
        </Button>
        <Button
          variant="ghost"
          onClick={redirectToTrustpilot}
          className="w-1/2 px-0 py-[2vh] text-brand-500"
        >
          {t("testimonials.hero.cta_write_review")}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
