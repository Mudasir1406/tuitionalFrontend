import React from "react";
import styles from "./Tag.module.css"; // Import styles

const tagColors: any = {
  abtesting: "bg-purple-100 text-purple-700",
  splittestingbasics: "bg-green-100 text-green-700",
  pagetesting: "bg-red-100 text-red-700",
  splittesting: "bg-pink-100 text-pink-700",
  marketingtools: "bg-yellow-100 text-yellow-700",
  conversion: "bg-blue-100 text-blue-700",
  landingpages: "bg-indigo-100 text-indigo-700",
  datadriven: "bg-orange-100 text-orange-700",
};

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  const colorClass =
    tagColors[label.toLowerCase()] || "bg-gray-100 text-gray-700"; // Default color

  return <span className={`${styles.tag} ${colorClass}`}>{label}</span>;
};

export default Tag;
