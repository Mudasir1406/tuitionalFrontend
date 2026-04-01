"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CustomInput from "@/components/custom-input/custom-input";
import DropDown from "@/components/DropDown/DropDown";
import "@/components/DropDown/DropDown.css";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/components/input/Input";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData } from "@/utils/globalFunction";
import dynamic from "next/dynamic";
import useGeoLocation from "@/utils/slugHelper";
import { sendForm } from "@/services/contact-form/contact-form";
import { FormType } from "@/components/home/form-dialouge";
import styles from "./BlogSidebarForm.module.css";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

const BlogSidebarForm: React.FC = () => {
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
    } catch (error: any) {
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

  return (
    <div className={styles.formWrapper}>
      <Toaster />
      <Typography
        className={`${leagueSpartan.className} ${styles.formTitle}`}
        variant="h6"
        component="h3"
      >
        Get Started
      </Typography>

      <Input
        name="FirstName"
        value={formData.FirstName}
        onChange={handleChange}
        placeholder="Enter name here ..."
        className={`${styles.input} ${leagueSpartan.className}`}
        style={{ height: "36px", fontSize: "0.82rem" }}
      />
      {errors.FirstName && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.FirstName}
        </Typography>
      )}

      <Input
        name="EmailAddress"
        value={formData.EmailAddress}
        onChange={handleChange}
        placeholder="Enter email here ..."
        className={`${styles.input} ${leagueSpartan.className}`}
        style={{ height: "36px", fontSize: "0.82rem" }}
      />
      {errors.EmailAddress && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.EmailAddress}
        </Typography>
      )}

      <div className={styles.phoneWrapper}>
        <PhoneInput
          defaultCountry="SA"
          value={formData.PhoneNumber || ""}
          onChange={(e) => handleChange("PhoneNumber", String(e))}
          inputComponent={CustomInput}
          style={phoneStyle}
          disabled={!formData.EmailAddress}
          placeholder="Enter phone number ..."
        />
      </div>
      {errors.PhoneNumber && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.PhoneNumber}
        </Typography>
      )}

      <DropDown
        name="Grade"
        placeholder="Select Grade"
        marginTop="8px"
        data={filterData?.grade || []}
        value={formData.Grade}
        onChange={handleChange}
      />
      {errors.Grade && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.Grade}
        </Typography>
      )}

      <DropDown
        placeholder="Select Curriculum"
        name="Curriculum"
        data={filterData?.curriculum || []}
        marginTop="8px"
        value={formData.Curriculum}
        onChange={handleChange}
      />
      {errors.Curriculum && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.Curriculum}
        </Typography>
      )}

      <DropDown
        name="Subject"
        placeholder="Select Subjects"
        data={filterData?.subject || []}
        marginTop="8px"
        multiple
        value={formData.Subject}
        onChange={handleChange}
      />
      {errors.Subject && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.Subject}
        </Typography>
      )}

      <TextField
        fullWidth
        multiline
        rows={3}
        name="Message"
        value={formData.Message}
        onChange={(e) => handleChange("Message", e.target.value)}
        variant="outlined"
        placeholder="Enter your message here..."
        className={`${leagueSpartan.className} ${styles.textarea}`}
        sx={textareaStyle}
      />
      {errors.Message && (
        <Typography className={leagueSpartan.className} sx={errorStyle} variant="caption" component="p">
          {errors.Message}
        </Typography>
      )}

      <Button
        fullWidth
        className={`${leagueSpartan.className} ${styles.submitBtn}`}
        onClick={onSubmit}
      >
        {loading ? (
          <CircularProgress size={18} sx={{ color: "white" }} />
        ) : (
          "Submit Now"
        )}
      </Button>
    </div>
  );
};

const errorStyle = { color: "red", mt: "4px", ml: "4px" };

const phoneStyle: React.CSSProperties = {
  boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.08)",
  paddingLeft: "10px",
  backgroundColor: "white",
  marginTop: "8px",
  outline: "none",
  borderRadius: "10px",
  height: "36px",
  width: "100%",
  fontSize: "0.82rem",
};

const textareaStyle = {
  mt: "8px",
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiOutlinedInput-input": { fontSize: "0.82rem", padding: "8px 10px" },
  boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.08)",
  borderRadius: "10px",
  backgroundColor: "white",
};

export default BlogSidebarForm;
