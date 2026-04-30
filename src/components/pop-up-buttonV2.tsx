"use client";
import React, { useState } from "react";
import { FormType } from "./home/form-dialouge";
import { leagueSpartan } from "@/app/fonts";
import FormV2Dialog from "./grade-subject-level/form/formV2Dialog";
import { cn } from "@/utils/cn";

type IProps = {
  href: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  values?: FormType;
};

const PopUpButtonV2: React.FunctionComponent<IProps> = ({
  href,
  text,
  className,
  style,
  values,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClick = (e: React.MouseEvent) => {
    if (href === "popup") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const baseClasses =
    "inline-flex cursor-pointer items-center justify-center text-center normal-case no-underline outline-none";

  if (href === "popup") {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          className={cn(baseClasses, leagueSpartan.className, className)}
          style={style}
        >
          {text}
        </button>
        {open && (
          <FormV2Dialog open={open} handleClose={handleClose} values={values} />
        )}
      </>
    );
  }

  return (
    <a
      href={href}
      className={cn(baseClasses, leagueSpartan.className, className)}
      style={style}
    >
      {text}
    </a>
  );
};

export default PopUpButtonV2;
