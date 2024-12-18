"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import styles from "./style.module.css";

import ImageCard from "@/components/image-card/ImageCard";
import img1 from "../../../../public/assets/images/static/blogimg1.png";
import img2 from "../../../../public/assets/images/static/blogimg2.png";
import img3 from "../../../../public/assets/images/static/blogimg3.png";
import img4 from "../../../../public/assets/images/static/blogimg4.png";
import { ChevronLeftSharp, East, JoinLeft, West } from "@mui/icons-material";
import GridView from "./grid-view/GridView";
import ListView from "./list-view/ListView";
import { tutor_section } from "@/types/grade-subject-level.types";
import { getTutorsByFilter } from "@/services/grade-subject-level/grade-subject-level";
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

const Form: React.FunctionComponent<IProps> = async ({ data }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  // const cardsData: CardProps[] = [
  //   {
  //     "First Name": "Muhammad",
  //     university: "University Of Waterloo",
  //     Subjects: ["IGCSE", "Physics"],
  //     Description:
  //       "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
  //     rating: 4.8,
  //     profileImageUrl: img1.src,
  //   },
  //   {
  //     "First Name": "Sheikh",
  //     university: "University Of Waterloo",
  //     Subjects: ["IGCSE", "Physics"],
  //     Description:
  //       "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
  //     rating: 4.8,
  //     profileImageUrl: img2.src,
  //   },
  //   {
  //     "First Name": "Siddiqi",
  //     university: "University Of Waterloo",
  //     Subjects: ["IGCSE", "Physics"],
  //     Description:
  //       "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
  //     rating: 4.8,
  //     profileImageUrl: img1.src,
  //   },
  //   {
  //     "First Name": "Khan",
  //     university: "University Of Waterloo",
  //     Subjects: ["IGCSE", "Physics"],
  //     Description:
  //       "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
  //     rating: 4.8,
  //     profileImageUrl: img2.src,
  //   },
  //   {
  //     "First Name": "Joseph",
  //     university: "University Of Waterloo",
  //     Subjects: ["IGCSE", "Physics"],
  //     Description:
  //       "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
  //     rating: 4.8,
  //     profileImageUrl: img1.src,
  //   },
  //   {
  //     "First Name": "Abraham",
  //     university: "University Of Waterloo",
  //     Subjects: ["IGCSE", "Physics"],
  //     Description:
  //       "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
  //     rating: 4.8,
  //     profileImageUrl: img2.src,
  //   },
  // ];

  const teachers = [
    {
      name: "Edward Norton",
      hoursProvided: 450,
      description:
        "Accusamus et justo odio dignissimos corrupti quas dolores etolestias excep officiate deserunt mollitia animi.",
      title: "Experienced English Teacher",
      imageSrc: img1.src,
    },
    {
      name: "Jane Doe",
      hoursProvided: 500,
      description:
        "Passionate about teaching and making a difference in students' lives through education.",
      title: "Professional Mathematics Teacher",
      imageSrc: img3.src,
    },
    {
      name: "John Smith",
      hoursProvided: 300,
      description:
        "Helping students achieve their academic goals with personalized guidance.",
      title: "Dedicated Physics Tutor",
      imageSrc: img2.src,
    },
    {
      name: "Edward Norton",
      hoursProvided: 450,
      description:
        "Accusamus et justo odio dignissimos corrupti quas dolores etolestias excep officiate deserunt mollitia animi.",
      title: "Experienced English Teacher",
      imageSrc: img1.src,
    },
    {
      name: "Jane Doe",
      hoursProvided: 500,
      description:
        "Passionate about teaching and making a difference in students' lives through education.",
      title: "Professional Mathematics Teacher",
      imageSrc: img3.src,
    },
    {
      name: "John Smith",
      hoursProvided: 300,
      description:
        "Helping students achieve their academic goals with personalized guidance.",
      title: "Dedicated Physics Tutor",
      imageSrc: img2.src,
    },
  ];

  const val = await getTutorsByFilter(data.curriculum, data.subject);

  console.log("Tutor val is here..", val);
  console.log("Tutor Section is here..", data);
  return (
    <div className={styles.main}>
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        component={"h5"}
        variant="subtitle1"
      >
        {data?.header}
      </Typography>

      {data?.view === "Row View" ? (
        <ListView data={val} />
      ) : (
        <GridView cardsData={val} />
      )}
    </div>
  );
};

export default Form;
