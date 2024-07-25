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
            800+
          </Typography>
          <Typography sx={styles.text} className={leagueSpartan.className}>
            Vacancy Available
          </Typography>
          <Typography sx={styles.text} className={leagueSpartan.className}>
            Apply Now{" "}
          </Typography>
        </Box>
        <Box sx={styles.liveSessions}>
          <Box sx={styles.usersBox}>
            <Image
              src={tutors.src}
              style={{ width: "150px" }}
              width={tutors.width}
              height={tutors.height}
              alt="tutor"
            ></Image>
            <Typography sx={styles.text} className={leagueSpartan.className}>
              50k
            </Typography>
            <Typography sx={styles.text} className={leagueSpartan.className}>
              Active Employee
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroInfo;

const styles = {
  contanier: {
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    width: "100%",
    height: {
      xs: "150px",
      sm: "200px",
      md: "500px",
      lg: "100%",
    },
    marginTop: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
    },
    position: "relative",
  },
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

  registerStudentBox: {
    boxShadow: "0px 0px 30px 0px rgba(56, 182, 255, 0.2)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: "white",
    position: "relative",
    animation: "bounce 5s ease-in-out infinite",
    background: "rgba(255, 255, 255, 1)",

    border: "1px solid rgba(255, 255, 255, 0.18)",
    marginTop: "-100px",
  },
  liveSessions: {
    width: {
      xs: "150px",
      sm: "170px",
      md: "190px",
      lg: "235px",
    },
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    gap: "10px",
    marginTop: "-100px",
    animation: "bounce 6s ease-in-out infinite",
  },

  usersBox: {
    background: "rgba(255, 255, 255, 1)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
    boxShadow: "0px 0px 30px 0px #38B6FF33",
    display: "flex",
    flexDirection: "column",
  },
};
