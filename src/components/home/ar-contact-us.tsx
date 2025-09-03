"use client";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import girl from "../../../public/assets/images/static/contact-us-girl.png";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import { isValidPhoneNumber } from "react-phone-number-input";
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});
const TranslatableDropDown = dynamic(() => import("../DropDown/TranslatableDropDown"));
const Input = dynamic(() => import("../input/Input"));
import "react-phone-number-input/style.css";
import { Filter_Data } from "@/services/filter-data/filter-data";
import { FormType } from "./form-dialouge";
import toast from "react-hot-toast";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import CustomInput from "../custom-input/custom-input";
import useGeoLocation from "@/utils/slugHelper";
import { sendForm } from "@/services/contact-form/contact-form";

type IProps = {
  background?: any;
  padding?: any;
  filterData: Filter_Data | null;
};

const ArContactUs: React.FunctionComponent<IProps> = ({
  background,
  padding,
  filterData,
}) => {
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<FormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    if (key === "PhoneNumber" && typeof value === "string") {
      if (!isValidPhoneNumber(value)) {
        newErrors.PhoneNumber = isValidPhoneNumber(value)
          ? ""
          : "رقم هاتف غير صالح";

        return;
      }
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value)
        ? ""
        : "عنوان بريد إلكتروني غير صالح";
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value) ? "" : "الاسم لا يمكن أن يكون فارغًا";
    }
    if (key === "Grade" && typeof value === "string") {
      newErrors.Grade = isNotEmpty(value) ? "" : "الصف لا يمكن أن يكون فارغًا";
    }
    if (key === "Curriculum" && typeof value === "string") {
      newErrors.Curriculum = isNotEmpty(value)
        ? ""
        : "المنهج لا يمكن أن يكون فارغًا";
    }
    if (key === "Subject" && typeof value === "string") {
      newErrors.Subject = isNotEmpty(value) ? "" : "المواد لا يمكن أن تكون فارغة";
    }
    if (key === "message" && typeof value === "string") {
      newErrors.message = isNotEmpty(value) ? "" : "الرسالة لا يمكن أن تكون فارغة";
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
      newErrors.FirstName = "الاسم لا يمكن أن يكون فارغًا";
    }

    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = "عنوان بريد إلكتروني غير صالح";
    }

    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "رقم هاتف غير صالح";
    }
    if (!isNotEmpty(formData.Grade)) {
      newErrors.Grade = "الصف لا يمكن أن يكون فارغًا";
    }
    if (!isNotEmpty(formData.Curriculum)) {
      newErrors.Curriculum = "المنهج لا يمكن أن يكون فارغًا";
    }

    if (!isNotEmpty(formData.message)) {
      newErrors.message = "الرسالة لا يمكن أن تكون فارغة";
    }

    // Update errors state
    setErrors(newErrors);

    // Step 2: Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false); // Stop loading if validation fails
      toast.error("يرجى إصلاح الأخطاء في النموذج قبل الإرسال.");

      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "lead_form_error",
          formData: newErrors, // Send errors if needed
          formType: "lead Form",
        });
      }

      return;
    }

    await addFormData("lead", formData);

    try {
      await sendForm(formData);
      toast.success("تم إرسال النموذج بنجاح!");
      // ✅ Send Success Event to GTM
      if (typeof window !== "undefined") {
        (window as any).dataLayer.push({
          event: "lead_form_success",
          formData: formData, // You can include submitted data for analytics
          formType: "lead Form",
        });
      }
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error("فشل في إرسال النموذج!");
      // ✅ Send Error Event to GTM
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
        message: "",
      });
    }
  };

  const geoData = useGeoLocation();

  React.useEffect(() => {
    if (!geoData.isLoading && !geoData.error && geoData.browser) {
      // Client-side only UTM parameter detection
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
  return (
    <Box sx={styles.container} dir="rtl">
      <Box sx={[styles.background, background, padding && padding]} />
      <Grid container>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <Box sx={styles.girlImage}>
            <Image
              src={girl.src}
              width={girl.width}
              height={girl.height}
              alt="girl"
              className="girlGrid"
              style={{
                position: "absolute",
                transform: "scaleX(-1)", // Mirror the image for RTL
              }}
            />
          </Box>
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <Box sx={styles.inner}>
            <Typography
              sx={styles.heading}
              className={leagueSpartan.className}
              component={"h5"}
              variant="h2"
            >
              جدولة مكالمة
            </Typography>
            <Typography
              sx={styles.desc}
              className={leagueSpartan.className}
              component={"p"}
              variant="body2"
            >
              اطلب مكالمة من المختص الأكاديمي لدينا للبدء في رحلتك التعليمية الناجحة مع تيوشنال.
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
                sx={{ zIndex: 1 }}
              >
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box sx={styles.inputDiv}>
                    <Input
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      placeholder={"أدخل الاسم هنا ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.FirstName && (
                      <Typography
                        className={`${leagueSpartan.className} `}
                        sx={styles.error}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.FirstName}
                      </Typography>
                    )}
                  </Box>
                  <PhoneInput
                    defaultCountry="SA"
                    value={formData?.PhoneNumber || ""}
                    onChange={(e) => handleChange("PhoneNumber", String(e))}
                    inputComponent={CustomInput}
                    style={styles.phoneInput}
                  />
                  {errors.PhoneNumber && (
                    <Typography
                      className={`${leagueSpartan.className} `}
                      sx={styles.error}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.PhoneNumber}
                    </Typography>
                  )}
                  <TranslatableDropDown
                    placeholder="اختر المنهج"
                    name="Curriculum"
                    data={filterData?.curriculum || []}
                    value={formData.Curriculum}
                    onChange={handleChange}
                    locale="ar"
                    isSubjectField={false}
                  />
                  {errors.Curriculum && (
                    <Typography
                      className={`${leagueSpartan.className} `}
                      sx={styles.error}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.Curriculum}
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box sx={styles.inputDiv}>
                    <Input
                      name="EmailAddress"
                      value={formData.EmailAddress}
                      onChange={handleChange}
                      placeholder={"أدخل البريد الإلكتروني هنا ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.EmailAddress && (
                      <Typography
                        className={`${leagueSpartan.className} `}
                        sx={styles.error}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.EmailAddress}
                      </Typography>
                    )}
                  </Box>
                  <TranslatableDropDown
                    name="Grade"
                    placeholder="اختر الصف"
                    marginBottom="2vh"
                    marginTop="2vh"
                    data={filterData?.grade || []}
                    value={formData.Grade}
                    onChange={handleChange}
                    locale="ar"
                    isSubjectField={false}
                  />
                  {errors.Grade && (
                    <Typography
                      className={`${leagueSpartan.className} `}
                      sx={styles.error}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.Grade}
                    </Typography>
                  )}
                  <TranslatableDropDown
                    name="Subject"
                    placeholder="اختر المواد"
                    data={filterData?.subject || []}
                    value={formData.Subject}
                    onChange={handleChange}
                    multiple
                    locale="ar"
                    isSubjectField={true}
                  />
                  {errors.Subject && (
                    <Typography
                      className={`${leagueSpartan.className} `}
                      sx={styles.error}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.Subject}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <TextField
                sx={[styles.input]}
                fullWidth
                multiline
                rows={4}
                name="Message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="أدخل رسالتك هنا..."
                className={`${leagueSpartan.className} `}
              />
              {errors.message && (
                <Typography
                  className={`${leagueSpartan.className} `}
                  sx={styles.error}
                  component={"p"}
                  variant="caption"
                >
                  {errors.message}
                </Typography>
              )}
              <Button
                variant="contained"
                className={leagueSpartan.className}
                sx={styles.containedButton}
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Image
        src={girl.src}
        width={girl.width}
        height={girl.height}
        alt="girl"
        className="girlContact"
        style={{ transform: "scaleX(-1)" }}
      />
    </Box>
  );
};

