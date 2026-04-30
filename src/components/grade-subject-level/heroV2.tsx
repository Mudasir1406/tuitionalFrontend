import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

import { PageData } from "@/types/grade-subject-level.types";
import { decodeHtmlEntities } from "@/utils/helper";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";

type IProps = {
  data: PageData["hero_section"];
  withForm?: boolean;
  bulletPoints: string[];
};

const HeroV2: React.FC<IProps> = ({ data, withForm, bulletPoints }) => {
  const HeaderTag = (data?.headerTag ?? "h1") as "h1" | "h2";

  return (
    <div className="flex h-auto flex-col justify-center lg:h-[65vh] lg:ps-[5vw]">
      <HeaderTag
        className="mt-[3vh] w-full text-center font-heading text-h1-mobile sm:text-h1-tablet lg:mt-0 lg:text-start lg:text-h1 text-black"
        dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data?.header ?? "") }}
      />

      <div
        className="mt-[2vh] w-full text-center font-heading text-body-mobile sm:text-body lg:w-[90%] lg:text-start text-black"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      <div className="w-full lg:w-[75vh]">
        {withForm ? (
          <div className="mt-[2vh] mb-[2vh] flex flex-col gap-3 md:mt-[3vh]">
            {bulletPoints?.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center lg:justify-start"
              >
                <CheckCircle size={20} className="me-2 text-success" aria-hidden="true" />
                <span className="font-heading text-small font-medium text-ink-700">{feature}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-[4vh] flex flex-row items-center gap-4">
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
        )}
      </div>
    </div>
  );
};

export default HeroV2;
