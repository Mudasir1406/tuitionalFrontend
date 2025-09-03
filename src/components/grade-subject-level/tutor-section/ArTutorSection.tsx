import React from "react";
import { Typography } from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import styles from "./style.module.css";

import ArGridView from "./grid-view/ArGridView";
import ListView from "./list-view/ListView";
import { tutor_section } from "@/types/grade-subject-level.types";
import { getTutorsByFilterWithMapping } from "@/services/grade-subject-level/tutor-mapping";

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

const ArTutorSection: React.FunctionComponent<IProps> = async ({ data }) => {
  const val = await getTutorsByFilterWithMapping(data.curriculum, data.subject);

  return (
    <div className={styles.main} style={{ direction: "rtl" }}>
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.headerTag ? data.headerTag : ("h3" as any)}
        component={data?.headerTag ? data.headerTag : ("h3" as any)}
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>

      <div className={styles.mt1}>
        {data?.view === "Row View" ? (
          <ListView data={val} />
        ) : (
          <ArGridView cardsData={val} />
        )}
      </div>
    </div>
  );
};

export default ArTutorSection;