export default ArContactUs;

const styles = {
  girlImage: {
    position: "relative",
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
  },
  heading: {
    display: "flex",
    position: "relative",
    marginRight: {
      xs: "0px",
    },
    "::before": {
      content: "''",
      position: "absolute",
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
        xs: -20,
        sm: -35,
        md: -35,
        lg: -35,
      },
      right: {
        xs: "-14%",
        sm: "-8%",
        md: "-6%",
        lg: "-4%",
      },
    },
  },
  desc: {
    width: {
      xs: "75%",
      sm: "75%",
      md: "75%",
      lg: "75%",
    },
    color: "black",
    marginBottom: "2vh",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "start",
    },
    paddingX: {
      xs: "20px",
      sm: "22px",
      md: "0px",
      lg: "0px",
    },
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
  inputDiv: {
    marginY: "2vh",
  },
  inner: {
    display: {
      xs: "flex",
      sm: "flex",
      md: "flex",
      lg: "block",
    },
    alignItems: "center",
    flexDirection: "column",
    zIndex: 4,
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
  container: {
    position: "relative",
  },
  background: {
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#D7F0FF)",
    position: "absolute",
    zIndex: -2,
    height: "100%",
    width: "100%",
  },
  error: {
    color: "red",
    marginTop: "6px",
    marginRight: "6px",
  },
  input: {
    backgroundColor: "white",
    marginY: "2vh",
    position: "relative",
    color: "rgba(0,0,0,0.77)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px",
    textAlign: "right",
  },
  containedButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38B6FF",
    textTransform: "none",
    textAlign: "center",
    borderRadius: "10px",
    width: "100%",
    padding: "18px",
    marginY: "20px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",
      borderRadius: "10px",
      textAlign: "center",
      padding: "18px",
      marginY: "20px",
    },
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
      md: "block",
    },
  },
};