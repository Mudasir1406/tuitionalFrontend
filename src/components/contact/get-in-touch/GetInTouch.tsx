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
import { createContactTemplate } from "@/services/email-service/template";
import { HELLOTUITIONALEDU } from "@/utils/env";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import type { ContactFormType } from "@/components/home/form-dialouge";

import Input from "@/components/input/Input";
import CustomInput from "@/components/custom-input/custom-input";
import girlLaptop from "../../../../public/assets/images/static/girl-using-laptop.png";
import lines from "../../../../public/assets/images/static/lines.png";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

const GetInTouch: React.FunctionComponent = () => {
  const { t, isRTL } = useI18n();

  const [formData, setFormData] = useState<ContactFormType>({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Message: "",
    Browser: "",
    Country: "",
    IP: "",
    SourcePageURL: "",
    Time: "",
    Date: "",
    sheetName: "General Contact Form",
  });
  const [errors, setErrors] = useState<Partial<ContactFormType>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (key: string, value: string | string[]) => {
    const newErrors = { ...errors };

    if (key === "PhoneNumber" && typeof value === "string") {
      newErrors.PhoneNumber = isValidPhoneNumber(value)
        ? ""
        : t("contact.get_in_touch.errors.invalid_phone");
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value)
        ? ""
        : t("contact.get_in_touch.errors.invalid_email");
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value)
        ? ""
        : t("contact.get_in_touch.errors.first_name_empty");
    }
    if (key === "LastName" && typeof value === "string") {
      newErrors.LastName = isNotEmpty(value)
        ? ""
        : t("contact.get_in_touch.errors.last_name_empty");
    }
    if (key === "Message" && typeof value === "string") {
      newErrors.Message = isNotEmpty(value)
        ? ""
        : t("contact.get_in_touch.errors.message_empty");
    }

    setFormData({ ...formData, [key]: value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newErrors: Partial<ContactFormType> = {};

    if (!isNotEmpty(formData.FirstName)) {
      newErrors.FirstName = t("contact.get_in_touch.errors.first_name_empty");
    }
    if (!isNotEmpty(formData.LastName)) {
      newErrors.LastName = t("contact.get_in_touch.errors.last_name_empty");
    }
    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = t("contact.get_in_touch.errors.invalid_email");
    }
    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = t("contact.get_in_touch.errors.invalid_phone");
    }
    if (!isNotEmpty(formData.Message)) {
      newErrors.Message = t("contact.get_in_touch.errors.message_empty");
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error(t("contact.get_in_touch.errors.fix_form"));

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "contact_form_error",
        formData: newErrors,
        formType: "contact Form",
      });
      return;
    }

    await addFormData("contact", formData);

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
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        },
      );
      await sendEmail({
        recipientEmail: HELLOTUITIONALEDU,
        subject: "Get Started",
        text: "",
        html: createContactTemplate(formData),
      });
      toast.success(t("contact.get_in_touch.toasts.success"));
      (window as any).dataLayer.push({
        event: "contact_form_success",
        formData: formData,
        formType: "contact Form",
      });
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error(t("contact.get_in_touch.toasts.failed"));
      (window as any).dataLayer.push({
        event: "contact_form_failed",
        error: error.Message,
        formType: "contact Form",
      });
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNumber: "",
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

  const headingAccent = t("contact.get_in_touch.heading_accent");
  const subtitleLine2 = t("contact.get_in_touch.subtitle_line_2");

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-white/70 to-brand-50 pt-20">
      <div className="absolute inset-0 -z-[2] h-full w-full" />

      <div className="mx-12 mb-[100px] flex max-w-[1400px] flex-wrap justify-center gap-6 lg:flex-nowrap">
        <div className="flex flex-1 items-center justify-center lg:flex-[0.45]">
          <Image
            src={girlLaptop.src}
            width={girlLaptop.width}
            height={girlLaptop.height}
            alt={t("contact.get_in_touch.alt_image")}
            loading="lazy"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
            className="h-full w-full rounded-[20px] object-cover"
          />
        </div>

        <div className="flex h-full flex-1 items-center justify-center lg:flex-[0.55]">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "relative flex w-full flex-col items-center justify-center rounded-[20px] bg-white/70 p-5 sm:p-10 lg:px-12 lg:py-[18px] lg:pb-3",
              "shadow-[0px_-3px_8px_0px_rgba(0,155,245,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)]",
            )}
          >
            <div className="relative mb-[46px] flex flex-col justify-center">
              <h2
                className={cn(
                  "relative flex justify-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2",
                )}
              >
                {t("contact.get_in_touch.heading_lead")}
                {headingAccent && (
                  <span className="ms-1 font-bold text-success">
                    {headingAccent}
                  </span>
                )}
                <Image
                  src={lines}
                  alt=""
                  className="absolute -top-6 right-[-6%] h-6 w-6 object-contain"
                />
              </h2>
              <p className="flex text-center font-body text-small">
                {t("contact.get_in_touch.subtitle_line_1")}
                {subtitleLine2 && (
                  <>
                    <br />
                    {subtitleLine2}
                  </>
                )}
              </p>
            </div>

            <div className="z-[1] grid w-full grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
              <div className="flex flex-col">
                <p className="font-body text-small">
                  {t("contact.get_in_touch.label_first_name")}
                </p>
                <div className="flex flex-1 flex-col">
                  <Input
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    placeholder={t("contact.get_in_touch.placeholder_first_name")}
                    className="my-1 rounded-[5px] bg-white font-heading text-ink-800 shadow-card"
                  />
                  {errors.FirstName && (
                    <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                      {errors.FirstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="font-body text-small">
                  {t("contact.get_in_touch.label_last_name")}
                </p>
                <div className="flex flex-1 flex-col">
                  <Input
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    placeholder={t("contact.get_in_touch.placeholder_last_name")}
                    className="my-1 rounded-[5px] bg-white font-heading text-ink-800 shadow-card"
                  />
                  {errors.LastName && (
                    <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                      {errors.LastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="font-body text-small">
                  {t("contact.get_in_touch.label_email")}
                </p>
                <div className="flex flex-1 flex-col">
                  <Input
                    name="EmailAddress"
                    value={formData.EmailAddress}
                    onChange={handleChange}
                    placeholder={t("contact.get_in_touch.placeholder_email")}
                    className="my-1 rounded-[5px] bg-white font-heading text-ink-800 shadow-card"
                  />
                  {errors.EmailAddress && (
                    <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                      {errors.EmailAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="font-body text-small">
                  {t("contact.get_in_touch.label_phone")}
                </p>
                <div className="my-1 flex flex-1 flex-col">
                  <PhoneInput
                    defaultCountry={isRTL ? "AE" : "SA"}
                    value={formData?.PhoneNumber || ""}
                    onChange={(e) => handleChange("PhoneNumber", String(e))}
                    inputComponent={CustomInput}
                    placeholder={t("contact.get_in_touch.placeholder_phone")}
                    className="relative z-[2] h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none"
                  />
                  {errors.PhoneNumber && (
                    <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                      {errors.PhoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-[6px] w-full font-body text-small">
              {t("contact.get_in_touch.label_message")}
            </p>
            <Textarea
              name="Message"
              rows={4}
              value={formData.Message}
              onChange={(e) => handleChange("Message", e.target.value)}
              placeholder={t("contact.get_in_touch.placeholder_message")}
              className="my-1 rounded-[5px] bg-white font-heading text-ink-800 shadow-card"
            />
            {errors.Message && (
              <p className="ms-[6px] mt-[6px] w-full font-body text-small text-danger">
                {errors.Message}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "my-4 w-full rounded-md py-[18px] font-heading text-button leading-[18.4px] shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] sm:py-[15px]",
              )}
            >
              {loading ? (
                <span
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                  aria-label="loading"
                />
              ) : (
                t("contact.get_in_touch.submit")
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
