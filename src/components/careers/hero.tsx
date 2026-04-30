"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/language-context";
import { scrollToApplyForm } from "@/utils/helper";

const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full lg:pb-[15vh]">
      <h1 className="relative w-full text-center font-heading text-h1-mobile sm:mt-[5vh] sm:text-h1-tablet lg:w-[80%] lg:text-start lg:text-h1 text-black">
        {t("careers.hero.heading_line_1")}
        <br />
        {t("careers.hero.heading_line_2_lead")}{" "}
        <span className="relative inline text-success">
          {" "}
          {t("careers.hero.heading_line_2_accent")}{" "}
        </span>
      </h1>

      <p className="mt-[22px] px-5 text-center font-body text-body-mobile sm:text-body lg:mt-[10px] lg:px-0 lg:text-start text-black">
        {t("careers.hero.description")}
      </p>

      <div className="mt-[5vh] flex w-full items-center justify-center lg:mb-[10vh] lg:block lg:w-[70%]">
        <Button
          variant="primary"
          onClick={scrollToApplyForm}
          className="w-1/2 rounded-md px-0 py-[2vh] shadow-[1px_4px_24px_0px_#38B6FFB2]"
        >
          {t("careers.hero.cta")}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
