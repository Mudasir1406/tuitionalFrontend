"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useI18n } from "@/context/language-context";
import PopUpButton from "../pop-up-button";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import type { GetStartedData } from "../../services/get-started/get-started";
import type { StaticImageData } from "next/dist/shared/lib/get-img-props";

interface IProps {
  data: GetStartedData[];
}

const breakPoints = {
  320: { slidesPerView: 1, spaceBetween: 10 },
  520: { slidesPerView: 1, spaceBetween: 10 },
  700: { slidesPerView: 2, spaceBetween: 10 },
  1040: { slidesPerView: 3, spaceBetween: 10 },
};

const GetStarted: React.FC<IProps> = ({ data }) => {
  const { t } = useI18n();
  const accent = t("home.get_started.heading_accent");
  const tail = t("home.get_started.heading_tail");

  return (
    <div>
      <h2 className="relative mb-5 ps-1 text-center font-heading text-h2-mobile sm:ps-5 sm:text-h2-tablet md:ps-5 lg:ps-0 lg:text-h2 text-black">
        <Image
          src={linesMobile}
          alt=""
          aria-hidden="true"
          className="absolute -top-5 left-[14%] z-10 h-[50px] w-[50px] object-contain sm:hidden"
        />
        <Image
          src={linesInvert}
          alt=""
          aria-hidden="true"
          className="absolute z-10 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:left-[18%] sm:block md:left-[36%]"
        />
        {t("home.get_started.heading_lead")}
        {accent && <span className="text-brand-500">{accent}</span>}
        {tail}
      </h2>

      <div className="hidden flex-row lg:flex">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((item, index) => (
            <GetStartedBox key={index} {...(item as any)} />
          ))}
        </div>
      </div>

      <div className="block w-full overflow-hidden pb-10 lg:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={breakPoints}
          breakpointsBase="window"
          loop={data?.length >= 3}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          pagination={{ dynamicBullets: true }}
          style={{ width: "100%" }}
        >
          {data?.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <GetStartedBox {...(item as any)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GetStarted;

interface BoxProps {
  heading: string;
  description: string;
  image: StaticImageData;
  ButtonText: string;
}

const GetStartedBox: React.FC<BoxProps> = ({ heading, description, image, ButtonText }) => (
  <div className="m-1 flex h-auto w-full flex-col items-center rounded-md bg-brand-50 p-[10px] lg:m-[10px] lg:w-auto">
    <div className="flex w-full max-w-[300px] items-center justify-center">
      <Image
        src={image}
        alt=""
        width={300}
        height={300}
        className="h-auto w-full object-cover"
      />
    </div>
    <strong className="mt-4 mb-4 block text-center font-heading text-h4-mobile lg:text-h4">
      {heading}
    </strong>
    <p className="mb-6 text-center font-heading text-small">{description}</p>
    <PopUpButton
      text={ButtonText}
      href="popup"
      className="mb-9 w-[249px] rounded-[10px] bg-brand-500 p-[18px] text-button-mobile font-bold tracking-[-0.02em] text-white sm:text-button shadow-[1px_15px_34px_0px_#38B6FF66] hover:bg-brand-500"
    />
  </div>
);
