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
import { sendFormV2 } from "@/services/contact-form/contact-form";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormDatav2 } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import type { FormType } from "@/components/home/form-dialouge";

const PhoneInput = dynamic(() => import("react-phone-number-input"), { ssr: false });

type IProps = { background?: any };

const FormV2: React.FC<IProps> = ({ background }) => {
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
    sheetName: "PPC Leads",
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
    if (!isNotEmpty(formData.Message)) newErrors.Message = "Message cannot be empty";

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) {
      setLoading(false);
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    await addFormDatav2("lead-ppc", formData);

    try {
      await sendFormV2(formData);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Form submission failed!");
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "", EmailAddress: "", PhoneNumber: "", Grade: "",
        Curriculum: "", Subject: "", Message: "", sheetName: "PPC Leads",
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

  const inputCls = "mt-[1.5vh] rounded bg-white font-heading text-[2.3vh] text-ink-800 shadow-card";
  const errCls = "ms-[6px] mt-[6px] font-body text-small text-danger";

  return (
    <div className="rounded-2xl bg-brand-50 p-6 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">
      <form onSubmit={handleSubmit}>
        <h5 className="mb-[1.5vh] text-center font-heading text-stat-number-mobile font-bold text-ink-900 sm:text-stat-number-tablet lg:text-stat-number">
          Avail A 10% Discount If You Sign Up Today!
        </h5>
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <Input name="FirstName" value={formData.FirstName} onChange={handleChange}
              placeholder="Name" className={inputCls} />
            {errors.FirstName && <p className={errCls}>{errors.FirstName}</p>}
          </div>
          <div>
            <Input name="EmailAddress" value={formData.EmailAddress} onChange={handleChange}
              placeholder="Email" className={inputCls} />
            {errors.EmailAddress && <p className={errCls}>{errors.EmailAddress}</p>}
          </div>
          <div>
            <PhoneInput
              defaultCountry="SA"
              value={formData?.PhoneNumber || ""}
              onChange={(e) => handleChange("PhoneNumber", String(e))}
              inputComponent={CustomInput}
              className="relative z-[2] mt-[1.5vh] h-[5.5vh] min-h-[50px] rounded-md bg-white ps-[10px] text-[2.3vh] font-normal leading-[3.5vh] text-ink-800 shadow-card outline-none"
            />
            {errors.PhoneNumber && <p className={errCls}>{errors.PhoneNumber}</p>}
          </div>
          <div>
            <TranslatableDropDown name="Grade" placeholder="Grade" marginTop="1.5vh"
              data={filterData?.grade || []} value={formData.Grade} onChange={handleChange}
              locale={locale} isSubjectField={false} />
            {errors.Grade && <p className={errCls}>{errors.Grade}</p>}
          </div>
          <div className="col-span-2">
            <TranslatableDropDown name="Subject" placeholder="Subject" marginTop="1.5vh"
              data={filterData?.subject || []} multiple value={formData.Subject} onChange={handleChange}
              locale={locale} isSubjectField={true} />
            {errors.Subject && <p className={errCls}>{errors.Subject}</p>}
          </div>
        </div>
        <div className="mt-3">
          <Textarea name="Message" rows={4} value={formData.Message}
            onChange={(e) => handleChange("Message", e.target.value)}
            placeholder="Message"
            className="rounded-[5px] border-0 bg-white font-heading text-[2.3vh] text-ink-800 shadow-card focus:ring-0" />
          {errors.Message && <p className={errCls}>{errors.Message}</p>}
        </div>
        <Button type="submit" disabled={loading}
          className="mt-4 w-full rounded-md p-3 font-heading leading-[18.4px] shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]">
          {loading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : "Submit Now"}
        </Button>
      </form>
    </div>
  );
};

export default FormV2;
