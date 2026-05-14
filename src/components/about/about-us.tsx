"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Circle } from "lucide-react";

import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

import studentsImg from "../../../public/assets/images/static/about-students.webp";

type ContentKey = "mission" | "value";

const AboutUs: React.FC = () => {
  const { t, isRTL } = useI18n();
  const [activeType, setActiveType] = useState<ContentKey>("mission");

  const dict = isRTL ? ar : en;
  const content = dict.about.about_us[activeType];

  return (
    <div>
      <div className="flex w-full flex-col items-start bg-transparent">
        <h2 className="relative mb-5 mt-10 flex items-center justify-start text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black">
          {t("about.about_us.heading")}
        </h2>

        <p className="text-justify font-heading text-small text-ink-800">
          {t("about.about_us.description_p1")}
          <br />
          <br />
          {t("about.about_us.description_p2")}
        </p>
      </div>

      <div className="mt-9 flex flex-col">
        <div className="my-6 flex flex-row gap-4">
          <button
            type="button"
            onClick={() => setActiveType("mission")}
            className={cn(
              "rounded-[1vh] px-[30px] font-heading text-button-mobile md:px-20 sm:text-button",
              activeType === "mission"
                ? "bg-brand-500 py-[1.5vh] text-white shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66] hover:bg-brand-500"
                : "bg-white py-[2vh] text-black hover:bg-brand-500 hover:text-white",
            )}
          >
            {t("about.about_us.tab_mission")}
          </button>
          <button
            type="button"
            onClick={() => setActiveType("value")}
            className={cn(
              "rounded-[1vh] px-[30px] font-heading text-button-mobile md:px-20 sm:text-button",
              activeType === "value"
                ? "bg-brand-500 py-[1.5vh] text-white shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66] hover:bg-brand-500"
                : "bg-white py-[2vh] text-black hover:bg-brand-500 hover:text-white",
            )}
          >
            {t("about.about_us.tab_value")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-evenly lg:col-span-8">
            <div>
              <h2 className="mb-[10px] text-start font-heading text-h2-mobile sm:mb-[15px] sm:text-h2-tablet md:mb-[18px] lg:mb-[22px] lg:text-h2 text-black">
                {content.title}
              </h2>
              <p className="max-w-[1000px] break-words text-start font-heading text-small text-ink-900">
                {content.paragraph}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[16px] border border-[#B9E5FF] p-6">
              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-start justify-center lg:justify-start"
                >
                  <Circle
                    size={16}
                    className="me-2 shrink-0 fill-brand-500 text-brand-500"
                    aria-hidden="true"
                  />
                  <p className="font-heading text-small font-semibold text-ink-900">
                    {point.title}:{" "}
                    <span className="font-heading text-small font-normal text-ink-900">
                      {point.description}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="flex h-full flex-row justify-start gap-x-6 lg:max-h-[535px]">
              <Image
                src={studentsImg.src}
                width={studentsImg.width}
                height={studentsImg.height}
                alt={t("about.about_us.image_alt")}
                className="h-full w-full max-h-[553px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
