"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import Link from "next/link";

export interface AccordionProps {
  title: string;
  items: { name: string; id: string }[] | undefined;
}

const Accordion: React.FC<AccordionProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const handleRedirect = (item: string) => {
    const queryKey = encodeURIComponent(
      title.toLowerCase().replace(/\s+/g, "-")
    );
    const queryValue = encodeURIComponent(
      item.toLowerCase().replace(/\s+/g, "-")
    );

    // Build the URL
    const newUrl = `/blog/${queryKey}/${queryValue}`;
    window.location.href = newUrl; // Redirect to the new URL
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
          {/* {items?.map((item, index) => (
            <Link href={} key={index}>
              <Typography
                // sx={style.guidence}
                variant={"caption"}
                className={`${leagueSpartan.className} ${styles.list}`}
                component={"li"}
                onClick={() => handleRedirect(item.name)} // Handle click and redirect
                key={index}
              >
                {item?.name}
              </Typography>
            </Link>
          ))} */}
          {items?.map((item, index) => {
            const queryKey = encodeURIComponent(
              title.toLowerCase().replace(/\s+/g, "-")
            );
            const queryValue = encodeURIComponent(
              item.name.toLowerCase().replace(/\s+/g, "-")
            );

            return (
              <a href={`/blog/${queryKey}/${queryValue}`} key={index}>
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

export default Accordion;
