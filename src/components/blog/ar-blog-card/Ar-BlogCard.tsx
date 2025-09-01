"use client";
import React from "react";
import styles from "./Ar-BlogCard.module.css";
import Image, { StaticImageData } from "next/image";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { redirectToExternal } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import moment from "moment";
import dummyImg1 from "../../../../public/assets/images/static/blogimg1.png";
import Link from "next/link";

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
  console.log("blogCard Image", data?.heroSection?.image);
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith('/ar');
  const blogBaseUrl = isArabicRoute ? '/ar/blog' : '/blog';
  return (
    <div className={`${styles.card} ${styles.cardRTL}`}>
      {/* <Image
        src={data?.heroSection?.image}
        alt={data?.heroSection?.imageAltText ? data?.heroSection?.imageAltText : ""}
        className={styles.image}
        fill
      /> */}
      <div className={styles.imageWrapper}>
        <Image
          src={data?.heroSection?.image || dummyImg1}
          alt={data?.heroSection?.imageAltText || ""}
          className={styles.image}
          fill
        />
      </div>
      <div className={`${styles.textDiv} ${styles.textDivRTL}`}>
        <div className={`${styles.textDiv_text} ${styles.textDiv_textRTL}`}>
          <Typography
            className={`${styles.date} ${styles.dateRTL} ${leagueSpartan.className}`}
            variant="body1"
            component={"p"}
          >
            {moment(data?.timestamp?.seconds * 1000).format("DD/MM/YYYY")}
          </Typography>
          <a href={`${blogBaseUrl}/${data?.slugData}`}>
            <Typography
              className={`${styles.title} ${styles.titleRTL} ${leagueSpartan.className}`}
              variant="subtitle2"
              component={"p"}
              // onClick={() => redirectToExternal(`/blog/${data?.slugData}`)}
            >
              {data?.heroSection?.header}
            </Typography>
          </a>
        </div>

        <div className={`${styles.textDiv_text} ${styles.textDiv_textRTL}`}>
          <a href={`${blogBaseUrl}/${data?.slugData}`}>
            <div
              className={`${styles.iconDiv} ${styles.iconDivRTL}`}
              // onClick={() => redirectToExternal(`/blog/${data?.id}`)}
            >
              <NorthEastIcon />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArBlogCard;