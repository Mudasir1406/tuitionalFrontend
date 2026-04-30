"use client";

import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { PageData } from "@/types/grade-subject-level.types";

type IProps = { data: PageData["link_list"] };

function LinkListViewSection({ data }: IProps) {
  const semanticParagraph = data?.paragraph
    ?.replace(/<b>/g, "<strong>")
    ?.replace(/<\/b>/g, "</strong>");

  const hasParagraph = !!semanticParagraph?.trim();
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <section className="px-6 py-12 lg:py-16">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />

      {hasParagraph && (
        <div
          className="mx-auto mt-6 max-w-3xl text-center font-heading text-body text-ink-700"
          dangerouslySetInnerHTML={{ __html: semanticParagraph! }}
        />
      )}

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data?.subjects?.map((ls, i) => (
          <a
            key={i}
            href={ls.link}
            className="flex items-center gap-2 rounded-md bg-white p-4 shadow-card hover:bg-brand-50"
          >
            <ArrowRightCircle className="text-brand-500 shrink-0" size={24} />
            <p
              className="font-heading text-[0.9rem] sm:text-[1.4rem] md:text-[1.7rem] text-ink-900"
              dangerouslySetInnerHTML={{ __html: ls.name }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default LinkListViewSection;
