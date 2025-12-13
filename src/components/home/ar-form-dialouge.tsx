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
    Message: "",
    sheetName: "Lead Forms",
  });
  const [errors, setErrors] = React.useState<Partial<FormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    if (key === "PhoneNumber" && typeof value === "string") {
      newErrors.PhoneNumber = isValidPhoneNumber(value)
        ? ""
        : "رقم هاتف غير صالح";
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
    if (key === "Message" && typeof value === "string") {
      newErrors.Message = isNotEmpty(value) ? "" : "الرسالة لا يمكن أن تكون فارغة";
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
      setFormData((prev) => ({
        ...prev,
        ...values,
      }));
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

    if (!isNotEmpty(formData.Message)) {
      newErrors.Message = "الرسالة لا يمكن أن تكون فارغة";
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
        Message: "",
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
            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
        <Divider />

        <Box sx={styles.mainDiv}>
          <form onSubmit={onClickUpload}>
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

            <Box sx={styles.inputDiv}>
              <Box sx={styles.inputInner}>
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
              </Box>
              <Box sx={styles.inputInner}>
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
                    className={`${leagueSpartan.className} `}
                    sx={styles.error}
                    component={"p"}
                    variant="caption"
                  >
                    {errors.Grade}
                  </Typography>
                )}
              </Box>
            </Box>

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

            <TextField
              sx={[styles.input]}
              fullWidth
              multiline
              rows={4}
              name="Message"
              value={formData.Message}
              onChange={(e) => handleChange("Message", e.target.value)}
              placeholder="أدخل رسالتك هنا..."
              className={`${leagueSpartan.className} `}
            />
            {errors.Message && (
              <Typography
                className={`${leagueSpartan.className} `}
                sx={styles.error}
                component={"p"}
                variant="caption"
              >
                {errors.Message}
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
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ArFormDialog;

const styles = {
  contanier: {
    width: {
      xs: "90vw",
      sm: "75vw",
      md: "60vw",
      lg: "35vw",
    },
    backgroundColor: "white",
    borderRadius: "10px",
    paddingY: "30px",
    paddingX: "40px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  dialogHeading: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#000000",
  },
  mainDiv: {
    marginTop: "20px",
  },
  inputDivTop: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    gap: "20px",
    marginBottom: "20px",
  },
  inputDiv: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    gap: "20px",
    marginY: "20px",
  },
  inputInner: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    marginY: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #E0E0E0",
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #38B6FF",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #38B6FF",
    },
  },
  phoneInput: {
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "14px",
    marginY: "10px",
    fontFamily: "inherit",
    fontSize: "16px",
    "&:hover": {
      border: "1px solid #38B6FF",
    },
    "&:focus": {
      border: "2px solid #38B6FF",
      outline: "none",
    },
  },
  error: {
    color: "red",
    marginTop: "5px",
    fontSize: "12px",
  },
  containedButton: {
    backgroundColor: "#38B6FF",
    color: "white",
    fontWeight: 700,
    fontSize: "18px",
    padding: "12px 30px",
    borderRadius: "8px",
    width: "100%",
    marginTop: "20px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  },
};