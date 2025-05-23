import React, { useState } from "react";
import styles from "./TeacherCard.module.css";
import { Button, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import Image from "next/image";

import PopUpButton from "../pop-up-button";
import dynamic from "next/dynamic";
const TutorModal = dynamic(() => import("../home/tutor-modal"), { ssr: false });
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
  const [tutorModal, setTutorModal] = useState<boolean>(false);

  const handleCloseTutorModal = () => {
    setTutorModal(false);
  };
  const handleOpenTutorModal = () => {
    setTutorModal(true);
  };

  const maxLength = 120;
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageSection}>
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
            +{teacher?.["Hours Taught"]} Tutor Hours Provided
          </Typography>
          <Typography
            // sx={style.guidence}
            variant={"body2"}
            className={`${leagueSpartan.className} ${styles.mt1}`}
            component={"div"}
            dangerouslySetInnerHTML={{
              __html: teacher?.Description?.substring(0, maxLength),
            }}
          ></Typography>
        </div>
        <div className={styles.actionSection}>
          <PopUpButton
            text="Book A Demo"
            href="popup"
            sx={style.contactButton}
          />
          <Button
            variant="contained"
            className={`${leagueSpartan.className} ${styles.outlinedButton}`}
            type="button"
            onClick={handleOpenTutorModal}
          >
            View Profile
          </Button>
        </div>
      </div>

      {tutorModal && (
        <TutorModal
          handleClose={handleCloseTutorModal}
          open={tutorModal}
          data={teacher as any}
        />
      )}
    </div>
  );
};

export default TeacherCard;

const style = {
  contactButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38b6ff",
    textTransform: "none",
    lineHeight: "18.4px",
    textAlign: "center",
    borderRadius: "10px",
    width: "100%",
    padding: "18px",
    margin: "20px 0",
    transition: "all 0.5s ease-in-out",
    color: "white",
    ":hover": {
      backgroundColor: "#38b6ff",
      transform: "scale(1.02)",
      boxShadow: "1px 4px 24px 0px #38b6ffb2",
    },
  },
};
