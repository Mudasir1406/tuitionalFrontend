// "use client";
import React from "react";
import { Typography } from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import styles from "./style.module.css";

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

const Form: React.FunctionComponent<IProps> = async ({ data }) => {
  const val = await getTutorsByFilter(data.curriculum, data.subject, "en");

  return (
    <div className={styles.main}>
      {/* <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        component={"h5"}
        variant="subtitle1"
      >
        {data?.header}
      </Typography> */}

      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.headerTag ? data.headerTag : ("h3" as any)}
        component={data?.headerTag ? data.headerTag : ("h3" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>

      <div className={styles.mt1}>
        {data?.view === "Row View" ? (
          <ListView data={val} locale="en" />
        ) : (
          <GridView cardsData={val} locale="en" />
        )}
      </div>
    </div>
  );
};

export default Form;
