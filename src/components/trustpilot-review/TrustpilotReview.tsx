"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { leagueSpartan } from "@/app/fonts";
import styles from "./TrustpilotReview.module.css";

interface Review {
  id: number;
  text: string;
  reviewer: string;
  timePosted: string;
}

const TrustpilotReview: React.FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: 1,
      text: "I highly recommend the Profs. I was tutored by Dr Warwick Palmer; he provided me with exceptional support.",
      reviewer: "customer",
      timePosted: "2 days ago"
    },
    {
      id: 2,
      text: "Outstanding tutoring service! The tutors are highly qualified and really helped improve my grades significantly.",
      reviewer: "student",
      timePosted: "1 week ago"
    },
    {
      id: 3,
      text: "Excellent platform with amazing tutors. My daughter's confidence and performance improved dramatically.",
      reviewer: "parent",
      timePosted: "3 days ago"
    }
  ];

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => 
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => 
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < count ? styles.starFilled : styles.starEmpty}`}
      >
        ★
      </span>
    ));
  };

  const currentReview = reviews[currentReviewIndex];

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        {/* Left Section */}
        <Box className={styles.leftSection}>
          <Box className={styles.logoSection}>
            <Box className={styles.trustpilotLogo}>
              {renderStars(5)}
              <Typography 
                className={`${leagueSpartan.className} ${styles.trustpilotText}`}
              >
                Trustpilot
              </Typography>
            </Box>
          </Box>
          
          <Typography 
            variant="h4" 
            className={`${leagueSpartan.className} ${styles.headline}`}
          >
            We&apos;re the{" "}
            <span className={styles.highlighted}>highest-rated</span>{" "}
            tutoring service
          </Typography>
          
          <Typography 
            variant="body1" 
            className={`${leagueSpartan.className} ${styles.description}`}
          >
            Trusted by thousands of students and parents worldwide for exceptional tutoring results.
          </Typography>
        </Box>

        {/* Right Section - Review Card */}
        <Box className={styles.rightSection}>
          <Box className={styles.reviewCard}>
            {/* Review Header */}
            <Box className={styles.reviewHeader}>
              <Box className={styles.reviewRating}>
                <Typography 
                  variant="h5" 
                  className={`${leagueSpartan.className} ${styles.excellentText}`}
                >
                  Excellent
                </Typography>
                <Box className={styles.reviewStars}>
                  {renderStars(5)}
                </Box>
              </Box>
              
              <Typography 
                variant="body2" 
                className={`${leagueSpartan.className} ${styles.reviewCount}`}
              >
                1,814 reviews
              </Typography>
              
              <Box className={styles.trustpilotSmallLogo}>
                <Typography 
                  className={`${leagueSpartan.className} ${styles.trustpilotSmallText}`}
                >
                  Trustpilot
                </Typography>
              </Box>
            </Box>

            {/* Review Content */}
            <Box className={styles.reviewContent}>
              <Box className={styles.reviewText}>
                <Typography 
                  variant="body2" 
                  className={`${leagueSpartan.className} ${styles.reviewTextContent}`}
                >
                  &ldquo;{currentReview.text}&rdquo;
                </Typography>
                
                <Typography 
                  variant="caption" 
                  className={`${leagueSpartan.className} ${styles.reviewerInfo}`}
                >
                  {currentReview.reviewer}, {currentReview.timePosted}
                </Typography>
              </Box>

              {/* Navigation Arrows */}
              <Box className={styles.navigationArrows}>
                <IconButton 
                  onClick={handlePrevReview}
                  className={styles.arrowButton}
                  size="small"
                >
                  <ArrowBackIos className={styles.arrowIcon} />
                </IconButton>
                
                <IconButton 
                  onClick={handleNextReview}
                  className={styles.arrowButton}
                  size="small"
                >
                  <ArrowForwardIos className={styles.arrowIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TrustpilotReview;