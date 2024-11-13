import { Box, Typography, colors } from "@mui/material";
import tutors from "../../../public/assets/images/static/about-hero-2.png";
import React from "react";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const HeroInfo: React.FC = () => {
  return (
    <>
      <Box sx={styles.contanier}>
        <Box sx={styles.liveSessions}>
          <Image
            src={tutors.src}
            style={{ width: "150px" }}
            alt="teacher"
            width={tutors.width}
            height={tutors.height}
          ></Image>
        </Box>
      </Box>
    </>
  );
};

export default HeroInfo;

const styles = {
  text: {
    color: "black",

    fontSize: {
      xs: "1.3vh",
      sm: "1.3vh",
      md: "1.4vh",
      lg: "1.6vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "1.4vh",
      sm: "1.4vh",
      md: "1.5vh",
      lg: "2vh",
    },
  },
  totalReviewText: {
    color: "white",

    fontSize: {
      xs: "1.5vh",
      sm: "1.5vh",
      md: "1.7vh",
      lg: "2.5vh",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "1.4vh",
      sm: "1.4vh",
      md: "1.7vh",
      lg: "2vh",
    },
    width: {
      xs: "4.5vh",
      sm: "4.7vh",
      md: "4.7vh",
      lg: "9vh",
    },
    height: {
      xs: "4.5vh",
      sm: "5.2vh",
      md: "5.2vh",
      lg: "5.5vh",
    },
    backgroundColor: "rgba(56, 182, 255, 1)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: { xs: "5px", sm: "7.5px", md: "10px", lg: "15px" },
    marginRight: "0.2vw",
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
      xs: 15,
      sm: 15,
      md: 15,
      lg: 0,
    },
    position: "relative",
  },
  registerStudentBox: {
    boxShadow: "0px 0px 30px 0px rgba(56, 182, 255, 0.2)",
    padding: { xs: "1.2vh", sm: "2.5vh", md: "2.9vh", lg: "3.3vh" },
    width: {
      xs: "150px",
      sm: "170px",
      md: "190px",
      lg: "280px",
    },
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: "white",
    position: "relative",
    animation: "bounce 5s ease-in-out infinite",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(7.5px)",
    WebkitBackdropFilter: "blur(7.5px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    marginTop: "-100px",
  },
  liveSessions: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    gap: "2vh",
    marginTop: "-100px",
    animation: "bounce 6s ease-in-out infinite",
  },

  usersBox: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(7.5px)",
    WebkitBackdropFilter: "blur(7.5px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    padding: "2vh",
    position: "relative",
    boxShadow: "0px 0px 30px 0px #38B6FF33",
    display: "flex",
    flexDirection: "column",
  },
  totalReview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: "10px",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(7.5px)",
    WebkitBackdropFilter: "blur(7.5px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    marginTop: "-100px",
    width: {
      xs: "163px",
      sm: "210px",
      md: "220px",
      lg: "235px",
    },
    height: { xs: "49px", sm: "55px", md: "62px", lg: "73px" },
    animation: "bounce 6s ease-in-out infinite",
  },
  clientText: {
    color: "black",

    fontSize: {
      xs: "1.3vh",
      sm: "1.6vh",
      md: "1.6vh",
      lg: "1.6vh",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "1.3vh",
      sm: "1.6vh",
      md: "1.6vh",
      lg: "1.6vh",
    },
  },
};
