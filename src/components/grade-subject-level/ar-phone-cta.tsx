"use client";

import React, { useState } from "react";
import PopUpButton from "../pop-up-button";
import { PageData } from "@/types/grade-subject-level.types";
import { FormType } from "../home/form-dialouge";

type IProps = { data: PageData["phone_cta"] };

const ArPhoneCta: React.FC<IProps> = ({ data }) => {
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
    <div className="mx-[3vw] my-[2vh] flex items-center justify-center sm:mx-[3vw] sm:my-[2vh] lg:m-0" dir="rtl">
      <div className="w-full max-w-[145vh] text-center">
        <HeaderTag
          className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
          dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
        />
        <div
          className="px-0 py-[1.5vh] text-center font-heading text-body-mobile text-ink-900 sm:text-body lg:py-[2vh]"
          dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
        />

        <div className="flex h-[8vh] flex-row-reverse items-center justify-center rounded-[2vh] bg-white shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)_inset,0px_4px_10px_0px_rgba(0,0,0,0.25)_inset] sm:h-[6vh] lg:h-[8.5vh]">
          <input
            type="text"
            placeholder="رقم الهاتف مع رمز الدولة"
            value={formData.PhoneNumber}
            onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
            className="w-3/5 bg-transparent px-3 text-end text-form-input text-ink-900 outline-none placeholder:text-ink-400 lg:w-[70%]"
            dir="rtl"
          />
          <PopUpButton
            href={data.link}
            text={data?.buttonText}
            values={formData}
            className="h-[8vh] w-2/5 rounded-bl-[14px] rounded-tl-[14px] sm:h-[6vh] lg:h-[8.5vh]"
            style={{
              backgroundColor: "#38B6FF",
              boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20) inset",
              color: "#FFFFFF",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArPhoneCta;
