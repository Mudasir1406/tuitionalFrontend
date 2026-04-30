import React from "react";
import Image from "next/image";
import { Circle } from "lucide-react";

import { PageData } from "@/types/grade-subject-level.types";
import { decodeHtmlEntities } from "@/utils/helper";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";

type IProps = {
  data: PageData["hero_section"];
  withForm?: boolean;
};

const stats = [
  "9756 Active Students",
  "35000+ Tutoring Hours Provided",
  "1 : 1 Online Classes",
  "12+ Tutor Year Experience",
];

const Hero: React.FC<IProps> = ({ data, withForm }) => {
  const HeaderTag = (data?.headerTag ?? "h1") as "h1" | "h2";

  return (
    <div className="flex h-auto flex-col justify-center lg:h-[65vh] lg:ps-[5vw]">
      <HeaderTag
        className="mt-[3vh] w-full text-center font-heading text-h1-mobile sm:text-h1-tablet lg:mt-0 lg:w-full lg:text-start lg:text-h1 text-black"
        dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data?.header ?? "") }}
      />

      <div
        className="mt-[2vh] w-full text-center font-heading text-body-mobile sm:text-body lg:w-[90%] lg:text-start text-black"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      <div className="w-full">
        <div className="mx-auto mt-[3vh] flex w-full flex-wrap justify-center gap-4 sm:w-3/5 lg:w-full lg:justify-between">
          {withForm ? (
            <p
              className="font-heading text-h6 text-ink-900"
              dangerouslySetInnerHTML={{
                __html: data?.imageAltText || "IGCSE A Level | IGCSE AS Level",
              }}
            />
          ) : (
            <>
              {stats.map((label, idx) => (
                <div
                  key={idx}
                  className="flex flex-1 basis-1/2 cursor-pointer items-center justify-center lg:justify-start"
                  style={{ maxWidth: "calc(50% - 24px)" }}
                >
                  <Circle
                    size={16}
                    className="me-2 fill-brand-500 text-brand-500"
                    aria-hidden="true"
                  />
                  <p className="font-heading text-small text-ink-900">{label}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[75vh]">
        <div className="mt-[4vh] flex flex-row items-center justify-center gap-4 lg:items-start lg:justify-start">
          <div className="flex items-center">
            <Image src={greenstar} alt="" className="h-[3vh] w-[3vh]" />
            <p className="ps-[1vh] pt-[0.7vh] font-heading text-stat-label uppercase">
              Trustpilot
            </p>
          </div>
          <div className="flex items-center">
            <p className="pt-[1vh] font-heading text-small">Excellent (4.7/5)</p>
            <Image src={greenstars} alt="" className="h-[3vh] w-[14vh] ps-[2vh] pt-[0.7vh]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
