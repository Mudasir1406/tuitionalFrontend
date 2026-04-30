"use client";
import React, { useState, useEffect } from "react";
import { FormType } from "./home/form-dialouge";
import { leagueSpartan } from "@/app/fonts";
import dynamic from "next/dynamic";
import { cn } from "@/utils/cn";

const FormDialog = dynamic(() => import("./home/form-dialouge"), {
  ssr: false,
});

type IProps = {
  href: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  values?: FormType;
  userFormV1?: boolean;
};

const PopUpButton: React.FunctionComponent<IProps> = ({
  href,
  text,
  className,
  style,
  values,
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {open && mounted && (
          <FormDialog open={open} handleClose={handleClose} values={values} />
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

export default PopUpButton;
