"use client";

import React from "react";
import { useI18n } from "@/context/language-context";

const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="flex h-full max-h-[700px] w-full flex-col justify-center">
      <h1 className="mt-[2vh] px-[2vw] text-center font-heading text-h1-mobile font-bold sm:mt-[3vh] sm:text-h1-tablet md:mt-[4vh] lg:w-[90%] lg:px-0 lg:text-start lg:text-h1 text-black">
        {t("about.hero.heading_lead")}
        <span className="inline font-bold text-brand-500">
          {t("about.hero.heading_accent")}
        </span>
        {t("about.hero.heading_tail")}
      </h1>
      <p className="mt-[3vh] px-[2vh] text-center font-heading text-body-mobile font-normal sm:mt-[4vh] sm:text-body md:mt-[5vh] lg:px-0 lg:text-start text-black">
        {t("about.hero.description")}
      </p>
    </div>
  );
};

export default Hero;
