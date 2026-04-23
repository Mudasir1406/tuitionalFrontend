import React from "react";
import styles from "./Tag.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

type TagProps = {
  label: string;
  index: number;
  link?: string;
  isClickable?: boolean;
};

const Tag: React.FC<TagProps> = ({ label, index, link, isClickable }) => {
  // Define a fixed array of color classes
  const colorClasses = [
    styles.color1,
    styles.color2,
    styles.color3,
    styles.color4,
    styles.color5,
  ];

  // Determine the class based on the index
  const colorClass = colorClasses[index % colorClasses.length];
  const shouldRenderLink = isClickable !== false && Boolean(link);

  return (
    <>
      {shouldRenderLink ? (
        <a href={link}>
          <Typography
            className={`${leagueSpartan.className} ${styles.tag} ${colorClass}`}
            component={"p"}
            variant="caption"
          >
            {label}
          </Typography>
        </a>
      ) : (
        <Typography
          className={`${leagueSpartan.className} ${styles.tag} ${colorClass}`}
          component={"p"}
          variant="caption"
        >
          {label}
        </Typography>
      )}
    </>
  );
  // <div className={`${styles.tag} ${colorClass}`}>{label}</div>);
};

export default Tag;
