"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useI18n } from "@/context/language-context";
import CustomInput from "@/components/custom-input/custom-input";
import Input from "@/components/input/Input";
import TranslatableDropDown from "@/components/DropDown/TranslatableDropDown";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendForm } from "@/services/contact-form/contact-form";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import type { FormType } from "@/components/home/form-dialouge";

const PhoneInput = dynamic(() => import("react-phone-number-input"), { ssr: false });

type IProps = { background?: any };

const Form: React.FC<IProps> = ({ background }) => {
  const { locale } = useI18n();
  const [formData, setFormData] = useState<FormType>({
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
  const [filterData, setFilterData] = useState<Filter_Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    const newErrors = { ...errors };
    if (key === "PhoneNumber" && typeof value === "string") {
      newErrors.PhoneNumber = isValidPhoneNumber(value) ? "" : "Invalid phone number";
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value) ? "" : "Invalid email address";
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value) ? "" : "Name cannot be empty";
    }
    if (key === "Grade" && typeof value === "string") {
      newErrors.Grade = isNotEmpty(value) ? "" : "Grade cannot be empty";
    }
    if (key === "Curriculum" && typeof value === "string") {
      newErrors.Curriculum = isNotEmpty(value) ? "" : "Curriculum cannot be empty";
    }
    if (key === "Subject" && typeof value === "string") {
      newErrors.Subject = isNotEmpty(value) ? "" : "Subjects cannot be empty";
    }
    if (key === "Message" && typeof value === "string") {
      newErrors.Message = isNotEmpty(value) ? "" : "Message cannot be empty";
    }
    setFormData({ ...formData, [key]: value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newErrors: Partial<FormType> = {};
    if (!isNotEmpty(formData.FirstName)) newErrors.FirstName = "Name cannot be empty";
    if (!isValidEmail(formData.EmailAddress)) newErrors.EmailAddress = "Invalid email address";
    if (!isValidPhoneNumber(formData.PhoneNumber)) newErrors.PhoneNumber = "Invalid phone number";
    if (!isNotEmpty(formData.Grade)) newErrors.Grade = "Grade cannot be empty";
    if (!isNotEmpty(formData.Curriculum)) newErrors.Curriculum = "Curriculum cannot be empty";
    if (!isNotEmpty(formData.Message)) newErrors.Message = "Message cannot be empty";

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) {
      setLoading(false);
      toast.error("Please fix the errors in the form before submitting.");
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "lead_form_error", formData: newErrors, formType: "lead Form" });
      return;
    }

    await addFormData("lead", formData);

    try {
      await sendForm(formData);
      toast.success("Form submitted successfully!");
      (window as any).dataLayer.push({ event: "lead_form_success", formData, formType: "lead Form" });
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error("Form submission failed!");
      (window as any).dataLayer.push({ event: "lead_form_failed", error: error.message, formType: "lead Form" });
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "", EmailAddress: "", PhoneNumber: "", Grade: "",
        Curriculum: "", Subject: "", Message: "", sheetName: "Lead Forms",
      });
    }
  };

  useEffect(() => {
    getFilterData().then((data) => setFilterData(data));
  }, []);

  const geoData = useGeoLocation();

  useEffect(() => {
    if (!geoData.isLoading && !geoData.error) {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const params = new URLSearchParams(window.location.search);
      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
        Browser: browser,
        SourcePageURL: pageURL,
        Date: new Date().toLocaleDateString(),
        Time: new Date().toLocaleTimeString(),
        Medium: params.get("gad_source") ? "google Ads" : params.get("fbclid") ? "facebook" : "SEO",
      }));
    }
  }, [geoData]);

  const inputCls = "my-1 rounded-md bg-white text-ink-800 shadow-card";
  const errCls = "ms-1 mt-1 font-body text-small text-danger";

  return (
    <div className="rounded-lg bg-white p-6 shadow-card">
      <form onSubmit={handleSubmit}>
        <h5 className="mb-4 text-center font-heading text-h5 text-ink-900">
          Avail A 10% Discount If You Sign Up Today!
        </h5>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
          <div>
            <Input name="FirstName" value={formData.FirstName} onChange={handleChange}
              placeholder="Enter name here ..." className={inputCls} />
            {errors.FirstName && <p className={errCls}>{errors.FirstName}</p>}
          </div>
          <div>
            <Input name="EmailAddress" value={formData.EmailAddress} onChange={handleChange}
              placeholder="Enter email here ..." className={inputCls} />
            {errors.EmailAddress && <p className={errCls}>{errors.EmailAddress}</p>}
          </div>
          <div>
            <PhoneInput
              defaultCountry="SA"
              value={formData?.PhoneNumber || ""}
              onChange={(e) => handleChange("PhoneNumber", String(e))}
              inputComponent={CustomInput}
              disabled={!formData.EmailAddress}
              placeholder="Enter phone number here ..."
              className="relative z-[2] my-1 h-[5.5vh] min-h-[44px] rounded-md bg-white ps-[10px] text-ink-800 shadow-card outline-none"
            />
            {errors.PhoneNumber && <p className={errCls}>{errors.PhoneNumber}</p>}
          </div>
          <div>
            <TranslatableDropDown name="Grade" placeholder="Select Grade"
              data={filterData?.grade || []} value={formData.Grade} onChange={handleChange}
              locale={locale} isSubjectField={false} />
            {errors.Grade && <p className={errCls}>{errors.Grade}</p>}
          </div>
          <div>
            <TranslatableDropDown name="Curriculum" placeholder="Select Curriculum"
              data={filterData?.curriculum || []} value={formData.Curriculum} onChange={handleChange}
              locale={locale} isSubjectField={false} />
            {errors.Curriculum && <p className={errCls}>{errors.Curriculum}</p>}
          </div>
          <div>
            <TranslatableDropDown name="Subject" placeholder="Select Subjects"
              data={filterData?.subject || []} multiple value={formData.Subject} onChange={handleChange}
              locale={locale} isSubjectField={true} />
            {errors.Subject && <p className={errCls}>{errors.Subject}</p>}
          </div>
        </div>
        <div className="mt-2">
          <Textarea name="Message" rows={4} value={formData.Message}
            onChange={(e) => handleChange("Message", e.target.value)}
            placeholder="Enter your message here..." className={inputCls} />
          {errors.Message && <p className={errCls}>{errors.Message}</p>}
        </div>
        <Button type="submit" disabled={loading}
          className="my-4 w-full rounded-md py-[18px] text-button shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]">
          {loading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : "Submit Now"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
