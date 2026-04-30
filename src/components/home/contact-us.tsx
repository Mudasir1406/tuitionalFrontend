"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useI18n } from "@/context/language-context";
import CustomInput from "../custom-input/custom-input";
import { sendForm } from "@/services/contact-form/contact-form";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import type { Filter_Data } from "@/services/filter-data/filter-data";
import type { FormType } from "./form-dialouge";
import girl from "../../../public/assets/images/static/contact-us-girl.png";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";

const PhoneInput = dynamic(() => import("react-phone-number-input"), { ssr: false });
const TranslatableDropDown = dynamic(() => import("../DropDown/TranslatableDropDown"));
const Input = dynamic(() => import("../input/Input"));

type IProps = {
  background?: any;
  padding?: any;
  filterData: Filter_Data | null;
};

const FORM_STRINGS = {
  en: {
    placeholder_name: "Enter name here ...",
    placeholder_email: "Enter email here ...",
    placeholder_phone: "Enter phone number here ...",
    placeholder_grade: "Select Grade",
    placeholder_curriculum: "Select Curriculum",
    placeholder_subject: "Select Subjects",
    placeholder_message: "Enter your message here...",
    err_name: "Name cannot be empty",
    err_email: "Invalid email address",
    err_phone: "Invalid phone number",
    err_grade: "Grade cannot be empty",
    err_curriculum: "Curriculum cannot be empty",
    err_subject: "Subjects cannot be empty",
    err_message: "Message cannot be empty",
    err_fix: "Please fix the errors in the form before submitting.",
    toast_success: "Form submitted successfully!",
    toast_failed: "Form submission failed!",
    girl_alt: "girl",
  },
  ar: {
    placeholder_name: "ادخل اسمك هنا ...",
    placeholder_email: "ادخل بريدك الإلكتروني هنا ...",
    placeholder_phone: "ادخل رقم الهاتف هنا ...",
    placeholder_grade: "اختر الصف",
    placeholder_curriculum: "اختر المنهج",
    placeholder_subject: "اختر المواد",
    placeholder_message: "ادخل رسالتك هنا...",
    err_name: "الاسم مطلوب",
    err_email: "بريد إلكتروني غير صالح",
    err_phone: "رقم هاتف غير صالح",
    err_grade: "الصف مطلوب",
    err_curriculum: "المنهج مطلوب",
    err_subject: "المواد مطلوبة",
    err_message: "الرسالة مطلوبة",
    err_fix: "يرجى إصلاح الأخطاء في النموذج قبل الإرسال.",
    toast_success: "تم إرسال النموذج بنجاح!",
    toast_failed: "فشل في إرسال النموذج!",
    girl_alt: "فتاة",
  },
};

