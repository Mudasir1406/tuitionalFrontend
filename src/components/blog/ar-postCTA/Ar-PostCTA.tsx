"use client";
import React, { useState } from "react";
import styles from "./Ar-PostCTA.module.css";
import { Button, Typography, Box } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

const ArPostCTA: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Box className={`${styles.ctaContainer} ${styles.ctaContainerRTL}`} dir="rtl">
      <div className={styles.content}>
        <Typography
          variant="h3"
          className={`${styles.title} ${styles.titleRTL} ${leagueSpartan.className}`}
        >
          احجز درساً تجريبياً مجانياً
        </Typography>
        
        <Typography
          variant="body1"
          className={`${styles.description} ${styles.descriptionRTL} ${leagueSpartan.className}`}
        >
          ابدأ رحلتك التعليمية معنا واحصل على درس تجريبي مجاني مع أفضل المدرسين
        </Typography>

        <Button
          variant="contained"
          size="large"
          className={`${styles.ctaButton} ${leagueSpartan.className}`}
          onClick={handleClick}
        >
          احجز درساً تجريبياً مجانياً
        </Button>

        <Typography
          variant="caption"
          className={`${styles.disclaimer} ${styles.disclaimerRTL} ${leagueSpartan.className}`}
        >
          * لا توجد رسوم إضافية أو التزامات
        </Typography>
      </div>
    </Box>
  );
};

export default ArPostCTA;