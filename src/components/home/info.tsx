import { Box, Typography, colors } from "@mui/material";

import tutors from "../../../public/assets/images/static/tutors.png";
import React from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
const Info = () => {
  return (
    <Box sx={styles.contanier}>
      <Box sx={styles.registerStudentBox}>
        <Box sx={styles.schoolbox}>
          <SchoolOutlinedIcon sx={{ color: "white" }} />
        </Box>
        <Typography sx={styles.text} className={leagueSpartan.className}>
          50000+
        </Typography>
        <Typography sx={styles.text} className={leagueSpartan.className}>
          Registered Students
        </Typography>
      </Box>
      <Box sx={styles.liveSessions}>
        <Box sx={styles.singleBox}>
          <Box sx={styles.absoluteBoxOrange}>
            <VideocamOutlinedIcon sx={{ color: "white" }} />
          </Box>
          <Typography sx={styles.text} className={leagueSpartan.className}>
            100+ Live Sessions
          </Typography>
        </Box>
        <Box sx={styles.singleBox}>
          <Image
            alt={"tutors"}
            src={tutors.src}
            width={tutors.width}
            height={tutors.height}
          ></Image>
          <Typography sx={styles.text} className={leagueSpartan.className}>
            500+{" "}
          </Typography>
          <Typography sx={styles.text} className={leagueSpartan.className}>
            Tutor Screened
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;

const styles = {
  text: {
    color: "black",
    fontFamily: "League Spartan",
    fontSize: {
      xs: "14px",
      sm: "14px",
      md: "16px",
      lg: "18px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "20px",
      sm: "20px",
      md: "23px",
      lg: "25px",
    },
    textAlign: "center",
  },
  contanier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: {
      xs: "250px",
      sm: "300px",
      md: "700px",
      lg: "100%",
    },
    marginTop: {
      xs: 25,
      sm: 15,
      md: 15,
      lg: 0,
    },
    position: "relative",
  },
  registerStudentBox: {
    boxShadow: "0px 0px 30px 0px #38B6FF33",
    width: {
      xs: "150px",
      sm: "170px",
      md: "190px",
      lg: "235px",
    },
    height: {
      xs: "90px",
      sm: "100px",
      md: "110px",
      lg: "119px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: "white",
    position: "relative",
    animation: "bounce 5s ease-in-out infinite",
    marginLeft: "2%",
  },
  liveSessions: {
    width: {
      xs: "150px",
      sm: "170px",
      md: "190px",
      lg: "235px",
    },
    // height: "59px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "10px",
    // backgroundColor: "white",
    gap: "10px",
    marginTop: 10,
    animation: "bounce 6s ease-in-out infinite",
    marginRight: "2%",
  },
  singleBox: {
    background: "white",
    borderRadius: "10px",
    padding: "14px",
    position: "relative",
    width: "100%",
    boxShadow: "0px 0px 30px 0px #38B6FF33",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  absoluteBoxOrange: {
    position: "absolute",
    right: 0,
    top: -40,
    zIndex: 99,
    background: "#F86A6A",
    borderRadius: "100%",
    boxShadow: 3,
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  schoolbox: {
    position: "absolute",
    zIndex: 10,
    width: 70,
    height: 70,
    backgroundColor: "#51B893",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    top: -50,
  },
};
