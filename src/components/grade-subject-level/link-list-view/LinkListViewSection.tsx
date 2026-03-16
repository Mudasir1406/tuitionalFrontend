"use client";

import React from "react";
import styles from "./LinkListViewSection.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { PageData } from "@/types/grade-subject-level.types";
import { ArrowCircleRight } from "@mui/icons-material";

type IProps = { data: PageData["link_list"] };

function LinkListViewSection({ data }: IProps) {
  // Replace <b> with <strong> for semantic SEO (screen readers + crawlers treat <strong> as important)
  const semanticParagraph = data?.paragraph
    ?.replace(/<b>/g, "<strong>")
    ?.replace(/<\/b>/g, "</strong>");

  return (
    <section className={styles.main}>
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.headerTag ? data.headerTag : ("h3" as any)}
        component={data?.headerTag ? data.headerTag : ("h3" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>

      <Typography
        className={`${leagueSpartan.className} ${styles.description}`}
        component={"div"}
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: semanticParagraph,
        }}
      ></Typography>

      <div className={styles.list}>
        {data?.subjects?.map((ls, i) => (
          // <div
          //   className={styles.item}
          //   key={i}
          //   onClick={() => redirectToExternal(ls.link, false)}
          // >
          //   <ArrowCircleRight style={{ color: "#38b6ff" }} />
          //   <Typography
          //     className={leagueSpartan.className}
          //     component={"p"}
          //     variant="caption"
          //     dangerouslySetInnerHTML={{
          //       __html: ls.name,
          //     }}
          //   ></Typography>
          // </div>
          <a href={ls.link} className={styles.item} key={i}>
            <ArrowCircleRight style={{ color: "#38b6ff" }} />
            <Typography
              className={leagueSpartan.className}
              component={"p"}
              variant="caption"
              dangerouslySetInnerHTML={{ __html: ls.name }}
            ></Typography>
          </a>
        ))}
      </div>
    </section>
  );
}

export default LinkListViewSection;
