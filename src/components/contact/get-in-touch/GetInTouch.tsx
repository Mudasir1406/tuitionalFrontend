"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { sendEmail } from "@/services/email-service/email-service";
import { createContactTemplate } from "@/services/email-service/template";
import { HELLOTUITIONALEDU } from "@/utils/env";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import { leagueSpartan } from "@/app/fonts";
import type { ContactFormType } from "@/components/home/form-dialouge";

import CustomInput from "@/components/custom-input/custom-input";
import girlLaptop from "../../../../public/assets/images/static/girl-using-laptop.png";
import lines from "../../../../public/assets/images/static/lines.png";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
  loading: () => (
    <div className="relative z-[2] h-11 min-h-[44px] rounded-md bg-white shadow-card" />
  ),
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

  const fieldClass = cn(
    leagueSpartan.className,
    "h-11 min-h-[44px] w-full rounded-md bg-white px-4 font-body text-form-input text-ink-800 shadow-card",
    "placeholder:text-ink-400 outline-none focus:outline-none focus-visible:outline-none",
  );

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-white/70 to-brand-50 pt-10 sm:pt-14 lg:pt-16">
      <div className="absolute inset-0 -z-[2] h-full w-full" />

      <div className="mx-4 mb-16 flex w-full max-w-[1400px] flex-col items-stretch justify-center gap-6 sm:mx-6 sm:mb-20 lg:mx-12 lg:flex-row lg:gap-8">
        <div className="flex items-stretch justify-center lg:flex-[0.45]">
          <Image
            src={girlLaptop.src}
            width={girlLaptop.width}
            height={girlLaptop.height}
            alt={t("contact.get_in_touch.alt_image")}
            loading="lazy"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
            className="h-full max-h-[520px] w-full rounded-[20px] object-cover sm:max-h-[640px] lg:max-h-none"
          />
        </div>

        <div className="flex items-stretch justify-center lg:flex-[0.55]">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "relative flex w-full flex-col gap-5 rounded-[20px] bg-white/70 p-6 sm:p-8 sm:gap-6 lg:p-10",
              "shadow-[0px_-3px_8px_0px_rgba(0,155,245,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)]",
            )}
          >
            <div className="relative mb-1 flex flex-col items-center justify-center gap-2 text-center sm:mb-2">
              <h2
                className={cn(
                  "relative inline-flex items-center justify-center gap-1 font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2",
                )}
              >
                {t("contact.get_in_touch.heading_lead")}
                {headingAccent && (
                  <span className="font-bold text-success">
                    {headingAccent}
                  </span>
                )}
                <Image
                  src={lines}
                  alt=""
                  className="absolute -top-4 -right-6 h-5 w-5 object-contain sm:-top-5 sm:-right-7 sm:h-6 sm:w-6"
                />
              </h2>
              <p className="text-center font-body text-small leading-relaxed">
                {t("contact.get_in_touch.subtitle_line_1")}
                {subtitleLine2 && (
                  <>
                    <br />
                    {subtitleLine2}
                  </>
                )}
              </p>
            </div>

            <div className="z-[1] grid w-full grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="FirstName"
                  className="font-body text-form-label text-ink-700"
                >
                  {t("contact.get_in_touch.label_first_name")}
                </label>
                <input
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={(e) => handleChange("FirstName", e.target.value)}
                  placeholder={t("contact.get_in_touch.placeholder_first_name")}
                  className={fieldClass}
                />
                {errors.FirstName && (
                  <p className="font-body text-small text-danger">
                    {errors.FirstName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="LastName"
                  className="font-body text-form-label text-ink-700"
                >
                  {t("contact.get_in_touch.label_last_name")}
                </label>
                <input
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={(e) => handleChange("LastName", e.target.value)}
                  placeholder={t("contact.get_in_touch.placeholder_last_name")}
                  className={fieldClass}
                />
                {errors.LastName && (
                  <p className="font-body text-small text-danger">
                    {errors.LastName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="EmailAddress"
                  className="font-body text-form-label text-ink-700"
                >
                  {t("contact.get_in_touch.label_email")}
                </label>
                <input
                  id="EmailAddress"
                  name="EmailAddress"
                  type="email"
                  value={formData.EmailAddress}
                  onChange={(e) => handleChange("EmailAddress", e.target.value)}
                  placeholder={t("contact.get_in_touch.placeholder_email")}
                  className={fieldClass}
                />
                {errors.EmailAddress && (
                  <p className="font-body text-small text-danger">
                    {errors.EmailAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block font-body text-form-label text-ink-700">
                  {t("contact.get_in_touch.label_phone")}
                </label>
                <PhoneInput
                  defaultCountry={isRTL ? "AE" : "SA"}
                  value={formData?.PhoneNumber || ""}
                  onChange={(e) => handleChange("PhoneNumber", String(e))}
                  inputComponent={CustomInput}
                  placeholder={t("contact.get_in_touch.placeholder_phone")}
                  className="relative z-[2] h-11 min-h-[44px] rounded-md bg-white ps-[10px] text-ink-800 shadow-card outline-none"
                />
                {errors.PhoneNumber && (
                  <p className="mt-1.5 font-body text-small text-danger">
                    {errors.PhoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="Message"
                className="font-body text-form-label text-ink-700"
              >
                {t("contact.get_in_touch.label_message")}
              </label>
              <textarea
                id="Message"
                name="Message"
                rows={5}
                value={formData.Message}
                onChange={(e) => handleChange("Message", e.target.value)}
                placeholder={t("contact.get_in_touch.placeholder_message")}
                className={cn(
                  leagueSpartan.className,
                  "min-h-[120px] w-full resize-y rounded-md bg-white px-4 py-3 font-body text-form-input text-ink-800 shadow-card",
                  "placeholder:text-ink-400 outline-none focus:outline-none focus-visible:outline-none",
                )}
              />
              {errors.Message && (
                <p className="font-body text-small text-danger">
                  {errors.Message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-1 h-12 w-full rounded-md font-heading text-button !text-white shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] sm:h-[52px]",
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
