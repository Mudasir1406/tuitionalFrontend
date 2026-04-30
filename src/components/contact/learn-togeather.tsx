"use client";

import Image from "next/image";
import React from "react";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import globe from "../../../public/assets/images/svg/globe.svg";
import hat from "../../../public/assets/images/svg/hat.svg";

const LearnTogeather: React.FC = () => {
  const { t, isRTL } = useI18n();

  return (
    <div className="relative flex w-full flex-wrap justify-center bg-brand-50 lg:w-[60vw] lg:justify-start">
      <div>
        <div className="absolute z-[22] start-[30%] top-[11%] md:start-[33%] md:top-[22%] lg:start-[9%] lg:top-[26%]">
          <Image src={hat} alt="hat" priority width={70} />
        </div>
        <h1
          className={cn(
            "relative text-h1-mobile sm:text-h1-tablet lg:text-h1 text-center lg:text-start",
            isRTL ? "font-arabic" : "font-heading",
          )}
        >
          {t("contact.learn_together.heading_1")}
        </h1>
        <h2
          className={cn(
            "relative text-h2-mobile sm:text-h2-tablet lg:text-h2 text-center lg:text-start text-brand-500",
            isRTL ? "font-arabic" : "font-heading",
          )}
        >
          {t("contact.learn_together.heading_2")}
        </h2>
      </div>

      <Image src={globe} alt="globe" priority height={100} />
    </div>
  );
};

export default LearnTogeather;
