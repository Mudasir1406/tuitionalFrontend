"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import tutors from "../../../public/assets/images/static/about-hero-2.png";

const HeroInfo: React.FC = () => {
  const { isRTL } = useI18n();

  return (
    <div className="relative mt-[15px] flex h-full w-full items-center justify-end sm:mt-[15px] md:mt-[15px] lg:mt-0">
      <div className="-mt-[100px] me-20 flex animate-pulse flex-col gap-[2vh] rounded-md">
        <Image
          src={tutors.src}
          alt={isRTL ? "معلم" : "teacher"}
          width={tutors.width}
          height={tutors.height}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default HeroInfo;
