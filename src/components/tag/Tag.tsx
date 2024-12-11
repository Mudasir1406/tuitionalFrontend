import React from "react";
import styles from "./Tag.module.css";

type TagProps = {
  label: string;
  index: number;
};

const Tag: React.FC<TagProps> = ({ label, index }) => {
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

  return <div className={`${styles.tag} ${colorClass}`}>{label}</div>;
};

export default Tag;
