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
      imageSrc: img1.src, // Replace with your image path
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
      imageSrc: img1.src, // Replace with your image path
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
      imageSrc: img1.src, // Replace with your image path
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

        <div className={styles.cardContainer}>
          <div
            className={styles.cardWrapper}
            style={{
              transform: `translateX(-${currentIndex * (100 / 4)}%)`,
            }}
          >
            {cardsData.map((card, i) => (
              <div key={i} className={styles.card}>
                <ImageCard data={card} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleNext} className={styles.rightButton}>
          <East color="info" />
        </button>
      </div>
    </div>
  );
};

export default Form;
