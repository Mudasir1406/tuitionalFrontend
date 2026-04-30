"use client";
import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";

interface IProps {
  data: PageData["popular_subjects"];
}

const PopularSubjects: React.FunctionComponent<IProps> = ({ data }) => {
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="px-[5vw]">
      <HeaderTag
        className={`${leagueSpartan.className} mx-auto mb-[2.5vh] text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900`}
        dangerouslySetInnerHTML={{ __html: data?.header }}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
        {data?.subjects?.map(
          (
            item: {
              icon: string | StaticImport;
              name: React.ReactNode;
            },
            index: React.Key | null | undefined,
          ) => (
            <div
              key={index}
              className="flex h-[5vh] cursor-pointer items-center justify-start gap-2.5 rounded-[2vh] bg-white p-[2vh] text-center backdrop-blur-[5px] shadow-[0px_-2.171px_6.514px_0px_rgba(0,0,0,0.20)_inset] transition-all duration-500 hover:scale-105 hover:bg-[#9EDCFF] lg:h-[5vh] lg:p-[3vh]"
            >
              <Image
                src={
                  item?.icon ||
                  "https://firebasestorage.googleapis.com/v0/b/tuitional-website.appspot.com/o/images%2FGroup%201577707240.png?alt=media&token=688d2e56-d995-4c40-b8ad-ae9837138df7"
                }
                alt="icon"
                width={40}
                height={40}
              />
              <p
                className={`${leagueSpartan.className} font-heading text-caption text-ink-900`}
              >
                {item.name}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
export default PopularSubjects;
