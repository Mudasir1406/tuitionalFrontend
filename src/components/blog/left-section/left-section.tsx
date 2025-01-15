"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import dynamic from "next/dynamic";
import Input from "@/components/input/Input";
import { AccordionProps } from "../accordion/Accordion";
import { leagueSpartan } from "@/app/fonts";
import { Button } from "@mui/material";

const Accordion = dynamic(() => import("../accordion/Accordion"), {
  ssr: true,
});

interface Props {
  accordionData: AccordionProps[];
}

function LeftSection({ accordionData }: Props) {
  const [formData, setFormData] = useState({
    search: "",
  });

  const handleChange = (key: string, value: string | string[]) => {
    //   if (key === "lastName" && typeof value === "string") {
    //     newErrors.lastName = isNotEmpty(value) ? "" : "Last Name cannot be empty";
    //   }

    setFormData({
      ...formData,
      [key]: value,
    });
  };
  return (
    <div>
      <div>
        <Input
          name="search"
          value={formData.search}
          onChange={handleChange}
          placeholder={"Search Our Blog"}
          className={`${styles.input} ${leagueSpartan.className}`}
        />

        <Button
          variant="contained"
          type="submit"
          className={`${leagueSpartan.className} ${styles.containedButton}`}
        >
          Search
        </Button>
      </div>
      <div>
        {accordionData.map((data, index) => (
          <Accordion key={index} title={data.title} items={data.items} />
        ))}
      </div>
    </div>
  );
}

export default LeftSection;
