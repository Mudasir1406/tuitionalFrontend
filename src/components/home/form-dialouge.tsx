"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog as HouseDialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/input";
import { useI18n } from "@/context/language-context";
import CustomInput from "../custom-input/custom-input";
import Input from "../input/Input";
import TranslatableDropDown from "../DropDown/TranslatableDropDown";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendForm } from "@/services/contact-form/contact-form";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import "../DropDown/DropDown.css";

const PhoneInput = dynamic(() => import("react-phone-number-input"), { ssr: false });

type IProps = {
  open: boolean;
  handleClose: () => void;
  values?: FormType;
};

export type FormType = {
  FirstName: string;
  EmailAddress: string;
  PhoneNumber: string;
  Grade: string;
  Curriculum: string;
  Subject: string;
  Message: string;
  Country?: string;
  IP?: string;
  Browser?: string;
  SourcePageURL?: string;
  Time?: string;
  Date?: string;
  Medium?: string;
  sheetName?: string;
};

export type CareersFormType = {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: string;
  Country: string;
  Position: string;
  Message: string;
  IP?: string;
  Browser?: string;
  SourcePageURL?: string;
  sheetName?: string;
};

export type ContactFormType = {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: string;
  Message: string;
  Country?: string;
  IP?: string;
  Browser?: string;
  SourcePageURL?: string;
  Date?: string;
  Time?: string;
  sheetName?: string;
};

const STRINGS = {
  en: {
    heading: "Get Started",
    placeholder_name: "Enter name here ...",
    placeholder_email: "Enter email here ...",
    placeholder_phone: "Enter phone number here ...",
    placeholder_grade: "Select Grade",
    placeholder_curriculum: "Select Curriculum",
    placeholder_subject: "Select Subjects",
    placeholder_message: "Enter your message here...",
    submit: "Submit Now",
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
  },
  ar: {
    heading: "ابدأ الآن",
    placeholder_name: "ادخل اسمك هنا ...",
    placeholder_email: "ادخل بريدك الإلكتروني هنا ...",
    placeholder_phone: "ادخل رقم الهاتف هنا ...",
    placeholder_grade: "اختر الصف",
    placeholder_curriculum: "اختر المنهج",
    placeholder_subject: "اختر المواد",
    placeholder_message: "ادخل رسالتك هنا...",
    submit: "إرسال الآن",
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
  },
};

const FormDialog: React.FC<IProps> = ({ open, handleClose, values }) => {
  const { locale } = useI18n();
  const s = STRINGS[locale];
  const [filterData, setFilterData] = React.useState<Filter_Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    Message: "",
    sheetName: "Lead Forms",
  });
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

  React.useEffect(() => {
    if (values) setFormData(values);
  }, [values]);

  const geoData = useGeoLocation();

  React.useEffect(() => {
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

  const onClickUpload = async () => {
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
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "lead_form_error",
          formData: newErrors,
          formType: "lead Form",
        });
      }
      return;
    }

    await addFormData("lead", formData);

    try {
      await sendForm(formData);
      toast.success(s.toast_success);
      if (typeof window !== "undefined") {
        (window as any).dataLayer.push({
          event: "lead_form_success",
          formData,
          formType: "lead Form",
        });
      }
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error(s.toast_failed);
      if (typeof window !== "undefined") {
        (window as any).dataLayer.push({
          event: "lead_form_failed",
          error: error.message,
          formType: "lead Form",
        });
      }
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

  React.useEffect(() => {
    getFilterData().then((data) => setFilterData(data));
  }, []);

  const inputCls = "my-1 rounded-md bg-white font-heading text-ink-800 shadow-card";
  const errCls = "ms-1 mt-1 font-body text-small text-danger";

  return (
    <HouseDialog open={open} onClose={handleClose} hideCloseButton size="xl">
      <div className="-m-4 sm:-m-6 w-full overflow-auto rounded-[30px] bg-white shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)] sm:w-auto md:w-[50vw]">
        <div className="mt-[3vh] mb-[2vh] mx-[3vh] flex items-center justify-between">
          <h2 className="font-heading text-[3vh] font-medium leading-[2.2vh] tracking-tight text-black">
            {s.heading}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer"
            aria-label="Close"
          >
            <X size={30} />
          </button>
        </div>
        <hr className="border-ink-200" />

        <div className="px-[2%] py-[2%]">
          <form onSubmit={(e) => { e.preventDefault(); onClickUpload(); }}>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
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
                <PhoneInput
                  defaultCountry="SA"
                  value={formData?.PhoneNumber || ""}
                  onChange={(e) => handleChange("PhoneNumber", String(e))}
                  inputComponent={CustomInput}
                  disabled={!formData.EmailAddress}
                  placeholder={s.placeholder_phone}
                  className="relative z-[2] my-1 h-[5.5vh] min-h-[44px] rounded-md bg-white ps-[10px] text-ink-800 shadow-card outline-none"
                />
                {errors.PhoneNumber && <p className={errCls}>{errors.PhoneNumber}</p>}
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
              <div>
                <TranslatableDropDown
                  name="Subject"
                  placeholder={s.placeholder_subject}
                  data={filterData?.subject || []}
                  multiple
                  value={formData.Subject}
                  onChange={handleChange}
                  locale={locale}
                  isSubjectField={true}
                />
                {errors.Subject && <p className={errCls}>{errors.Subject}</p>}
              </div>
            </div>

            <div className="mt-2">
              <Textarea
                name="Message"
                rows={5}
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
                s.submit
              )}
            </Button>
          </form>
        </div>
      </div>
    </HouseDialog>
  );
};

export default FormDialog;
