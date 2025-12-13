"use client";
import React from "react";
import styles from "./Ar-Tag.module.css"; // Import styles
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { redirectToExternal } from "@/utils/helper";
import Link from "next/link";

interface TagProps {
  label: string;
  link?: string;
}

const ArTag: React.FC<TagProps> = ({ label, link }) => {
  return (
    <a href={`${link}`}>
      <Typography
        className={`${styles.tag} ${leagueSpartan.className}`}
        component={"p"}
        variant="caption"
        // onClick={() => redirectToExternal(`${link}`)}
      >
        {label}
      </Typography>
    </a>
  );
};

export default ArTag;