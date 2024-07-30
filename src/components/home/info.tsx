import { Box, Typography } from "@mui/material";
import tutors from "../../../public/assets/images/static/tutors.png";
import React from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const Info = () => {
  return (
    <Box sx={styles.container}>
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
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
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
    fontSize: {
      xs: "1.5vh", // Responsive font size
      sm: "1.8vh",
      md: "2vh",
      lg: "2.2vh",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "2vh", // Responsive line height
      sm: "2.2vh",
      md: "2.4vh",
      lg: "2.6vh",
    },
    textAlign: "center",
  },
  container: {
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    width: "100%",
    height: {
      xs: "50vh",
      sm: "60vh",
      md: "70vh",
      lg: "80vh",
    },
    marginTop: {
      xs: "2.5vh",
      sm: "2vh",
      md: "1.5vh",
      lg: "1vh",
    },
    position: "relative",
  },
  registerStudentBox: {
    boxShadow: "0px 0px 30px 0px #38B6FF33",
    width: {
      xs: "30vw",
      sm: "25vw",
      md: "20vw",
      lg: "15vw",
    },
    height: {
      xs: "12vh",
      sm: "15vh",
      md: "18vh",
      lg: "20vh",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "1vh",
    backgroundColor: "white",
    position: "relative",
    animation: "bounce 5s ease-in-out infinite",
    marginLeft: "2%",
    marginBottom: {
      xs: "5vh",
      sm: "10vh",
      md: "15vh",
      lg: "20vh",
    },
  },
  liveSessions: {
    width: {
      xs: "30vw",
      sm: "25vw",
      md: "20vw",
      lg: "15vw",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "1vh",
    gap: "1vh",
    marginTop: "1vh",
    animation: "bounce 6s ease-in-out infinite",
    marginRight: "2%",
    marginBottom: {
      xs: "5vh",
      sm: "10vh",
      md: "15vh",
      lg: "20vh",
    },
  },
  singleBox: {
    background: "white",
    borderRadius: "1vh",
    padding: "2vh",
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
    top: "-5vh",
    zIndex: 99,
    background: "#F86A6A",
    borderRadius: "50%",
    boxShadow: 3,
    width: "5vh",
    height: "5vh",
    minHeight: "30px",
    minWidth: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  schoolbox: {
    position: "absolute",
    zIndex: 10,
    width: "7vh",
    height: "7vh",
    backgroundColor: "#51B893",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    top: "-5vh",
    minHeight: "30px",
    minWidth: "30px",
  },
};
