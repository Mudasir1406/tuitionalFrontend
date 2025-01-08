import React from "react";
import styles from "./BlogCard.module.css";
import Image from "next/image";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

interface Props {
  data: {
    date: string;
    title: string;
    paragraph: string;
    _id: string;
    image: string;
    imageAlt: string;
    createdAt: string;
  };
}

function BlogCard({data}:Props) {
  return <div className={styles.card}>
    <Image src={data?.image} alt={data?.imageAlt} className={styles.image}/>

    <Typography
            className={`${styles.expertText} ${leagueSpartan.className}`}
            >
              Home
            </Typography>
  </div>;
}

export default BlogCard;
