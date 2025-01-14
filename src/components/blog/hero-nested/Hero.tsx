"use client";

import React, { useState } from "react";
import styles from "./Hero.module.css";
import { leagueSpartan } from "@/app/fonts";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import arrow from "../../../../public/assets/images/static/Arrow 8.png";
import facebook from "../../../../public/assets/images/static/facebook 1.png";
import share from "../../../../public/assets/images/static/share 1.png";
import instagram from "../../../../public/assets/images/static/instagram 1.png";
import social from "../../../../public/assets/images/static/social 1.png";

interface Props {
  data?: {
    category: string;
    date: string;
  };
}

const Hero = ({ data }: Props) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftIcons} />
      <div className={styles.rightIcons} />
      <div className={styles.main}>
        <Typography
          className={`${styles.expertText} ${leagueSpartan.className}`}
          variant="h1"
          component={"h1"}
        >
          Unlocking the Secrets to Effective <br /> Online Learning
        </Typography>

        <div className={styles.categoryDiv}>
          <Typography
            className={`${styles.expertText} ${leagueSpartan.className}`}
            variant="body2"
            component={"p"}
          >
            {`${data?.category} | ${data?.date}`}
          </Typography>
        </div>
        <div className={styles.centerDiv}>
          <div className={styles.arrowDiv}>
            <Image src={arrow} alt="arrow" />
          </div>
          <div className={styles.socialDiv}>
            <Image
              className={styles.socialIcon}
              src={facebook}
              alt="facebook"
            />
            <Image
              className={styles.socialIcon}
              src={instagram}
              alt="instagram"
            />
            <Image className={styles.socialIcon} src={social} alt="social" />
            <Image className={styles.socialIcon} src={share} alt="share" />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Hero;

const style = {};
