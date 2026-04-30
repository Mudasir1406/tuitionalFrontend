import React from "react";

const OptionsImageHome = () => {
  const categories = [
    "All",
    "Applying for University",
    "Efficiency",
    "Exam Tips",
    "IB - Understanding IT",
    "IB CASl",
    "IB Extended Essay",
    "IB Lanterna Courses",
    "IB Theory of Knowledge",
    "IGCSE",
    "Most Popular",
    "Plan for Success",
    "Quick Fix",
    "Retaking IB Exams",
    "Revision Skills",
    "Student Self Care",
    "Study Skills",
    "Uncategorized",
  ];

  return (
    <div className="mx-[2vh] lg:mx-[7vh]">
      <div className="my-[6vh] h-auto rounded-[1vh] bg-[#E7F6FF] backdrop-blur-sm shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)_inset] sm:h-[5vh] lg:my-[5vh] lg:h-[8vh]">
        <p className="px-2 py-3 text-center font-heading text-[1.6vh] font-medium text-ink-900 sm:pt-[1vh] lg:pt-[1.8vh] lg:text-[3vh]">
          Home &gt; <span className="text-brand-500">Blog</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((label, index) => (
          <div
            key={index}
            className="flex flex-1 items-center justify-center rounded-[5vh] bg-white px-3 py-[2vh] shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.15)_inset]"
            style={{ minWidth: "fit-content" }}
          >
            <p className="text-center font-heading text-[1.6vh] font-semibold text-ink-900 lg:text-[2vh]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsImageHome;
