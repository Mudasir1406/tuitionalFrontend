"use client";
import React, { useState } from "react";
import { FormType } from "./home/form-dialouge";
import { leagueSpartan } from "@/app/fonts";
import { Button, SxProps, Theme } from "@mui/material";
import dynamic from "next/dynamic";
import FormV2Dialog from "./grade-subject-level/form/formV2Dialog";
type IProps = {
  href: string;
  text: string;
  backgroundColor?: string;
  sx?: SxProps<Theme> | undefined;
  values?: FormType;
};

const PopUpButtonV2: React.FunctionComponent<IProps> = ({
  href,
  text,
  sx,
  values,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    if (href === "popup") {
      setOpen(true); // Open popup if href is "popup"
    }
  };
  return (
    <>
      <Button
        sx={sx}
        className={leagueSpartan.className}
        href={href !== "popup" ? href : undefined} // Only set href if not "popup"
        onClick={(e) => {
          if (href === "popup") {
            e.preventDefault(); // Prevent default link behavior for "popup"
          }
          handleClick();
        }}
      >
        {text}
      </Button>
      {open && (
        <FormV2Dialog open={open} handleClose={handleClose} values={values} />
      )}
    </>
  );
};

export default PopUpButtonV2;
