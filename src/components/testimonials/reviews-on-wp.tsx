"use client";

import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/language-context";
import Waveform from "./wave-form";
import type { WP_Reviews_Type } from "@/services/reviews-on-wp/reviews-on-wp";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";

interface Props {
  reviews: WP_Reviews_Type[];
}

const ReviewsOnWp = ({ reviews }: Props) => {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(false);

  const handleLoadMore = () => setShowAll((prev) => !prev);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <div className="-z-[2] flex h-full w-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3EFFE] to-white/70">
      <h2 className="relative mt-[70px] text-center font-heading text-h2-mobile sm:text-h2-tablet sm:mt-20 md:mt-[95px] lg:mt-[105px] lg:text-h2 text-black">
        <Image
          src={linesMobile}
          alt=""
          aria-hidden="true"
          className="absolute -left-[10px] -top-5 z-10 h-[35px] w-[43px] object-contain sm:hidden"
        />
        <Image
          src={linesInvert}
          alt=""
          aria-hidden="true"
          className="absolute -left-[35px] -top-[35px] z-10 hidden h-[35px] w-[43px] object-contain sm:block"
        />
        {t("testimonials.reviews_on_wp.heading")}
      </h2>

      <div className="my-[50px] grid w-full grid-cols-1 items-center justify-center gap-y-4 lg:max-w-[1260px] lg:grid-cols-2 lg:gap-x-4">
        {displayedReviews.map((item, index) => (
          <div key={index} className="flex justify-center">
            <Waveform audio={item.audio} image={item.imageUrl} />
          </div>
        ))}
      </div>

      <p className="font-body text-small">
        {t("testimonials.reviews_on_wp.trust_line")}
      </p>

      {!showAll && (
        <Button
          onClick={handleLoadMore}
          className="mt-5 w-[220px] rounded-md bg-white px-0 py-[18px] text-[#009BF5] shadow-[1px_15px_34px_0px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out hover:scale-[1.06] hover:bg-white"
        >
          {t("testimonials.reviews_on_wp.load_more")}
        </Button>
      )}
    </div>
  );
};

export default ReviewsOnWp;
