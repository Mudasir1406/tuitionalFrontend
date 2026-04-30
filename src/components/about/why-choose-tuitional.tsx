"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import scholarHat from "../../../public/assets/images/svg/scholarHat.svg";
import book from "../../../public/assets/images/svg/book.svg";
import calendar from "../../../public/assets/images/svg/calendar.svg";

type IconKey = "scholarHat" | "book" | "calendar";

const iconMap: Record<IconKey, { src: any; alt: string }> = {
  scholarHat: { src: scholarHat, alt: "scholar hat" },
  book: { src: book, alt: "book" },
  calendar: { src: calendar, alt: "calendar" },
};

interface InfoBoxProps {
  heading: string;
  dec: string;
  icon: IconKey;
}

const InfoBox: React.FC<InfoBoxProps> = ({ heading, dec, icon }) => {
  const { src, alt } = iconMap[icon];
  return (
    <div className="relative flex h-auto min-h-[250px] w-full flex-col items-center justify-center rounded-md bg-white/70 p-6 shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] sm:mx-6 sm:h-[280px] sm:w-[320px] md:h-[320px] md:w-[360px] lg:h-[400px] lg:w-[380px] xl:h-[460px] xl:w-[420px]">
      <div className="mb-[10px] flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526] sm:mb-5 sm:h-[55px] sm:w-[55px] md:mb-[30px] md:h-[75px] md:w-[75px] lg:-mt-20 lg:mb-10 lg:h-[115px] lg:w-[115px]">
        <div className="h-5 w-5 sm:h-[30px] sm:w-[30px] md:h-[45px] md:w-[45px] lg:h-[45px] lg:w-[45px]">
          <Image src={src} alt={alt} className="h-full w-full" />
        </div>
      </div>
      <div className="h-[35%]">
        <h3 className="mb-[10px] text-center font-heading text-[16px] font-semibold leading-5 sm:mb-[15px] sm:text-[18px] sm:leading-[22px] md:mb-[18px] md:text-[20px] md:leading-6 lg:mb-[22px] lg:text-2xl lg:leading-7 xl:text-[28px] xl:leading-8">
          {heading}
        </h3>
        <p className="mx-auto max-w-full text-center font-heading text-[12px] leading-4 text-ink-800 sm:max-w-[280px] sm:text-[13px] sm:leading-[17px] md:max-w-[320px] md:text-[14px] md:leading-[18px] lg:max-w-[340px] lg:text-[15px] lg:leading-5 xl:max-w-[380px] xl:text-base xl:leading-[22px]">
          {dec}
        </p>
      </div>
    </div>
  );
};

const WhyChooseTuitional: React.FC = () => {
  const { t, isRTL } = useI18n();
  const dict = isRTL ? ar : en;
  const items = dict.about.why_choose.items;

  return (
    <div>
      <div className="mb-auto flex w-full flex-col items-center bg-transparent lg:mb-6">
        <h2 className="relative mb-5 mt-10 flex items-center justify-center text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black">
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -top-3 left-[11%] h-[19px] w-5 object-contain sm:hidden"
          />
          <Image
            src={linesInvert}
            alt=""
            aria-hidden="true"
            className="absolute -left-[6%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block"
          />
          {t("about.why_choose.heading")}
        </h2>
      </div>

      <div className="flex w-full flex-wrap items-stretch justify-center gap-y-4 lg:flex-row lg:gap-x-6 lg:gap-y-0">
        {items.map((item, i) => (
          <div
            key={i}
            className="mb-4 flex w-full justify-center sm:w-full md:w-[90%] lg:mb-0 lg:w-auto"
          >
            <InfoBox heading={item.heading} dec={item.dec} icon={item.icon as IconKey} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseTuitional;
