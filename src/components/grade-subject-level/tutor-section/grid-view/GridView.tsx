"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageCard from "@/components/image-card/ImageCard";

interface props {
  cardsData: any[];
  locale?: string;
}

const getVisibleCards = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 900) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
};

function GridView({ cardsData, locale = "en" }: props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const update = () => setVisibleCards(getVisibleCards());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(cardsData.length - visibleCards, 0);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) return 0;
      return Math.min(prevIndex + visibleCards, maxIndex);
    });
  }, [visibleCards, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) return maxIndex;
      return Math.max(prevIndex - visibleCards, 0);
    });
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => handleNext(), 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, handleNext]);

  const gapPx = 16;
  const cardBasis = `calc(${100 / visibleCards}% - ${(gapPx * (visibleCards - 1)) / visibleCards}px)`;
  const translateOffset = `calc(${-currentIndex * (100 / visibleCards)}% - ${(currentIndex * gapPx) / visibleCards}px)`;

  return (
    <div className="relative mx-10 sm:mx-14">
      <div className="overflow-hidden">
        <div
          className="flex items-stretch gap-4 transition-transform duration-500"
          style={{ transform: `translateX(${translateOffset})` }}
        >
          {cardsData?.map((card, i) => (
            <div
              key={i}
              className="flex shrink-0"
              style={{ flex: `0 0 ${cardBasis}` }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ImageCard data={card} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className="absolute -left-10 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-500 shadow-card hover:bg-brand-50 sm:-left-14"
        aria-label="Previous"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute -right-10 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-500 shadow-card hover:bg-brand-50 sm:-right-14"
        aria-label="Next"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

export default GridView;
