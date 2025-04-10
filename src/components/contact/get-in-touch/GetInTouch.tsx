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

import girlLaptop from "../../../../public/assets/images/static/girl-using-laptop.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
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
import { useSearchParams } from "next/navigation";

const GetInTouch: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Message: "",
    Browser: "",
    Country: "",
    IP: "",
    SourcePageURL: "",
    Time: "",
    Date: "",
    sheetName: "General Contact Form",
  });
  const [errors, setErrors] = useState<Partial<ContactFormType>>({});
  const [loading, setLoading] = React.useState<boolean>(false);

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
      newErrors.FirstName = isNotEmpty(value)
        ? ""
        : "First Name cannot be empty";
    }
    if (key === "LastName" && typeof value === "string") {
      newErrors.LastName = isNotEmpty(value) ? "" : "Last Name cannot be empty";
    }
    if (key === "Message" && typeof value === "string") {
      newErrors.Message = isNotEmpty(value) ? "" : "Message cannot be empty";
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
    const newErrors: Partial<ContactFormType> = {};

    if (!isNotEmpty(formData.FirstName)) {
      newErrors.FirstName = "First Name cannot be empty";
    }

    if (!isNotEmpty(formData.LastName)) {
      newErrors.LastName = "Last Name cannot be empty";
    }

    if (!isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = "Invalid email address";
    }

    if (!isValidPhoneNumber(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "Invalid phone number";
    }

    if (!isNotEmpty(formData.Message)) {
      newErrors.Message = "Message cannot be empty";
    }

    // Update errors state
    setErrors(newErrors);

    // Step 2: Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false); // Stop loading if validation fails
      toast.error("Please fix the errors in the form before submitting.");

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "contact_form_error",
        formData: newErrors, // Send errors if needed
        formType: "contact Form",
      });
      return;
    }
    await addFormData("contact", formData);

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
        html: createContactTemplate(formData),
      });
      console.log("formData", formData);
      toast.success("Form submitted successfully!");
      // ✅ Send Success Event to GTM
      (window as any).dataLayer.push({
        event: "contact_form_success",
        formData: formData, // You can include submitted data for analytics
        formType: "contact Form",
      });
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error("Form submitted Failed!");
      (window as any).dataLayer.push({
        event: "contact_form_failed",
        error: error.Message,
        formType: "contact Form",
      });
    } finally {
      setLoading(false);
      setFormData({
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNumber: "",
        Message: "",
      });
    }
  };

  React.useEffect(() => {
    const getClientLocation = async () => {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const currentDate = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
      const currentTime = new Date().toLocaleTimeString(); // Format: HH:MM:SS AM/PM
      const params = new URLSearchParams(window.location.search);

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
            : "SEO",
        }));
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    getClientLocation();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background} />

      <div className={styles.mainDiv}>
        <div className={styles.imageDiv}>
          <Image
            src={girlLaptop.src}
            width={girlLaptop.width}
            height={girlLaptop.height}
            alt="Contact Tuitional Support"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          ></Image>
        </div>

        <div className={styles.formDiv}>
          <form
            className={styles.contactForm}
            //   component="form"
            onSubmit={handleSubmit}
          >
            <div className={styles.headingDiv}>
              <Typography
                className={`${leagueSpartan.className} ${styles.heading}`}
                component={"h2"}
                variant="h2"
              >
                Get In {"  "}
                <Typography
                  className={`${leagueSpartan.className} ${styles.heading} ${styles.touch}`}
                  variant="h2"
                  sx={{
                    color: "rgba(81, 184, 147, 1)",
                    fontWeight: 700,
                    marginLeft: 1,
                  }}
                  component={"span"}
                >
                  {`    Touch`}
                </Typography>
                <Image src={lines} alt="" className={styles.lines} />
              </Typography>
              <Typography
                //   sx={styles.looking}
                className={`${leagueSpartan.className} ${styles.looking}`}
                component={"p"}
                variant="body2"
              >
                {`Can't Assess What You're Looking For?`}
                <br /> {`Don't Worry! We Can Help!`}
              </Typography>
            </div>
            {/* <div>

            </div> */}
            <Grid container columnSpacing={2} rowSpacing={1} sx={{ zIndex: 1 }}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Typography
                  // sx={styles.label}
                  className={`${leagueSpartan.className} ${styles.label}`}
                  variant="body2"
                >
                  First Name
                </Typography>
                <div className={styles.inputInner}>
                  <Input
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    placeholder={"Enter First Name here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.FirstName && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      //   sx={styles.error}
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
                  // sx={styles.label}
                  className={`${leagueSpartan.className} ${styles.label}`}
                  variant="body2"
                >
                  Last Name
                </Typography>
                <div className={styles.inputInner}>
                  <Input
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    placeholder={"Enter Last Name here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.LastName && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      // sx={}
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
                  // sx={}
                  className={`${leagueSpartan.className} ${styles.label}`}
                  variant="body2"
                >
                  Email Address
                </Typography>
                <div className={styles.inputInner}>
                  <Input
                    name="EmailAddress"
                    value={formData.EmailAddress}
                    onChange={handleChange}
                    placeholder={"Enter Email here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.EmailAddress && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      // sx={}
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
                  // sx={styles.label}
                  className={`${leagueSpartan.className} ${styles.label}`}
                  variant="body2"
                >
                  Phone Number
                </Typography>

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
              </Grid>
            </Grid>
            <Typography
              // sx={[styles.label, ]}
              className={`${leagueSpartan.className} ${styles.label} ${styles.marginTop4}`}
              variant="body2"
              style={{ width: "100%" }}
            >
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="Message"
              value={formData.Message}
              onChange={(e) => handleChange("Message", e.target.value)}
              placeholder="Enter your Message here..."
              className={`${leagueSpartan.className} ${styles.input} `}
              // sx={[styles.input]}
            />{" "}
            {errors.Message && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                //   sx={styles.error}
                component={"p"}
                variant="caption"
              >
                {errors.Message}
              </Typography>
            )}
            <Button
              variant="contained"
              // sx={styles.containedButton}
              type="submit"
              className={`${leagueSpartan.className} ${styles.containedButton}`}
            >
              {loading ? (
                <CircularProgress
                  sx={{ width: "12px", height: "12px", color: "white" }}
                  size={20}
                />
              ) : (
                "Get In Touch"
              )}
            </Button>
          </form>
        </div>
        {/* </Grid>
      </Grid> */}
      </div>
    </div>
  );
};

export default GetInTouch;
