"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

export interface AccordionProps {
  title: string;
  items: string[];
}

const Accordion: React.FC<AccordionProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          {items.map((item, index) => (
            <Typography
              // sx={style.guidence}
              variant={"caption"}
              className={leagueSpartan.className}
              component={"li"}
              key={index}
            >
              {item}
            </Typography>
            // <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Accordion;
