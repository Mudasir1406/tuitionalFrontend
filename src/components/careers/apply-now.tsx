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
import dynamic from "next/dynamic";
import applynow from "../../../public/assets/images/static/applynow.png";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import { CareersFormType } from "../home/form-dialouge";
import toast from "react-hot-toast";
import { sendEmail } from "@/services/email-service/email-service";
import { createCareerTemplate } from "@/services/email-service/template";
import { isValidPhoneNumber } from "react-phone-number-input";
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});
import CustomInput from "../custom-input/custom-input";
import { CAREERSTUITIONALEDU, HRTUITIONALEDU } from "@/utils/env";
import DropDown from "../DropDown/DropDown";
import Input from "../input/Input";
import { isNotEmpty, isValidEmail } from "@/utils/helper";
import { Height } from "@mui/icons-material";

const ApplyNow: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<CareersFormType>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    position: "",
    message: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Partial<CareersFormType>>({});

  const handleChange = (key: string, value: string | string[]) => {
    let newErrors = { ...errors };

    if (key === "message" && typeof value === "string") {
      value = value.slice(0, 500);
      newErrors.message = isNotEmpty(value) ? "" : "Message cannot be empty";
    }
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
    if (key === "firstName" && typeof value === "string") {
      newErrors.firstName = isNotEmpty(value)
        ? ""
        : "First Name cannot be empty";
    }

    if (key === "lastName" && typeof value === "string") {
      newErrors.lastName = isNotEmpty(value) ? "" : "Last Name cannot be empty";
    }

    if (key === "country" && typeof value === "string") {
      newErrors.country = isNotEmpty(value) ? "" : "Country cannot be empty";
    }

    if (key === "position" && typeof value === "string") {
      newErrors.position = isNotEmpty(value) ? "" : "Position cannot be empty";
    }

    // if (key === "message" && typeof value === "string") {
    //   newErrors.message = isNotEmpty(value) ? "" : "Message cannot be empty";
    // }

    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors(newErrors);
    // setFormData({
    //   ...formData,
    //   [key]: value,
    // });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: Partial<CareersFormType> = {};

    if (!isNotEmpty(formData.firstName)) {
      newErrors.firstName = "First Name cannot be empty";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!isNotEmpty(formData.lastName)) {
      newErrors.lastName = "Last Name is required";
    }

    if (!isNotEmpty(formData.country)) {
      newErrors.country = "Country is required";
    }

    if (!isNotEmpty(formData.position)) {
      newErrors.position = "Position cannot be empty";
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
        // recipientEmail: "careers@tuitionaledu.com",
        recipientEmail: CAREERSTUITIONALEDU,
        cc: HRTUITIONALEDU,
        subject: "Get Started",
        text: "",
        html: createCareerTemplate(formData),
      });
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
        country: "",
        position: "",
        message: "",
      });
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.background} />
      <Grid container>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <Box
            sx={{
              position: "relative",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
              },
              height: {
                lg: "915px",
                xs: "auto",
              },
              margin: "auto",
            }}
          >
            <Image
              src={applynow.src}
              width={applynow.width}
              height={applynow.height}
              alt="applynow"
              className="girlGrid"
              style={{
                position: "absolute",
                top: 90,
              }}
            ></Image>
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
              marginTop: { xs: 5, md: 10 },
            }}
          >
            <Typography
              sx={styles.heading}
              variant="h2"
              className={leagueSpartan.className}
            >
              Apply Now
            </Typography>
            <Box
              sx={styles.contactForm}
              component="form"
              onSubmit={handleSubmit}
            >
              <Box sx={styles.formBox} />
              <Box sx={styles.formInner} />
              <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
                sx={{ zIndex: 1 }}
              >
                <Grid item xs={12} md={12} lg={6}>
                  <Input
                    // style={{ width: "93%" }}
                    // style={{ padding: "0 8px", height: "5.7vh" }}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={"Enter First name here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.firstName && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.firstName}
                    </Typography>
                  )}

                  <Box sx={styles.my}>
                    <Input
                      // style={{ width: "93%" }}
                      // style={{ padding: "0 8px", height: "5.7vh" }}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={"Enter Email here ..."}
                      className={`${styles.input} ${leagueSpartan.className}`}
                    />
                    {errors.email && (
                      <Typography
                        sx={styles.error}
                        className={`${leagueSpartan.className} `}
                        component={"p"}
                        variant="caption"
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </Box>
                  <Input
                    // style={{ width: "93%" }}
                    // style={{ padding: "0 8px", height: "5.7vh" }}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder={"Enter Country here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.country && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.country}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    // style={{ width: "93%" }}
                    // style={{ padding: "0 8px", height: "5.7vh" }}
                    // style={{ height: "5.7vh" }}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={"Enter Last name here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.lastName && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.lastName}
                    </Typography>
                  )}
                  <PhoneInput
                    style={styles.phoneInput}
                    defaultCountry="SA"
                    value={formData?.phone || ""}
                    onChange={(e) => handleChange("phone", String(e))}
                    inputComponent={CustomInput}
                  />
                  {errors.phone && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} ${styles.error}`}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.phone}
                    </Typography>
                  )}
                  <Input
                    // style={{ width: "93%" }}
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder={"Enter Position here ..."}
                    className={`${styles.input} ${leagueSpartan.className}`}
                  />
                  {errors.position && (
                    <Typography
                      sx={styles.error}
                      className={`${leagueSpartan.className} `}
                      component={"p"}
                      variant="caption"
                    >
                      {errors.position}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={[styles.input]}
                    fullWidth
                    multiline
                    rows={5}
                    name="Message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    // label="Message*"
                    placeholder="Enter your message here..."
                    variant="outlined"
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
                </Grid>
              </Grid>

              <Button
                variant="contained"
                sx={styles.containedButton}
                type="submit"
                className={leagueSpartan.className}
              >
                {/* Submit Now */}
                {loading ? (
                  <CircularProgress
                    sx={{ width: "12px", height: "12px", color: "white" }}
                    size={20}
                  />
                ) : (
                  "Apply Now"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Image
        src={applynow.src}
        width={applynow.width}
        height={applynow.height}
        alt="applynow"
        className="girlContact"
      ></Image>
    </Box>
  );
};

export default ApplyNow;

const styles = {
  heading: {
    display: "flex",
    // fontSize: {
    //   xs: "35px",
    //   sm: "40px",
    //   md: "45px",
    //   lg: "55px",
    // },
    // lineHeight: {
    //   xs: "50px",
    //   sm: "55px",
    //   md: "60px",
    //   lg: "65px",
    // },
    // fontWeight: 700,

    marginTop: {
      xs: "0px",
      sm: "0px",
      md: "0px",
      lg: "5px",
    },
    marginBottom: {
      xs: "40px",
      sm: "20px",
      md: "20px",
      lg: "20px",
    },
    position: "relative",
    marginLeft: {
      xs: "0px",
      // sm: "55px",
      md: "60px",
      lg: "65px",
    },
    // width: "100%",
    "::before": {
      content: "''",
      position: "absolute",
      // zIndex: 10,
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "19px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "20px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },
      backgroundRepeat: "no-repeat",
      top: {
        xs: -12,
        sm: -35,
        md: -35,
        lg: -35,
      },
      left: {
        xs: "-10%",
        sm: "-8%",
        md: "-6%",
        lg: "-4%",
      },
    },
  },
  my: {
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  inputDiv: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },

    columnGap: "24px",
    // rowGap: "12px",
    width: "100%",
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5vh",
  },
  error: {
    color: "red",
    marginTop: "6px",
    marginLeft: "6px",
  },
  inputDivTop: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },

    columnGap: "24px",
    rowGap: "12px",

    flex: 1,
  },
  div: {
    flex: 1,
  },
  inputInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },

  rowGap: {
    rowGap: "12px",
  },
  contactForm: {
    boxShadow:
      "0px -3px 8px 0px rgba(0, 0, 0, 0.06) inset,0px 3px 8px 0px rgba(0, 0, 0, 0.06) inset",
    backgroundColor: "rgba(255,255,255,0.7)",
    width: {
      xs: "75%",
      sm: "75%",
      md: "75%",
      lg: "65%",
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
    marginBottom: {
      xs: "60px",
      sm: "60px",
      md: "100px",
      lg: "100px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  container: {
    // background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#D7F0FF)",
    position: "relative",
    // zIndex: -2,
  },
  background: {
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#D7F0FF)",
    position: "absolute",
    zIndex: -2,
    height: "100%",
    width: "100%",
  },
  phoneInput: {
    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
    paddingLeft: "10px",
    backgroundColor: "white",
    marginTop: "1.8vh",
    marginBottom: "1.8vh",
    outline: "none",
    ":focusVisible": {
      outline: "none",
    },
    position: "relative",
    zIndex: 2,
    color: "rgba(0,0,0,0.77)",
    borderRadius: "10px",
    // height: "58px",
    height: "5.7vh",
    // height: "45px",
    // height: "52px",
    // padding:'2vh 15px',
    // padding: "8px 15px",

    fontSize: "1.7vh",
    fontWeight: 400,
    // minHeight: "50px",
  },
  input: {
    backgroundColor: "white",
    // marginY: "12px",
    width: "100%",
    // outline: "none",
    // ":focus-visible": {
    //   outline: "none",
    // },
    // width: "95%"
    // height:'',
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
    letterSpacing: "-2%",
    fontSize: {
      xs: "25px",
      sm: "25px",
      md: "25px",
      lg: "25px",
    },
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    borderRadius: "10px",
    width: "100%",
    padding: "18px",
    marginY: "20px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",

      letterSpacing: "-2%",
      fontSize: {
        xs: "25px",
        sm: "25px",
        md: "25px",
        lg: "25px",
      },
      borderRadius: "10px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
      padding: "18px",
      marginY: "20px",
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
};
