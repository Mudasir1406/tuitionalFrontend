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
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
import { sendEmail } from "@/services/email-service/email-service";
import { createEmailTemplate } from "@/services/email-service/template";
import toast from "react-hot-toast";
import { HELLOTUITIONALEDU } from "@/utils/env";
import styles from "./style.module.css";
import { FormType } from "@/components/home/form-dialouge";
import CustomInput from "@/components/custom-input/custom-input";
import Input from "@/components/input/Input";
import DropDown from "@/components/DropDown/DropDown";
import { isNotEmpty, isValidEmail } from "@/utils/helper";

type IProps = {
  background?: any;
};

const Form: React.FunctionComponent<IProps> = ({ background }) => {
  const [formData, setFormData] = React.useState<FormType>({
    name: "",
    email: "",
    phone: "",
    grade: "",
    curriculum: "",
    subjects: "",
    message: "",
  });
  const [filterData, setFilterData] = useState<Filter_Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<FormType>>({});

  // const handleChange = (key: string, value: string | string[]) => {
  //   setFormData({
  //     ...formData,
  //     [key]: value,
  //   });
  // };

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    // Perform validation if the key is "phone"
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
    if (key === "name" && typeof value === "string") {
      newErrors.name = isNotEmpty(value) ? "" : "Name cannot be empty";
    }
    if (key === "grade" && typeof value === "string") {
      newErrors.grade = isNotEmpty(value) ? "" : "Grade cannot be empty";
    }
    if (key === "curriculum" && typeof value === "string") {
      newErrors.curriculum = isNotEmpty(value)
        ? ""
        : "Curriculum cannot be empty";
    }
    if (key === "subjects" && typeof value === "string") {
      newErrors.subjects = isNotEmpty(value) ? "" : "Subjects cannot be empty";
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

    // Step 1: Perform Validation
    const newErrors: Partial<FormType> = {};

    if (!isNotEmpty(formData.name)) {
      newErrors.name = "Name cannot be empty";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!isNotEmpty(formData.grade)) {
      newErrors.grade = "Grade is required";
    }

    if (!isNotEmpty(formData.curriculum)) {
      newErrors.curriculum = "Curriculum is required";
    }

    if (!isNotEmpty(formData.subjects)) {
      newErrors.subjects = "Subjects cannot be empty";
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
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Form submitted Failed!");
    } finally {
      setLoading(false);
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
  useEffect(() => {
    getFilterData().then((data) => {
      setFilterData(data);
    });
  }, []);
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={"Enter name here ..."}
              className={`${styles.input} ${leagueSpartan.className}`}
            />
            {errors.name && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.name}
              </Typography>
            )}
          </div>

          <div className={styles.inputInner}>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={"Enter email here ..."}
              className={`${styles.input} ${leagueSpartan.className}`}
            />
            {errors.email && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.email}
              </Typography>
            )}
          </div>
        </div>

        <div className={styles.inputDiv}>
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
          <div className={styles.div}>
            <DropDown
              name="grade"
              placeholder="Select Grade"
              marginTop="1.5vh"
              data={filterData?.grade || []}
              // multiple
              value={formData.grade}
              onChange={handleChange}
            />
            {errors.grade && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.grade}
              </Typography>
            )}
          </div>
        </div>
        <div className={styles.inputDiv}>
          <div className={styles.div}>
            <DropDown
              placeholder="Select Curriculum"
              name="curriculum"
              data={filterData?.curriculum || []}
              marginTop="1.5vh"
              value={formData.curriculum}
              onChange={handleChange}
            />
            {errors.curriculum && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.curriculum}
              </Typography>
            )}
          </div>
          <div className={styles.div}>
            <DropDown
              name="subjects"
              placeholder="Select Subject"
              data={filterData?.subject || []}
              marginTop="1.5vh"
              multiple
              value={formData.subjects}
              onChange={handleChange}
            />{" "}
            {errors.subjects && (
              <Typography
                className={`${leagueSpartan.className} ${styles.error}`}
                component={"p"}
                variant="caption"
              >
                {errors.subjects}
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
            placeholder="Enter your message here..."
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
          // sx={styles.containedButton}
          type="submit"
          // onClick={handleSubmit}
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

export default Form;
