"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import girlInCircle from "../../../public/assets/images/static/Girl_in_circle.png";

const ReviewsOnSp: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 gap-8 bg-[linear-gradient(360deg,rgba(211,239,255,0)_0%,#D3EFFF_6.36%,#D3EFFF_44.4%,rgba(211,239,255,0)_100%)] lg:grid-cols-12 lg:bg-none">
      <div className="lg:col-span-7">
        <div className="relative mt-[70px] flex h-full w-full justify-center sm:mt-[60px] md:mt-[60px] lg:mt-0">
          <Image
            src={girlInCircle.src}
            width={girlInCircle.width}
            height={girlInCircle.height}
            alt={t("testimonials.reviews_on_sp.image_alt")}
            className="h-auto w-[90%]"
          />
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="pb-[52px]">
          <h2 className="relative mt-[70px] px-[50px] text-center font-heading text-h2-mobile sm:mt-[80px] sm:text-h2-tablet md:mt-[95px] lg:mt-[105px] lg:px-0 lg:text-start lg:text-h2 text-black">
            <Image
              src={linesMobile}
              alt=""
              aria-hidden="true"
              className="absolute -top-5 left-10 z-10 h-[35px] w-[43px] object-contain sm:hidden"
            />
            <Image
              src={linesInvert}
              alt=""
              aria-hidden="true"
              className="absolute z-10 hidden h-[35px] w-[43px] object-contain sm:left-[10px] sm:top-[10px] sm:block md:-left-[30px] md:-top-[30px] lg:-left-[30px] lg:-top-[50px]"
            />
            {t("testimonials.reviews_on_sp.heading_line_1")} <br />
            {t("testimonials.reviews_on_sp.heading_line_2")}
          </h2>

          <p className="px-[50px] text-center text-[18px] font-normal leading-[25px] sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] lg:w-[60%] lg:px-0 lg:text-start lg:text-[25px] lg:leading-[40px] text-black font-heading">
            {t("testimonials.reviews_on_sp.description")}
          </p>

          <div className="mt-20 flex flex-row items-center justify-center ps-[50px] lg:ps-0">
            <span className="font-heading text-[60px] font-bold leading-[55px] text-brand-500 lg:text-[85px] lg:leading-[65px] lg:text-black">
              {t("testimonials.reviews_on_sp.percent")}
            </span>
            <div className="mx-2 self-stretch border-s border-black" />
            <p className="text-[18px] font-normal leading-[25px] sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] lg:w-[60%] lg:text-[25px] lg:leading-[40px] text-black font-heading">
              {t("testimonials.reviews_on_sp.complete_line_1")}
              <br />
              {t("testimonials.reviews_on_sp.complete_line_2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsOnSp;
