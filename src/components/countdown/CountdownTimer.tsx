"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { getCountdownData, CountdownData } from "@/services/countdown/countdown";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDays?: number; // Fallback if database fails
  title?: string; // Fallback title
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDays = 20, 
  title = "Limited Time Offer!" 
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownData, setCountdownData] = useState<CountdownData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch countdown data from database
    const fetchCountdownData = async () => {
      try {
        const data = await getCountdownData();
        setCountdownData(data);
      } catch (error) {
        console.error("Failed to fetch countdown data:", error);
        // Use fallback data if database fails
        const fallbackDate = new Date();
        fallbackDate.setDate(fallbackDate.getDate() + targetDays);
        setCountdownData({
          targetDate: fallbackDate.toISOString(),
          title: title,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountdownData();
  }, [targetDays, title]);

  useEffect(() => {
    if (!countdownData || !countdownData.isActive) return;

    const targetDate = new Date(countdownData.targetDate);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownData]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // Don't render if countdown is not active or still loading
  if (isLoading || !countdownData || !countdownData.isActive) {
    return null;
  }

  return (
    <Box sx={styles.stickyContainer}>
      <Box sx={styles.countdownBox}>
        <Typography
          variant="body2"
          className={leagueSpartan.className}
          sx={styles.title}
        >
          {countdownData.title}
        </Typography>
        
        <Box sx={styles.timerContainer}>
          <Box sx={styles.timeUnit}>
            <Typography
              variant="h6"
              className={leagueSpartan.className}
              sx={styles.number}
            >
              {formatNumber(timeLeft.days)}
            </Typography>
            <Typography
              variant="caption"
              className={leagueSpartan.className}
              sx={styles.label}
            >
              DAYS
            </Typography>
          </Box>

          <Typography sx={styles.separator}>:</Typography>

          <Box sx={styles.timeUnit}>
            <Typography
              variant="h6"
              className={leagueSpartan.className}
              sx={styles.number}
            >
              {formatNumber(timeLeft.hours)}
            </Typography>
            <Typography
              variant="caption"
              className={leagueSpartan.className}
              sx={styles.label}
            >
              HRS
            </Typography>
          </Box>

          <Typography sx={styles.separator}>:</Typography>

          <Box sx={styles.timeUnit}>
            <Typography
              variant="h6"
              className={leagueSpartan.className}
              sx={styles.number}
            >
              {formatNumber(timeLeft.minutes)}
            </Typography>
            <Typography
              variant="caption"
              className={leagueSpartan.className}
              sx={styles.label}
            >
              MINS
            </Typography>
          </Box>

          <Typography sx={styles.separator}>:</Typography>

          <Box sx={styles.timeUnit}>
            <Typography
              variant="h6"
              className={leagueSpartan.className}
              sx={styles.number}
            >
              {formatNumber(timeLeft.seconds)}
            </Typography>
            <Typography
              variant="caption"
              className={leagueSpartan.className}
              sx={styles.label}
            >
              SECS
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CountdownTimer;

const styles = {
  stickyContainer: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    width: "auto",
    padding: "8px 0"
  },
  countdownBox: {
    background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    borderRadius: "0 0 16px 16px",
    padding: "12px 24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    minWidth: "300px"
  },
  title: {
    color: "white",
    fontWeight: 600,
    fontSize: "0.9rem",
    textAlign: "center"
  },
  timerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  timeUnit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "40px"
  },
  number: {
    color: "white",
    fontWeight: 700,
    lineHeight: 1,
    fontSize: "1.2rem"
  },
  label: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: 500,
    fontSize: "0.7rem",
    lineHeight: 1
  },
  separator: {
    color: "white",
    fontWeight: 700,
    fontSize: "1.2rem",
    lineHeight: 1
  }
};