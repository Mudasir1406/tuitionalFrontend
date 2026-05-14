"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import lines from "../../../../public/assets/images/static/lines.png";
import linesMobile from "../../../../public/assets/images/static/linesMobile.png";

const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h1 className="mb-[3vh] mt-[2vh] pr-[2vw] text-center font-heading text-h1-mobile sm:mt-[3vh] sm:text-h1-tablet lg:pr-0 lg:text-start lg:text-h1 text-black">
        {t("about.hero.heading_lead")}
        <span className="relative inline text-brand-500">
          {t("about.hero.heading_accent")}
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -left-[180px] -top-[2.5vh] z-10 h-[1.9vh] w-[2vh] object-contain sm:left-auto sm:right-0 lg:hidden"
          />
          <Image
            src={lines}
            alt=""
            aria-hidden="true"
            className="absolute -top-[3vh] right-0 z-10 hidden h-[4.3vh] w-[4.3vh] object-contain lg:block"
          />
        </span>
        {t("about.hero.heading_tail")}
      </h1>
      <p className="mt-[3vh] px-[2vh] text-center font-heading text-small lg:mt-[1vh] lg:w-[90%] lg:px-0 lg:text-start text-black">
        {t("about.hero.description")}
      </p>
    </div>
  );
};

export default Hero;
