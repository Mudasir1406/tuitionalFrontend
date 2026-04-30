import React from "react";
import { PageData } from "@/types/grade-subject-level.types";

interface IProps {
  data: PageData["main_content"];
}

const MainContent: React.FC<IProps> = ({ data }) => {
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="px-[5vw]">
      <HeaderTag
        className="mb-[2vh] w-full text-center font-heading text-h3-mobile sm:text-h3-tablet md:mb-[3vh] md:text-start lg:w-[50vw] lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div
        className="mb-[2vh] w-full text-center font-heading text-body-mobile text-ink-900 sm:text-body md:mb-[4vh] md:text-start lg:text-start"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      {data?.subjects?.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {data.subjects.map((subject, index) => (
            <a
              key={index}
              href={subject.link || "#"}
              className="block w-full rounded-[5vh] bg-white p-4 text-center font-heading text-small font-medium text-ink-900 shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.15)_inset] transition-transform duration-200 hover:scale-[1.02] hover:bg-brand-200/35 lg:text-[2vh]"
            >
              {subject.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
