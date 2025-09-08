"use client";
import React, { useEffect, useState } from "react";
import styles from "./GridView.module.css";
import { East, West } from "@mui/icons-material";
import ImageCard from "@/components/image-card/ImageCard";
import { CardProps } from "../TutorSection";
import { useMediaQuery, useTheme } from "@mui/material";

interface props {
  cardsData: any[];
  locale?: string;
}

function ArGridView({ cardsData, locale = "ar" }: props) {
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

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className={styles.carouselContainer} style={{ direction: "rtl" }}>
      {/* In RTL, left button should navigate right (next) */}
      <button onClick={handleNext} className={styles.leftButton}>
        <East color="info" />
      </button>

      <div className={styles.cardContainer}>
        <div
          className={styles.cardWrapper}
          style={{
            // In RTL, we need to reverse the transform direction
            transform: `translateX(${currentIndex * (100 / visibleCards)}%)`,
            direction: "rtl",
          }}
        >
          {cardsData?.map((card, i) => (
            <div
              key={i}
              className={styles.card}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ direction: "ltr" }} // Keep card content in LTR for proper display
            >
              <ImageCard data={card} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {/* In RTL, right button should navigate left (prev) */}
      <button onClick={handlePrev} className={styles.rightButton}>
        <West color="info" />
      </button>
    </div>
  );
}

export default ArGridView;