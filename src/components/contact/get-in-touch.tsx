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
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import girlLaptop from "../../../public/assets/images/static/girl-using-laptop.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import Input from "../input/Input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { ContactFormType } from "../home/form-dialouge";
import CustomInput from "../custom-input/custom-input";
import toast from "react-hot-toast";
import { sendEmail } from "@/services/email-service/email-service";
import { HELLOTUITIONALEDU } from "@/utils/env";
import { createContactTemplate } from "@/services/email-service/template";

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
    <Box sx={styles.container}>
      <Box sx={styles.background} />
      <Grid
        container
        sx={{
          maxWidth: "1400px",
          display: "flex",
          justifyContent: "center",
          marginBottom: {
            xs: "60px",
            sm: "60px",
            md: "100px",
            lg: "100px",
          },
        }}
      >
        <Grid
          item
          lg={5}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "40px", sm: "40px", md: "40px", lg: 0 },
            paddingX: {
              xs: "5%",
              sm: "5%",
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "flex",
              },
              flexDirection: "column",
            }}
          >
            <Typography
              sx={styles.heading}
              className={leagueSpartan.className}
              component={"h2"}
              variant="h2"
            >
              Get In {"  "}
              <Typography
                className={leagueSpartan.className}
                variant="h2"
                sx={[
                  styles.heading,
                  {
                    color: "rgba(81, 184, 147, 1)",
                    fontWeight: 700,
                    marginLeft: 1,
                  },
                  styles.touch,
                ]}
                component={"span"}
              >
                {`    Touch`}
              </Typography>
            </Typography>
            <Typography
              sx={styles.looking}
              className={leagueSpartan.className}
              component={"p"}
              variant="body2"
            >
              {`Can't Assess What You're Looking For?`}
              <br /> {`Don't Worry! We Can Help!`}
            </Typography>
            <Box
              sx={{
                maxWidth: {
                  xs: "100%",
                  lg: "530px",
                  xl: "530px",
                  xxl: "530px",
                },
                height: "684px",
                marginTop: "40px",
              }}
            >
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
            </Box>
          </Box>
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <Box
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "block",
              },
              alignItems: "center",
              flexDirection: "column",
              zIndex: 4,
            }}
          >
            <Box
              sx={styles.contactForm}
              component="form"
              onSubmit={handleSubmit}
            >
              <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
                sx={{ zIndex: 1 }}
              >
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                    variant="body2"
                  >
                    First Name
                  </Typography>
                  <Box sx={styles.inputInner}>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={"Enter First Name here ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.firstName && (
                      <Typography
                        className={`${leagueSpartan.className} `}
                        sx={styles.error}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.firstName}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                    variant="body2"
                  >
                    Last Name
                  </Typography>
                  <Box sx={styles.inputInner}>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={"Enter Last Name here ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.lastName && (
                      <Typography
                        className={`${leagueSpartan.className}`}
                        sx={styles.error}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.lastName}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                    variant="body2"
                  >
                    Email Address
                  </Typography>
                  <Box sx={styles.inputInner}>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={"Enter Email here ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.email && (
                      <Typography
                        className={`${leagueSpartan.className}`}
                        sx={styles.error}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                    variant="body2"
                  >
                    Phone Number
                  </Typography>
                  <Box sx={styles.inputInner}>
                    <PhoneInput
                      defaultCountry="SA"
                      value={formData?.phone || ""}
                      onChange={(e) => handleChange("phone", String(e))}
                      inputComponent={CustomInput}
                      style={styles.phoneInput}
                    />
                    {errors.phone && (
                      <Typography
                        className={`${leagueSpartan.className} `}
                        sx={styles.error}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.phone}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Typography
                sx={[styles.label, { width: "100%", marginTop: "3vh" }]}
                className={leagueSpartan.className}
                variant="body2"
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
                className={`${leagueSpartan.className}  `}
                sx={[styles.input]}
              />{" "}
              {errors.message && (
                <Typography
                  className={`${leagueSpartan.className}`}
                  sx={styles.error}
                  component={"p"}
                  variant="caption"
                >
                  {errors.message}
                </Typography>
              )}
              {/* <Button
                variant="contained"
                sx={styles.containedButton}
                type="submit"
                className={leagueSpartan.className}
              >
                Submit Now
              </Button> */}
              <Button
                variant="contained"
                sx={styles.containedButton}
                type="submit"
                className={leagueSpartan.className}
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetInTouch;

const styles = {
  inputInner: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: "8px",
  },

  phoneInput: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    height: "5.5vh",
    paddingLeft: "10px",
    backgroundColor: "white",
    // marginTop: "1.5vh",

    outline: "none",
    position: "relative",
    zIndex: 2,
    color: "rgba(0, 0, 0, 0.77)",
    borderRadius: "10px",
    fontSize: "2.3vh",
    fontWeight: 400,
    lineHeight: "3.5vh",
  },

  // phoneInput:focus-visible {
  //   outline: 'none',
  // }
  error: {
    color: "red",
    marginTop: "6px",
    marginLeft: "6px",
  },
  looking: {},
  label: {},
  heading: {
    display: "flex",

    position: "relative",
  },
  contactForm: {
    boxShadow:
      "0px -3px 8px 0px rgba(0, 155, 245, 0.15) inset,0px 2px 1px 0px rgba(0, 0, 0, 0.05)",
    backgroundColor: "rgba(255,255,255,0.7)",
    width: {
      xs: "75%",
      sm: "75%",
      md: "70%",
      lg: "75%",
      xl: "82%",
    },
    paddingX: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "50px",
    },
    paddingY: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "50px",
    },
    borderRadius: "20px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  container: {
    background: "linear-gradient(to top, rgba(255, 255, 255, 0.7),#D7F0FF)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "80px",
  },
  background: {
    position: "absolute",
    zIndex: -2,
    height: "100%",
    width: "100%",
  },

  input: {
    backgroundColor: "white",
    marginY: "12px",
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px",
  },
  containedButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38B6FF",

    textTransform: "none",

    textAlign: "center",
    width: "100%",
    padding: "18px",
    marginY: "20px",
    letterSpacing: "-2%",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",

      textAlign: "center",
      padding: "18px",
      marginY: "20px",
      letterSpacing: "-2%",
      borderRadius: "10px",
    },
  },
  formBox: {
    width: {
      xs: "100px",
      sm: "180px",
      md: "200px",
      lg: "200px",
    },
    height: {
      xs: "100px",
      sm: "180px",
      md: "200px",
      lg: "200px",
    },
    borderRadius: "100px",
    backgroundColor: "rgba(56, 182, 255, 1)",
    position: "absolute",
    top: {
      xs: -30,
      sm: -80,
      md: -80,
      lg: -80,
    },
    right: {
      xs: -10,
      sm: -40,
      md: -60,
      lg: -80,
    },
    zIndex: -1,
  },
  formInner: {
    width: {
      xs: "60px",
      sm: "80px",
      md: "100px",
      lg: "100px",
    },
    height: {
      xs: "60px",
      sm: "80px",
      md: "100px",
      lg: "100px",
    },
    borderRadius: "100px",
    backgroundColor: "rgba(56, 182, 255, 1)",
    position: "absolute",
    bottom: {
      xs: -80,
      sm: -80,
      md: -80,
      lg: -30,
    },
    left: {
      xs: -20,
      sm: -20,
      md: -30,
      lg: -30,
    },
    zIndex: -1,
    display: {
      xs: "block",
      md: "block",
    },
  },
  touch: {
    "::before": {
      //   display: "flex",
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
        xs: 0,
        lg: -20,
      },
      top: {
        xs: -25,
        lg: -30,
      },
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesMobile.src})`,
        md: `url(${lines.src})`,
        lg: `url(${lines.src})`,
      },
      height: {
        xs: "19px",
        sm: "19px",
        md: "43px",
        lg: "43px",
      },
      width: {
        xs: "20px",
        sm: "20px",
        md: "43px",
        lg: "43px",
      },
      backgroundPosition: "end",
      backgroundRepeat: "no-repeat",
      // animation: "swing 1s linear infinite alternate",
    },
  },
};
