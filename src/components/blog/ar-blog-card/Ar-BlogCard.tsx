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

function ArBlogCard({ data }: Props) {
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith("/ar");
  const blogBaseUrl = isArabicRoute ? "/ar/blog" : "/blog";

  return (
    <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-card" dir="rtl">
      <div className="relative h-48 w-full">
        <Image
          src={data?.heroSection?.image || dummyImg1}
          alt={data?.heroSection?.imageAltText || ""}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-2 p-4">
        <div className="flex-1">
          <p className="font-heading text-small text-ink-700">
            {moment(data?.timestamp?.seconds * 1000).format("DD/MM/YYYY")}
          </p>
          <a href={`${blogBaseUrl}/${data?.slugData}`}>
            <p className="mt-1 font-heading text-h5 text-ink-900 hover:text-brand-500">
              {data?.heroSection?.header}
            </p>
          </a>
        </div>
        <a
          href={`${blogBaseUrl}/${data?.slugData}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-500 rtl:rotate-90"
          aria-label="اقرأ المزيد"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}

export default ArBlogCard;
