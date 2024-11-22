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
import PhoneInput from "react-phone-number-input";
import CustomInput from "../custom-input/custom-input";
import DropDown from "../DropDown/DropDown";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendEmail } from "@/services/email-service/email-service";
import { createEmailTemplate } from "@/services/email-service/template";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import { HELLOTUITIONALEDU } from "@/utils/env";

type IProps = {
  open: boolean;
  handleClose: () => void;
};

export type FormType = {
  name: string;
  email: string;
  phone: string;
  grade: string;
  curriculum: string;
  subjects: string;
  message: string;
};

export type CareersFormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  position: string;
  resume: string;
};

const FormDialog: React.FunctionComponent<IProps> = ({ open, handleClose }) => {
  const [filterData, setFilterData] = React.useState<Filter_Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormType>({
    name: "",
    email: "",
    phone: "",
    grade: "",
    curriculum: "",
    subjects: "",
    message: "",
  });
  const handleChange = (key: string, value: string | string[]) => {
    // console.log("handleChange", value);
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const onClickUpload = async () => {
    setLoading(true);
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
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzf7Epd4aPQMJyS0FfBnb7kPHmda4fPQ7i2YeY-WHZMGsDhgZ8-jOy6PMR6a6WBgfUu2w/exec",
        {
          redirect: "follow",
          method: "POST",
          body: formDataString,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
      // console.log("formData", formData);
      await sendEmail({
        recipientEmail: HELLOTUITIONALEDU,
        subject: "Get Started",
        text: "",
        html: createEmailTemplate(formData),
      });
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Form submitted Failed!");
      // alert("Error saving data");
    } finally {
      setLoading(false);
      handleClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        grade: "",
        curriculum: "",
        subjects: "",
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
        <Grid container columnSpacing={2} paddingX={"2%"}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              sx={styles.input}
              fullWidth
              name="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              label="Name*"
              variant="outlined"
              className={leagueSpartan.className}
            />
            <PhoneInput
              style={styles.phoneInput}
              defaultCountry="SA"
              value={formData?.phone || ""}
              onChange={(e) => handleChange("phone", String(e))}
              inputComponent={CustomInput}
              // error={errorData?.phone}

              // helperText={errorData?.phone}
            />
            <DropDown
              placeholder="Select Curriculum"
              data={filterData?.curriculum || []}
              boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.08)"
              marginTop="1.5vh"
              marginBottom="1.5vh"
              value={formData.curriculum}
              onChange={(e) => {
                handleChange("curriculum", e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              sx={styles.input}
              fullWidth
              name="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              label="Email*"
              variant="outlined"
              type="email"
              className={leagueSpartan.className}
            />
            <DropDown
              placeholder="Select Grade"
              data={filterData?.grade || []}
              boxShadow=" 0px 1px 4px 0px rgba(0, 0, 0, 0.08)"
              marginBottom="1.5vh"
              marginTop="1.5vh"
              value={formData.grade}
              onChange={(e) => {
                handleChange("grade", e.target.value);
              }}
            />
            <DropDown
              placeholder="Select Subject"
              data={filterData?.subject || []}
              boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.08)"
              marginBottom="1.5vh"
              marginTop="1.5vh"
              value={formData.subjects}
              onChange={(e) => {
                handleChange("subjects", e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Box paddingX={"2%"}>
          <TextField
            sx={[styles.input]}
            fullWidth
            multiline
            rows={5}
            name="Message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            label="Message*"
            variant="outlined"
            className={leagueSpartan.className}
          />
        </Box>
        <Button
          sx={styles.containedButton}
          className={leagueSpartan.className}
          onClick={onClickUpload}
        >
          {loading ? (
            <CircularProgress
              sx={{ width: "12px", height: "12px", color: "white" }}
              size={20}
            />
          ) : (
            "Enroll"
          )}
        </Button>
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
      xs: "100%",
      lg: "50vw",
    },
    height: "60vh",
    borderRadius: "30px",
    p: 0,
    overflow: "scroll",
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
    fontSize: "1.5vh",
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
    marginBottom: "1.5vh",
    outline: "none",
    ":focusVisible": {
      outline: "none",
    },
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    height: "5.5vh",
    fontSize: "1.7vh",
    fontWeight: 400,
    minHeight: "50px",
  },
};
