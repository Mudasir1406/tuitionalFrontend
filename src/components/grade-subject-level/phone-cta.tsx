"use client";

import React, { useState } from "react";
import PopUpButton from "../pop-up-button";
import { PageData } from "@/types/grade-subject-level.types";
import { FormType } from "../home/form-dialouge";

type IProps = { data: PageData["phone_cta"] };

const PhoneCta: React.FC<IProps> = ({ data }) => {
  const [formData, setFormData] = useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    Message: "",
    sheetName: "Lead Forms",
  });
  const HeaderTag = (data.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="mx-[3vw] my-[2vh] flex items-center justify-center sm:mx-[3vw] sm:my-[2vh] lg:m-0">
      <div className="w-full max-w-[145vh] text-center">
        <HeaderTag
          className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
          dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
        />
        <div
          className="px-0 py-[1.5vh] text-center font-heading text-body-mobile text-ink-900 sm:text-body lg:py-[2vh]"
          dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
        />
        <PopUpButton
          href={data.link}
          text={data?.buttonText}
          values={formData}
          className="h-auto w-4/5 rounded-[14px] p-[12px_16px] text-[0.875rem] sm:w-3/5 sm:p-[14px_20px] sm:text-[1rem] md:w-1/2 lg:w-2/5 lg:p-[16px_24px] lg:text-[1.1rem]"
          style={{
            backgroundColor: "#38B6FF",
            boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20) inset",
            color: "#FFFFFF",
            lineHeight: 1.4,
          }}
        />
      </div>
    </div>
  );
};

export default PhoneCta;
