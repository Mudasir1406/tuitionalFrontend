"use client";
import React, { useEffect, useState } from "react";
import styles from "./GridView.module.css";
import { East, West } from "@mui/icons-material";
import ImageCard from "@/components/image-card/ImageCard";
import { CardProps } from "../TutorSection";
import { useMediaQuery, useTheme } from "@mui/material";

interface props {
  // cardsData: CardProps[];
  cardsData: any[];
}
function GridView({ cardsData }: props) {
  const theme = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const isLargeOrAbove = useMediaQuery(theme.breakpoints.up("lg"));

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <button onClick={handlePrev} className={styles.leftButton}>
        <West color="info" />
      </button>

      <div className={styles.cardContainer}>
        <div
          className={styles.cardWrapper}
          style={{
            transform: `translateX(-${
              currentIndex *
              (100 / (cardsData?.length > 4 ? cardsData?.length + 3 : 8))
            }%)`,
          }}
        >
          {cardsData?.map((card, i) => (
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
  );
}

export default GridView;
