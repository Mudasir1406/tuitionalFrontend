import Image from "next/image";
import React from "react";
import counsling from "../../../public/assets/images/static/Guidence.png";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";

const ArEducationalCounseling: React.FunctionComponent<{
  data: PageData["education_counseling"];
}> = ({ data }) => {
  const HeaderTag = (data.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div dir="rtl">
      <div className="px-[5vw]">
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
          <div>
            <p
              className={`${leagueSpartan.className} w-[53%] rounded-[5vh] bg-[#B8E1F9] px-[3vh] py-[2vh] text-center font-heading text-[2vh] text-[#1F90D1] sm:w-[28vh] sm:px-[3.6vw] sm:py-[1.5vh] sm:text-[2.5vh] md:w-[30vh] md:text-[2.2vh] lg:w-[22vh] lg:text-[2vh]`}
            >
              الإرشاد التعليمي
            </p>
            <HeaderTag
              className={`${leagueSpartan.className} w-[80vw] py-[2vh] text-end font-heading text-h3-mobile sm:py-[2.5vh] sm:text-h3-tablet md:py-[3vh] lg:w-[40vw] lg:py-[3vh] lg:text-h3 text-ink-900`}
              dangerouslySetInnerHTML={{ __html: data?.header }}
            />
            <p
              className={`${leagueSpartan.className} w-[80vw] text-end font-heading text-body text-ink-900 lg:w-[40vw]`}
              dangerouslySetInnerHTML={{ __html: data?.paragraph }}
            />
            <div className="ml-auto flex max-w-full justify-between md:max-w-[90%]">
              <div className="flex w-full items-end">
                <PopUpButton
                  text="سجل الآن"
                  href="popup"
                  className="my-[2vh] w-full rounded-[10px] px-[3vh] py-[1.5vh] transition-all duration-500 hover:scale-[1.02] sm:px-[4vh] sm:py-[2vh] lg:py-[1.5vh]"
                  style={{
                    boxShadow: "1px 4px 24px 0px #38B6FFB2",
                    backgroundColor: "#38B6FF",
                    color: "white",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <Image src={counsling} alt="Counseling Image" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArEducationalCounseling;
