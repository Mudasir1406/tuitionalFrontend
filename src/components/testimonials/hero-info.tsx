import { Box, Typography, colors } from "@mui/material";
import tutors from "../../../public/assets/images/static/tutors.png";
import React from "react";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const HeroInfo: React.FC = () => {
  return (
    <>
      <Box sx={styles.contanier}>
        <Box sx={styles.registerStudentBox}>
          <Typography sx={styles.text} className={leagueSpartan.className}>
            Tuitional is a great place for classes. I see my grades are
            improving.
          </Typography>
          <Box
            sx={{ marginY: { xs: "2px", sm: "5px", md: "5px", lg: "10px" } }}
          >
            {[0, 0, 0, 0, 0].map((item, index) => (
              <StarPurple500OutlinedIcon
                key={index}
                sx={{ height: 25, width: 25, color: "rgba(255, 205, 108, 1)" }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={styles.liveSessions}>
          <Box sx={styles.totalReview}>
            <Typography
              sx={styles.totalReviewText}
              className={leagueSpartan.className}
            >
              15k
            </Typography>
            <Typography
              sx={styles.clientText}
              className={leagueSpartan.className}
            >
              Clients Reviews
            </Typography>
          </Box>
          <Box sx={styles.usersBox}>
            <Image
              src={tutors.src}
              style={{ width: "150px" }}
              alt="teacher"
              width={tutors.width}
              height={tutors.height}
            ></Image>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroInfo;

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
    fontWeight: 400,
    lineHeight: {
      xs: "20px",
      sm: "20px",
      md: "23px",
      lg: "25px",
    },
  },
  totalReviewText: {
    color: "white",
    fontFamily: "League Spartan",
    fontSize: {
      xs: "14px",
      sm: "14px",
      md: "16px",
      lg: "28px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "20px",
      sm: "20px",
      md: "23px",
      lg: "25px",
    },
    width: {
      xs: "54px",
      sm: "64px",
      md: "64px",
      lg: "74px",
    },
    height: {
      xs: "40px",
      sm: "50px",
      md: "50px",
      lg: "59px",
    },
    backgroundColor: "rgba(56, 182, 255, 1)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: { xs: "5px", sm: "7.5px", md: "10px", lg: "15px" },
    marginRight: "10px",
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
    padding: { xs: "10px", sm: "15px", md: "20px", lg: "30px" },
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
    gap: "10px",
    marginTop: "-100px",

    animation: "bounce 6s ease-in-out infinite",
  },
  singleBox: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(7.5px)",
    WebkitBackdropFilter: "blur(7.5px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    padding: "30px",
    position: "relative",
    boxShadow: "0px 0px 30px 0px #38B6FF33",
    display: "flex",
    marginTop: "-100px",
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
  usersBox: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(7.5px)",
    WebkitBackdropFilter: "blur(7.5px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    padding: "10px",
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
    fontFamily: "League Spartan",
    fontSize: {
      xs: "12px",
      sm: "18px",
      md: "18px",
      lg: "18px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "25px",
      sm: "25px",
      md: "25px",
      lg: "25px",
    },
  },
};
