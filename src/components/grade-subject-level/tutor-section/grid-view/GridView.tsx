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
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Client-side media query setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lgQuery = window.matchMedia(theme.breakpoints.up("lg"));
      const mdQuery = window.matchMedia(theme.breakpoints.between("md", "lg"));
      const smQuery = window.matchMedia(theme.breakpoints.down("sm"));
      
      setIsLargeScreen(lgQuery.matches);
      setIsMediumScreen(mdQuery.matches);
      setIsSmallScreen(smQuery.matches);
      
      const handleLgChange = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
      const handleMdChange = (e: MediaQueryListEvent) => setIsMediumScreen(e.matches);
      const handleSmChange = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
      
      lgQuery.addEventListener('change', handleLgChange);
      mdQuery.addEventListener('change', handleMdChange);
      smQuery.addEventListener('change', handleSmChange);
      
      return () => {
        lgQuery.removeEventListener('change', handleLgChange);
        mdQuery.removeEventListener('change', handleMdChange);
        smQuery.removeEventListener('change', handleSmChange);
      };
    }
  }, [theme]);

  // Determine the number of visible cards based on the screen size
  const visibleCards = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCards >= cardsData.length
        ? 0
        : prevIndex + visibleCards
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleCards < 0
        ? Math.max(cardsData.length - visibleCards, 0)
        : prevIndex - visibleCards
    );
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
  }, [isHovered]);

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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
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
