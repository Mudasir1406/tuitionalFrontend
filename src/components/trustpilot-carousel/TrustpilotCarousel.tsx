"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import { leagueSpartan } from "@/app/fonts";
import styles from "./TrustpilotCarousel.module.css";

interface Review {
  id: number;
  name: string;
  title: string;
  text: string;
  rating: number;
  timePosted: string;
  isVerified: boolean;
}

const TrustpilotCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Real Trustpilot reviews data from tuitionaledu.com
  const reviews: Review[] = [
    {
      id: 1,
      name: "Zahra",
      title: "Great Teaching Method",
      text: "My teacher explains the lessons in a really good way because it makes everything understandable and easy to remember",
      rating: 5,
      timePosted: "August 22, 2025",
      isVerified: true
    },
    {
      id: 2,
      name: "Enaya Khurram",
      title: "Amazing Results - D to A!",
      text: "My experience with tuitional was great, i went from a D to an A! i highly recommend",
      rating: 5,
      timePosted: "August 14, 2025",
      isVerified: true
    },
    {
      id: 3,
      name: "Shaza Sameeh",
      title: "Helpful Teachers & Admin Team",
      text: "Praised helpful teachers and admin team. Great for board exam preparation, though there were some technical issues with the LMS website.",
      rating: 4,
      timePosted: "August 11, 2025",
      isVerified: true
    },
    {
      id: 4,
      name: "Muhammad Arham",
      title: "Interactive IGCSE Sessions",
      text: "Highlighted interactive sessions and excellent IGCSE exam preparation. The teaching quality was great with occasional minor issues with timing.",
      rating: 4,
      timePosted: "August 6, 2025",
      isVerified: true
    },
    {
      id: 5,
      name: "Salim Al Hadhrami",
      title: "Better Than School!",
      text: "Enjoyed classes that helped him understand more than school, praised friendly tutors who made learning enjoyable and effective.",
      rating: 5,
      timePosted: "February 11, 2025",
      isVerified: true
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      title: "Outstanding IGCSE Support",
      text: "The personalized approach and expert tutors made all the difference. Highly recommend for any IGCSE student struggling with their subjects.",
      rating: 5,
      timePosted: "January 15, 2025",
      isVerified: true
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, reviews.length]);


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.starFilled : styles.starEmpty}`}
      >
        ★
      </span>
    ));
  };

  const getVisibleReviews = () => {
    // For mobile: show 1 review
    // For desktop: show 3 reviews
    const reviewsToShow = (typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 3;
    const visibleReviews = [];
    
    for (let i = 0; i < reviewsToShow; i++) {
      const reviewIndex = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[reviewIndex]);
    }
    
    return visibleReviews;
  };

  const [visibleReviews, setVisibleReviews] = useState(getVisibleReviews());

  useEffect(() => {
    const handleResize = () => {
      setVisibleReviews(getVisibleReviews());
    };

    handleResize(); // Set initial visible reviews
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Stop auto-scrolling temporarily when user swipes
    if (isLeftSwipe || isRightSwipe) {
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 8000);
    }

    if (isLeftSwipe && currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box className={styles.carouselContainer}>
      {/* Header */}
      <Box className={styles.header}>
        <Typography
          variant="h4"
          className={`${leagueSpartan.className} ${styles.title}`}
        >
          What Our Students Say
        </Typography>
        <Typography
          variant="body1"
          className={`${leagueSpartan.className} ${styles.subtitle}`}
        >
          Real reviews from real IGCSE students and parents
        </Typography>
      </Box>

      {/* Carousel */}
      <Box 
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Reviews Container */}
        <Box className={styles.reviewsContainer}>
          <Grid container spacing={2} className={styles.reviewsGrid}>
            {visibleReviews.map((review, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={`${review.id}-${currentIndex}-${index}`}
                className={styles.reviewGridItem}
              >
                <Box className={styles.reviewCard}>
                  {/* Stars */}
                  <Box className={styles.starsContainer}>
                    {renderStars(review.rating)}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    className={`${leagueSpartan.className} ${styles.reviewTitle}`}
                  >
                    {review.title}
                  </Typography>

                  {/* Text */}
                  <Typography
                    variant="body2"
                    className={`${leagueSpartan.className} ${styles.reviewText}`}
                  >
                    {review.text}
                  </Typography>

                  {/* Footer */}
                  <Box className={styles.reviewFooter}>
                    <Box className={styles.reviewerInfo}>
                      <Typography
                        variant="body2"
                        className={`${leagueSpartan.className} ${styles.reviewerName}`}
                      >
                        {review.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={`${leagueSpartan.className} ${styles.timePosted}`}
                      >
                        {review.timePosted}
                      </Typography>
                    </Box>
                    {review.isVerified && (
                      <Box className={styles.verifiedBadge}>
                        <VerifiedIcon className={styles.verifiedIcon} />
                        <Typography
                          variant="caption"
                          className={`${leagueSpartan.className} ${styles.verifiedText}`}
                        >
                          Verified
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Dots Indicator */}
      <Box className={styles.dotsContainer}>
        {reviews.map((_, index) => (
          <Box
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.dotActive : ""
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoScrolling(false);
              setTimeout(() => setIsAutoScrolling(true), 10000);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TrustpilotCarousel;