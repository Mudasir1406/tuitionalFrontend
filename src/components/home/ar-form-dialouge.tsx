import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { leagueSpartan } from "@/app/fonts";
import "../DropDown/DropDown.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import CustomInput from "../custom-input/custom-input";
import TranslatableDropDown from "../DropDown/TranslatableDropDown";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import Input from "../input/Input";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import dynamic from "next/dynamic";
import useGeoLocation from "@/utils/slugHelper";
import { sendForm } from "@/services/contact-form/contact-form";
import { FormType } from "./form-dialouge";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

type IProps = {
  open: boolean;
  handleClose: () => void;
  values?: FormType;
};

const ArFormDialog: React.FunctionComponent<IProps> = ({
  open,
  handleClose,
  values,
}) => {
  const [filterData, setFilterData] = React.useState<Filter_Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    message: "",
    sheetName: "Lead Forms",
  });
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
      newErrors.FirstName = isNotEmpty(value)
        ? ""
        : "الاسم لا يمكن أن يكون فارغًا";
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
      newErrors.Subject = isNotEmpty(value)
        ? ""
        : "المواد لا يمكن أن تكون فارغة";
    }
    if (key === "message" && typeof value === "string") {
      newErrors.message = isNotEmpty(value)
        ? ""
        : "الرسالة لا يمكن أن تكون فارغة";
    }

    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors(newErrors);
  };

  const geoData = useGeoLocation();

  React.useEffect(() => {
    if (!geoData.isLoading && !geoData.error && geoData.browser) {
      // Client-side only UTM parameter detection
      let medium = "SEO";
      let utmSource = "Direct";
      let utmMedium = "Direct";
      let utmCampaign = "Direct";

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        medium = params.get("gad_source")
          ? "google Ads"
          : params.get("fbclid")
          ? "facebook"
          : "SEO";

        utmSource = params.get("utm_source") || "Direct";
        utmMedium = params.get("utm_medium") || "Direct";
        utmCampaign = params.get("utm_campaign") || "Direct";
      }

      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
        Browser: geoData.browser || "",
        SourcePageURL: geoData.pageURL || "",
        Date: geoData.date || "",
        Time: geoData.time || "",
        UTMSource: utmSource,
        UTMMedium: utmMedium,
        UTMCampaign: utmCampaign,
        LeadSource: medium,
      }));
    }
  }, [geoData]);

  React.useEffect(() => {
    if (values) {
      setFormData({
        ...formData,
        ...values,
      });
    }
  }, [values]);

  const onClickUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      toast.error("يرجى إصلاح الأخطاء في النموذج قبل الإرسال.");

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
      toast.success("تم إرسال النموذج بنجاح!");
      if (typeof window !== "undefined") {
        (window as any).dataLayer.push({
          event: "lead_form_success",
          formData: formData,
          formType: "lead Form",
        });
      }
      handleClose();
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error("فشل في إرسال النموذج!");
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

  React.useEffect(() => {
    getFilterData().then((data) => {
      setFilterData(data);
    });
  }, []);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      className="pricing-dialog"
      maxWidth={false}
      sx={{
        "& .MuiDialog-container": {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "& .MuiDialog-paper": {
          margin: {
            xs: "8px",
            sm: "16px",
            md: "32px",
            lg: "32px",
            xl: "40px",
          },
          width: {
            xs: "calc(100vw - 16px)",
            sm: "calc(100vw - 32px)",
            md: "calc(100vw - 64px)",
            lg: "800px",
            xl: "900px",
          },
          maxWidth: {
            xs: "calc(100vw - 16px)",
            sm: "calc(100vw - 32px)",
            md: "calc(100vw - 64px)",
            lg: "800px",
            xl: "900px",
          },
          maxHeight: {
            xs: "calc(100vh - 16px)",
            sm: "calc(100vh - 32px)",
            md: "calc(100vh - 64px)",
            lg: "calc(100vh - 64px)",
            xl: "calc(100vh - 80px)",
          },
        },
        "& .MuiPaper-root": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        "& .MuiPaper-elevation": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        "& .MuiPaper-rounded": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent sx={styles.contanier} dir="rtl">
        <Box sx={styles.header}>
          <Typography
            className={leagueSpartan.className}
            sx={styles.dialogHeading}
          >
            ابدأ الآن
          </Typography>
          <ClearRoundedIcon
            sx={{
              width: { xs: "28px", sm: "32px", md: "30px" },
              height: { xs: "28px", sm: "32px", md: "30px" },
              cursor: "pointer",
              color: "#64748b",
              padding: "4px",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                color: "#38B6FF",
              },
              transition: "all 0.2s ease",
            }}
            onClick={handleClose}
          />
        </Box>
        <Divider />

        <Box sx={styles.mainDiv}>
          <form
            onSubmit={onClickUpload}
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            <Box sx={styles.inputDivTop}>
              <Box sx={styles.inputInner}>
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
              <Box sx={styles.inputInner}>
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
            </Box>

            <Box sx={styles.inputDiv}>
              <Box sx={{
                ...styles.div,
                '& .custom-phone-input': {
                  height: {
                    xs: '5.4vh !important',
                    sm: '5.4vh !important',
                    md: '36px !important'
                  },
                  minHeight: {
                    xs: '5.4vh !important',
                    sm: '5.4vh !important',
                    md: '36px !important'
                  },
                  maxHeight: {
                    xs: '5.4vh !important',
                    sm: '5.4vh !important',
                    md: '36px !important'
                  }
                }
              }}>
                <PhoneInput
                  defaultCountry="SA"
                  value={formData?.PhoneNumber || ""}
                  onChange={(e) => handleChange("PhoneNumber", String(e))}
                  inputComponent={CustomInput}
                  style={{
                    ...styles.phoneInput,
                    maxWidth: "100%",
                    overflow: "hidden",
                    paddingRight: "8px",
                  }}
                  className="custom-phone-input"
                />

                {errors.PhoneNumber && (
                  <Typography
                    sx={styles.error}
                    className={`${leagueSpartan.className} ${styles.error}`}
                    component={"p"}
                    variant="caption"
                  >
                    {errors.PhoneNumber}
                  </Typography>
                )}
              </Box>
              <div style={styles.div}>
                <TranslatableDropDown
                  name="Grade"
                  placeholder="اختر الصف"
                  data={filterData?.grade || []}
                  value={formData.Grade}
                  onChange={handleChange}
                  locale="ar"
                  isSubjectField={false}
                />
                {errors.Grade && (
                  <Typography
                    sx={styles.error}
                    className={`${leagueSpartan.className} ${styles.error}`}
                    component={"p"}
                    variant="caption"
                  >
                    {errors.Grade}
                  </Typography>
                )}
              </div>
            </Box>
            <Box sx={styles.inputDiv}>
              <div style={styles.div}>
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
                    sx={styles.error}
                    className={`${leagueSpartan.className} ${styles.error}`}
                    component={"p"}
                    variant="caption"
                  >
                    {errors.Curriculum}
                  </Typography>
                )}
              </div>
              <div style={styles.div}>
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
                    sx={styles.error}
                    className={`${leagueSpartan.className} ${styles.error}`}
                    component={"p"}
                    variant="caption"
                  >
                    {errors.Subject}
                  </Typography>
                )}
              </div>
            </Box>

            <div style={{ marginTop: "4px" }}>
              <TextField
                sx={[
                  styles.input,
                  {
                    "& .MuiOutlinedInput-root": {
                      height: "auto",
                      minHeight: { xs: "80px", sm: "100px", md: "120px" },
                      alignItems: "flex-start",
                      paddingTop: { xs: "8px", sm: "10px", md: "12px" },
                      paddingBottom: { xs: "8px", sm: "10px", md: "12px" },
                    },
                    "& .MuiInputBase-inputMultiline": {
                      fontSize: { xs: "14px", sm: "15px", md: "16px" },
                      lineHeight: 1.4,
                      resize: "none",
                    },
                  },
                ]}
                fullWidth
                multiline
                rows={3}
                name="Message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                variant="outlined"
                placeholder="أخبرنا عن احتياجاتك التعليمية والمواد المفضلة وأهدافك التعليمية..."
                className={leagueSpartan.className}
              />
              {errors.message && (
                <Typography
                  sx={styles.error}
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
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ArFormDialog;

const styles = {
  contanier: {
    boxShadow:
      "0px -3px 8px 0px rgba(0, 0, 0, 0.15) inset,0px 2px 1px 0px rgba(0, 0, 0, 0.05)",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: {
      xs: "12px",
      sm: "16px",
      md: "20px",
    },
    p: 0,
    overflow: "visible",
    margin: 0,
    position: "relative",
    boxSizing: "border-box" as const,
    zIndex: 1,
  },
  mainDiv: {
    paddingX: {
      xs: "12px",
      sm: "16px",
      md: "20px",
    },
    paddingTop: {
      xs: "12px",
      sm: "16px",
      md: "20px",
    },
    paddingBottom: {
      xs: "16px",
      sm: "20px",
      md: "24px",
    },
    width: "100%",
    boxSizing: "border-box" as const,
    overflow: "visible",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: {
      xs: "12px",
      sm: "16px",
      md: "20px",
    },
    paddingTop: {
      xs: "16px",
      sm: "20px",
      md: "24px",
    },
    paddingBottom: {
      xs: "8px",
      sm: "12px",
      md: "16px",
    },
    width: "100%",
    boxSizing: "border-box" as const,
  },
  dialogHeading: {
    fontSize: {
      xs: "22px",
      sm: "26px",
      md: "30px",
    },
    lineHeight: {
      xs: "28px",
      sm: "32px",
      md: "36px",
    },
    fontWeight: 600,
    color: "rgba(0, 0, 0, 1)",
    letterSpacing: "-0.02em",
  },
  inputDivTop: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    columnGap: { md: "20px", lg: "24px" },
    rowGap: { xs: "4px", sm: "6px" },
    marginBottom: { xs: "4px", sm: "6px" },
    width: "100%",
    boxSizing: "border-box" as const,
  },
  inputDiv: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    columnGap: { md: "20px", lg: "24px" },
    rowGap: { xs: "4px", sm: "6px" },
    marginTop: { xs: "4px", sm: "6px" },
    width: "100%",
    boxSizing: "border-box" as const,
  },
  inputInner: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
    width: "100%",
    boxSizing: "border-box" as const,
  },
  div: {
    flex: 1,
    minWidth: 0,
    width: "100%",
    boxSizing: "border-box" as const,
    overflow: "visible" as const,
  },
  input: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    backgroundColor: "white",
    marginTop: {
      xs: "6px",
      sm: "8px",
      md: "12px",
    },
    marginBottom: {
      xs: "2px",
      sm: "4px",
      md: "6px",
    },
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    fontWeight: 400,
    width: "100%",
    boxSizing: "border-box" as const,
    "& .MuiOutlinedInput-root": {
      height: {
        xs: "44px",
        sm: "48px",
        md: "52px",
      },
      fontSize: {
        xs: "14px",
        sm: "15px",
        md: "16px",
      },
      borderRadius: "10px",
      width: "100%",
      boxSizing: "border-box" as const,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-multiline": {
      padding: {
        xs: "8px 12px",
        sm: "10px 14px",
        md: "12px 16px",
      },
    },
  },
  phoneInput: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    paddingLeft: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },
    paddingRight: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },
    backgroundColor: "white",
    marginTop: {
      xs: "6px",
      sm: "8px",
      md: "12px",
    },
    marginBottom: {
      xs: "2px",
      sm: "4px",
      md: "6px",
    },
    outline: "none",
    border: "none",
    ":focus": {
      outline: "none",
      boxShadow: "0px 2px 8px rgba(56, 182, 255, 0.2)",
    },
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    height: {
      xs: "5.4vh !important",
      sm: "48px !important",
      md: "52px !important",
    },
    minHeight: {
      xs: "5.4vh",
      sm: "48px",
      md: "52px",
    },
    maxHeight: {
      xs: "5.4vh",
      sm: "48px",
      md: "52px",
    },
    fontSize: {
      xs: "14px",
      sm: "15px",
      md: "16px",
    },
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box" as const,
    fontWeight: 400,
    overflow: "hidden",
    "& .PhoneInput": {
      height: "100% !important",
      display: "flex !important",
      alignItems: "center !important",
      minHeight: {
        xs: "5.4vh",
        sm: "48px",
        md: "52px",
      },
      maxHeight: {
        xs: "5.4vh",
        sm: "48px",
        md: "52px",
      },
    },
    "& .PhoneInput > div": {
      height: "100% !important",
      display: "flex !important",
      alignItems: "center !important",
      minHeight: {
        xs: "5.4vh",
        sm: "48px",
        md: "52px",
      },
    },
    "& .PhoneInputCountrySelect": {
      height: "100% !important",
      display: "flex !important",
      alignItems: "center !important",
    },
    "& .PhoneInputInput": {
      height: "100% !important",
      border: "none !important",
      outline: "none !important",
      fontSize: "inherit",
      backgroundColor: "transparent !important",
      flex: "1 !important",
      minHeight: {
        xs: "5.2vh",
        sm: "46px",
        md: "50px",
      },
      lineHeight: 1,
      padding: "0 !important",
    },
  },
  error: {
    color: "#ef4444",
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
    },
    marginTop: {
      xs: "4px",
      sm: "6px",
      md: "8px",
    },
    marginLeft: {
      xs: "8px",
      sm: "10px",
      md: "12px",
    },
    lineHeight: 1.3,
  },
  containedButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 6px 20px rgba(56, 182, 255, 0.3)",
    backgroundColor: "#38B6FF",
    color: "white",
    textTransform: "none",
    fontSize: {
      xs: "15px",
      sm: "16px",
      md: "17px",
    },
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "center",
    borderRadius: "10px",
    height: {
      xs: "46px",
      sm: "50px",
      md: "54px",
    },
    paddingX: {
      xs: "20px",
      sm: "24px",
      md: "28px",
    },
    marginTop: {
      xs: "12px",
      sm: "16px",
      md: "20px",
    },
    marginBottom: {
      xs: "4px",
      sm: "8px",
      md: "12px",
    },
    ":hover": {
      backgroundColor: "#2563eb",
      boxShadow: "0px 8px 24px rgba(56, 182, 255, 0.4)",
      transform: "translateY(-1px)",
    },
    transition: "all 0.3s ease",
    width: "100%",
    border: "none",
    cursor: "pointer",
  },
};
