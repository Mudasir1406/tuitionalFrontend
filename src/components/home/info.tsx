"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Video } from "lucide-react";
import { useI18n } from "@/context/language-context";

import tutors from "../../../public/assets/images/static/tutors.png";
import homeImage from "../../../public/assets/images/static/girl-with-book.webp";

const Info = () => {
  const { t } = useI18n();

  return (
    <div className="relative mt-[2.5vh] flex h-60 w-full items-end justify-between sm:mt-[2vh] sm:h-96 md:mt-[1.5vh] md:h-[70vh] lg:mt-[1vh] lg:h-[80vh]">
      <div className="relative ms-[2%] mb-[5vh] flex w-[35vw] flex-col items-center justify-center gap-[0.5vh] rounded-[1vh] bg-white px-[2vw] py-[2.5vh] shadow-[0px_0px_30px_0px_#38B6FF33] animate-[bounce_5s_ease-in-out_infinite] sm:mb-[10vh] sm:w-[23vw] md:mb-[15vh] md:w-[25vw] lg:mb-[20vh] lg:w-[16vw]">
        <Image
          src={homeImage.src}
          width={0}
          height={0}
          alt={t("home.info.image_alt")}
        />
        <div className="absolute -top-[5vh] z-10 flex h-[7vh] w-[7vh] min-h-[30px] min-w-[30px] items-center justify-center rounded-full bg-success">
          <GraduationCap className="text-white" aria-hidden="true" />
        </div>
        <h3 className="text-center font-heading text-[1.25rem] lg:text-[1.5rem] font-bold leading-none text-black">
          50000+
        </h3>
        <span className="text-center font-heading text-[0.875rem] font-medium uppercase tracking-[0.05em] text-black">
          {t("home.info.registered_students")}
        </span>
      </div>

      <div className="me-[2%] mb-[5vh] mt-[1vh] flex w-[30vw] flex-col items-center justify-center gap-[1.5vh] rounded-[1vh] animate-[bounce_6s_ease-in-out_infinite] sm:mb-[10vh] sm:w-[25vw] md:mb-[15vh] md:w-[20vw] lg:mb-[20vh] lg:w-[15vw]">
        <div className="relative flex w-full flex-col items-center justify-center rounded-[1vh] bg-white px-[2vw] py-[1.5vh] shadow-[0px_0px_30px_0px_#38B6FF33]">
          <div className="absolute right-0 top-[-5vh] z-[99] flex h-[5vh] w-[5vh] min-h-[30px] min-w-[30px] items-center justify-center rounded-full bg-[#F86A6A] shadow-md">
            <Video className="text-white" aria-hidden="true" />
          </div>
          <span className="text-center font-heading text-[0.875rem] font-medium uppercase tracking-[0.05em] text-black">
            100+ {t("home.info.live_sessions")}
          </span>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center rounded-[1vh] bg-white px-[2vw] py-[1.5vh] shadow-[0px_0px_30px_0px_#38B6FF33]">
          <Image
            src={tutors.src}
            width={tutors.width}
            height={tutors.height}
            alt={t("home.info.tutors_alt")}
            className="w-full object-contain"
          />
          <h3 className="text-center font-heading text-[1.25rem] lg:text-[1.5rem] font-bold leading-none text-black">
            500+
          </h3>
          <span className="text-center font-heading text-[0.875rem] font-medium uppercase tracking-[0.05em] text-black">
            {t("home.info.tutor_screened")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