const ContactUs: React.FC<IProps> = ({ background, padding, filterData }) => {
  const { t, locale } = useI18n();
  const s = FORM_STRINGS[locale];

  const [formData, setFormData] = React.useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    Message: "",
    Browser: "",
    Country: "",
    IP: "",
    SourcePageURL: "",
    sheetName: "Lead Forms",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<FormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    const newErrors = { ...errors };
    if (key === "PhoneNumber" && typeof value === "string") {
      newErrors.PhoneNumber = isValidPhoneNumber(value) ? "" : s.err_phone;
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value) ? "" : s.err_email;
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value) ? "" : s.err_name;
    }
    if (key === "Grade" && typeof value === "string") {
      newErrors.Grade = isNotEmpty(value) ? "" : s.err_grade;
    }
    if (key === "Curriculum" && typeof value === "string") {
      newErrors.Curriculum = isNotEmpty(value) ? "" : s.err_curriculum;
    }
    if (key === "Subject" && typeof value === "string") {
      newErrors.Subject = isNotEmpty(value) ? "" : s.err_subject;
    }
    if (key === "Message" && typeof value === "string") {
      newErrors.Message = isNotEmpty(value) ? "" : s.err_message;
    }
    setFormData({ ...formData, [key]: value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: Partial<FormType> = {};
    if (!isNotEmpty(formData.FirstName)) newErrors.FirstName = s.err_name;
    if (!isValidEmail(formData.EmailAddress)) newErrors.EmailAddress = s.err_email;
    if (!isValidPhoneNumber(formData.PhoneNumber)) newErrors.PhoneNumber = s.err_phone;
    if (!isNotEmpty(formData.Grade)) newErrors.Grade = s.err_grade;
    if (!isNotEmpty(formData.Curriculum)) newErrors.Curriculum = s.err_curriculum;
    if (!isNotEmpty(formData.Message)) newErrors.Message = s.err_message;

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error(s.err_fix);
      return;
    }

    await addFormData("lead", formData);

    try {
      await sendForm(formData);
      toast.success(s.toast_success);
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error(s.toast_failed);
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "",
        EmailAddress: "",
        PhoneNumber: "",
        Grade: "",
        Curriculum: "",
        Subject: "",
        Message: "",
      });
    }
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

  const inputCls = "my-1 rounded-md bg-white text-ink-800 shadow-card";
  const errCls = "ms-1 mt-1 font-body text-small text-danger";

  return (
    <div className="relative" style={background as any}>
      <div className="absolute inset-0 -z-[2] h-full w-full" style={padding as any} />
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative flex h-auto items-end justify-center">
            <Image
              src={girl.src}
              width={girl.width}
              height={girl.height}
              alt={s.girl_alt}
              className="girlGrid relative bottom-0"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="z-[4] flex flex-col items-center md:items-stretch lg:block">
            <h2 className="relative ms-0 mb-5 mt-0 flex font-heading text-h2-mobile sm:text-h2-tablet md:ms-[60px] lg:ms-[65px] lg:text-h2 text-black">
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
              {t("home.contact_us.heading")}
            </h2>
            <p className="px-5 text-center font-heading text-body-mobile sm:text-body lg:px-0 lg:text-start text-black">
              {t("home.contact_us.description")}
            </p>

            <form onSubmit={handleSubmit} className="relative mt-4 w-full">
              <div className="z-[1] grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div>
                    <Input
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      placeholder={s.placeholder_name}
                      className={inputCls}
                    />
                    {errors.FirstName && <p className={errCls}>{errors.FirstName}</p>}
                  </div>
                  <div>
                    <PhoneInput
                      defaultCountry="SA"
                      value={formData?.PhoneNumber || ""}
                      onChange={(e) => handleChange("PhoneNumber", String(e))}
                      inputComponent={CustomInput}
                      placeholder={s.placeholder_phone}
                      disabled={!formData.EmailAddress}
                      className="relative z-[2] my-1 h-[5.5vh] min-h-[44px] rounded-md bg-white ps-[10px] text-ink-800 shadow-card outline-none"
                    />
                    {errors.PhoneNumber && <p className={errCls}>{errors.PhoneNumber}</p>}
                  </div>
                  <div>
                    <TranslatableDropDown
                      placeholder={s.placeholder_curriculum}
                      name="Curriculum"
                      data={filterData?.curriculum || []}
                      value={formData.Curriculum}
                      onChange={handleChange}
                      locale={locale}
                      isSubjectField={false}
                    />
                    {errors.Curriculum && <p className={errCls}>{errors.Curriculum}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <Input
                      name="EmailAddress"
                      value={formData.EmailAddress}
                      onChange={handleChange}
                      placeholder={s.placeholder_email}
                      className={inputCls}
                    />
                    {errors.EmailAddress && <p className={errCls}>{errors.EmailAddress}</p>}
                  </div>
                  <div>
                    <TranslatableDropDown
                      name="Grade"
                      placeholder={s.placeholder_grade}
                      data={filterData?.grade || []}
                      value={formData.Grade}
                      onChange={handleChange}
                      locale={locale}
                      isSubjectField={false}
                    />
                    {errors.Grade && <p className={errCls}>{errors.Grade}</p>}
                  </div>
                  <div>
                    <TranslatableDropDown
                      name="Subject"
                      placeholder={s.placeholder_subject}
                      data={filterData?.subject || []}
                      value={formData.Subject}
                      onChange={handleChange}
                      multiple
                      locale={locale}
                      isSubjectField={true}
                    />
                    {errors.Subject && <p className={errCls}>{errors.Subject}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <Textarea
                  name="Message"
                  rows={4}
                  value={formData.Message}
                  onChange={(e) => handleChange("Message", e.target.value)}
                  placeholder={s.placeholder_message}
                  className={inputCls}
                />
                {errors.Message && <p className={errCls}>{errors.Message}</p>}
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
                  t("home.contact_us.submit")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Image
        src={girl.src}
        width={girl.width}
        height={girl.height}
        alt={s.girl_alt}
        className="girlContact"
      />
    </div>
  );
};

export default ContactUs;
