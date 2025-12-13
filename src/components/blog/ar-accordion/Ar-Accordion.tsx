"use client";
import React, { useState } from "react";
import styles from "./Ar-Accordion.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface AccordionProps {
  title: string;
  items: { name: string; id: string }[] | undefined;
}

const ArAccordion: React.FC<AccordionProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith('/ar');
  const blogBaseUrl = isArabicRoute ? '/ar/blog' : '/blog';

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header} onClick={toggleAccordion}>
        <Typography
          // sx={style.guidence}
          variant={"body2"}
          className={leagueSpartan.className}
          component={"b"}
        >
          {title}
        </Typography>

        <span className={styles.icon}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles.items}>
          {items?.map((item, index) => {
            const queryKey = title.toLowerCase() === 'category' || title.toLowerCase() === 'التصنيف' ? 'category' : 'tag';

            return (
              <a href={`${blogBaseUrl}/${queryKey}/${item.id}`} key={index}>
                <Typography
                  variant="caption"
                  className={`${leagueSpartan.className} ${styles.list}`}
                  component="li"
                >
                  {item?.name}
                </Typography>
              </a>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ArAccordion;