import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { leagueSpartan } from "@/app/fonts";
import "../DropDown/DropDown.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import CustomInput from "../custom-input/custom-input";
import DropDown from "../DropDown/DropDown";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendEmail } from "@/services/email-service/email-service";
import { createEmailTemplate } from "@/services/email-service/template";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import { HELLOTUITIONALEDU } from "@/utils/env";
import Input from "../input/Input";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import { useSearchParams } from "next/navigation";

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
  message: string;
  country?: string;
  ip?: string;
  Browser?: string;
  pageURL?: string;
  time?: string;
  date?: string;
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
const FormDialog: React.FunctionComponent<IProps> = ({
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
    // setFormData({
    //   ...formData,
    //   [key]: value,
    // });

    let newErrors = { ...errors };

    // Perform validation if the key is "phone"
    if (key === "PhoneNumber" && typeof value === "string") {
      if (!isValidPhoneNumber(value)) {
        console.log("Invalid phone number!");
        newErrors.PhoneNumber = isValidPhoneNumber(value)
          ? ""
          : "Invalid phone number";

        return;
      }
    }
    if (key === "EmailAddress" && typeof value === "string") {
      newErrors.EmailAddress = isValidEmail(value)
        ? ""
        : "Invalid email address";
    }
    if (key === "FirstName" && typeof value === "string") {
      newErrors.FirstName = isNotEmpty(value) ? "" : "Name cannot be empty";
    }
    if (key === "Grade" && typeof value === "string") {
      newErrors.Grade = isNotEmpty(value) ? "" : "Grade cannot be empty";
    }
    if (key === "Curriculum" && typeof value === "string") {
      newErrors.Curriculum = isNotEmpty(value)
        ? ""
        : "Curriculum cannot be empty";
    }
    if (key === "Subject" && typeof value === "string") {
      newErrors.Subject = isNotEmpty(value) ? "" : "Subjects cannot be empty";
    }
    if (key === "message" && typeof value === "string") {
      newErrors.message = isNotEmpty(value) ? "" : "Message cannot be empty";
    }

    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors(newErrors);
  };

  React.useEffect(() => {
    if (values) {
      setFormData(values);
    }
  }, [values]);

  React.useEffect(() => {
    const getClientLocation = async () => {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const currentDate = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
      const currentTime = new Date().toLocaleTimeString();
      const params = new URLSearchParams(window.location.search);
      // Format: HH:MM:SS AM/PM
      try {
        const res = await fetch("https://ipinfo.io/json");
        const locationData = await res.json();

        setFormData((prev) => ({
          ...prev,
          Browser: browser,
          SourcePageURL: pageURL,
          Date: currentDate,
          Time: currentTime,
          IP: locationData?.ip,
          Country: locationData?.country,
          Medium: params.get("gad_source")
            ? "google"
            : params.get("fbclid")
            ? "facebook"
            : "",
        }));
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    getClientLocation();
  }, []);

  const onClickUpload = async () => {
    setLoading(true);
    const newErrors: Partial<FormType> = {};

    if (!isNotEmpty(formData.FirstName)) {
      newErrors.FirstName = "Name cannot be empty";
    }

    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = "Invalid email address";
    }

    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "Invalid phone number";
    }
    if (!isNotEmpty(formData.Grade)) {
      newErrors.Grade = "Grade cannot be empty";
    }
    if (!isNotEmpty(formData.Curriculum)) {
      newErrors.Curriculum = "Curriculum cannot be empty";
    }

    if (!isNotEmpty(formData.message)) {
      newErrors.message = "Message cannot be empty";
    }

    // Update errors state
    setErrors(newErrors);

    // Step 2: Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false); // Stop loading if validation fails
      toast.error("Please fix the errors in the form before submitting.");

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "lead_form_error",
        formData: newErrors, // Send errors if needed
        formType: "lead Form",
      });

      return;
    }

    await addFormData("lead", formData);
    console.log(formData);
    const formDataObject = new FormData();

    Object.entries(formData).map((value) =>
      formDataObject.append(value[0], value[1])
    );

    const keyValuePairs: string[] = [];
    for (const [key, value] of Array.from(formDataObject.entries())) {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      );
    }

    const formDataString = keyValuePairs.join("&");

    // console.log("formDataString", formDataString);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyk90z7rMyxOY4kvD6oytsxr4Q-L9k1YX1o_c7yZ44Krga3uYtoTXcjdwORVHmYiulhvw/exec",
        {
          redirect: "follow",
          method: "POST",
          mode: "no-cors", // Bypass CORS

          body: formDataString,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
      await sendEmail({
        recipientEmail: HELLOTUITIONALEDU,
        subject: "Get Started",
        text: "",
        html: createEmailTemplate(formData),
      });
      toast.success("Form submitted successfully!");
      // ✅ Send Success Event to GTM
      (window as any).dataLayer.push({
        event: "lead_form_success",
        formData: formData, // You can include submitted data for analytics
        formType: "lead Form",
      });
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error("Form submitted Failed!");
      // ✅ Send Error Event to GTM
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
      <DialogContent sx={styles.contanier}>
        <Box sx={styles.header}>
          <Typography
            className={leagueSpartan.className}
            sx={styles.dialogHeading}
          >
            Get Started
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
                  placeholder={"Enter name here ..."}
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
              </Box>

              <Box sx={styles.inputInner}>
                <Input
                  name="EmailAddress"
                  value={formData.EmailAddress}
                  onChange={handleChange}
                  placeholder={"Enter email here ..."}
                  className={`${styles.input} ${leagueSpartan.className} `}
                />
                {errors.EmailAddress && (
                  <Typography
                    sx={styles.error}
                    className={`${leagueSpartan.className} ${styles.error}`}
                    component={"p"}
                    variant="caption"
                  >
                    {errors.EmailAddress}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={styles.inputDiv}>
              <div style={styles.div}>
                <PhoneInput
                  defaultCountry="SA"
                  value={formData?.PhoneNumber || ""}
                  onChange={(e) => handleChange("PhoneNumber", String(e))}
                  inputComponent={CustomInput}
                  // className={`${styles.phoneInput}`}
                  style={styles.phoneInput}
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
              </div>
              <div style={styles.div}>
                <DropDown
                  name="Grade"
                  placeholder="Select Grade"
                  marginTop="1.5vh"
                  data={filterData?.grade || []}
                  // multiple
                  value={formData.Grade}
                  onChange={handleChange}
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
                <DropDown
                  placeholder="Select Curriculum"
                  name="Curriculum"
                  data={filterData?.curriculum || []}
                  marginTop="1.5vh"
                  value={formData.Curriculum}
                  onChange={handleChange}
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
                <DropDown
                  name="Subject"
                  placeholder="Select Subjects"
                  data={filterData?.subject || []}
                  marginTop="1.5vh"
                  multiple
                  value={formData.Subject}
                  onChange={handleChange}
                />{" "}
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
            <div>
              <TextField
                sx={[styles.input]}
                fullWidth
                multiline
                rows={5}
                name="Message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                // label="Message*"
                variant="outlined"
                placeholder="Enter your message here..."
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
              sx={styles.containedButton}
              className={leagueSpartan.className}
              onClick={onClickUpload}
            >
              {loading ? (
                <CircularProgress
                  sx={{ width: "12px", height: "12px", color: "white" }}
                  size={18}
                />
              ) : (
                "Submit Now"
              )}
            </Button>
          </form>
        </Box>
        {/* </Grid> */}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;

const styles = {
  contanier: {
    boxShadow:
      "0px -3px 8px 0px rgba(0, 0, 0, 0.15) inset,0px 2px 1px 0px rgba(0, 0, 0, 0.05)",
    backgroundColor: "white",
    width: {
      xs: "90vw",
      md: "50vw",
    },
    // height: "60vh",
    borderRadius: "30px",
    p: 0,
    overflow: "auto",
  },
  mainDiv: {
    paddingX: "2%",
    paddingY: "2%",
    // minWidth: { xs: "90vw", md: "500px" },
  },
  // form: {
  //   maxWidth: "95%",
  //   margin: "auto",
  // },
  title: {
    textAlign: "center",
    marginBottom: "1.5vh",
  },
  error: {
    color: "red",
    marginTop: "6px",
    marginLeft: "6px",
  },
  div: {
    flex: 1,
  },
  textArea: {
    backgroundColor: "white",
    position: "relative",
    zIndex: 2,
    color: "rgba(0, 0, 0, 0.77)",
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px",
    border: "none",
    padding: 0,
  },
  textField: {
    marginTop: "12px",
  },
  inputDiv: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },

    columnGap: "24px",
    // rowGap: "12px",

    flex: 1,
  },
  inputDivTop: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },

    columnGap: "24px",
    rowGap: "12px",

    flex: 1,
  },
  inputInner: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  rowGap: {
    rowGap: "12px",
  },

  lable: {
    fontSize: "1.7vh", // Adjusted font size with vh unit
    fontWeight: 400,
    color: "black",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginX: "3vh",
    marginTop: "3vh",
    marginBottom: "2vh",
  },
  dialogHeading: {
    fontSize: "3vh",
    lineHeight: "2.2vh",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 1)",
    letterSpacing: "-2%",
  },
  lableHeading: {
    fontSize: "2.1vh", // Adjusted font size with vh unit
    fontWeight: 400,
    // marginY: "1vh",
  },
  input: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    backgroundColor: "white",
    marginTop: "1.5vh",
    marginBottom: "1vh",
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    // fontSize: "1.5vh",
    fontWeight: 400,
    "& .MuiOutlinedInputRoot": {
      height: "5.5vh",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  containedButton: {
    display: "flex",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38B6FF",
    color: "white",
    textTransform: "none",
    fontSize: {
      xs: "1.5vh",
      sm: "1.5vh",
      md: "1.5vh",
      lg: "2vh",
    },
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    borderRadius: "10px",
    paddingX: "1.8vw",
    paddingY: "1.5vh",
    marginY: "2vh",
    ":hover": {
      backgroundColor: "#38B6FF",
    },
    width: "96%",
    marginX: "2%",
  },
  outlinedBtn: {
    color: "rgba(56, 182, 255, 1)",
    borderColor: "rgba(56, 182, 255, 1)",
    fontSize: "1.5vh",
    fontWeight: 700,
    lineHeight: "1.84vh",
    textTransform: "none",
    paddingX: "1.8vw !important",
    paddingY: "1.5vh !important",
    height: "5vh",
    textAlign: "center",
    ":hover": {
      color: "rgba(56, 182, 255, 1)",
      borderColor: "rgba(56, 182, 255, 1)",
    },
  },
  phoneInput: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    paddingLeft: "10px",
    backgroundColor: "white",
    marginTop: "1.5vh",
    // marginBottom: "1.5vh",
    outline: "none",
    ":focusVisible": {
      outline: "none",
    },
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    // height: "42px",
    height: "5.5vh",

    // fontSize: "1.7vh",
    // fontWeight: 400,
    // minHeight: "50px",
  },
};
