"use client";
import React, { useState, useEffect } from "react";
import { leagueSpartan } from "@/app/fonts";
import {
  getCountdownData,
  CountdownData,
  PageType,
  restartCountdown,
  isCountdownExpired,
} from "@/services/countdown/countdown";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDays?: number;
  title?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDays = 20,
  title = "Limited Time Offer!",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownData, setCountdownData] = useState<CountdownData | null>({
    targetDate: new Date(Date.now() + targetDays * 24 * 60 * 60 * 1000).toISOString(),
    title,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isFixed, setIsFixed] = useState(false);
  const [hasTriggeredRestart, setHasTriggeredRestart] = useState(false);
  const [pageType, setPageType] = useState<PageType>("igcse");

  useEffect(() => {
    const detectPageType = (): PageType => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname.toLowerCase();
        if (path.includes("/igcse")) return "igcse";
        if (path.includes("/gcse")) return "gcse";
        if (path.includes("/a-level")) return "a-level";
      }
      return "igcse";
    };

    const fetchCountdownData = async () => {
      try {
        const detectedPageType = detectPageType();
        setPageType(detectedPageType);
        const data = await getCountdownData(detectedPageType);
        setCountdownData(data);
      } catch (error) {
        console.error("Failed to fetch countdown data:", error);
      }
    };

    fetchCountdownData();
  }, [targetDays, title]);

  useEffect(() => {
    const checkAndRestart = async () => {
      if (!hasTriggeredRestart && countdownData && isCountdownExpired(countdownData)) {
        setHasTriggeredRestart(true);
        try {
          const newCountdownData = await restartCountdown(pageType, 20);
          if (newCountdownData) {
            setCountdownData(newCountdownData);
            setTimeout(() => setHasTriggeredRestart(false), 5000);
          }
        } catch (error) {
          console.error("Failed to restart countdown:", error);
          setTimeout(() => setHasTriggeredRestart(false), 10000);
        }
      }
    };

    const intervalId = setInterval(checkAndRestart, 60000);
    checkAndRestart();
    return () => clearInterval(intervalId);
  }, [countdownData, hasTriggeredRestart, pageType]);

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
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownData]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatNumber = (num: number): string => num.toString().padStart(2, "0");

  if (!countdownData || !countdownData.isActive) {
    return null;
  }

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MINS" },
    { value: timeLeft.seconds, label: "SECS" },
  ];

  return (
    <div
      className={`${isFixed ? "fixed" : "sticky"} inset-x-0 top-0 z-[1000] w-full`}
    >
      <div className="flex w-full flex-col items-center justify-around gap-2 bg-[#006dac] py-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] md:flex-row">
        <p
          className={`${leagueSpartan.className} text-center font-heading text-[0.9rem] font-semibold text-white`}
        >
          {countdownData.title}
        </p>
        <div className="flex items-center gap-3">
          {units.map((u, i) => (
            <React.Fragment key={u.label}>
              <div className="flex min-w-[40px] flex-col items-center">
                <p
                  className={`${leagueSpartan.className} font-heading text-[1.2rem] font-bold leading-none text-white`}
                >
                  {formatNumber(u.value)}
                </p>
                <p
                  className={`${leagueSpartan.className} font-heading text-[0.7rem] font-medium leading-none text-white/90`}
                >
                  {u.label}
                </p>
              </div>
              {i < units.length - 1 && (
                <p className="text-[1.2rem] font-bold leading-none text-white">:</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
