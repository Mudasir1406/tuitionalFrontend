import React from "react";
import GridView from "./grid-view/GridView";
import ListView from "./list-view/ListView";
import { tutor_section } from "@/types/grade-subject-level.types";
import { getTutorsByFilter } from "@/services/grade-subject-level/grade-subject-level";

type IProps = {
  data: tutor_section;
};

export type CardProps = {
  "First Name": string;
  "Last Name"?: string;
  university: string;
  Subjects: string[];
  Curiculum: string[];
  Description: string;
  "Success rate": number;
  profileImageUrl: string;
};

const TutorSection: React.FC<IProps> = async ({ data }) => {
  const val = await getTutorsByFilter(data.curriculum, data.subject, "en");
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="px-6 py-12 lg:py-16">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="mt-8">
        {data?.view === "Row View" ? (
          <ListView data={val} locale="en" />
        ) : (
          <GridView cardsData={val} locale="en" />
        )}
      </div>
    </div>
  );
};

export default TutorSection;
