import React, { useState } from "react";
import styles from "./TeacherCard.module.css";
import { Button, CircularProgress, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

type Teacher = {
  name: string;
  hoursProvided: number;
  description: string;
  title: string;
  imageSrc: string;
};

type TeacherCardProps = {
  teacher: Teacher;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageSection}>
          <img
            src={teacher.imageSrc}
            alt={teacher.name}
            className={styles.teacherImage}
          />
        </div>
        <div className={styles.infoSection}>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"h5"}
            variant="subtitle1"
          >
            {teacher.name}
          </Typography>

          <Typography
            className={`${leagueSpartan.className} ${styles.bold}`}
            component={"span"}
            variant="caption"
          >
            +{teacher.hoursProvided} Hours Provided •
          </Typography>
          <Typography
            className={`${leagueSpartan.className} ${styles.bold}`}
            component={"span"}
            variant="caption"
          >
            {teacher.title}
          </Typography>
          <Typography
            className={`${leagueSpartan.className}  ${styles.mt1}`}
            component={"p"}
            variant="caption"
          >
            {teacher.description}
          </Typography>
        </div>
        <div className={styles.actionSection}>
          <Button
            variant="contained"
            className={`${leagueSpartan.className} ${styles.containedButton}`}
            type="submit"
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "12px", height: "12px", color: "white" }}
                size={20}
              />
            ) : (
              "Book A Demo"
            )}
          </Button>
          <Button
            variant="outlined"
            className={`${leagueSpartan.className} ${styles.outlinedButton}`}
            type="submit"
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "12px", height: "12px", color: "white" }}
                size={20}
              />
            ) : (
              "View Profile"
            )}
          </Button>
          {/* <button className={styles.demoButton}></button>
          <button className={styles.profileButton}></button> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
