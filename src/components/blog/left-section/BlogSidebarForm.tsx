"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import CustomInput from "@/components/custom-input/custom-input";
import TranslatableDropDown from "@/components/DropDown/TranslatableDropDown";
import "@/components/DropDown/DropDown.css";
import Input from "@/components/input/Input";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendForm } from "@/services/contact-form/contact-form";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";
import { useI18n } from "@/context/language-context";
import type { FormType } from "@/components/home/form-dialouge";

const PhoneInput = dynamic(() => import("react-phone-number-input"), { ssr: false });

const BlogSidebarForm: React.FC = () => {
  const { locale } = useI18n();
  const [filterData, setFilterData] = useState<Filter_Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
  const [errors, setErrors] = useState<Partial<FormType>>({});

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
        Medium: params.get("gad_source")
          ? "google Ads"
          : params.get("fbclid")
            ? "facebook"
            : "SEO",
      }));
    }
  }, [geoData]);

  useEffect(() => {
    getFilterData().then((data) => setFilterData(data));
  }, []);

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

  const onSubmit = async () => {
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
      toast.error("Please fix the errors before submitting.");
      return;
    }

    await addFormData("lead", formData);

    try {
      await sendForm(formData);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Form submission failed!");
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
        sheetName: "Lead Forms",
      });
    }
  };

  const inputCls = "h-9 w-full rounded-md bg-white px-3 text-form-input text-ink-900 shadow-card";
  const errCls = "ms-1 mt-1 font-body text-small text-danger";

  return (
    <div className="flex flex-col gap-2 rounded-md bg-brand-50 p-4 shadow-card">
      <h3 className="font-heading text-h6 text-ink-900">Get Started</h3>

      <Input
        name="FirstName"
        value={formData.FirstName}
        onChange={handleChange}
        placeholder="Enter name here ..."
        className={inputCls}
      />
      {errors.FirstName && <p className={errCls}>{errors.FirstName}</p>}

      <Input
        name="EmailAddress"
        value={formData.EmailAddress}
        onChange={handleChange}
        placeholder="Enter email here ..."
        className={inputCls}
      />
      {errors.EmailAddress && <p className={errCls}>{errors.EmailAddress}</p>}

      <PhoneInput
        defaultCountry="SA"
        value={formData.PhoneNumber || ""}
        onChange={(e) => handleChange("PhoneNumber", String(e))}
        inputComponent={CustomInput}
        disabled={!formData.EmailAddress}
        placeholder="Enter phone number ..."
        className="h-9 w-full rounded-md bg-white ps-2 shadow-card"
      />
      {errors.PhoneNumber && <p className={errCls}>{errors.PhoneNumber}</p>}

      <TranslatableDropDown
        name="Grade"
        placeholder="Select Grade"
        data={filterData?.grade || []}
        value={formData.Grade}
        onChange={handleChange}
        locale={locale}
        isSubjectField={false}
      />
      {errors.Grade && <p className={errCls}>{errors.Grade}</p>}

      <TranslatableDropDown
        placeholder="Select Curriculum"
        name="Curriculum"
        data={filterData?.curriculum || []}
        value={formData.Curriculum}
        onChange={handleChange}
        locale={locale}
        isSubjectField={false}
      />
      {errors.Curriculum && <p className={errCls}>{errors.Curriculum}</p>}

      <TranslatableDropDown
        name="Subject"
        placeholder="Select Subjects"
        data={filterData?.subject || []}
        multiple
        value={formData.Subject}
        onChange={handleChange}
        locale={locale}
        isSubjectField={true}
      />
      {errors.Subject && <p className={errCls}>{errors.Subject}</p>}

      <Textarea
        name="Message"
        rows={3}
        value={formData.Message}
        onChange={(e) => handleChange("Message", e.target.value)}
        placeholder="Enter your message here..."
      />
      {errors.Message && <p className={errCls}>{errors.Message}</p>}

      <Button onClick={onSubmit} variant="primary" className="w-full">
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          "Submit Now"
        )}
      </Button>
    </div>
  );
};

export default BlogSidebarForm;
