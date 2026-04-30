"use client";
import React, { useState, useEffect } from "react";
import { BadgeCheck } from "lucide-react";
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

type IProps = {
  title?: string;
  text?: string;
};

const TrustpilotCarousel: React.FC<IProps> = ({ title, text }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const reviews = React.useMemo<Review[]>(
    () => [
      {
        id: 1,
        name: "Zahra",
        title: "Great Teaching Method",
        text: "My teacher explains the lessons in a really good way because it makes everything understandable and easy to remember",
        rating: 5,
        timePosted: "August 22, 2025",
        isVerified: true,
      },
      {
        id: 2,
        name: "Enaya Khurram",
        title: "Amazing Results - D to A!",
        text: "My experience with tuitional was great, i went from a D to an A! i highly recommend",
        rating: 5,
        timePosted: "August 14, 2025",
        isVerified: true,
      },
      {
        id: 3,
        name: "Shaza Sameeh",
        title: "Helpful Teachers & Admin Team",
        text: "Praised helpful teachers and admin team. Great for board exam preparation, though there were some technical issues with the LMS website.",
        rating: 4,
        timePosted: "August 11, 2025",
        isVerified: true,
      },
      {
        id: 4,
        name: "Muhammad Arham",
        title: "Interactive IGCSE Sessions",
        text: "Highlighted interactive sessions and excellent IGCSE exam preparation. The teaching quality was great with occasional minor issues with timing.",
        rating: 4,
        timePosted: "August 6, 2025",
        isVerified: true,
      },
      {
        id: 5,
        name: "Salim Al Hadhrami",
        title: "Better Than School!",
        text: "Enjoyed classes that helped him understand more than school, praised friendly tutors who made learning enjoyable and effective.",
        rating: 5,
        timePosted: "February 11, 2025",
        isVerified: true,
      },
      {
        id: 6,
        name: "Ahmed Hassan",
        title: "Outstanding IGCSE Support",
        text: "The personalized approach and expert tutors made all the difference. Highly recommend for any IGCSE student struggling with their subjects.",
        rating: 5,
        timePosted: "January 15, 2025",
        isVerified: true,
      },
    ],
    [],
  );

  useEffect(() => {
    if (!isAutoScrolling) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoScrolling, reviews.length]);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.starFilled : styles.starEmpty}`}
      >
        ★
      </span>
    ));

  const getVisibleReviews = React.useCallback(() => {
    const reviewsToShow =
      typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;
    const visibleReviews = [];
    for (let i = 0; i < reviewsToShow; i++) {
      const reviewIndex = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[reviewIndex]);
    }
    return visibleReviews;
  }, [currentIndex, reviews]);

  const [visibleReviews, setVisibleReviews] = useState(getVisibleReviews());

  useEffect(() => {
    const handleResize = () => setVisibleReviews(getVisibleReviews());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, getVisibleReviews]);

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
    <div className={styles.carouselContainer}>
      <div className={styles.header}>
        <h4 className={`${leagueSpartan.className} ${styles.title}`}>
          {title ? title : "What Our Students Say"}
        </h4>
        <p className={`${leagueSpartan.className} ${styles.subtitle}`}>
          {text && text}
        </p>
      </div>

      <div
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.reviewsContainer}>
          <div className={`${styles.reviewsGrid} grid grid-cols-1 gap-4 md:grid-cols-3`}>
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${currentIndex}-${index}`}
                className={styles.reviewGridItem}
              >
                <div className={styles.reviewCard}>
                  <div className={styles.starsContainer}>
                    {renderStars(review.rating)}
                  </div>
                  <h6 className={`${leagueSpartan.className} ${styles.reviewTitle}`}>
                    {review.title}
                  </h6>
                  <p className={`${leagueSpartan.className} ${styles.reviewText}`}>
                    {review.text}
                  </p>
                  <div className={styles.reviewFooter}>
                    <div className={styles.reviewerInfo}>
                      <p className={`${leagueSpartan.className} ${styles.reviewerName}`}>
                        {review.name}
                      </p>
                      <span className={`${leagueSpartan.className} ${styles.timePosted}`}>
                        {review.timePosted}
                      </span>
                    </div>
                    {review.isVerified && (
                      <div className={styles.verifiedBadge}>
                        <BadgeCheck className={styles.verifiedIcon} />
                        <span className={`${leagueSpartan.className} ${styles.verifiedText}`}>
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {reviews.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoScrolling(false);
              setTimeout(() => setIsAutoScrolling(true), 10000);
            }}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrustpilotCarousel;
