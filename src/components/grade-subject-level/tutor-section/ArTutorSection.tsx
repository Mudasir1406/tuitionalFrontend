import React from "react";

import ArGridView from "./grid-view/ArGridView";
import ListView from "./list-view/ListView";
import { tutor_section } from "@/types/grade-subject-level.types";
import { getTutorsByFilterWithMapping } from "@/services/grade-subject-level/tutor-mapping";

type IProps = {
  data: tutor_section;
};

const ArTutorSection: React.FC<IProps> = async ({ data }) => {
  const val = await getTutorsByFilterWithMapping(data.curriculum, data.subject, "ar");
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="px-6 py-12 lg:py-16" dir="rtl">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="mt-8">
        {data?.view === "Row View" ? (
          <ListView data={val} locale="ar" />
        ) : (
          <ArGridView cardsData={val} locale="ar" />
        )}
      </div>
    </div>
  );
};

export default ArTutorSection;
