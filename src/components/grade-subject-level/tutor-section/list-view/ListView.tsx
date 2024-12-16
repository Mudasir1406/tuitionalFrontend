import React from "react";
import styles from "./ListView.module.css";
import TeacherCard from "@/components/teacher-card/TeacherCard";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Typography } from "@mui/material";
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
  data: {
    name: string;
    hoursProvided: number;
    description: string;
    title: string;
    imageSrc: string;
  }[];
}

function ListView({ data }: props) {
  return (
    <div className={styles.main}>
      <div className={styles.mainList}>
        {data?.slice(0, 4).map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
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
            Vetted Tutor
          </Typography>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"p"}
            variant="body2"
          >
            Our tutors go through a rigorous selection process, having been
            interviewed to assess their teaching skills & subject knowledge.
            They have extensive tutoring experience with a track record of
            success, helping students achieve their academic goals.{" "}
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
              Pool of 100s of Tutors to choose from{" "}
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
              Recorded classes for review{" "}
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
              Progress Tracking{" "}
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
              Flexible Scheduling{" "}
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
              Post-Test Analysis{" "}
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
              Parental Updates{" "}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListView;
