"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import styles from "./BenifitsSection.module.css";

import Image from "next/image";
import TutorIcon from "../../../../public/assets/icons/11036302 1.svg";
import {
  AccountCircle,
  BarChart,
  Book,
  BookSharp,
  CalendarMonth,
  Insights,
  Mic,
  ScheduleOutlined,
  SupervisorAccount,
} from "@mui/icons-material";

type IProps = {
  background?: any;
};

const BenifitsSection: React.FunctionComponent<IProps> = ({ background }) => {
  return (
    <div className={styles.main}>
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        component={"h3"}
        variant="h3"
      >
        Benefits of Our Dubai IGCSE Tutoring Program{" "}
      </Typography>

      <div className={styles.cards}>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <Image
              src={TutorIcon}
              alt="Tutor Icon"
              width={35} // Set width
              height={30}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Pool of 100s of Tutors to choose from{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <Mic sx={{ color: "#009BF5", width: "35px", height: "30px" }} />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Recorded classes for review{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <CalendarMonth
              sx={{ color: "#009BF5", width: "35px", height: "30px" }}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Access to resources & practice material{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <BookSharp
              sx={{ color: "#009BF5", width: "35px", height: "30px" }}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Customized Study Plans{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <BarChart
              sx={{ color: "#009BF5", width: "35px", height: "30px" }}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Progress Tracking{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <ScheduleOutlined
              sx={{ color: "#009BF5", width: "35px", height: "30px" }}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Flexible Scheduling{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <Insights
              sx={{ color: "#009BF5", width: "35px", height: "30px" }}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Post-Test Analysis{" "}
          </Typography>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <SupervisorAccount
              sx={{ color: "#009BF5", width: "35px", height: "30px" }}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
          >
            Parental Updates{" "}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default BenifitsSection;
