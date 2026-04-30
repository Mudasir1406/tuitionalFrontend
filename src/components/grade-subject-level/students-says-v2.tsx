"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { PageData } from "@/types/grade-subject-level.types";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";

interface StudentSaysV2Props {
  data: PageData["what_our_student_says"];
  title?: string;
}

const StudentSaysV2: React.FC<StudentSaysV2Props> = ({ data, title }) => {
  const [videoData, setVideoData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const HeaderTag = (data?.headerTag ?? "h2") as "h2" | "h3" | "h4";

  useEffect(() => {
    getVideoReviews()
      .then((videos) => {
        setVideoData(videos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch video reviews:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && currentIndex < videoData.length - 1) setCurrentIndex(currentIndex + 1);
    if (distance < -50 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="mx-[3vw] flex flex-col items-center justify-center px-0 lg:mx-[2vh] lg:px-[5vw]">
      <HeaderTag
        className="text-center font-heading text-h2-mobile sm:text-h2-tablet md:text-start lg:text-start lg:text-h2 text-ink-900"
        dangerouslySetInnerHTML={{ __html: title ?? data?.header ?? "" }}
      />
      <div
        className="w-full px-0 py-[2vh] pb-[4vh] text-center font-heading text-body-mobile text-ink-900 sm:text-body md:text-start lg:w-[139vh] lg:py-[1vh] lg:pb-[3vh] lg:text-center"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <p className="font-heading text-body text-ink-700">Loading videos...</p>
        </div>
      ) : isMobile ? (
        <div
          className="w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {videoData.map((video, index) => (
              <div key={index} className="w-full shrink-0 px-2">
                <div className="overflow-hidden rounded-[20px]">
                  <video
                    src={video.video}
                    controls
                    poster={video.thumbnil}
                    className="h-[200px] w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {videoData.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {videoData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    index === currentIndex ? "bg-brand-500" : "bg-ink-300",
                  )}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {videoData.map((video, index) => (
            <div key={index} className="overflow-hidden rounded-[20px]">
              <video
                src={video.video}
                controls
                poster={video.thumbnil}
                className="h-[200px] w-full lg:h-[48vh]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSaysV2;
