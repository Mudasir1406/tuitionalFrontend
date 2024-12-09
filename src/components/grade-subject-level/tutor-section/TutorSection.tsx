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
      name: "Muhammad",
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

      <div className={styles.cardContainer}>
        {cardsData?.map((card, i) => (
          <ImageCard key={i} data={card} />
        ))}
      </div>
    </div>
  );
};

export default Form;
