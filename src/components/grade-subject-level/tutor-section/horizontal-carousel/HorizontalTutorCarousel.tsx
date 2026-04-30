"use client";

import React from "react";
import Image from "next/image";
import { Clock, GraduationCap, Star, Users } from "lucide-react";
import { CardProps } from "../TutorSectionV2";
import FlagIcon from "./FlagIcon";

interface HorizontalTutorCarouselProps {
  tutors: CardProps[];
  title?: string;
}

const generateTutorStats = (index: number) => {
  const ratings = [4.8, 4.9, 5.0, 4.7, 4.9, 4.8, 4.9, 5.0, 4.7];
  const hours = [12500, 14500, 15400, 21000, 9500, 11200, 13800, 15600, 10500];
  const experience = [9, 8, 12, 24, 8, 24, 12, 11, 14];
  const batches = [120, 91, 60, 98, 56, 180, 60, 167, 124];
  const countryCodes = ["sa", "ae", "ae", "ae", "us", "sa", "ae", "fr", "gb"];
  const countryNames = ["Saudi Arabia", "UAE", "UAE", "UAE", "USA", "Qatar", "France", "UK", "UK"];

  return {
    rating: ratings[index % ratings.length],
    hours: hours[index % hours.length],
    experience: experience[index % experience.length],
    batches: batches[index % batches.length],
    countryCode: countryCodes[index % countryCodes.length],
    countryName: countryNames[index % countryNames.length],
  };
};

const getInitials = (firstName: string, lastName?: string) =>
  `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();

const HorizontalTutorCarousel: React.FC<HorizontalTutorCarouselProps> = ({
  tutors,
  title = "Recommended Tutors",
}) => (
  <div className="px-6 py-12 lg:py-16">
    <div className="text-center">
      <h4 className="font-heading text-h4 text-ink-900">{title}</h4>
    </div>

    <div className="mt-8 overflow-x-auto">
      <div className="flex min-w-max gap-4 pb-4">
        {tutors.slice(0, 9).map((tutor, index) => {
          const stats = generateTutorStats(index);
          return (
            <div
              key={index}
              className="flex w-72 shrink-0 flex-col gap-3 rounded-lg bg-white p-5 shadow-card"
            >
              <div className="relative">
                <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-md bg-brand-50">
                  {tutor.profileImageUrl ? (
                    <Image
                      src={tutor.profileImageUrl}
                      alt={`${tutor["First Name"]} ${tutor["Last Name"] ?? ""}`}
                      width={288}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-heading text-h2 text-brand-500">
                      {getInitials(tutor["First Name"], tutor["Last Name"])}
                    </span>
                  )}
                </div>
                <div
                  className="absolute bottom-2 start-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
                  title={stats.countryName}
                >
                  <FlagIcon countryCode={stats.countryCode} size={24} />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="font-heading text-h6 text-ink-900">
                  {`${tutor["First Name"]} ${tutor["Last Name"] ?? ""}`}
                </p>
                <div className="flex items-center gap-1 rounded-md bg-warning/10 px-2 py-1">
                  <Star size={14} className="fill-warning text-warning" />
                  <span className="font-heading text-small font-semibold text-warning">{stats.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-heading text-small text-ink-700">
                <Clock size={14} className="text-brand-500" />
                <span>Hours taught: {stats.hours.toLocaleString()}+</span>
              </div>
              <div className="flex items-center gap-2 font-heading text-small text-ink-700">
                <GraduationCap size={14} className="text-brand-500" />
                <span>Years of Experience: {stats.experience}+</span>
              </div>
              <div className="flex items-center gap-2 font-heading text-small text-ink-700">
                <Users size={14} className="text-brand-500" />
                <span>Batches led: {stats.batches}+</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default HorizontalTutorCarousel;
