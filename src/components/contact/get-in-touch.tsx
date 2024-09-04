"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import girlLaptop from "../../../public/assets/images/static/girl-using-laptop.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const GetInTouch: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Country: "",
    Curriculum: "",
    Grade: "",
    Parent: "",
    Phone: "",
    Subjects: "",
    Year: "",
    Message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          body: formDataString,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.error("Error saving data:", error);
      // alert("Error saving data");
    }
  };

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
            >
              Get In {"  "}
              <Typography
                className={leagueSpartan.className}
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
            <Typography sx={styles.looking} className={leagueSpartan.className}>
              You can’t what you are looking for?
              <br /> It is ok. We can help.
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
                alt="girlLaptop"
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
                  >
                    First Name
                  </Typography>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                  >
                    Last Name
                  </Typography>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="lastName"
                    value={formData.Parent}
                    onChange={handleChange}
                    label="Last Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="email"
                    value={formData.Grade}
                    onChange={handleChange}
                    label="Email Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography
                    sx={styles.label}
                    className={leagueSpartan.className}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="phoneNumber"
                    value={formData.Grade}
                    onChange={handleChange}
                    label="Phone Number"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Typography
                sx={[styles.label, { width: "100%" }]}
                className={leagueSpartan.className}
              >
                Message
              </Typography>

              <TextField
                sx={[styles.input]}
                fullWidth
                multiline
                rows={10}
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                label="Message*"
                variant="outlined"
                className={leagueSpartan.className}
              />
              <Button
                variant="contained"
                sx={styles.containedButton}
                type="submit"
                className={leagueSpartan.className}
              >
                Submit Now
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
  looking: {
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "25px",
      lg: "24px",
    },
    lineHeight: {
      xs: "26px",
      sm: "28px",
      md: "33px",
      lg: "34px",
    },
    fontWeight: 400,
  },
  label: {
    fontSize: {
      xs: "18px",
      sm: "18px",
      md: "18px",
      lg: "18px",
    },
    lineHeight: {
      xs: "16px",
      sm: "16px",
      md: "16px",
      lg: "16px",
    },
    fontWeight: 500,
    marginTop: "10px",
  },
  heading: {
    display: "flex",
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "55px",
    },
    lineHeight: {
      xs: "50px",
      sm: "55px",
      md: "60px",
      lg: "65px",
    },
    fontWeight: 400,
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
  },
  containedButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38B6FF",

    textTransform: "none",
    fontSize: {
      xs: "25px",
      sm: "25px",
      md: "25px",
      lg: "25px",
    },
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "100%",
    padding: "18px",
    marginY: "20px",
    letterSpacing: "-2%",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",

      fontSize: {
        xs: "25px",
        sm: "25px",
        md: "25px",
        lg: "25px",
      },
      fontWeight: 700,
      lineHeight: "18.4px",
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
