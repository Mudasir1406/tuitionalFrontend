"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import tutors from "../../../public/assets/images/static/tutors.png";

const HeroInfo: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="relative flex h-[100px] w-full items-end justify-between sm:h-[200px] md:h-full lg:h-full">
      <div className="relative -mt-[100px] flex flex-col rounded-md border border-white/[0.18] bg-white p-[2vw] shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)]">
        <p className="text-[1vh] font-bold leading-[1vh] text-black sm:text-[2.1vh] sm:leading-[2.1vh] md:text-[2.3vh] md:leading-[2.3vh] lg:text-[2.5vh] lg:leading-[3vh] font-heading">
          {t("careers.hero_info.vacancy_count")}
        </p>
        <p className="text-[0.6vh] font-normal leading-[10px] text-black sm:text-[0.8vh] sm:leading-5 md:text-[1vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px] font-heading">
          {t("careers.hero_info.vacancy_label")}
        </p>
        <p className="text-[0.8vh] font-bold leading-[10px] text-brand-500 sm:text-[1vh] sm:leading-5 md:text-[1.2vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px] font-heading">
          {t("careers.hero_info.apply_cta")}
        </p>
      </div>

      <div className="-mt-[100px] flex w-[72px] flex-col items-center justify-center gap-[10px] rounded-md sm:w-[170px] md:w-[190px] lg:w-[235px]">
        <div className="relative flex flex-col items-center justify-center rounded-md border border-white/[0.18] bg-white p-[10px] shadow-[0px_0px_30px_0px_#38B6FF33]">
          <Image
            src={tutors.src}
            width={tutors.width}
            height={tutors.height}
            alt={t("careers.hero_info.tutor_alt")}
            className="h-auto w-full"
          />
          <p className="text-[0.8vh] font-semibold leading-[10px] text-black sm:text-[1vh] sm:leading-5 md:text-[1.2vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px] font-heading">
            {t("careers.hero_info.employee_count")}
          </p>
          <p className="text-[0.8vh] font-semibold leading-[10px] text-black sm:text-[1vh] sm:leading-5 md:text-[1.2vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px] font-heading">
            {t("careers.hero_info.employee_label")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroInfo;
