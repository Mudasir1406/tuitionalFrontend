"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useI18n } from "@/context/language-context";
import tutors from "../../../public/assets/images/static/tutors.png";

const HeroInfo: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="relative mt-[15px] flex h-full w-full items-center justify-between md:mt-0 lg:mt-auto lg:h-[70%]">
      <div className="relative -mt-[100px] flex w-[150px] flex-col rounded-md border border-white/[0.18] bg-white/60 p-[1.2vh] shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)] backdrop-blur-[7.5px] sm:w-[170px] sm:p-[2.5vh] md:w-[190px] md:p-[2.9vh] lg:w-[280px] lg:p-[3.3vh]">
        <p className="font-body text-[1.3vh] font-normal leading-[1.4vh] text-black md:text-[1.4vh] md:leading-[1.5vh] lg:text-[1.6vh] lg:leading-[2vh]">
          {t("testimonials.hero_info.review_quote")}
        </p>
        <div className="my-[2px] flex sm:my-[5px] lg:my-[10px]">
          {[0, 0, 0, 0, 0].map((_, index) => (
            <Star
              key={index}
              className="h-[2vh] w-[2vh] fill-[#FFCD6C] text-[#FFCD6C]"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[2vh] -mt-[100px] rounded-md">
        <div className="flex h-[49px] w-[163px] items-center justify-center gap-[10px] rounded-md border border-white/[0.18] bg-white/60 -mt-[100px] backdrop-blur-[7.5px] sm:h-[55px] sm:w-[210px] md:h-[62px] md:w-[220px] lg:h-[73px] lg:w-[235px]">
          <span className="me-[0.2vw] flex h-[4.5vh] w-[4.5vh] items-center justify-center rounded-[5px] bg-brand-500 text-center text-[1.5vh] font-semibold leading-[1.4vh] text-white sm:h-[5.2vh] sm:w-[4.7vh] sm:rounded-[7.5px] md:h-[5.2vh] md:w-[4.7vh] md:rounded-[10px] md:text-[1.7vh] md:leading-[1.7vh] lg:h-[5.5vh] lg:w-[9vh] lg:rounded-[15px] lg:text-[2.5vh] lg:leading-[2vh]">
            {t("testimonials.hero_info.client_count")}
          </span>
          <span className="font-body text-[1.3vh] font-semibold leading-[1.3vh] text-black sm:text-[1.6vh] sm:leading-[1.6vh]">
            {t("testimonials.hero_info.client_label")}
          </span>
        </div>

        <div className="relative flex flex-col rounded-md border border-white/[0.18] bg-white/60 p-[2vh] shadow-[0px_0px_30px_0px_#38B6FF33] backdrop-blur-[7.5px]">
          <Image
            src={tutors.src}
            width={tutors.width}
            height={tutors.height}
            alt={t("testimonials.hero_info.tutors_alt")}
            className="w-[150px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroInfo;
