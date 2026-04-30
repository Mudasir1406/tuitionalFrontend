"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { GetStartedData } from "../../services/get-started/get-started";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import type { StaticImageData } from "next/dist/shared/lib/get-img-props";

const PopUpButton = dynamic(() => import("../pop-up-button"));

type IProps = { data: GetStartedData[] };

const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 10 },
  520: { slidesPerView: 1, spaceBetween: 10 },
  700: { slidesPerView: 2, spaceBetween: 10 },
  1040: { slidesPerView: 3, spaceBetween: 10 },
};

const GetStarted: React.FC<IProps> = ({ data }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div>
      <p className="relative mb-5 mt-[70px] text-center font-heading text-h1-mobile sm:mt-20 sm:ps-5 sm:text-h1-tablet md:mt-[95px] md:ps-5 lg:mt-[75px] lg:ps-0 lg:text-h1 text-ink-900">
        <Image
          src={linesMobile}
          alt=""
          aria-hidden="true"
          className="absolute -top-5 left-[10%] z-10 h-[50px] w-[50px] object-contain sm:hidden"
        />
        <Image
          src={linesInvert}
          alt=""
          aria-hidden="true"
          className="absolute z-10 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:left-[10%] sm:block md:left-[23%] lg:-top-[30px] lg:left-[33%]"
        />
        Get Started in <span className="text-brand-500">3</span> Easy Steps!
      </p>

      <div className="mx-auto hidden w-[90%] flex-row items-center justify-center lg:flex">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((item, index) => (
            <GetStartedBox key={index} {...(item as any)} />
          ))}
        </div>
      </div>

      <div className="relative flex flex-row lg:hidden">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-[10px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink-200 sm:hidden"
          aria-label="Previous"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-[10px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink-200 sm:hidden"
          aria-label="Next"
        >
          <ArrowRight size={24} />
        </button>
        <Swiper
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides
          loop={data?.length >= 3}
          autoplay={{ delay: 5000 }}
          modules={[Pagination, Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          breakpoints={breakpoints}
          style={{ width: "100%" }}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <GetStartedBox {...(item as any)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GetStarted;

type Props = {
  heading: string;
  description: string;
  image: StaticImageData;
  ButtonText: string;
};

const GetStartedBox: React.FC<Props> = ({ heading, description, image, ButtonText }) => (
  <div className="mx-auto my-[10px] flex h-auto w-full flex-col items-center rounded-md bg-brand-50 px-[30px] py-[10px] lg:w-4/5 xl:w-[400px]">
    <div className="flex h-[150px] w-[300px] items-center justify-center sm:h-[250px] md:h-[250px]">
      <Image
        src={image}
        alt=""
        width={300}
        height={300}
        className="h-full w-full object-contain"
      />
    </div>
    <strong className="my-[2vh] text-center font-heading text-h4 text-ink-900">{heading}</strong>
    <p className="my-[2vh] text-center font-heading text-body text-ink-700">{description}</p>
    <PopUpButton
      href="popup"
      text={ButtonText}
      style={{
        boxShadow: "1px 15px 34px 0px #38B6FF66",
        margin: "2vh 0",
        backgroundColor: "#38B6FF",
        lineHeight: "18.4px",
        width: "249px",
        color: "white",
        padding: "18px",
        letterSpacing: "-0.02em",
        borderRadius: "10px",
      }}
    />
  </div>
);
