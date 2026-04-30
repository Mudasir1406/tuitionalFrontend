"use client";
import React from "react";
import { leagueSpartan } from "@/app/fonts";

interface Subject {
  name: string;
  color: string;
}

interface IProps {
  title?: string;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const hardcodedSubjects: Subject[] = [
  { name: "Mathematics", color: "" },
  { name: "English Language", color: "" },
  { name: "Physics", color: "" },
  { name: "Chemistry", color: "" },
  { name: "Biology", color: "" },
  { name: "Economics", color: "" },
  { name: "Business Studies", color: "" },
  { name: "Computer Science", color: "" },
  { name: "Geography", color: "" },
  { name: "History", color: "" },
  { name: "Art & Design", color: "" },
  { name: "French", color: "" },
];

const PopularIgcseSubjectsV2: React.FunctionComponent<IProps> = ({
  title = "Popular IGCSE Subjects",
  headerTag = "h2",
}) => {
  const HeaderTag = headerTag;

  return (
    <div className="px-[5vw]">
      <HeaderTag
        className={`${leagueSpartan.className} mx-auto mb-[2.5vh] text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900`}
      >
        {title}
      </HeaderTag>

      <div className="grid grid-cols-2 justify-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
        {hardcodedSubjects.map((item, index) => {
          const cardColor = index % 2 === 0 ? "#e7f1f7" : "#c9ebff";
          return (
            <div
              key={index}
              className="flex h-[5vh] cursor-pointer items-center justify-center rounded-[2vh] p-[2vh] text-center backdrop-blur-[5px] shadow-[0px_-2.171px_6.514px_0px_rgba(0,0,0,0.20)_inset] transition-all duration-500 hover:scale-105 hover:opacity-80 lg:h-[5vh] lg:p-[3vh]"
              style={{ background: cardColor }}
            >
              <p
                className={`${leagueSpartan.className} font-heading text-[0.9rem] font-semibold text-[#2D2D2D] lg:text-[1rem]`}
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularIgcseSubjectsV2;
