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

const GetInTouch: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    browser: "",
    country: "",
    ip: "",
    pageURL: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormType>>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    if (key === "phone" && typeof value === "string") {
      if (!isValidPhoneNumber(value)) {
        console.log("Invalid phone number!");
        newErrors.phone = isValidPhoneNumber(value)
          ? ""
          : "Invalid phone number";

        return;
      }
    }
    if (key === "email" && typeof value === "string") {
      newErrors.email = isValidEmail(value) ? "" : "Invalid email address";
    }
    if (key === "firstName" && typeof value === "string") {
      newErrors.firstName = isNotEmpty(value)
        ? ""
        : "First Name cannot be empty";
    }
    if (key === "lastName" && typeof value === "string") {
      newErrors.lastName = isNotEmpty(value) ? "" : "Last Name cannot be empty";
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
    const newErrors: Partial<ContactFormType> = {};

    if (!isNotEmpty(formData.firstName)) {
      newErrors.firstName = "First Name cannot be empty";
    }

    if (!isNotEmpty(formData.lastName)) {
      newErrors.lastName = "Last Name cannot be empty";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Invalid phone number";
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
      return;
    }

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
        "https://script.google.com/macros/s/AKfycbzsn6xxCCMHvdGpZm4L7oLR2Hc5jnS1OMtQNvVnzyRFB9Md6mzQ2SIiQ7ubSP6K4-dB/exec",
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
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Form submitted Failed!");
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        browser: "",
        country: "",
        ip: "",
        pageURL: "",
      });
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxC8t_5083m612FzAesqksc8RSinMiq7o32coNB5Rd2fPV9uZOjPxNJGMoekFV9ezVVKg/exec",
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
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  React.useEffect(() => {
    const getClientLocation = async () => {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();

      setFormData({
        ...formData,
        browser,
        pageURL,
        ip: locationData?.ip,
        country: locationData?.country,
      });
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={"Enter First Name here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.firstName && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      //   sx={styles.error}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.firstName}
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
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={"Enter Last Name here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.lastName && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      // sx={}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.lastName}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={"Enter Email here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.email && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      // sx={}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.email}
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
                    value={formData?.phone || ""}
                    onChange={(e) => handleChange("phone", String(e))}
                    inputComponent={CustomInput}
                    className={`${styles.phoneInput}`}
                  />
                  {errors.phone && (
                    <Typography
                      className={`${leagueSpartan.className} ${styles.error}`}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.phone}
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
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Enter your message here..."
              className={`${leagueSpartan.className} ${styles.input} `}
              // sx={[styles.input]}
            />{" "}
            {errors.message && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                //   sx={styles.error}
                component={"p"}
                variant="caption"
              >
                {errors.message}
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
