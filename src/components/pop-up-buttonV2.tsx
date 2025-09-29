"use client";
import React, { useState, useEffect } from "react";
import { FormType } from "./home/form-dialouge";
import { leagueSpartan } from "@/app/fonts";
import { Button, SxProps, Theme } from "@mui/material";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const FormDialog = dynamic(() => import("./home/form-dialouge"), {
  ssr: false,
});
const ArFormDialog = dynamic(() => import("./home/ar-form-dialouge"), {
  ssr: false,
});
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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Always determine Arabic status consistently
  const isArabic = pathname.startsWith('/ar');

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {open && mounted && (
        isArabic ? (
          <ArFormDialog open={open} handleClose={handleClose} values={values} />
        ) : (
          <FormDialog open={open} handleClose={handleClose} values={values} />
        )
      )}
    </>
  );
};

export default PopUpButtonV2;
