"use client";
import React, { useState, useEffect } from "react";
import { Box, Card, CardMedia, Typography, Grid, IconButton } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { PageData } from "@/types/grade-subject-level.types";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";
import styles from "./students-says-v2.module.css";

interface StudentSaysV2Props {
  data: PageData["what_our_student_says"];
}

const StudentSaysV2: React.FC<StudentSaysV2Props> = ({ data }) => {
  const [videoData, setVideoData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videos = await getVideoReviews();
        setVideoData(videos);
      } catch (error) {
        console.error("Failed to fetch video reviews:", error);
      }
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleItems = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(videoData.length / visibleItems);

  return (
    <Box className={styles.container}>
      <Typography
        variant={data?.headerTag ? data?.headerTag : ("h2" as any)}
        className={`${leagueSpartan.className} ${styles.heading}`}
        component={data?.headerTag as keyof JSX.IntrinsicElements}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      />
      <Typography
        variant="body2"
        className={`${leagueSpartan.className} ${styles.desc}`}
        component={"p"}
        dangerouslySetInnerHTML={{
          __html: data?.paragraph,
        }}
      />

      {isMobile ? (
        // Mobile: Horizontal scrolling layout
        <Box className={styles.mobileContainer}>
          <Box
            className={styles.mobileCarousel}
            sx={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {videoData.map((video, index) => (
              <Box key={index} className={styles.mobileVideoItem}>
                <Card className={styles.mobileCard}>
                  <CardMedia
                    component="video"
                    src={video.video}
                    controls
                    poster={video.thumbnil}
                    className={styles.mobileCardMedia}
                  />
                </Card>
              </Box>
            ))}
          </Box>
          
          {/* Dot indicators for mobile */}
          {videoData.length > 1 && (
            <Box className={styles.dotContainer}>
              {videoData.map((_, index) => (
                <Box
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </Box>
          )}
        </Box>
      ) : (
        // Desktop: Grid layout (same as original)
        <Grid container spacing={2}>
          {videoData.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className={styles.card}>
                <CardMedia
                  component="video"
                  src={video.video}
                  controls
                  poster={video.thumbnil}
                  className={styles.cardMedia}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StudentSaysV2;