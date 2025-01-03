import React from "react";
import styles from "./hero.module.css";
import { leagueSpartan } from "@/app/fonts";
import { Typography } from "@mui/material";

const Hero: React.FC = () => {
  return (
    <div className={styles.heroContainer}>
      <Typography
        className={`${styles.heading} ${leagueSpartan.className}`}
        variant="h1"
        component={"h1"}
      >
        Elevating{" "}
        <Typography
          className={`${styles.expertText} ${leagueSpartan.className}`}
          variant="h1"
          component={"span"}
        >
          Personalized Online Tutoring
        </Typography>{" "}
        Across the Gulf
      </Typography>

      <Typography
        className={`${styles.desc} ${leagueSpartan.className}`}
        variant="h5"
      >
        Providing high-quality innovative and improved teaching solutions to
        help students attain academic growth and excellence through individual
        online tutoring.
      </Typography>
    </div>
  );
};

export default Hero;
