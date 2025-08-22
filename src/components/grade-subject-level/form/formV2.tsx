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

import toast from "react-hot-toast";
import { FormType } from "@/components/home/form-dialouge";
import CustomInput from "@/components/custom-input/custom-input";
import Input from "@/components/input/Input";
import DropDown from "@/components/DropDown/DropDown";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { addFormData, addFormDatav2 } from "@/utils/globalFunction";
// import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import useGeoLocation from "@/utils/slugHelper";
import { sendForm, sendFormV2 } from "@/services/contact-form/contact-form";
import { useRouter } from "next/navigation";

type IProps = {
  background?: any;
};

const FormV2: React.FunctionComponent<IProps> = ({ background }) => {
  const router = useRouter();
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
    sheetName: "PPC Leads",
  });
  const [filterData, setFilterData] = useState<Filter_Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<FormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    // Run database and Google Sheets operations in parallel for speed
    try {
      // Show success immediately and run operations in background
      toast.success("Form submitted successfully!");
      
      // ✅ Send Success Event to GTM immediately
      (window as any).dataLayer.push({
        event: "lead_form_success",
        formData: formData,
        formType: "lead Form",
      });
      
      // Redirect immediately (don't wait for slow operations)
      setTimeout(() => {
        router.push("/thank-you");
      }, 1500); // Reduced to 1.5 seconds
      
      // Run database and sheets operations in parallel (non-blocking)
      Promise.all([
        addFormDatav2("lead-ppc", formData),
        sendFormV2(formData)
      ]).catch(error => {
        console.error("Background operation failed:", error);
        // Don't show error to user since they already got success message
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
        sheetName: "PPC Leads",
      });
    }
  };
  useEffect(() => {
    // Load filter data in background, don't block form
    getFilterData().then((data) => {
      setFilterData(data);
    }).catch(error => {
      console.error("Filter data loading failed:", error);
      // Use fallback empty arrays so form still works
      setFilterData({ grade: [], curriculum: [], subject: [] });
    });
  }, []);

  const geoData = useGeoLocation();

  React.useEffect(() => {
    // Set basic data immediately, don't wait for geo location
    const browser = navigator.userAgent;
    const pageURL = window.location.href;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const params = new URLSearchParams(window.location.search);
    
    setFormData((prev) => ({
      ...prev,
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
    
    // Update geo data when available (non-blocking)
    if (!geoData.isLoading && !geoData.error) {
      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
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
          Avail A 10% Discount If You Sign Up Today!
        </Typography>
        <div className={styles.inputDiv}>
          <div className={styles.inputInner}>
            <Input
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              placeholder={"Name"}
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
              placeholder={"Email"}
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
              placeholder="Grade"
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
              name="Subject"
              placeholder="Subject"
              data={filterData?.subject || []}
              marginTop="1.5vh"
              multiple
              value={formData.Subject}
              onChange={handleChange}
            />{" "}
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
            placeholder="Message"
            className={`${leagueSpartan.className} ${styles.textArea} ${styles.textField}`}
          />{" "}
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
            "Submit Now"
          )}
        </Button>
      </form>
    </div>
  );
};

export default FormV2;
