import Image from "next/image";
import React from "react";
import counsling from "../../../public/assets/images/static/Guidence.png";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";

const EducationalCounseling: React.FunctionComponent<{
  data: PageData["education_counseling"];
}> = ({ data }) => {
  const HeaderTag = (data.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="px-[5vw]">
      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <div>
          <HeaderTag
            className={`${leagueSpartan.className} w-[80vw] py-[2vh] text-start font-heading text-h3-mobile sm:py-[2.5vh] sm:text-h3-tablet md:py-[3vh] lg:w-[40vw] lg:py-[3vh] lg:text-h3 text-ink-900`}
            dangerouslySetInnerHTML={{ __html: data?.header }}
          />
          <p
            className={`${leagueSpartan.className} w-[80vw] text-start font-heading text-body text-ink-900 lg:w-[40vw]`}
            dangerouslySetInnerHTML={{ __html: data?.paragraph }}
          />
          <div className="mr-auto flex max-w-full justify-between md:max-w-[90%]">
            <div className="flex w-full items-end">
              <PopUpButton
                text="Enroll Now"
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
          <Image
            src={counsling}
            alt="Counseling Image"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
};
export default EducationalCounseling;
