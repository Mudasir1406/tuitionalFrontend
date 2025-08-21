"use client";
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Star, AccessTime, School, Groups } from "@mui/icons-material";
import { leagueSpartan } from "@/app/fonts";
import { CardProps } from "../TutorSectionV2";
import styles from "./HorizontalTutorCarousel.module.css";

interface HorizontalTutorCarouselProps {
  tutors: CardProps[];
  title?: string;
}

const HorizontalTutorCarousel: React.FC<HorizontalTutorCarouselProps> = ({
  tutors,
  title = "Recommended Tutors"
}) => {
  const getInitials = (firstName: string, lastName?: string) => {
    return `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase();
  };

  // Generate random realistic data for each tutor
  const generateTutorStats = (index: number) => {
    const ratings = [4.8, 4.9, 5.0, 4.7, 4.9];
    const hours = [12500, 14500, 18000, 9800, 16200];
    const experience = [8, 13, 15, 6, 11];
    const batches = [145, 178, 220, 98, 156];
    
    return {
      rating: ratings[index % ratings.length],
      hours: hours[index % hours.length],
      experience: experience[index % experience.length],
      batches: batches[index % batches.length]
    };
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography
          variant="h4"
          className={`${leagueSpartan.className} ${styles.title}`}
        >
          {title}
        </Typography>
      </Box>

      <Box className={styles.carouselContainer}>
        <Box className={styles.carouselTrack}>
          {tutors.slice(0, 5).map((tutor, index) => {
            const stats = generateTutorStats(index);
            return (
              <Box key={index} className={styles.tutorCard}>
                <Avatar
                  src={tutor.profileImageUrl}
                  className={styles.avatar}
                  variant="rounded"
                >
                  {getInitials(tutor["First Name"], tutor["Last Name"])}
                </Avatar>
                
                <Box className={styles.nameRatingRow}>
                  <Typography
                    variant="h6"
                    className={`${leagueSpartan.className} ${styles.tutorName}`}
                  >
                    {`${tutor["First Name"]} ${tutor["Last Name"] || ''}`}
                  </Typography>
                  
                  <Box className={styles.ratingContainer}>
                    <Star className={styles.ratingIcon} />
                    <Typography variant="body2" className={styles.ratingText}>
                      {stats.rating}
                    </Typography>
                  </Box>
                </Box>

                <Box className={styles.statItem}>
                  <AccessTime className={styles.icon} />
                  <Typography variant="body2" className={styles.statText}>
                    Hours taught: {stats.hours.toLocaleString()}+
                  </Typography>
                </Box>

                <Box className={styles.statItem}>
                  <School className={styles.icon} />
                  <Typography variant="body2" className={styles.statText}>
                    Years of Experience: {stats.experience}+
                  </Typography>
                </Box>

                <Box className={styles.statItem}>
                  <Groups className={styles.icon} />
                  <Typography variant="body2" className={styles.statText}>
                    Batches led: {stats.batches}+
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default HorizontalTutorCarousel;