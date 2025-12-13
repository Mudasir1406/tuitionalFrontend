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
import { PageData } from "@/types/grade-subject-level.types";

type IProps = {
  data: PageData["igcse_tutoring_program"];
};

const ArBenifitsSection: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <div className={styles.main} style={{ direction: "rtl" }}>
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.sectionTag ? data.sectionTag : ("h3" as any)}
        component={data?.sectionTag ? data.sectionTag : ("h3" as any)}
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{
          __html: data?.section,
        }}
      ></Typography>

      <div className={styles.cards}>
        <div className={styles.smallCard}>
          <div className={styles.iconDiv}>
            <Image
              src={TutorIcon}
              alt="Tutor Icon"
              width={35}
              height={30}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="caption"
            style={{ textAlign: "right" }}
          >
            مجموعة من مئات المعلمين للاختيار من بينهم
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
            style={{ textAlign: "right" }}
          >
            حصص مسجلة للمراجعة
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
            style={{ textAlign: "right" }}
          >
            الوصول إلى الموارد والمواد التدريبية
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
            style={{ textAlign: "right" }}
          >
            خطط دراسية مخصصة
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
            style={{ textAlign: "right" }}
          >
            تتبع التقدم
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
            style={{ textAlign: "right" }}
          >
            جدولة مرنة
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
            style={{ textAlign: "right" }}
          >
            تحليل ما بعد الاختبار
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
            style={{ textAlign: "right" }}
          >
            تحديثات الوالدين
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ArBenifitsSection;