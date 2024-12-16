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
import DropDown from "../../DropDown/DropDown";
import CustomInput from "@/components/custom-input/custom-input";

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

  // const handleChange = (key: string, value: string | string[]) => {
  //   setFormData({
  //     ...formData,
  //     [key]: value,
  //   });
  // };

  const handleChange = (key: string, value: string | string[]) => {
    // Perform validation if the key is "phone"
    if (key === "phone" && typeof value === "string") {
      if (!isValidPhoneNumber(value)) {
        console.log("Invalid phone number!");
        return;
      }
    }

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    console.log("formDataString", formDataString);

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
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        component={"h5"}
        variant="subtitle1"
      >
        Avail A 10% Discount If You Sign Up Today!
      </Typography>
      <div className={styles.inputDiv}>
        <TextField
          //sx={styles.input}
          fullWidth
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          label="Name*"
          variant="outlined"
          className={`${leagueSpartan.className} ${styles.input}`}
        />

        <TextField
          // sx={styles.input}

          fullWidth
          name="Email"
          // value={formData.Parent}
          // onChange={handleChange}
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          label="Email*"
          variant="outlined"
          type="email"
          className={`${leagueSpartan.className} ${styles.input}`}
        />
      </div>

      <div className={styles.inputDiv}>
        <div className={styles.div}>
          <PhoneInput
            defaultCountry="SA"
            value={formData?.phone || ""}
            onChange={(e) => handleChange("phone", String(e))}
            inputComponent={CustomInput}
            className={styles.phoneInput}
            style={{ boxShadow: " 0px 1px 4px 0px rgba(0, 0, 0, 0.08)" }}
          />
        </div>
        <div className={styles.div}>
          <DropDown
            placeholder="Select Grade"
            data={filterData?.grade || []}
            boxShadow=" 0px 1px 4px 0px rgba(0, 0, 0, 0.08)"
            // marginBottom="1.5vh"
            marginTop="1.5vh"
            // value={""}
            // onChange={() => {}}value={formData.grade}
            value={formData.grade}
            onChange={(e) => {
              handleChange("grade", e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.inputDiv}>
        <div className={styles.div}>
          <DropDown
            placeholder="Select Curriculum"
            data={filterData?.curriculum || []}
            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.08)"
            marginTop="1.5vh"
            // marginBottom="1.5vh"
            value={formData.curriculum}
            onChange={(e) => {
              handleChange("curriculum", e.target.value);
            }}
          />
        </div>
        <div className={styles.div}>
          <DropDown
            placeholder="Select Subject"
            data={filterData?.subject || []}
            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.08)"
            // marginBottom="1.5vh"
            marginTop="1.5vh"
            value={formData.subjects}
            onChange={(e) => {
              handleChange("subjects", e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <TextField
          //   sx={[styles.input]}
          
          fullWidth
          multiline
          rows={4}
          name="Message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          label="Message*"
          variant="outlined"
          className={`${leagueSpartan.className} ${styles.input} ${styles.textField}`}
        />
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
    </div>
  );
};

export default Form;
