"use client";
import React, { useEffect, useState } from "react";
import styles from "./GridView.module.css";
import { East, West } from "@mui/icons-material";
import ImageCard from "@/components/image-card/ImageCard";
import { CardProps } from "../TutorSection";

interface props {
  // cardsData: CardProps[];
  cardsData: any[];
  locale?: string;
}

const getVisibleCards = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

function GridView({ cardsData, locale = "en" }: props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const update = () => setVisibleCards(getVisibleCards());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(cardsData.length - visibleCards, 0);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) return 0;
      return Math.min(prevIndex + visibleCards, maxIndex);
    });
  }, [setCurrentIndex, visibleCards, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) return maxIndex;
      return Math.max(prevIndex - visibleCards, 0);
    });
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered, handleNext]);

  return (
    <div className={styles.carouselContainer}>
      <button onClick={handlePrev} className={styles.leftButton}>
        <West color="info" />
      </button>

      <div className={styles.cardContainer}>
        <div
          className={styles.cardWrapper}
          style={{
            // transform: `translateX(-${
            //   currentIndex *
            //   (100 / (cardsData?.length > 4 ? cardsData?.length + 3 : 8))
            // }%)`,
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {cardsData?.map((card, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ flex: `0 0 calc(${100 / visibleCards}% - 16px)` }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ImageCard data={card} locale={locale} />
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
