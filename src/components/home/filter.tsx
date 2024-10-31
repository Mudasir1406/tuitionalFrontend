"use client";
import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import DropDown from "../DropDown/DropDown";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import PopularSearches from "./popular-searches";
import {
  Filter_Data,
  getFilterData,
} from "../../services/filter-data/filter-data";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";

const Filter: React.FC = async () => {
  const filterData: Filter_Data | null = await getFilterData();
  return (
    <Box sx={{ width: "100%", paddingBottom: "10vh", maxHeight: "700px" }}>
      <Typography
        sx={[styles.heading]}
        component={"h1"}
        className={leagueSpartan.className}
      >
        Online Tutoring{" "}
        <Typography
          sx={styles.expertText}
          component={"span"}
          className={leagueSpartan.className}
        >
          Platform <br />{" "}
        </Typography>
        Customized for 1:1 Online Tutoring Sessions
      </Typography>
      <Typography
        sx={styles.desc}
        className={leagueSpartan.className}
        component={"p"}
      >
        Tuitional Is An Online Tutoring Platform Providing Quality Education
        Through Live Sessions For Grades 6-8, IGCSE GCSE, And A-Levels. Start
        your learning journey.
      </Typography>
      <Box sx={styles.filterBox}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Select Curriculum"
              data={filterData?.curriculum || []}
              value={""}
              onChange={() => {}}
            />
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Select Grade"
              data={filterData?.grade || []}
              value={""}
              onChange={() => {}}
            />
          </Grid>
          <Grid item lg={7} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Select Subject"
              data={filterData?.subject || []}
              value={""}
              onChange={() => {}}
            />
          </Grid>
          <Grid item lg={5} sm={12} xs={12} md={12}>
            <PopUpButton
              text="Get Started"
              href="popup"
              sx={styles.containedBtn}
            />
          </Grid>
        </Grid>
      </Box>
      {/* <Box>
        <PopularSearches />
      </Box> */}
    </Box>
  );
};

export default Filter;

const styles = {
  heading: {
    fontSize: {
      xs: "4vh",
      sm: "5.2vh",
      md: "5.3vh",
      lg: "5.4vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "5vh",
      sm: "4.5vh",
      md: "5.5vh",
      lg: "6vh",
    },
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      xs: "4vh",
    },
    color: "#000000",
  },
  expertText: {
    color: "#51B893",
    display: "inline",
    fontSize: {
      xs: "4vh",
      sm: "5.2vh",
      md: "5.3vh",
      lg: "5.4vh",
    },

    fontWeight: 600,
    lineHeight: {
      xs: "3.5vh",
      sm: "4.5vh",
      md: "5.5vh",
      lg: "8vh",
    },
    position: "relative",
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
        md: 0,
        lg: -45,
      },
      top: {
        xs: -20.5,
        sm: -20.5,
        md: -30.5,
        lg: -30.5,
      },
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesMobile.src})`,
        md: `url(${lines.src})`,
        lg: `url(${lines.src})`,
      },
      height: {
        xs: linesMobile.height,
        sm: linesMobile.height,
        md: lines.height,
        lg: lines.height,
      },
      width: {
        xs: linesMobile.width,
        sm: linesMobile.width,
        md: lines.width,
        lg: lines.width,
      },
      backgroundPosition: "end",
      backgroundRepeat: "no-repeat",
    },
  },
  desc: {
    fontSize: {
      xs: "2.5vh",
      sm: "2vh",
      md: "2.5vh",
      lg: "2.6vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "2.5vh",
      sm: "2.4vh",
      md: "2.8vh",
      lg: "3.4vh",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    paddingX: {
      xs: "2vh",
      lg: "0vh",
    },
    marginTop: {
      xs: "4vh",
    },
    color: "#000000",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    lineHeight: "1.6vh",
    textAlign: "center",
    width: "100%",
    padding: "2vh",
    textTransform: "none",
    letterSpacing: "-2%",
    color: "white",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
  filterBox: {
    backgroundColor: "#D7F0FF",
    paddingY: {
      xs: "4vh",
      sm: "4vh",
      md: "5vh",
      lg: "5vh",
    },
    paddingX: {
      xs: "2vh",
      sm: "2vh",
      md: "3vh",
      lg: "3vh",
    },
    borderRadius: {
      xs: "2vh",
      sm: "2vh",
      md: "1vh",
      lg: "1vh",
    },
    marginTop: "4vh",
    maxHeight: "70vh",
    animation: "rotateAnimation 1s ease-in-out infinite",
    transformOrigin: "center",
  },
};
