import React from "react";
import styles from "./hero.module.css";
import { leagueSpartan } from "@/app/fonts";

const Hero: React.FC = () => {
  return (
    <div className={styles.heroContainer}>
      <h1 className={`${styles.heading} ${leagueSpartan.className}`}>
        Elevating{" "}
        <span className={`${styles.expertText} ${leagueSpartan.className}`}>
          Personalized Online Tutoring
        </span>{" "}
        Across the Gulf
      </h1>

      <p className={`${styles.desc} ${leagueSpartan.className}`}>
        Providing high-quality innovative and improved teaching solutions to
        help students attain academic growth and excellence through individual
        online tutoring.
      </p>
    </div>
  );
};

export default Hero;
