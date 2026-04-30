"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/language-context";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import careerTalent from "../../../public/assets/images/static/careerTalent.png";

const TopTalent: React.FC = () => {
  const { t } = useI18n();
  const accent = t("careers.top_talent.heading_line_2_accent");
  const lead = t("careers.top_talent.heading_line_2_lead");

  return (
    <a id="careersForm" className="block">
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative mt-[70px] flex h-[80%] w-full justify-center sm:mt-[60px] md:mt-[60px] md:h-[75%] lg:mt-[60px]">
            <Image
              src={careerTalent.src}
              width={careerTalent.width}
              height={careerTalent.height}
              alt={t("careers.top_talent.image_alt")}
              className="h-auto w-[90%]"
            />
          </div>
        </div>
        <div className="md:col-span-5">
          <div>
            <h3 className="relative mt-0 px-5 text-center font-heading text-h2-mobile sm:text-h2-tablet md:mt-[95px] md:text-start lg:mt-[105px] lg:text-h2 text-black">
              <Image
                src={linesMobile}
                alt=""
                aria-hidden="true"
                className="absolute -top-5 z-10 mb-5 h-[35px] w-[43px] object-contain sm:hidden"
              />
              <Image
                src={linesInvert}
                alt=""
                aria-hidden="true"
                className="absolute -left-[30px] -top-[30px] z-10 mb-5 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:block md:-top-[30px] lg:-top-[50px]"
              />
              {t("careers.top_talent.heading_line_1")} <br />
              {lead && <>{lead}</>}{" "}
              <span className="relative inline text-[#009FFC]">{accent}</span>
            </h3>
            <p className="mt-5 px-5 text-center font-heading text-body-mobile sm:text-body lg:w-[68%] lg:text-start text-ink-800 whitespace-pre-line">
              {t("careers.top_talent.description")}
            </p>
            <div className="mt-10 flex flex-row items-center justify-center md:justify-start">
              <Button
                variant="primary"
                className="w-[180px] rounded-md px-0 py-[18px] shadow-[1px_4px_24px_0px_#38B6FFB2] sm:w-[200px] md:w-[200px] lg:w-[200px]"
              >
                {t("careers.top_talent.cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default TopTalent;
