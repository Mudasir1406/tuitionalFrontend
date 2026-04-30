"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { cn } from "@/utils/cn";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import girl1 from "../../../public/assets/images/static/girl1.png";
import girl2 from "../../../public/assets/images/static/girl2.png";
import girl3 from "../../../public/assets/images/static/girl3.png";
import type { StaticImageData } from "next/dist/shared/lib/get-img-props";

const PopUpButton = dynamic(() => import("../pop-up-button"));

const data = [
  {
    heading: "Get Started",
    description: "Share your academic details and requirements.",
    image: girl1,
    ButtonText: "Start Now",
  },
  {
    heading: "Meet Your Mentor",
    description: "Our consultant connects you with the right tutor within an hour.",
    image: girl2,
    ButtonText: "Find Tutor",
  },
  {
    heading: "Take The Leap",
    description: "Once satisfied, enroll and start your journey.",
    image: girl3,
    ButtonText: "Enroll Now",
  },
];

const GetStartedV2: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
    if (distance < -50 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div>
      <p className="relative mb-5 mt-[70px] text-center font-heading text-h1-mobile sm:mt-20 sm:text-h1-tablet md:mt-[95px] lg:mt-[75px] lg:text-h1 text-ink-900">
        <Image
          src={linesMobile}
          alt=""
          aria-hidden="true"
          className="absolute -top-5 left-[10%] z-10 h-[50px] w-[50px] object-contain sm:hidden"
        />
        <Image
          src={linesInvert}
          alt=""
          aria-hidden="true"
          className="absolute z-10 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:left-[10%] sm:block md:left-[23%] lg:-top-[30px] lg:left-[33%]"
        />
        Get Started in <span className="text-brand-500">3</span> Easy Steps!
      </p>

      <div className="mx-auto hidden w-[90%] flex-row items-center justify-center lg:flex">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <DesktopCard key={index} {...(item as any)} />
          ))}
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center lg:hidden">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative mx-auto flex min-h-[320px] w-full max-w-[320px] items-center justify-center p-4"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                index === currentIndex ? "flex" : "hidden",
              )}
            >
              <div className="flex min-w-[280px] max-w-[280px] flex-col items-center rounded-xl border border-ink-100 bg-[#E3F2FD] p-4 shadow-card">
                <div className="h-[200px] w-[200px]">
                  <Image
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                    className="h-full w-full object-contain"
                  />
                </div>
                <strong className="my-2 font-heading text-h4 text-ink-900">{item.heading}</strong>
                <p className="my-2 text-center font-heading text-small text-ink-700">
                  {item.description}
                </p>
                <PopUpButton
                  href="popup"
                  text={item.ButtonText}
                  style={{
                    boxShadow: "1px 15px 34px 0px #38B6FF66",
                    backgroundColor: "#38B6FF",
                    color: "white",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    margin: "8px 0",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 pb-4">
          {data.map((_, index) => (
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
      </div>
    </div>
  );
};

export default GetStartedV2;

interface CardProps {
  heading: string;
  description: string;
  image: StaticImageData;
  ButtonText: string;
}

const DesktopCard: React.FC<CardProps> = ({ heading, description, image, ButtonText }) => (
  <div className="mx-auto flex h-auto w-full flex-col items-center rounded-md bg-brand-50 px-[30px] py-[10px] lg:w-4/5 xl:w-[400px]">
    <div className="flex h-[250px] w-[300px] items-center justify-center">
      <Image src={image} alt="" width={300} height={300} className="h-full w-full object-contain" />
    </div>
    <strong className="my-[2vh] text-center font-heading text-h4 text-ink-900">{heading}</strong>
    <p className="my-[2vh] text-center font-heading text-body text-ink-700">{description}</p>
    <PopUpButton
      href="popup"
      text={ButtonText}
      style={{
        boxShadow: "1px 15px 34px 0px #38B6FF66",
        margin: "2vh 0",
        backgroundColor: "#38B6FF",
        color: "white",
        padding: "18px",
        borderRadius: "10px",
        width: "249px",
      }}
    />
  </div>
);
