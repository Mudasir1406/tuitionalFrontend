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

  // Hardcoded reviews data
  const reviews: Review[] = [
    {
      id: 1,
      name: "Steve",
      title: "THIS WAS AWESOME!",
      text: "Never had a better experience with online tutoring. The IGCSE program exceeded all my expectations and helped me achieve top grades.",
      rating: 5,
      timePosted: "2 weeks ago",
      isVerified: true
    },
    {
      id: 2,
      name: "Thomas",
      title: "Really liked their TrustBox",
      text: "The TrustBox was so nice and the tutoring quality was exceptional. My daughter improved her IGCSE grades significantly.",
      rating: 5,
      timePosted: "1 month ago",
      isVerified: true
    },
    {
      id: 3,
      name: "Wendy",
      title: "If only they had a real TrustBox",
      text: "How do I know I can trust online tutoring? Well, after seeing the results, I'm completely convinced. Excellent IGCSE support!",
      rating: 5,
      timePosted: "3 weeks ago",
      isVerified: false
    },
    {
      id: 4,
      name: "April",
      title: "I guess it's fine",
      text: "Nothing broke on the way and the teaching quality was actually amazing. My son's IGCSE performance improved dramatically.",
      rating: 5,
      timePosted: "1 week ago",
      isVerified: true
    },
    {
      id: 5,
      name: "Sarah",
      title: "Outstanding IGCSE Support",
      text: "The personalized approach and expert tutors made all the difference. Highly recommend for any IGCSE student struggling with their subjects.",
      rating: 5,
      timePosted: "4 days ago",
      isVerified: true
    },
    {
      id: 6,
      name: "Michael",
      title: "Best Investment Ever",
      text: "Worth every penny! The structured IGCSE program and dedicated teachers helped my child gain confidence and achieve excellent results.",
      rating: 5,
      timePosted: "5 days ago",
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
      <Box className={styles.carouselWrapper}>
        {/* Reviews Container */}
        <Box className={styles.reviewsContainer}>
          <Grid container spacing={2} className={styles.reviewsGrid}>
            {visibleReviews.map((review) => (
              <Grid
                item
                xs={12}
                md={4}
                key={review.id}
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