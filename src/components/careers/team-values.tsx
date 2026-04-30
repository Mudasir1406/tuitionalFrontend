"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import success from "../../../public/assets/images/svg/success.svg";
import certificate from "../../../public/assets/images/svg/certificate.svg";
import equality from "../../../public/assets/images/svg/equality.svg";
import ethics from "../../../public/assets/images/svg/ethics.svg";
import growth from "../../../public/assets/images/svg/growth.svg";
import handshake from "../../../public/assets/images/svg/handshake.svg";

type IconKey = "succeed" | "helpful" | "ethics" | "equality" | "debate" | "grow";

const iconMap: Record<IconKey, { src: any; alt: string }> = {
  succeed: { src: success, alt: "success" },
  helpful: { src: handshake, alt: "handshake" },
  ethics: { src: ethics, alt: "ethics" },
  equality: { src: equality, alt: "equality" },
  debate: { src: certificate, alt: "certificate" },
  grow: { src: growth, alt: "growth" },
};

interface InfoBoxProps {
  heading: string;
  dec: string;
  icon: IconKey;
}

const InfoBox: React.FC<InfoBoxProps> = ({ heading, dec, icon }) => {
  const { src, alt } = iconMap[icon];
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center rounded-md bg-white/70 shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] sm:h-[285px] sm:w-[322px] md:h-[313px] md:w-[360px] lg:h-[413px] lg:w-[460px]">
      <div className="mb-[10px] flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526] sm:mb-5 sm:h-[55px] sm:w-[55px] md:mb-[30px] md:h-[75px] md:w-[75px] lg:mb-10 lg:h-[115px] lg:w-[115px]">
        <div className="h-5 w-5 sm:h-[30px] sm:w-[30px] md:h-[45px] md:w-[45px] lg:h-[45px] lg:w-[45px]">
          <Image src={src} alt={alt} className="h-full w-full" />
        </div>
      </div>
      <div className="h-[35%]">
        <h3 className="mb-[10px] text-center font-heading text-h5-tablet sm:mb-[15px] sm:text-h5 md:mb-[18px] lg:mb-[22px] lg:text-h5">
          {heading}
        </h3>
        <p className="mx-auto max-w-[90%] whitespace-pre-line text-center font-heading text-small text-ink-800 md:max-w-[280px] lg:max-w-[300px]">
          {dec}
        </p>
      </div>
    </div>
  );
};

const TeamValues: React.FC = () => {
  const { t } = useI18n();

  const values: { heading: string; dec: string; icon: IconKey }[] = [
    {
      heading: t("careers.team_values.values.succeed_heading"),
      dec: t("careers.team_values.values.succeed_dec"),
      icon: "succeed",
    },
    {
      heading: t("careers.team_values.values.helpful_heading"),
      dec: t("careers.team_values.values.helpful_dec"),
      icon: "helpful",
    },
    {
      heading: t("careers.team_values.values.ethics_heading"),
      dec: t("careers.team_values.values.ethics_dec"),
      icon: "ethics",
    },
    {
      heading: t("careers.team_values.values.equality_heading"),
      dec: t("careers.team_values.values.equality_dec"),
      icon: "equality",
    },
    {
      heading: t("careers.team_values.values.debate_heading"),
      dec: t("careers.team_values.values.debate_dec"),
      icon: "debate",
    },
    {
      heading: t("careers.team_values.values.grow_heading"),
      dec: t("careers.team_values.values.grow_dec"),
      icon: "grow",
    },
  ];

  return (
    <div>
      <div className="flex w-full flex-col items-center bg-transparent">
        <h2 className="relative mt-10 mb-5 flex items-center justify-center text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black">
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -top-3 left-[11%] h-[19px] w-5 object-contain sm:hidden"
          />
          <Image
            src={linesInvert}
            alt=""
            aria-hidden="true"
            className="absolute -left-[6%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block"
          />
          {t("careers.team_values.heading")}
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {values.map((v, i) => (
          <div key={i} className="w-full sm:w-auto">
            <InfoBox heading={v.heading} dec={v.dec} icon={v.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamValues;
