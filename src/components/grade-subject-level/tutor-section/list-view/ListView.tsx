"use client";

import React, { useState } from "react";
import styles from "./ListView.module.css";
import TeacherCard from "@/components/teacher-card/TeacherCard";
import { Button, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import TutorIcon from "../../../../../public/assets/icons/11036302 1.svg";
import Image from "next/image";
import {
  AccountCircle,
  BarChart,
  Group,
  Insights,
  Mic,
  ScheduleOutlined,
  SupervisorAccount,
} from "@mui/icons-material";
// import TutorIcon from '../../../../../public/assets/icons/11036302 1.svg'
// import TutorIcon from '../../../../../public/assets/icons/11036302 1.svg'

interface props {
  data: any[];
  locale?: string;
}

function ListView({ data, locale = "en" }: props) {
  const [showFull, setShowFull] = useState(false);
  const toggleShowMore = () => {
    setShowFull((prev) => !prev);
  };

  // Translation objects
  const translations = {
    en: {
      showMore: "Show More",
      vettedTutor: "Vetted Tutor",
      vettedTutorDescription: "Our tutors go through a rigorous selection process, having been interviewed to assess their teaching skills & subject knowledge. They have extensive tutoring experience with a track record of success, helping students achieve their academic goals.",
      poolOfTutors: "Pool of 100s of Tutors to choose from",
      recordedClasses: "Recorded classes for review",
      progressTracking: "Progress Tracking",
      flexibleScheduling: "Flexible Scheduling",
      postTestAnalysis: "Post-Test Analysis",
      parentalUpdates: "Parental Updates"
    },
    ar: {
      showMore: "عرض المزيد",
      vettedTutor: "مدرس معتمد",
      vettedTutorDescription: "يخضع مدرسونا لعملية انتقاء صارمة، حيث تتم مقابلتهم لتقييم مهاراتهم التدريسية ومعرفتهم بالمادة. لديهم خبرة تدريس واسعة مع سجل حافل بالنجاح، مما يساعد الطلاب على تحقيق أهدافهم الأكاديمية.",
      poolOfTutors: "مجموعة من المئات من المدرسين للاختيار من بينهم",
      recordedClasses: "فصول مسجلة للمراجعة",
      progressTracking: "تتبع التقدم",
      flexibleScheduling: "جدولة مرنة",
      postTestAnalysis: "تحليل ما بعد الاختبار",
      parentalUpdates: "تحديثات أولياء الأمور"
    }
  };

  const t = translations[locale as keyof typeof translations];
  return (
    <div className={styles.main}>
      <div className={styles.mainList}>
        {data?.slice(0, showFull ? data?.length : 10).map((teacher, index) => (
          <TeacherCard key={teacher.id} teacher={teacher} locale={locale} />
        ))}
        {!showFull && data?.length > 10 && (
          <Button
            variant="contained"
            className={`${leagueSpartan.className} ${styles.containedButton}`}
            type="button"
            onClick={toggleShowMore}
          >
{t.showMore}
          </Button>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.largeCard}>
          <div className={styles.iconDiv}>
            <Image
              src={TutorIcon}
              alt="Tutor Icon"
              width={50} // Set width
              height={50}
            />
          </div>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="subtitle1"
          >
{t.vettedTutor}
          </Typography>
          <Typography
            className={`${leagueSpartan.className} ${styles.mt1}`}
            component={"p"}
            variant="body2"
          >
{t.vettedTutorDescription}
          </Typography>
        </div>

        <div className={styles.smallCards}>
          <div className={styles.smallCard}>
            <div className={styles.iconDivSmall}>
              <AccountCircle
                sx={{ color: "#009BF5", width: "35px", height: "30px" }}
              />
            </div>
            <Typography
              className={`${leagueSpartan.className}`}
              component={"p"}
              variant="caption"
            >
{t.poolOfTutors}
            </Typography>
          </div>
          <div className={styles.smallCard}>
            <div className={styles.iconDivSmall}>
              <Mic sx={{ color: "#009BF5", width: "35px", height: "30px" }} />
            </div>
            <Typography
              className={`${leagueSpartan.className}`}
              component={"p"}
              variant="caption"
            >
{t.recordedClasses}
            </Typography>
          </div>
          <div className={styles.smallCard}>
            <div className={styles.iconDivSmall}>
              <BarChart
                sx={{ color: "#009BF5", width: "35px", height: "30px" }}
              />
            </div>
            <Typography
              className={`${leagueSpartan.className}`}
              component={"p"}
              variant="caption"
            >
{t.progressTracking}
            </Typography>
          </div>
          <div className={styles.smallCard}>
            <div className={styles.iconDivSmall}>
              <ScheduleOutlined
                sx={{ color: "#009BF5", width: "35px", height: "30px" }}
              />
            </div>
            <Typography
              className={`${leagueSpartan.className}`}
              component={"p"}
              variant="caption"
            >
{t.flexibleScheduling}
            </Typography>
          </div>
          <div className={styles.smallCard}>
            <div className={styles.iconDivSmall}>
              <Insights
                sx={{ color: "#009BF5", width: "35px", height: "30px" }}
              />
            </div>
            <Typography
              className={`${leagueSpartan.className}`}
              component={"p"}
              variant="caption"
            >
{t.postTestAnalysis}
            </Typography>
          </div>
          <div className={styles.smallCard}>
            <div className={styles.iconDivSmall}>
              <SupervisorAccount
                sx={{ color: "#009BF5", width: "35px", height: "30px" }}
              />
            </div>
            <Typography
              className={`${leagueSpartan.className}`}
              component={"p"}
              variant="caption"
            >
{t.parentalUpdates}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListView;
