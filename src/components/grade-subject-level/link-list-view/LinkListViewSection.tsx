"use client";

import React from "react";
import { PageData } from "@/types/grade-subject-level.types";

type IProps = { data: PageData["link_list"] };

function ArrowCircleRightFilled({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 10v4h6v3l5-5-5-5v3H7z"
      />
    </svg>
  );
}

function LinkListViewSection({ data }: IProps) {
  const semanticParagraph = data?.paragraph
    ?.replace(/<b>/g, "<strong>")
    ?.replace(/<\/b>/g, "</strong>");

  const hasParagraph = !!semanticParagraph?.trim();
  const HeaderTag = (data?.headerTag || "h3").toLowerCase() as
    | "h2"
    | "h3"
    | "h4";

  return (
    <section className="flex flex-col overflow-hidden px-[5vw] py-0">
      <HeaderTag
        className="font-heading text-start text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-[1.3] mt-[2em] mb-[0.5em] text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />

      {hasParagraph && (
        <div
          className="font-heading text-start text-[clamp(1rem,2.5vw,1.125rem)] leading-[1.7] text-[#333] mt-[1.5em] mb-[1.25em] break-words
                     [&_ul]:list-outside [&_ul]:pl-[1.75rem] [&_ul]:mt-[1em] [&_ul]:mb-[1.25em]
                     max-[600px]:[&_ul]:pl-[1.25rem]
                     [&_li]:mb-[0.6em] [&_li]:leading-[1.65]
                     [&_h3]:text-[clamp(1.2rem,3vw,1.5rem)] [&_h3]:leading-[1.35] [&_h3]:font-semibold [&_h3]:mt-[1.5em] [&_h3]:mb-[0.4em]"
          dangerouslySetInnerHTML={{ __html: semanticParagraph! }}
        />
      )}

      <div className="grid grid-cols-1 gap-x-4 gap-y-5 my-[1.5em] min-[601px]:grid-cols-2 min-[961px]:grid-cols-3">
        {data?.subjects?.map((ls, i) => (
          <a
            key={i}
            href={ls.link}
            className="flex items-center gap-3 rounded-xl px-0 py-1 transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38b6ff]"
          >
            <ArrowCircleRightFilled className="shrink-0 text-[#38b6ff]" />
            <p
              className="font-heading text-[clamp(1rem,1.6vw,1.25rem)] font-medium leading-none text-ink-900 translate-y-[12px]"
              dangerouslySetInnerHTML={{ __html: ls.name }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default LinkListViewSection;
