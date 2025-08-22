// "use client";
import React from "react";
import { Typography } from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import styles from "./style.module.css";



import GridView from "./grid-view/GridView";
import ListView from "./list-view/ListView";
import HorizontalTutorCarousel from "./horizontal-carousel/HorizontalTutorCarousel";
import { tutor_section } from "@/types/grade-subject-level.types";

type IProps = {
  data: tutor_section;
};

export type CardProps = {
  "First Name": string;
  "Last Name"?: string;
  university: string;
  Subjects: string[];
  Curiculum: string[];
  Description: string;
  "Success rate": number;
  profileImageUrl: string;
};

// Hardcoded tutor data for IGCSE page
const hardcodedTutors: CardProps[] = [
  {
    "First Name": "Ms",
    "Last Name": "Sara",
    university: "University of Cambridge",
    Subjects: ["Mathematics", "Physics", "Chemistry"],
    Curiculum: ["IGCSE", "A-Level"],
    Description:
      "Experienced IGCSE tutor with 8+ years of teaching experience. Specializes in helping students achieve top grades in Mathematics and Sciences.",
    "Success rate": 95,
    profileImageUrl: "/assets/images/tutors/tutor1.png",
  },
  {
    "First Name": "Ms",
    "Last Name": "Mehar",
    university: "Oxford University",
    Subjects: ["English Literature", "History", "Geography"],
    Curiculum: ["IGCSE", "A-Level"],
    Description:
      "Passionate educator with expertise in humanities subjects. Known for making complex topics accessible and engaging for students.",
    "Success rate": 92,
    profileImageUrl: "/assets/images/tutors/tutor2.png",
  },
  {
    "First Name": "Mr",
    "Last Name": "Essam",
    university: "Imperial College London",
    Subjects: ["Biology", "Chemistry", "Environmental Science"],
    Curiculum: ["IGCSE"],
    Description:
      "Science specialist with a focus on practical learning. Helps students understand complex scientific concepts through real-world applications.",
    "Success rate": 98,
    profileImageUrl: "/assets/images/tutors/tutor3.png",
  },
  {
    "First Name": "Mr",
    "Last Name": "Muhammad",
    university: "London School of Economics",
    Subjects: ["Economics", "Business Studies", "Mathematics"],
    Curiculum: ["IGCSE", "A-Level"],
    Description:
      "Former industry professional turned educator. Brings real-world business experience to IGCSE Economics and Business Studies.",
    "Success rate": 94,
    profileImageUrl: "/assets/images/tutors/9.png",
  },
  {
    "First Name": "Mrs",
    "Last Name": "Nasser",
    university: "Oxford University",
    Subjects: ["English Literature", "History", "Geography"],
    Curiculum: ["IGCSE", "A-Level"],
    Description:
      "Passionate educator with expertise in humanities subjects. Known for making complex topics accessible and engaging for students.",
    "Success rate": 92,
    profileImageUrl: "/assets/images/tutors/8.png",
  },
  {
    "First Name": "Mr",
    "Last Name": "Omar",
    university: "Imperial College London",
    Subjects: ["Biology", "Chemistry", "Environmental Science"],
    Curiculum: ["IGCSE"],
    Description:
      "Science specialist with a focus on practical learning. Helps students understand complex scientific concepts through real-world applications.",
    "Success rate": 98,
    profileImageUrl: "/assets/images/tutors/7.png",
  },
  {
    "First Name": "Mr",
    "Last Name": "Amir",
    university: "London School of Economics",
    Subjects: ["Economics", "Business Studies", "Mathematics"],
    Curiculum: ["IGCSE", "A-Level"],
    Description:
      "Former industry professional turned educator. Brings real-world business experience to IGCSE Economics and Business Studies.",
    "Success rate": 94,
    profileImageUrl: "/assets/images/tutors/5.png",
  },
  {
    "First Name": "Mr",
    "Last Name": "Abdul",
    university: "Imperial College London",
    Subjects: ["Biology", "Chemistry", "Environmental Science"],
    Curiculum: ["IGCSE"],
    Description:
      "Science specialist with a focus on practical learning. Helps students understand complex scientific concepts through real-world applications.",
    "Success rate": 98,
    profileImageUrl: "/assets/images/tutors/4.png",
  },
  {
    "First Name": "Mr",
    "Last Name": "Suban",
    university: "London School of Economics",
    Subjects: ["Economics", "Business Studies", "Mathematics"],
    Curiculum: ["IGCSE", "A-Level"],
    Description:
      "Former industry professional turned educator. Brings real-world business experience to IGCSE Economics and Business Studies.",
    "Success rate": 94,
    profileImageUrl: "/assets/images/tutors/2.png",
  },
];

const TutorSectionV2: React.FunctionComponent<IProps> = ({ data }) => {
  // Use hardcoded data instead of fetching from database
  const val = hardcodedTutors;

  return (
    <div className={styles.main}>
      {data?.view === "Horizontal Carousel" ? (
        <HorizontalTutorCarousel
          tutors={val}
          title={data?.header || "Meet Some Of Our Expert IGCSE Tutors"}
        />
      ) : (
        <>
          <Typography
            className={`${leagueSpartan.className} ${styles.title}`}
            variant={data?.headerTag ? data.headerTag : ("h3" as any)}
            component={data?.headerTag ? data.headerTag : ("h3" as any)}
            dangerouslySetInnerHTML={{
              __html: data?.header,
            }}
          ></Typography>

          <div className={styles.mt1}>
            {data?.view === "Row View" ? (
              <ListView data={val} />
            ) : (
              <GridView cardsData={val} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TutorSectionV2;
