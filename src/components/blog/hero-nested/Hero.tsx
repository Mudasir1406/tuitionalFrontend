"use client";

import React, { useState } from "react";
import styles from "./Hero.module.css";
import { leagueSpartan } from "@/app/fonts";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";

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
          Unlocking the Secrets to Effective Online Learning
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
      </div>
    </div>
  );
};

export default Hero;

const style = {};
