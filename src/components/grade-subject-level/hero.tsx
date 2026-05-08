import React from "react";
import Image from "next/image";

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
  const HeaderTag = (data?.headerTag?.trim() || "h1").toLowerCase() as
    | "h1"
    | "h2";

  return (
    <div className="flex h-auto flex-col justify-center lg:h-[50vh] lg:ps-[5vw]">
      <HeaderTag
        className="mt-[3vh] w-full text-center font-heading text-h1-mobile sm:text-h1-tablet lg:mt-0 lg:w-full lg:text-start lg:text-h1 text-black"
        dangerouslySetInnerHTML={{
          __html: decodeHtmlEntities(data?.header ?? ""),
        }}
      />

      <div
        className="mt-[2vh] w-full text-center font-heading text-small lg:w-[90%] lg:text-start text-black"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      <div className="w-full">
        <div className="mx-auto mt-[3vh] flex w-full flex-wrap justify-center gap-4 sm:w-3/5 lg:w-full lg:justify-between">
          {withForm ? (
            <p
              className="text-center font-heading text-h3-mobile font-bold text-ink-900 sm:text-h3-tablet lg:text-start lg:text-h3"
              dangerouslySetInnerHTML={{
                __html: data?.imageAltText || "IGCSE A Level | IGCSE AS Level",
              }}
            />
          ) : (
            <>
              {stats.map((label, idx) => (
                <div
                  key={idx}
                  className="flex flex-1 basis-1/2 cursor-pointer items-center justify-center max-w-[calc(50%-24px)] lg:justify-start"
                >
                  <span
                    aria-hidden="true"
                    className="me-2 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-500"
                  />
                  <span className="font-heading text-small leading-none text-ink-900">
                    {label}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[75vh]">
        <div className="mt-[4vh] flex flex-row items-center justify-center gap-4 lg:justify-start">
          <div className="flex items-center gap-[1vh]">
            <Image
              src={greenstar}
              alt=""
              className="h-[3vh] w-[3vh] shrink-0 object-contain block"
            />
            <p className="font-heading text-stat-label uppercase leading-[3vh] m-0">
              Trustpilot
            </p>
          </div>
          <div className="flex items-center gap-[2vh]">
            <p className="font-heading text-small leading-[3vh] m-0">
              Excellent (4.7/5)
            </p>
            <Image
              src={greenstars}
              alt=""
              className="h-[3vh] w-[14vh] shrink-0 object-contain block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
