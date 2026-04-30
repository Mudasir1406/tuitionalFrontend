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
  if (window.innerWidth >= 768) return 2;
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

  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={handlePrev}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-500 shadow-card hover:bg-brand-50"
        aria-label="Previous"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex-1 overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
        >
          {cardsData?.map((card, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ flex: `0 0 calc(${100 / visibleCards}% - 16px)` }}
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
        onClick={handleNext}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-500 shadow-card hover:bg-brand-50"
        aria-label="Next"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

export default GridView;
