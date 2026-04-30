"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import studentsImg from "../../../public/assets/images/static/about-students.webp";

type ContentKey = "mission" | "value";

const AboutUs: React.FC = () => {
  const { t, isRTL } = useI18n();
  const [activeType, setActiveType] = useState<ContentKey>("mission");

  const dict = isRTL ? ar : en;
  const content = dict.about.about_us[activeType];

  return (
    <div>
      <div className="flex w-full flex-col items-center bg-transparent">
        <h2 className="relative mb-5 mt-10 flex items-center justify-center text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black">
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -left-[10%] -top-3 h-[19px] w-5 object-contain sm:hidden"
          />
          <Image
            src={linesInvert}
            alt=""
            aria-hidden="true"
            className="absolute -left-[8%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block"
          />
          {t("about.about_us.heading")}
        </h2>

        <p className="mt-5 px-5 text-center font-heading text-body-mobile sm:text-body lg:px-0 text-black">
          {t("about.about_us.description_p1")}
          <br />
          <br />
          {t("about.about_us.description_p2")}
        </p>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex justify-center gap-3">
          <Button
            variant={activeType === "mission" ? "primary" : "outline"}
            onClick={() => setActiveType("mission")}
            className="rounded-full px-6"
          >
            {t("about.about_us.tab_mission")}
          </Button>
          <Button
            variant={activeType === "value" ? "primary" : "outline"}
            onClick={() => setActiveType("value")}
            className="rounded-full px-6"
          >
            {t("about.about_us.tab_value")}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div>
              <h3 className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-start lg:text-h3 text-black">
                {content.title}
              </h3>
              <p className="mt-3 text-center font-heading text-body-mobile sm:text-body lg:text-start text-black">
                {content.paragraph}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-start justify-center lg:justify-start"
                >
                  <Circle
                    size={16}
                    className="me-2 mt-1 shrink-0 fill-brand-500 text-brand-500"
                    aria-hidden="true"
                  />
                  <p className="font-heading text-body-mobile font-bold sm:text-body text-black">
                    {point.title}:{" "}
                    <span className="font-heading text-small font-normal text-black">
                      {point.description}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="flex h-full items-center justify-center">
              <Image
                src={studentsImg.src}
                width={studentsImg.width}
                height={studentsImg.height}
                alt={t("about.about_us.image_alt")}
                className="h-auto w-full max-h-[553px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
