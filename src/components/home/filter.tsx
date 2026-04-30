"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useI18n } from "@/context/language-context";
import useGeoLocation from "@/utils/slugHelper";
import type { Filter_Data } from "../../services/filter-data/filter-data";
import type { FormType } from "./form-dialouge";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";

const TranslatableDropDown = dynamic(
  () => import("../DropDown/TranslatableDropDown"),
);
const PopUpButton = dynamic(() => import("../pop-up-button"));

interface FilterProps {
  data: Filter_Data;
}

const Filter: React.FC<FilterProps> = ({ data }) => {
  const { t, isRTL, locale } = useI18n();

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

  const handleChange = (key: string, value: string | string[]) => {
    setFormData({ ...formData, [key]: value });
  };

  const geoData = useGeoLocation();

  React.useEffect(() => {
    if (!geoData.isLoading && !geoData.error && geoData.browser) {
      let medium = "SEO";
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        medium = params.get("gad_source")
          ? "google Ads"
          : params.get("fbclid")
            ? "facebook"
            : "SEO";
      }
      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
        Browser: geoData.browser || "",
        SourcePageURL: geoData.pageURL || "",
        Date: geoData.date || "",
        Time: geoData.time || "",
        Medium: medium,
      }));
    }
  }, [geoData]);

  return (
    <div className="flex h-full max-h-[700px] w-full flex-col justify-center">
      <h1 className="mt-[2vh] text-center font-heading text-h1-mobile sm:mt-[3vh] sm:text-h1-tablet md:mt-[4vh] lg:mt-[5vh] lg:w-[90%] lg:text-start lg:text-h1 text-black">
        {t("home.filter.heading_lead")}
        <span className="relative inline text-brand-500">
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -top-5 right-0 z-10 object-contain md:hidden"
            width={linesMobile.width}
            height={linesMobile.height}
          />
          <Image
            src={lines}
            alt=""
            aria-hidden="true"
            className="absolute -top-[30px] right-0 z-10 hidden object-contain md:block lg:-right-[45px]"
            width={lines.width}
            height={lines.height}
          />
          {t("home.filter.heading_accent")} <br />
        </span>
        {t("home.filter.heading_tail")}
      </h1>

      <p className="mt-[2vh] px-[2vh] text-center font-heading text-body-mobile sm:mt-[3vh] sm:text-body md:mt-[4vh] lg:px-0 lg:text-start text-black">
        {t("home.filter.description")}
      </p>

      <div className="mt-[4vh] max-h-[70vh] origin-center animate-[rotateAnimation_1s_ease-in-out_infinite] rounded-[2vh] bg-brand-50 px-[2vh] py-[4vh] sm:px-[2vh] md:rounded-[1vh] md:px-[3vh] md:py-[5vh] lg:rounded-[1vh] lg:px-[3vh] lg:py-[5vh]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <TranslatableDropDown
              placeholder={t("home.filter.select_curriculum")}
              data={data?.curriculum || []}
              value={formData.Curriculum}
              onChange={handleChange}
              name="Curriculum"
              locale={locale}
              isSubjectField={false}
            />
          </div>
          <div className="lg:col-span-6">
            <TranslatableDropDown
              placeholder={t("home.filter.select_grade")}
              data={data?.grade || []}
              value={formData.Grade}
              onChange={handleChange}
              name="Grade"
              locale={locale}
              isSubjectField={false}
            />
          </div>
          <div className="lg:col-span-7">
            <TranslatableDropDown
              placeholder={t("home.filter.select_subjects")}
              data={data?.subject || []}
              value={formData.Subject}
              onChange={handleChange}
              name="Subject"
              multiple
              locale={locale}
              isSubjectField={true}
            />
          </div>
          <div className="lg:col-span-5">
            <PopUpButton
              text={t("home.filter.cta")}
              href="popup"
              values={formData}
              className="w-full"
              style={{
                boxShadow: "1px 4px 24px 0px #38B6FFB2",
                backgroundColor: "#38B6FF",
                fontSize: "2vh",
                fontWeight: 700,
                lineHeight: "1.6vh",
                padding: "2vh",
                letterSpacing: "-0.02em",
                color: "white",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
