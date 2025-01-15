"use client";
import React from "react";
import styles from "./Tag.module.css"; // Import styles
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { redirectToExternal } from "@/utils/helper";

interface TagProps {
  label: string;
  link?: string;
}

const Tag: React.FC<TagProps> = ({ label, link }) => {
  return (
    <Typography
      className={`${styles.tag} ${leagueSpartan.className}`}
      component={"p"}
      variant="caption"
      onClick={() => redirectToExternal(`${link}`)}
    >
      {label}
    </Typography>
  );
};

export default Tag;
