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
import dynamic from "next/dynamic";

import girlLaptop from "../../../../public/assets/images/static/girl-using-laptop.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isNotEmpty, isValidEmail } from "@/utils/helper";

import toast from "react-hot-toast";
import { sendEmail } from "@/services/email-service/email-service";
import { HELLOTUITIONALEDU } from "@/utils/env";
import { createContactTemplate } from "@/services/email-service/template";
import styles from "./GetInTouch.module.css";
import { ContactFormType } from "@/components/home/form-dialouge";
import Input from "@/components/input/Input";
import CustomInput from "@/components/custom-input/custom-input";
import lines from "../../../../public/assets/images/static/lines.png";
import { addFormData } from "@/utils/globalFunction";
import useGeoLocation from "@/utils/slugHelper";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

const ArGetInTouch: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Message: "",
    sheetName: "Contact",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<ContactFormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors({
      ...errors,
      [key]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: Partial<ContactFormType> = {};

    if (!isNotEmpty(formData.FirstName)) {
      newErrors.FirstName = "الاسم الأول مطلوب";
    }

    if (!isNotEmpty(formData.LastName)) {
      newErrors.LastName = "الاسم الأخير مطلوب";
    }

    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = "عنوان بريد إلكتروني غير صالح";
    }

    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "رقم هاتف غير صالح";
    }

    if (!isNotEmpty(formData.Message)) {
      newErrors.Message = "الرسالة مطلوبة";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error("يرجى إصلاح الأخطاء في النموذج قبل الإرسال.");
      return;
    }

    try {
      const personalInfo = `الاسم: ${formData.FirstName} ${formData.LastName}، البريد الإلكتروني: ${formData.EmailAddress}، الهاتف: ${formData.PhoneNumber}، الرسالة: ${formData.Message}`;

      const template = createContactTemplate(formData);

      await sendEmail({
        subject: `استفسار جديد من ${formData.FirstName}`,
        recipientEmail: HELLOTUITIONALEDU,
        text: template,
        html: template,
      });

      toast.success("تم إرسال رسالتك بنجاح!");
      await addFormData("contact", formData);
      
      setFormData({
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNumber: "",
        Message: "",
        sheetName: "Contact",
      });
    } catch (error: any) {
      console.error("خطأ في إرسال النموذج:", error);
      toast.error("فشل في إرسال الرسالة!");
    } finally {
      setLoading(false);
    }
  };

  const geoData = useGeoLocation();

  useEffect(() => {
    if (!geoData.isLoading && !geoData.error) {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      
      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
        Browser: browser,
        SourcePageURL: pageURL,
        Date: currentDate,
        Time: currentTime,
      }));
    }
  }, [geoData]);

  return (
    <Box className={styles.container} dir="rtl">
      <div className={styles.background}></div>
      <div className={styles.mainDiv}>
        <div className={styles.imageDiv}>
          <Image
            src={girlLaptop.src}
            width={girlLaptop.width}
            height={girlLaptop.height}
            alt="فتاة تستخدم الكمبيوتر المحمول"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className={styles.formDiv}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.headingDiv}>
              <Typography
                className={`${leagueSpartan.className} ${styles.heading}`}
                component={"h2"}
                variant="h2"
              >
                تواصل معنا
                <Image
                  src={lines}
                  alt="lines"
                  className={styles.lines}
                  style={{
                    position: "absolute",
                    top: "-24px",
                    right: "-6%",
                  }}
                />
              </Typography>
              <Typography
                className={`${leagueSpartan.className} ${styles.looking}`}
                component={"p"}
                variant="body2"
              >
                نحن نتطلع لسماع رأيك!
              </Typography>
            </div>
            <Grid container columnSpacing={2} rowSpacing={1} sx={{ zIndex: 1 }}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Typography
                  className={`${leagueSpartan.className} ${styles.label}`}
                  variant="body2"
                >
                  الاسم الأول
                </Typography>
                <div className={styles.inputInner}>
                  <Input
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    placeholder="ادخل اسمك الأول هنا ..."
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
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Typography
                  className={`${leagueSpartan.className} ${styles.label}`}
                  variant="body2"
                >
                  الاسم الأخير
                </Typography>
                <div className={styles.inputInner}>
                  <Input
                    name="LastName"
                    value={formData.LastName || ""}
                    onChange={handleChange}
                    placeholder="ادخل اسمك الأخير هنا ..."
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.LastName && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.LastName}
                    </Typography>
                  )}
                </div>
              </Grid>

              <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Typography
                    className={`${leagueSpartan.className} ${styles.label}`}
                    variant="body2"
                  >
                    البريد الإلكتروني
                  </Typography>
                  <div className={styles.inputInner}>
                    <Input
                      name="EmailAddress"
                      value={formData.EmailAddress}
                      onChange={handleChange}
                      placeholder="ادخل بريدك الإلكتروني هنا ..."
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
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Typography
                    className={`${leagueSpartan.className} ${styles.label}`}
                    variant="body2"
                  >
                    رقم الهاتف
                  </Typography>
                  <div className={styles.div}>
                    <PhoneInput
                      defaultCountry="AE"
                      value={formData?.PhoneNumber || ""}
                      onChange={(e) => handleChange("PhoneNumber", String(e))}
                      inputComponent={CustomInput}
                      className={`${styles.phoneInput}`}
                      placeholder="ادخل رقم الهاتف"
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
                </Grid>

            </Grid>
            <Typography
              className={`${leagueSpartan.className} ${styles.label} ${styles.marginTop4}`}
              variant="body2"
              style={{ width: "100%" }}
            >
              الرسالة
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="Message"
              value={formData.Message}
              onChange={(e) => handleChange("Message", e.target.value)}
              placeholder="اكتب رسالتك هنا ..."
              className={`${leagueSpartan.className} ${styles.input}`}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                },
              }}
            />
            {errors.Message && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.Message}
              </Typography>
            )}

            <Button
                variant="contained"
                className={`${styles.containedButton} ${leagueSpartan.className}`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "إرسال الرسالة"
                )}
              </Button>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default ArGetInTouch;