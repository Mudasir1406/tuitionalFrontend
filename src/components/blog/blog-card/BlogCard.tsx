"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import moment from "moment";

import { AllBlogsData } from "@/types/grade-subject-level.types";
import dummyImg1 from "../../../../public/assets/images/static/blogimg1.png";

export interface BlogsProps {
  title: string;
  paragraph: string;
  _id: string;
  image: string | StaticImageData;
  imageAlt?: string;
  createdAt: string;
}

interface Props {
  data: AllBlogsData;
}

function BlogCard({ data }: Props) {
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith("/ar");
  const blogBaseUrl = isArabicRoute ? "/ar/blog" : "/blog";

  return (
    <div className="flex flex-col rounded-xl bg-white p-3 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={data?.heroSection?.image || dummyImg1}
          alt={data?.heroSection?.imageAltText || ""}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-end justify-between gap-3 px-1 pt-4 pb-2">
        <div className="flex-1">
          <p className="font-heading text-small text-ink-700">
            {moment(data?.timestamp?.seconds * 1000).format("DD/MM/YYYY")}
          </p>
          <a href={`${blogBaseUrl}/${data?.slugData}`}>
            <p className="mt-2 font-heading text-h5 uppercase text-ink-900 hover:text-brand-500">
              {data?.heroSection?.header}
            </p>
          </a>
        </div>
        <a
          href={`${blogBaseUrl}/${data?.slugData}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_4px_12px_0_rgba(56,182,255,0.4)] hover:bg-brand-600"
          aria-label="Read more"
        >
          <ArrowUpRight size={22} />
        </a>
      </div>
    </div>
  );
}

export default BlogCard;
