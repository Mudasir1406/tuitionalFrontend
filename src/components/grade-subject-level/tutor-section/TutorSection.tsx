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
type IProps = {
  background?: any;
};

export type CardProps = {
  name: string;
  university: string;
  subjects: string[];
  description: string;
  rating: number;
  imageSrc: string;
};

const Form: React.FunctionComponent<IProps> = ({ background }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= cardsData.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? cardsData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const cardsData: CardProps[] = [
    {
      name: "Muhammad",
      university: "University Of Waterloo",
      subjects: ["IGCSE", "Physics"],
      description:
        "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
      rating: 4.8,
      imageSrc: img1.src,
    },
    {
      name: "Sheikh",
      university: "University Of Waterloo",
      subjects: ["IGCSE", "Physics"],
      description:
        "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
      rating: 4.8,
      imageSrc: img2.src,
    },
    {
      name: "Siddiqi",
      university: "University Of Waterloo",
      subjects: ["IGCSE", "Physics"],
      description:
        "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
      rating: 4.8,
      imageSrc: img1.src,
    },
    {
      name: "Khan",
      university: "University Of Waterloo",
      subjects: ["IGCSE", "Physics"],
      description:
        "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
      rating: 4.8,
      imageSrc: img2.src,
    },
    {
      name: "Joseph",
      university: "University Of Waterloo",
      subjects: ["IGCSE", "Physics"],
      description:
        "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
      rating: 4.8,
      imageSrc: img1.src,
    },
    {
      name: "Abraham",
      university: "University Of Waterloo",
      subjects: ["IGCSE", "Physics"],
      description:
        "My love for mathematics and teaching has ever been growing and this is the reason I felt the need to not only teach high-level mathematics but also get proper degree in education.",
      rating: 4.8,
      imageSrc: img2.src,
    },
  ];

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

  return (
    <div className={styles.main}>
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        component={"h5"}
        variant="subtitle1"
      >
        Featured IGCSE Tutors In Dubai{" "}
      </Typography>
      <div className={styles.carouselContainer}>
        <button onClick={handlePrev} className={styles.leftButton}>
          <West color="info" />
        </button>

        {/* <GridView cardsData={cardsData} /> */}

        <ListView data={teachers} />
      </div>
    </div>
  );
};

export default Form;
