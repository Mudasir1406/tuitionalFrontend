import { Box, Button, Grid, Typography } from "@mui/material";
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
const Filter: React.FC = async () => {
  const filterData: Filter_Data | null = await getFilterData();
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={styles.heading}
        component={"h2"}
        className={leagueSpartan.className}
      >
        Learn From{" "}
        <Typography
          sx={styles.expertText}
          component={"span"}
          className={leagueSpartan.className}
        >
          Expert Tutors{" "}
        </Typography>
        Face-To-Face Or Online
      </Typography>
      <Typography sx={styles.desc} className={leagueSpartan.className}>
        Tuitional Is A Virtual Learning Platform Offering Live Sessions For
        Grades 6-8, IGCSE GCSE, And A-Levels
      </Typography>
      <Box sx={styles.filterBox}>
        <Grid container spacing={2}>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Select Curriculum"
              data={filterData?.curriculum || []}
            />
          </Grid>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Select Grade"
              data={filterData?.grade || []}
            />
          </Grid>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Select Subject"
              data={filterData?.subject || []}
            />
          </Grid>
          <Grid item lg={7} sm={12} xs={12} md={12}>
            <DropDown
              placeholder="Looking For?"
              data={filterData?.type || []}
            />
          </Grid>
          <Grid item lg={5} sm={12} xs={12} md={12}>
            <Button
              variant="contained"
              sx={styles.containedBtn}
              className={leagueSpartan.className}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <PopularSearches />
      </Box>
    </Box>
  );
};

export default Filter;

const styles = {
  heading: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "40px",
      sm: "42px",
      md: "45px",
      lg: "55px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "40px",
      sm: "35px",
      md: "45px",
      lg: "65px",
    },
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      xs: "30px",
    },
    color: "#000000",
  },
  expertText: {
    fontFamily: "League Spartan",
    color: "#51B893",
    display: "inline",
    fontSize: {
      xs: "30px",
      sm: "40px",
      md: "40px",
      lg: "55px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "25px",
      sm: "35px",
      md: "45px",
      lg: "65px",
    },
    position: "relative",
    "::before": {
      //   display: "flex",
      content: "''",
      position: "absolute",
      zIndex: 10,

      right: {
        md: 0,
        lg: 0,
      },
      top: {
        xs: -25,
        sm: -25,
        md: -35,
        lg: -35,
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
  desc: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "18px",
      sm: "14px",
      md: "18px",
      lg: "24px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "25px",
      sm: "24px",
      md: "28px",
      lg: "34px",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    paddingX: {
      xs: "20px",
    },
    marginTop: {
      xs: "30px",
    },
    color: "#000000",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "100%",
    padding: "18px",
    textTransform: "none",
    letterSpacing: "-2%",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      fontFamily: "League Spartan",
      fontSize: "20px",
      padding: "18px",
      letterSpacing: "-2%",
      borderRadius: "10px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
    },
  },
  filterBox: {
    backgroundColor: "#D7F0FF",
    paddingY: {
      xs: "40px",
      sm: "40px",
      md: "50px",
      lg: "50px",
    },
    paddingX: {
      xs: "20px",
      sm: "20px",
      md: "30px",
      lg: "30px",
    },
    borderRadius: {
      xs: "20px",
      sm: "20px",
      md: "10px",
      lg: "10px",
    },
    marginTop: "30px",
    animation: "rotateAnimation 1s ease-in-out infinite",
    transformOrigin: "center",
    // maxWidth: "600px",
    // minWidth: "320px",
  },
};
