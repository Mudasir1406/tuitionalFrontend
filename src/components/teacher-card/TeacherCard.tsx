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
  locale?: string;
};

const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  locale = "en",
}) => {
  const [tutorModal, setTutorModal] = useState<boolean>(false);

  const handleCloseTutorModal = () => {
    setTutorModal(false);
  };
  const handleOpenTutorModal = () => {
    setTutorModal(true);
  };

  const [showMore, setShowMore] = useState(false);
  const maxLength = 120;

  // Translation objects
  const translations = {
    en: {
      bookADemo: "Book A Demo",
      viewProfile: "View Profile",
      tutorHoursProvided: "Tutor Hours Provided",
      showMore: "Show more",
      showLess: "Show less",
    },
    ar: {
      bookADemo: "احجز حصة تجريبية",
      viewProfile: "عرض الملف الشخصي",
      tutorHoursProvided: "ساعات التدريس المقدمة",
      showMore: "عرض المزيد",
      showLess: "عرض أقل",
    },
  };

  const t = translations[locale as keyof typeof translations];

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
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
            +{teacher?.["Hours Taught"]} {t.tutorHoursProvided}
          </Typography>
          <div className={styles.descriptionContainer}>
            <Typography
              variant={"body2"}
              className={`${leagueSpartan.className} ${styles.mt1}`}
              component={"div"}
              dangerouslySetInnerHTML={{
                __html: showMore
                  ? teacher?.Description
                  : teacher?.Description?.length > maxLength
                  ? `${teacher?.Description?.substring(0, maxLength)}...`
                  : teacher?.Description,
              }}
            ></Typography>
            {teacher?.Description?.length > maxLength && (
              <span
                className={`${leagueSpartan.className} ${styles.showMore}`}
                onClick={toggleShowMore}
              >
                {showMore ? t.showLess : t.showMore}
              </span>
            )}
          </div>
        </div>
        <div className={styles.actionSection}>
          <PopUpButton
            text={t.bookADemo}
            href="popup"
            className={`${styles.baseButton} ${styles.primaryButton}`}
          />
          <Button
            variant="contained"
            className={`${leagueSpartan.className} ${styles.baseButton} ${styles.outlinedButton}`}
            type="button"
            onClick={handleOpenTutorModal}
          >
            {t.viewProfile}
          </Button>
        </div>
      </div>

      {tutorModal && (
        <TutorModal
          handleClose={handleCloseTutorModal}
          open={tutorModal}
          data={teacher as any}
          locale={locale}
        />
      )}
    </div>
  );
};

export default TeacherCard;

