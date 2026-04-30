"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { sendEmail } from "@/services/email-service/email-service";
import { createCareerTemplate } from "@/services/email-service/template";
import { CAREERSTUITIONALEDU, HRTUITIONALEDU } from "@/utils/env";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import type { CareersFormType } from "../home/form-dialouge";

import Input from "../input/Input";
import CustomInput from "../custom-input/custom-input";
import applynow from "../../../public/assets/images/static/applynow.png";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

const ApplyNow: React.FC = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<CareersFormType>({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    Country: "",
    PhoneNumber: "",
    Position: "",
    Message: "",
    sheetName: "Careers",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<CareersFormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    const newErrors = { ...errors };

    if (key === "Message" && typeof value === "string") {
      value = value.slice(0, 500);
      newErrors.Message = isNotEmpty(value) ? "" : t("careers.apply_now.errors.message_empty");
    }
    if (key === "PhoneNumber" && typeof value === "string") {
      newErrors.PhoneNumber = isValidPhoneNumber(value)
        ? ""
        : t("careers.apply_now.errors.invalid_phone");
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value)
        ? ""
        : t("careers.apply_now.errors.invalid_email");
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value)
        ? ""
        : t("careers.apply_now.errors.first_name_empty");
    }
    if (key === "LastName" && typeof value === "string") {
      newErrors.LastName = isNotEmpty(value)
        ? ""
        : t("careers.apply_now.errors.last_name_empty");
    }
    if (key === "Country" && typeof value === "string") {
      newErrors.Country = isNotEmpty(value)
        ? ""
        : t("careers.apply_now.errors.country_empty");
    }
    if (key === "Position" && typeof value === "string") {
      newErrors.Position = isNotEmpty(value)
        ? ""
        : t("careers.apply_now.errors.position_empty");
    }

    setFormData({ ...formData, [key]: value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: Partial<CareersFormType> = {};
    if (!isNotEmpty(formData.FirstName)) newErrors.FirstName = t("careers.apply_now.errors.first_name_empty");
    if (!isValidEmail(formData.EmailAddress)) newErrors.EmailAddress = t("careers.apply_now.errors.invalid_email");
    if (!isValidPhoneNumber(formData.PhoneNumber)) newErrors.PhoneNumber = t("careers.apply_now.errors.invalid_phone");
    if (!isNotEmpty(formData.LastName)) newErrors.LastName = t("careers.apply_now.errors.last_name_empty");
    if (!isNotEmpty(formData.Country)) newErrors.Country = t("careers.apply_now.errors.country_empty");
    if (!isNotEmpty(formData.Position)) newErrors.Position = t("careers.apply_now.errors.position_empty");
    if (!isNotEmpty(formData.Message)) newErrors.Message = t("careers.apply_now.errors.message_empty");

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error(t("careers.apply_now.errors.fix_form"));
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "careers_form_error",
        formData: newErrors,
        formType: "careers Form",
      });
      return;
    }

    await addFormData("careers", formData);

    const formDataObject = new FormData();
    Object.entries(formData).map((value) =>
      formDataObject.append(value[0], value[1]),
    );
    const keyValuePairs: string[] = [];
    for (const [key, value] of Array.from(formDataObject.entries())) {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
      );
    }
    const formDataString = keyValuePairs.join("&");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyk90z7rMyxOY4kvD6oytsxr4Q-L9k1YX1o_c7yZ44Krga3uYtoTXcjdwORVHmYiulhvw/exec",
        {
          redirect: "follow",
          method: "POST",
          mode: "no-cors",
          body: formDataString,
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        },
      );
      await sendEmail({
        recipientEmail: CAREERSTUITIONALEDU,
        cc: HRTUITIONALEDU,
        subject: "Get Started",
        text: "",
        html: createCareerTemplate(formData),
      });
      toast.success(t("careers.apply_now.toasts.success"));
      (window as any).dataLayer.push({
        event: "careers_form_success",
        formData: formData,
        formType: "careers Form",
      });
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error(t("careers.apply_now.toasts.failed"));
      (window as any).dataLayer.push({
        event: "careers_form_failed",
        error: error.Message,
        formType: "careers Form",
      });
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNumber: "",
        Country: "",
        Position: "",
        Message: "",
      });
    }
  };

  const geoData = useGeoLocation();

  useEffect(() => {
    if (!geoData.isLoading && !geoData.error) {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const params = new URLSearchParams(window.location.search);
      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
        Browser: browser,
        SourcePageURL: pageURL,
        Date: currentDate,
        Time: currentTime,
        Medium: params.get("gad_source")
          ? "google Ads"
          : params.get("fbclid")
            ? "facebook"
            : "SEO",
      }));
    }
  }, [geoData]);

  const inputCls = "my-1 rounded-[5px] bg-white text-ink-800 shadow-card";
  const errorCls = "ms-1 mt-1 font-body text-small text-danger";

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-[2] h-full w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative m-auto hidden h-[915px] lg:flex">
            <Image
              src={applynow.src}
              width={applynow.width}
              height={applynow.height}
              alt={t("careers.apply_now.image_alt")}
              className="girlGrid absolute top-[90px]"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="z-[4] mt-5 flex flex-col items-center md:mt-10 lg:mt-0 lg:block">
            <h2 className="relative ms-0 mb-10 mt-0 flex font-heading text-h2-mobile sm:mb-5 sm:text-h2-tablet md:ms-[60px] md:mb-5 md:mt-0 lg:ms-[65px] lg:mb-5 lg:mt-[5px] lg:text-h2 text-black">
              <Image
                src={linesMobile}
                alt=""
                aria-hidden="true"
                className="absolute -left-[10%] -top-3 h-[19px] w-5 object-contain sm:hidden"
              />
              <Image
                src={linesInvert}
                alt=""
                aria-hidden="true"
                className="absolute hidden h-[35px] w-[43px] object-contain sm:-left-[8%] sm:-top-[35px] sm:block md:-left-[6%] lg:-left-[4%]"
              />
              {t("careers.apply_now.heading")}
            </h2>

            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="z-[1] grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div>
                    <Input
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      placeholder={t("careers.apply_now.placeholder_first_name")}
                      className={inputCls}
                    />
                    {errors.FirstName && <p className={errorCls}>{errors.FirstName}</p>}
                  </div>
                  <div>
                    <Input
                      name="EmailAddress"
                      value={formData.EmailAddress}
                      onChange={handleChange}
                      placeholder={t("careers.apply_now.placeholder_email")}
                      className={inputCls}
                    />
                    {errors.EmailAddress && <p className={errorCls}>{errors.EmailAddress}</p>}
                  </div>
                  <div>
                    <Input
                      name="Country"
                      value={formData.Country}
                      onChange={handleChange}
                      placeholder={t("careers.apply_now.placeholder_country")}
                      className={inputCls}
                    />
                    {errors.Country && <p className={errorCls}>{errors.Country}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <Input
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      placeholder={t("careers.apply_now.placeholder_last_name")}
                      className={inputCls}
                    />
                    {errors.LastName && <p className={errorCls}>{errors.LastName}</p>}
                  </div>
                  <div>
                    <PhoneInput
                      defaultCountry="SA"
                      value={formData?.PhoneNumber || ""}
                      onChange={(e) => handleChange("PhoneNumber", String(e))}
                      inputComponent={CustomInput}
                      placeholder={t("careers.apply_now.placeholder_phone")}
                      className="relative z-[2] my-1 h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none"
                    />
                    {errors.PhoneNumber && <p className={errorCls}>{errors.PhoneNumber}</p>}
                  </div>
                  <div>
                    <Input
                      name="Position"
                      value={formData.Position}
                      onChange={handleChange}
                      placeholder={t("careers.apply_now.placeholder_position")}
                      className={inputCls}
                    />
                    {errors.Position && <p className={errorCls}>{errors.Position}</p>}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <Textarea
                    name="Message"
                    rows={5}
                    value={formData.Message}
                    onChange={(e) => handleChange("Message", e.target.value)}
                    placeholder={t("careers.apply_now.placeholder_message")}
                    className={inputCls}
                  />
                  {errors.Message && <p className={errorCls}>{errors.Message}</p>}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="my-4 w-full rounded-md py-[18px] text-button shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]"
              >
                {loading ? (
                  <span
                    className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-label="loading"
                  />
                ) : (
                  t("careers.apply_now.submit")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Image
        src={applynow.src}
        width={applynow.width}
        height={applynow.height}
        alt={t("careers.apply_now.image_alt")}
        className="girlContact"
      />
    </div>
  );
};

export default ApplyNow;
