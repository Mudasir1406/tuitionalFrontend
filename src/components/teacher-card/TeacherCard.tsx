import React, { useState } from "react";
import styles from "./TeacherCard.module.css";
import { Button, CircularProgress, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import Image from "next/image";

type Teacher = {
  "First Name": string;
  "Last Name": string;
  "Hours Taught": number;
  Description: string;
  Subjects: string[];
  profileImageUrl: string;
};

type TeacherCardProps = {
  teacher: Teacher;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showFull, setShowFull] = useState(false);

  const toggleShowMore = () => {
    setShowFull((prev) => !prev);
  };

  const maxLength = 120;
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageSection}>
          {/* <img
            src={teacher.profileImageUrl ? teacher.profileImageUrl : dummyImg}
            alt={teacher?.["First Name"]}
            className={styles.teacherImage}
          /> */}
          {/* <Image
            src={teacher?.profileImageUrl ? teacher?.profileImageUrl : dummyImg}
            alt={`${teacher?.["First Name"]}'s profile`}
            layout="fill"
            objectFit="contain"
            className={styles.teacherImage}
          /> */}
          <Image
            src={teacher?.profileImageUrl ? teacher?.profileImageUrl : dummyImg}
            alt="Tutor Icon"
            width={50} // Set width
            height={50}
            className={styles.teacherImage}
          />
        </div>
        <div className={styles.infoSection}>
          <Typography
            className={`${leagueSpartan.className}`}
            component={"h5"}
            variant="subtitle1"
          >
            {/* {teacher.name} */}
            {`${teacher?.["First Name"]} ${teacher?.["Last Name"]}`}
          </Typography>

          <Typography
            className={`${leagueSpartan.className} ${styles.bold}`}
            component={"span"}
            variant="caption"
          >
            +{teacher?.["Hours Taught"]} Hours Provided •
          </Typography>

          {teacher?.Subjects?.map((sub, i) => (
            <Typography
              key={i}
              className={`${leagueSpartan.className} ${styles.bold}`}
              component={"span"}
              variant="caption"
            >
              {sub}
            </Typography>
          ))}
          {/* <Typography
            className={`${leagueSpartan.className}  ${styles.mt1}`}
            component={"p"}
            variant="caption"
          >
            {teacher.Description}
          </Typography> */}
          <Typography
            className={`${leagueSpartan.className} ${styles.mt1}`}
            component={"p"}
            variant="caption"
          >
            {showFull || teacher?.Description.length <= maxLength
              ? teacher?.Description
              : `${teacher?.Description.substring(0, maxLength)}...`}
            {teacher?.Description.length > maxLength && (
              <span
                className={styles.showMore}
                onClick={toggleShowMore}
                style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
              >
                {showFull ? "Show Less" : "Show More"}
              </span>
            )}
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
