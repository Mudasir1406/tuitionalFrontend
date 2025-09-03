"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import { isValidPhoneNumber } from "react-phone-number-input";
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

import "react-phone-number-input/style.css";
import styles from "./style.module.css";

import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendEmail } from "@/services/email-service/email-service";
import { createEmailTemplate } from "@/services/email-service/template";
import toast from "react-hot-toast";
import { HELLOTUITIONALEDU } from "@/utils/env";
import { FormType } from "@/components/home/form-dialouge";
import CustomInput from "@/components/custom-input/custom-input";
import Input from "@/components/input/Input";
import DropDown from "@/components/DropDown/DropDown";
import TranslatableDropDown from "@/components/DropDown/TranslatableDropDown";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import dynamic from "next/dynamic";
import useGeoLocation from "@/utils/slugHelper";
import { sendForm } from "@/services/contact-form/contact-form";

type IProps = {
  background?: any;
};

const ArForm: React.FunctionComponent<IProps> = ({ background }) => {
  const [formData, setFormData] = React.useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    message: "",
    Browser: "",
    country: "",
    ip: "",
    pageURL: "",
    sheetName: "Lead Forms",
  });
  const [filterData, setFilterData] = useState<Filter_Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<FormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    if (key === "PhoneNumber" && typeof value === "string") {
      if (!isValidPhoneNumber(value)) {
        newErrors.PhoneNumber = isValidPhoneNumber(value)
          ? ""
          : "رقم هاتف غير صحيح";

        return;
      }
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value)
        ? ""
        : "عنوان بريد إلكتروني غير صحيح";
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value) ? "" : "لا يمكن أن يكون الاسم فارغاً";
    }
    if (key === "Grade" && typeof value === "string") {
      newErrors.Grade = isNotEmpty(value) ? "" : "لا يمكن أن تكون المرحلة فارغة";
    }
    if (key === "Curriculum" && typeof value === "string") {
      newErrors.Curriculum = isNotEmpty(value)
        ? ""
        : "لا يمكن أن يكون المنهج فارغاً";
    }
    if (key === "Subject" && typeof value === "string") {
      newErrors.Subject = isNotEmpty(value) ? "" : "المواد لا يمكن أن تكون فارغة";
    }
    if (key === "message" && typeof value === "string") {
      newErrors.message = isNotEmpty(value) ? "" : "لا يمكن أن تكون الرسالة فارغة";
    }

    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newErrors: Partial<FormType> = {};

    if (!isNotEmpty(formData.FirstName)) {
      newErrors.FirstName = "لا يمكن أن يكون الاسم فارغاً";
    }

    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = "عنوان بريد إلكتروني غير صحيح";
    }

    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "رقم هاتف غير صحيح";
    }
    if (!isNotEmpty(formData.Grade)) {
      newErrors.Grade = "لا يمكن أن تكون المرحلة فارغة";
    }
    if (!isNotEmpty(formData.Curriculum)) {
      newErrors.Curriculum = "لا يمكن أن يكون المنهج فارغاً";
    }

    if (!isNotEmpty(formData.message)) {
      newErrors.message = "لا يمكن أن تكون الرسالة فارغة";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error("يرجى إصلاح الأخطاء في النموذج قبل الإرسال.");

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "lead_form_error",
        formData: newErrors,
        formType: "lead Form",
      });

      return;
    }

    await addFormData("lead", formData);

    try {
      await sendForm(formData);
      toast.success("تم إرسال النموذج بنجاح!");
      (window as any).dataLayer.push({
        event: "lead_form_success",
        formData: formData,
        formType: "lead Form",
      });
    } catch (error: any) {
      console.error("خطأ في حفظ البيانات:", error);
      toast.error("فشل في إرسال النموذج!");
      (window as any).dataLayer.push({
        event: "lead_form_failed",
        error: error.message,
        formType: "lead Form",
      });
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "",
        EmailAddress: "",
        PhoneNumber: "",
        Grade: "",
        Curriculum: "",
        Subject: "",
        message: "",
        sheetName: "Lead Forms",
      });
    }
  };

  useEffect(() => {
    getFilterData().then((data) => {
      setFilterData(data);
    });
  }, []);

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

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"h5"}
          variant="subtitle1"
        >
          احصل على خصم 10% إذا سجلت اليوم!
        </Typography>
        <div className={styles.inputDiv}>
          <div className={styles.inputInner}>
            <Input
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              placeholder={"أدخل الاسم هنا..."}
              className={`${styles.input} ${leagueSpartan.className}`}
            />
            {errors.FirstName && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.FirstName}
              </Typography>
            )}
          </div>

          <div className={styles.inputInner}>
            <Input
              name="EmailAddress"
              value={formData.EmailAddress}
              onChange={handleChange}
              placeholder={"أدخل البريد الإلكتروني هنا..."}
              className={`${styles.input} ${leagueSpartan.className}`}
            />
            {errors.EmailAddress && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.EmailAddress}
              </Typography>
            )}
          </div>
        </div>

        <div className={styles.inputDiv}>
          <div className={styles.div}>
            <PhoneInput
              defaultCountry="SA"
              value={formData?.PhoneNumber || ""}
              onChange={(e) => handleChange("PhoneNumber", String(e))}
              inputComponent={CustomInput}
              className={`${styles.phoneInput}`}
            />
            {errors.PhoneNumber && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.PhoneNumber}
              </Typography>
            )}
          </div>
          <div className={styles.div}>
            <DropDown
              name="Grade"
              placeholder="اختر المرحلة"
              marginTop="1.5vh"
              data={filterData?.grade || []}
              value={formData.Grade}
              onChange={handleChange}
            />
            {errors.Grade && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.Grade}
              </Typography>
            )}
          </div>
        </div>
        <div className={styles.inputDiv}>
          <div className={styles.div}>
            <DropDown
              placeholder="اختر المنهج"
              name="Curriculum"
              data={filterData?.curriculum || []}
              marginTop="1.5vh"
              value={formData.Curriculum}
              onChange={handleChange}
            />
            {errors.Curriculum && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.Curriculum}
              </Typography>
            )}
          </div>
          <div className={styles.div}>
            <TranslatableDropDown
              name="Subject"
              placeholder="اختر المواد"
              data={filterData?.subject || []}
              marginTop="1.5vh"
              multiple
              value={formData.Subject}
              onChange={handleChange}
              locale="ar"
              isSubjectField={true}
            />
            {errors.Subject && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.Subject}
              </Typography>
            )}
          </div>
        </div>
        <div>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="Message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="أدخل رسالتك هنا..."
            className={`${leagueSpartan.className} ${styles.textArea} ${styles.textField}`}
          />
          {errors.message && (
            <Typography
              className={`${leagueSpartan.className} ${styles.error}`}
              component={"p"}
              variant="caption"
            >
              {errors.message}
            </Typography>
          )}
        </div>

        <Button
          variant="contained"
          className={`${leagueSpartan.className} ${styles.containedButton}`}
          type="submit"
        >
          {loading ? (
            <CircularProgress
              sx={{ width: "12px", height: "12px", color: "white" }}
              size={20}
            />
          ) : (
            "إرسال الآن"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ArForm;