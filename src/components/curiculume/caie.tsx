import React from "react";
import icon1 from "../../../public/assets/images/svg/icon-miunus.svg";
import icon2 from "../../../public/assets/images/svg/icon-plus.svg";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import "./../../app/style.css";
const CAIE = () => {
  let Caie = [
    {
      heading1: "Requirements of CAIE",
      heading2: "Age ",
      desc: "Typically, there are no specific age requirements, but most students take IGCSE exams at the age of 14-16 and AS/A Level exams at 16-19.",
      heading3: "Enrollment",
      heading4: "Subjects",
      img1: icon1,
      img2: icon2,
    },
    {
      heading1: "Course Format of CAIE",
      heading2: "Core and Extended Options ",
      desc: "Courses are offered in both core and extended formats to cater to different levels of ability and understanding..",
      heading3: "Assessment Through Written Exams",
      heading4: "Diverse Topics Covered",
      img1: icon1,
      img2: icon2,
    },
  ];
  return (
    <>
      <Box
        sx={{
          marginX: {
            sm: "2vh",
            lg: "7vh",
          },
          marginY: {
            sm: "5vh",
            lg: "13vh",
          },
        }}
      >
        <Grid container spacing={1}>
          {Caie.map((i, index) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                  <Typography sx={style.hed1}>{i.heading1}</Typography>
                  <Box sx={{
                    background: "#D3EFFF", borderRadius: "2vh",
                    boxShadow: "0px -5px 15px 0px rgba(56, 182, 255, 0.20)",
                    backdropFilter: "blur(5px)",
                  }}>
                    <Box sx={style.headingicon}>
                      <Typography sx={style.boxheding}>{i.heading2}</Typography>
                      <Box sx={style.icon}>
                        <Image src={icon1} alt="icon" style={{ height: "5vh" }} />
                      </Box>
                    </Box>
                    <Typography sx={style.description}>{i.desc}</Typography>
                  </Box>

                  <Box sx={style.heading}>
                    <Typography sx={style.boxheding}>{i.heading3}</Typography>
                    <Box sx={style.icon}>
                      <Image src={icon2} alt="icon" style={{ height: "5vh" }} />
                    </Box>
                  </Box>
                  <Box sx={style.heading}>
                    <Typography sx={style.boxheding}>{i.heading4}</Typography>
                    <Box sx={style.icon}>
                      <Image src={icon2} alt="icon" style={{ height: "5vh" }} />
                    </Box>
                  </Box>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
export default CAIE;

const style = {
  headingicon: {
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between", // This should space the items
    width: "auto",
    paddingX: "2vh", // Optional padding for spacing from sides
  },
  heading: {
    borderRadius: "1vh",
    border: "1px solid #DADADA",
    display: "flex",
    justifyContent: "space-between", // This should space the items
    width: "auto",
    paddingX: "2vh", // Optional padding for spacing from sides
    marginY: {
      sm: "2vh",
      lg: "2vh",
    },
  },
  hed1: {
    fontWeight: "600",
    lineHeight: "10vh",
    fontSize: {
      xs: "4vh",
      sm: "3vh",
      lg: "4vh",
    },
    textAlign: {
      xs: "center",
      sm: "start",
      md: "start",
      lg: "start",
    },
  },
  icon: {
    padding: {
      xs: "1vh",
      lg: "1.7vh 0 0 0",
    },
  },
  boxheding: {
    fontWeight: "600",
    fontSize: {
      xs: "3vh",
      sm: "1.5vh",
      md: "2vh",
      lg: "2.4vh",
    },
    lineHeight: {
      lg: "8vh",
    },
  },
  description: {
    fontWeight: "400",
    width: "80vh",
    fontSize: {
      xs: "1.8vh",
      sm: "1.4vh",
      md: "2vh",
      lg: "2vh",
    },
    textAlign: {
      xs: "justify",
      sm: "justify",
      md: "justify",
      lg: "justify",
    },
    padding: {
      sm: "2vh",
      lg: "0vh 2vh 2vh 2vh",
    },
  },
};
