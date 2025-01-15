"use client";
import React from "react";
import styles from "./BlogCard.module.css";
import Image, { StaticImageData } from "next/image";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { redirectToExternal } from "@/utils/helper";
import { usePathname } from "next/navigation";

export interface BlogsProps {
  title: string;
  paragraph: string;
  _id: string;
  image: string | StaticImageData;
  imageAlt?: string;
  createdAt: string;
}

interface Props {
  data: BlogsProps;
}

function BlogCard({ data }: Props) {
  const pathname = usePathname();
  return (
    <div className={styles.card}>
      <Image
        src={data?.image}
        alt={data?.imageAlt ? data?.imageAlt : ""}
        className={styles.image}
      />
      <div className={styles.textDiv}>
        <div className={styles.textDiv_text}>
          <Typography
            className={`${styles.date} ${leagueSpartan.className}`}
            variant="body1"
            component={"p"}
          >
            {data?.createdAt}
          </Typography>
          <Typography
            className={`${styles.title} ${leagueSpartan.className}`}
            variant="subtitle2"
            component={"p"}
            onClick={() => redirectToExternal(`${pathname}/${data?._id}`)}
          >
            {data?.title}
          </Typography>
          {/* <Typography
            className={`${styles.text} ${leagueSpartan.className}`}
            variant="caption"
            component={"p"}
          >
            {data?.paragraph}
          </Typography> */}
        </div>

        <div className={styles.textDiv_text}>
          <div className={styles.iconDiv}>
            <NorthEastIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
