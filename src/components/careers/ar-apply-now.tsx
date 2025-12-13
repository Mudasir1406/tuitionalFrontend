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
import applynow from "../../../public/assets/images/static/applynow.png";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import { CareersFormType } from "../home/form-dialouge";
import toast from "react-hot-toast";
import { sendEmail } from "@/services/email-service/email-service";
import { createCareerTemplate } from "@/services/email-service/template";
import { isValidPhoneNumber } from "react-phone-number-input";
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});
import "react-phone-number-input/style.css";
import CustomInput from "../custom-input/custom-input";
import { CAREERSTUITIONALEDU, HRTUITIONALEDU } from "@/utils/env";
import Input from "../input/Input";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import useGeoLocation from "@/utils/slugHelper";

const ArApplyNow: React.FunctionComponent = () => {
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<CareersFormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    if (key === "Message" && typeof value === "string") {
      if (value.length > 1000) {
        newErrors.Message = "الرسالة يجب أن تكون أقل من 1000 حرف";
      } else {
        delete newErrors.Message;
      }
    } else {
      delete newErrors[key as keyof CareersFormType];
    }

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: Partial<CareersFormType> = {};

    if (!isNotEmpty(formData.FirstName)) {
      newErrors.FirstName = "الاسم الأول مطلوب";
    }

    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = "عنوان بريد إلكتروني غير صالح";
    }

    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "رقم هاتف غير صالح";
    }

    if (!isNotEmpty(formData.LastName)) {
      newErrors.LastName = "اسم العائلة مطلوب";
    }

    if (!isNotEmpty(formData.Country)) {
      newErrors.Country = "البلد مطلوب";
    }

    if (!isNotEmpty(formData.Position)) {
      newErrors.Position = "المنصب مطلوب";
    }

    if (!isNotEmpty(formData.Message)) {
      newErrors.Message = "الرسالة مطلوبة";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error("يرجى إصلاح الأخطاء في النموذج قبل الإرسال.");

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "careers_form_error",
        formData: newErrors,
        formType: "careers Form",
      });

      return;
    }

    try {
      const personalInfo = `الاسم: ${formData.FirstName} ${formData.LastName}، البريد الإلكتروني: ${formData.EmailAddress}، الهاتف: ${formData.PhoneNumber}، البلد: ${formData.Country}، المنصب: ${formData.Position}، الرسالة: ${formData.Message}`;

      const template = createCareerTemplate(formData);

      const sendEmailsPromises = [];

      sendEmailsPromises.push(
        sendEmail({
          subject: `طلب وظيفة جديد من ${formData.FirstName}`,
          recipientEmail: CAREERSTUITIONALEDU,
          cc: HRTUITIONALEDU,
          text: template,
          html: template,
        })
      );

      const results = await Promise.allSettled(sendEmailsPromises);

      const failedEmails = results.filter(
        (result) => result.status === "rejected"
      );

      if (failedEmails.length === 0) {
        toast.success("تم إرسال النموذج بنجاح!");
        (window as any).dataLayer.push({
          event: "careers_form_submit",
          formData: formData,
          formType: "careers Form",
        });
        await addFormData("careers", formData);
      } else {
        throw new Error("فشل في إرسال بعض رسائل البريد الإلكتروني");
      }
    } catch (error: any) {
      console.error("خطأ في إرسال النموذج:", error);
      toast.error("فشل في إرسال النموذج!");
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
    <Box sx={styles.container} dir="rtl">
      <Box sx={styles.background} />
      <Grid container>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <Box
            sx={{
              position: "relative",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
              },
              height: {
                lg: "915px",
                xs: "auto",
              },
              margin: "auto",
            }}
          >
            <Image
              src={applynow.src}
              width={applynow.width}
              height={applynow.height}
              alt="قدم الآن"
              className="girlGrid"
              style={{
                position: "absolute",
                top: 90,
              }}
            ></Image>
          </Box>
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <Box
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "block",
              },
              alignItems: "center",
              flexDirection: "column",
              zIndex: 4,
              marginTop: { xs: 5, md: 10 },
            }}
          >
            <Typography
              sx={styles.heading}
              variant="h2"
              className={leagueSpartan.className}
            >
              قدم الآن
            </Typography>
            <Box
              sx={styles.contactForm}
              component="form"
              onSubmit={handleSubmit}
            >
              <Box sx={styles.formBox} />
              <Box sx={styles.formInner} />
              <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
                sx={{ zIndex: 1 }}
              >
                <Grid item xs={12} md={12} lg={6}>
                  <Input
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    placeholder={"ادخل الاسم الأول هنا ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.FirstName && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.FirstName}
                    </Typography>
                  )}

                  <Box sx={styles.my}>
                    <Input
                      name="EmailAddress"
                      value={formData.EmailAddress}
                      onChange={handleChange}
                      placeholder={"ادخل البريد الإلكتروني هنا ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.EmailAddress && (
                      <Typography
                        sx={styles.error}
                        className={`${leagueSpartan.className} `}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.EmailAddress}
                      </Typography>
                    )}
                  </Box>
                  <Input
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                    placeholder={"ادخل البلد هنا ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.Country && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.Country}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <Input
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    placeholder={"ادخل اسم العائلة هنا ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.LastName && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.LastName}
                    </Typography>
                  )}

                  <Box sx={styles.my}>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="AE"
                      value={formData.PhoneNumber}
                      onChange={(value) =>
                        handleChange("PhoneNumber", value || "")
                      }
                      inputComponent={CustomInput}
                      style={styles.phoneInput}
                      placeholder="ادخل رقم الهاتف"
                    />
                    {errors.PhoneNumber && (
                      <Typography
                        sx={styles.error}
                        className={`${leagueSpartan.className} `}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.PhoneNumber}
                      </Typography>
                    )}
                  </Box>
                  <Input
                    name="Position"
                    value={formData.Position}
                    onChange={handleChange}
                    placeholder={"ادخل المنصب هنا ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.Position && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.Position}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={[styles.input]}
                    fullWidth
                    multiline
                    rows={5}
                    name="Message"
                    value={formData.Message}
                    onChange={(e) => handleChange("Message", e.target.value)}
                    placeholder="ادخل رسالتك هنا..."
                    variant="outlined"
                    className={leagueSpartan.className}
                  />
                  {errors.Message && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} ${styles.error}`}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.Message}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Button
                variant="contained"
                sx={styles.containedButton}
                type="submit"
                className={leagueSpartan.className}
              >
                {loading ? (
                  <CircularProgress
                    sx={{ width: "12px", height: "12px", color: "white" }}
                    size={20}
                  />
                ) : (
                  "قدم الآن"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Image
        src={applynow.src}
        width={applynow.width}
        height={applynow.height}
        alt="قدم الآن"
        className="girlContact"
      ></Image>
    </Box>
  );
};

export default ArApplyNow;

const styles = {
  heading: {
    display: "flex",
    marginTop: {
      xs: "0px",
      sm: "0px",
      md: "0px",
      lg: "105px",
    },
    marginBottom: "20px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "19px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "20px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },
      backgroundRepeat: "no-repeat",
      top: {
        xs: -12,
        sm: -35,
        md: -35,
        lg: -35,
      },
      right: { // Changed from left for RTL
        xs: "11%",
        sm: "-6%",
        md: "-6%",
        lg: "-6%",
      },
    },
  },
  container: {
    background: "linear-gradient(to bottom, #D3EFFE, rgba(255, 255, 255, 0.7))",
    minHeight: { xs: "100vh", lg: "130vh" },
    position: "relative",
    padding: {
      xs: "20px",
      sm: "30px",
      md: "40px",
      lg: "50px",
    },
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  contactForm: {
    boxShadow:
      "0px -3px 8px 0px rgba(0, 0, 0, 0.06) inset,0px 3px 8px 0px rgba(0, 0, 0, 0.06) inset",
    backgroundColor: "rgba(255,255,255,0.7)",
    width: {
      xs: "75%",
      sm: "75%",
      md: "75%",
      lg: "65%",
    },
    paddingX: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "50px",
    },
    paddingY: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "50px",
    },
    borderRadius: "20px",
    marginBottom: {
      xs: "60px",
      sm: "60px",
      md: "100px",
      lg: "100px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  formBox: {
    width: {
      xs: "100px",
      sm: "180px",
      md: "200px",
      lg: "200px",
    },
    height: {
      xs: "100px",
      sm: "180px",
      md: "200px",
      lg: "200px",
    },
    borderRadius: "100px",
    backgroundColor: "rgba(56, 182, 255, 1)",
    position: "absolute",
    top: {
      xs: -30,
      sm: -80,
      md: -80,
      lg: -80,
    },
    left: {
      xs: -10,
      sm: -40,
      md: -60,
      lg: -80,
    },
    zIndex: -1,
  },
  formInner: {
    width: {
      xs: "60px",
      sm: "80px",
      md: "100px",
      lg: "100px",
    },
    height: {
      xs: "60px",
      sm: "80px",
      md: "100px",
      lg: "100px",
    },
    borderRadius: "100px",
    backgroundColor: "rgba(56, 182, 255, 1)",
    position: "absolute",
    bottom: {
      xs: -80,
      sm: -80,
      md: -80,
      lg: -30,
    },
    right: {
      xs: -20,
      sm: -20,
      md: -30,
      lg: -30,
    },
    zIndex: -1,
    display: {
      xs: "block",
      sm: "block",
      md: "block",
      lg: "block",
    },
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.87)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#38B6FF",
      },
    },
  },
  my: {
    marginY: "16px",
  },
  error: {
    color: "red",
    marginTop: "4px",
  },
  phoneInput: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    paddingRight: "10px",
    backgroundColor: "white",
    marginTop: "2vh",
    marginBottom: "2vh",
    outline: "none",
    ":focusVisible": {
      outline: "none",
    },
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    height: "5.5vh",
  },
  containedButton: {
    backgroundColor: "#38B6FF",
    color: "white",
    borderRadius: "10px",
    padding: "12px 24px",
    marginTop: "20px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#2E9FE6",
    },
  },
};