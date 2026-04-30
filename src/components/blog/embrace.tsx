"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Embrace = () => {
  const [openLists, setOpenLists] = useState<Record<string, boolean>>({
    list9: true,
    list6: true,
    list4: true,
    list5: true,
    list2: true,
  });

  const toggleList = (listKey: string) => {
    setOpenLists((prev) => ({ ...prev, [listKey]: !prev[listKey] }));
  };

  const getListItems = (listKey: string) => {
    switch (listKey) {
      case "list9": return Array(9).fill("IGCSE Maths");
      case "list6": return Array(6).fill("IGCSE Maths");
      case "list4": return Array(4).fill("IGCSE Maths");
      case "list5": return Array(5).fill("IGCSE Maths");
      case "list2": return Array(2).fill("IGCSE Maths");
      default: return [];
    }
  };

  const sections = [
    {
      heading: "Embrace the Flexibility of Online Learning",
      paras: [
        "One of the greatest advantages of online tutoring is flexibility. With Tuitional Education, you have the power to schedule sessions at times that work best for you. Whether you're a night owl or an early bird, you can tailor your learning experience to fit your unique lifestyle. This flexibility allows you to balance your studies with other commitments, such as extracurricular activities, part-time jobs, or family responsibilities.",
        "Moreover, the option to choose from a wide range of tutors means you can find someone whose teaching style aligns perfectly with your learning preferences, whether you need early morning sessions to start your day right or late-night reviews to wrap up your studies. The asynchronous nature of online resources also complements this flexibility, enabling you to access materials, review lessons, and complete assignments whenever it's most convenient for you.",
      ],
    },
    {
      heading: "Create a Conducive Learning Environment",
      paras: [
        "To maximize the benefits of online tutoring, it's important to create a dedicated learning space that fosters concentration and productivity. Start by selecting a quiet, well-lit area in your home where you can focus without interruptions. Ideally, this space should be separate from areas associated with relaxation or entertainment to help you mentally switch into \"study mode\" when you sit down.",
        "Invest in ergonomic furniture to support your comfort during study sessions. A good chair with proper lumbar support and a desk at the right height can prevent strain and enhance your ability to focus for longer periods. Ensure your desk is organized and free of clutter to minimize distractions and keep essential materials within reach. Equip your learning space with the necessary tools for online tutoring. A reliable computer with up-to-date software and high-speed internet is crucial for smooth communication and access to online resources.",
      ],
    },
    {
      heading: "Utilize Resources and Tools for Learning",
      paras: [
        "Tuitional Education provides access to a variety of resources designed to enhance your learning experience and support your academic growth. Beyond traditional tutoring sessions, our platform offers a suite of online tools and resources that can significantly augment your studies.",
        "Educational apps and software integrated into our platform can offer personalized practice and reinforce what you've learned in your sessions. From interactive quizzes and flashcards to simulation games and problem-solving apps, these tools can cater to different learning styles and provide engaging ways to review and apply your knowledge.",
      ],
    },
  ];

  return (
    <div className="lg:my-[15vh]">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="flex w-full flex-col rounded-e-[2vh] bg-[#EDF9FFCC] py-[2vh] shadow-[0px_-3px_10px_0px_rgba(0,0,0,0.15)_inset] sm:py-[4vh]">
            {["list9", "list6", "list4", "list5", "list2"].map((listKey) => (
              <React.Fragment key={listKey}>
                <div className="flex w-full flex-row items-center justify-center gap-2">
                  <p className="text-center font-heading text-[2vh] font-semibold sm:text-[2.4vh]">
                    IGCSE CAIE Tutoring
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleList(listKey)}
                    className="rounded-full p-1 hover:bg-ink-100"
                    aria-label={openLists[listKey] ? "Collapse" : "Expand"}
                  >
                    {openLists[listKey] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
                {openLists[listKey] && (
                  <ul className="flex w-full list-disc flex-col items-center justify-center gap-1 ps-4 text-center">
                    {getListItems(listKey).map((item, i) => (
                      <li
                        key={i}
                        className="font-heading text-[2vh] font-normal text-ink-900"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <h3 className="w-[34vh] pt-[4vh] text-center font-heading text-[3vh] font-semibold text-black lg:w-auto lg:text-[5vh]">
                  {section.heading}
                </h3>
                {section.paras.map((p, i) => (
                  <p
                    key={i}
                    className="w-[45vh] pt-[2vh] text-start font-heading text-[1.6vh] font-normal text-ink-900 sm:w-[65vh] sm:text-justify lg:w-[135vh] lg:pt-[4vh] lg:text-[2.4vh] lg:leading-[4vh]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Embrace;
