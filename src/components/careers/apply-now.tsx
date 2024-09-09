"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import applynow from "../../../public/assets/images/static/applynow.png";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const ApplyNow: React.FunctionComponent = () => {
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
              },
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
              marginTop: 20,
            }}
          >
            <Typography sx={styles.heading} className={leagueSpartan.className}>
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
                <Grid item lg={6}>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    label="Name*"
                    variant="outlined"
                  />
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                    label="Country*"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="Parent"
                    value={formData.Parent}
                    onChange={handleChange}
                    label="I am parent*"
                    variant="outlined"
                  />
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    label="Phone no*"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    className={leagueSpartan.className}
                    sx={styles.input}
                    fullWidth
                    name="applyFor"
                    value={formData.Grade}
                    onChange={handleChange}
                    label="Position Apply for*"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

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
    fontWeight: 700,

    marginTop: {
      xs: "60px",
      sm: "80px",
      md: "90px",
      lg: "105px",
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
      sm: "55px",
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

  input: {
    backgroundColor: "white",
    marginY: "12px",
    // outline: "none",
    // ":focus-visible": {
    //   outline: "none",
    // },
    // width: "95%"
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
