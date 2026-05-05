"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";

import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import linesInvertWhite from "../../../public/assets/images/static/lines-invert-white.png";
import linesMobileWhite from "../../../public/assets/images/static/linesMobileWhite.png";
import type { Testimonials_Type } from "@/services/testimonials/testimonials";

interface IProps {
  data: Testimonials_Type[];
}

const OurClient: React.FC<IProps> = ({ data }) => {
  const { t, isRTL } = useI18n();
  const swiper = useRef<SwiperRef | null>(null);
  const swiperPrev = () => swiper.current?.swiper.slidePrev();
  const swiperNext = () => swiper.current?.swiper.slideNext();
  const duplicatedData = data?.length < 3 ? [...data, ...data, ...data] : data;
  const testimonialsHref = isRTL ? "/ar/testimonials" : "/testimonials";

  return (
    <div className="relative my-[60px] flex flex-row items-center justify-center bg-gradient-to-b from-[#00A1FE] to-[#0D84C9] py-[90px] sm:my-[70px] sm:py-[100px] md:my-20 md:py-[110px] lg:my-10 lg:flex-col lg:py-[140px]">
      <div className="relative flex w-full flex-col items-center justify-center lg:hidden">
        <div className="flex flex-col items-center">
          <h2 className="relative mb-[17px] text-center font-heading text-h2-mobile sm:text-h2-tablet md:text-start md:text-h2-tablet md:mb-[10px] lg:text-h2 text-white">
            <Image
              src={linesMobileWhite}
              alt=""
              aria-hidden="true"
              className="absolute -left-[15px] -top-[15px] z-10 h-[35px] w-[43px] object-contain sm:hidden"
            />
            <Image
              src={linesInvertWhite}
              alt=""
              aria-hidden="true"
              className="absolute -left-10 -top-[35px] z-10 hidden h-[35px] w-[43px] object-contain sm:block"
            />
            {t("home.our_client.heading")}
          </h2>
          <p className="px-5 text-center font-heading text-body-mobile sm:px-[22px] sm:text-body md:px-0 lg:px-0 lg:text-start text-white">
            {t("home.our_client.description")}
          </p>
          <Link
            href={testimonialsHref}
            className="mt-5 inline-flex w-[249px] items-center justify-center rounded-md bg-white px-0 py-[18px] font-heading text-[25px] font-bold leading-[18.4px] tracking-[-0.02em] text-[#009BF5] shadow-[1px_15px_34px_0px_#38B6FF66]"
          >
            {t("home.our_client.read_more")}
          </Link>
        </div>

        <div className="mt-8 flex w-full items-center justify-center sm:mt-[15px] md:mt-[15px] lg:mt-[15px]">
          <Swiper
            ref={swiper}
            centeredSlides
            grabCursor
            style={{ height: "100%", display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}
            loop={duplicatedData?.length >= 3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay, Pagination, EffectCards]}
            effect="cards"
            cardsEffect={{ perSlideOffset: 5, slideShadows: false, perSlideRotate: 1 }}
          >
            {duplicatedData?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{ display: "flex", borderRadius: 10, alignItems: "center", justifyContent: "center" }}
              >
                <ReviewMobile item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-5 flex">
          <button
            type="button"
            onClick={swiperPrev}
            className="mx-[10px] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/70 shadow-[0px_-3px_8px_0px_#00000026_inset] hover:bg-white/90"
            aria-label="Previous"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={swiperNext}
            className="mx-[10px] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/70 shadow-[0px_-3px_8px_0px_#00000026_inset] hover:bg-white/90"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="relative hidden w-full lg:flex">
        <div className="mx-20 w-1/5">
          <h2 className="relative mb-[10px] text-start font-heading text-h2 text-white">
            <Image
              src={linesInvertWhite}
              alt=""
              aria-hidden="true"
              className="absolute -left-10 -top-[35px] z-10 h-[35px] w-[43px] object-contain"
            />
            {t("home.our_client.heading")}
          </h2>
          <p className="text-start font-heading text-body text-white">
            {t("home.our_client.description")}
          </p>
          <Link
            href={testimonialsHref}
            className="mt-[100px] inline-flex w-[249px] items-center justify-center rounded-md bg-white px-0 py-[18px] font-heading text-[20px] font-bold leading-[18.4px] tracking-[-0.02em] text-[#009BF5] shadow-[1px_15px_34px_0px_#38B6FF66]"
          >
            {t("home.our_client.read_more")}
          </Link>
        </div>

        <Swiper
          ref={swiper}
          centeredSlides
          grabCursor
          style={{ height: "100%", marginTop: 10, display: "flex", width: "70%" }}
          loop={data?.length >= 3}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, EffectCards]}
          effect="cards"
          cardsEffect={{ perSlideOffset: 4, slideShadows: false, perSlideRotate: 1 }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", borderRadius: 10, paddingLeft: "12vw" }}
            >
              <Review item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-[100px] hidden w-full items-center justify-evenly lg:flex">
        <div>
          <p className="font-heading text-[70px] font-semibold leading-[65px] text-white">25K+</p>
          <p className="font-heading text-[20px] font-normal leading-[30px] text-white">
            {t("home.our_client.classes")}
          </p>
        </div>
        <div className="self-stretch border-s border-white" />
        <div>
          <p className="font-heading text-[70px] font-semibold leading-[65px] text-white">600K+</p>
          <p className="font-heading text-[20px] font-normal leading-[30px] text-white">
            {t("home.our_client.members")}
          </p>
        </div>
        <div className="self-stretch border-s border-white" />
        <div>
          <p className="font-heading text-[70px] font-semibold leading-[65px] text-white">8K+</p>
          <p className="font-heading text-[20px] font-normal leading-[30px] text-white">
            {t("home.our_client.teachers")}
          </p>
        </div>
        <div className="self-stretch border-s border-white" />
        <div>
          <div className="flex items-center">
            <p className="font-heading text-[70px] font-semibold leading-[65px] text-white">4.8</p>
            <div className="ms-4 flex">
              {[0, 0, 0, 0, 0].map((_, index) => (
                <Star key={index} className="text-white" size={18} />
              ))}
            </div>
          </div>
          <p className="font-heading text-[20px] font-normal leading-[30px] text-white">
            {t("home.our_client.rating")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurClient;

interface RProps {
  item: Testimonials_Type;
}

const Review: React.FC<RProps> = ({ item }) => (
  <div className="flex w-[70%] rounded-md bg-white shadow-[0px_-3px_8px_0px_#00000026_inset]">
    <Image
      src={item.imageUrl}
      width={400}
      height={450}
      alt="user"
      className="w-2/5 object-contain"
      style={{ maxHeight: "450px" }}
    />
    <div className="my-auto flex w-3/5 flex-col px-[28px] py-[60px] sm:px-[38px] md:px-[50px] lg:px-[50px]">
      <div className="mb-[10px] flex w-20 items-center justify-center rounded-md bg-[#E9B93D] px-[10px]">
        <Star className="h-[25px] w-[25px] text-white" />
        <span className="ms-[10px] mt-[3px] font-heading text-[20px] font-semibold leading-[35px] text-white">
          {item.rating.toFixed(1)}
        </span>
      </div>
      <p className="font-heading text-[2vh] font-normal leading-[4vh] sm:text-[2.2vh] sm:leading-[3.6vh] md:text-[2.4vh] md:leading-[3.2vh] lg:text-[2.8vh] lg:leading-[4vh] text-ink-800">
        {item.message}
      </p>
      <div className="mt-[4vh] flex items-center">
        <div>
          <p className="font-heading text-h5">{item.userName}</p>
          <p className="font-heading text-small text-ink-800">{item.country}</p>
        </div>
      </div>
    </div>
  </div>
);

const ReviewMobile: React.FC<RProps> = ({ item }) => (
  <div className="my-auto flex w-3/4 flex-col rounded-md bg-white px-[28px] py-[60px] sm:w-[400px] sm:px-[38px] md:w-[400px] md:px-[50px] lg:w-[400px]">
    <div className="mb-[10px] flex w-20 items-center justify-center rounded-md bg-[#E9B93D] px-[10px]">
      <Star className="h-[25px] w-[25px] text-white" />
      <span className="ms-[10px] mt-[3px] font-heading text-[20px] font-semibold leading-[35px] text-white">
        {item.rating.toFixed(1)}
      </span>
    </div>
    <p className="font-heading text-[2vh] font-normal leading-[4vh] sm:text-[2.2vh] sm:leading-[3.6vh] md:text-[2.4vh] md:leading-[3.2vh] lg:text-[2.8vh] lg:leading-[4vh] text-ink-800">
      {item.message}
    </p>
    <div className="mt-[4vh] flex items-center">
      <Image
        src={item.imageUrl}
        width={50}
        height={50}
        loading="lazy"
        alt="user"
        className="me-[10px] rounded-full"
      />
      <div>
        <p className="font-heading text-h5">{item.userName}</p>
        <p className="font-heading text-small text-ink-800">{item.country}</p>
      </div>
    </div>
  </div>
);
