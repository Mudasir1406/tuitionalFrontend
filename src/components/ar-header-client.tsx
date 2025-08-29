"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDrawer } from "../context/drawer-context";
import { leagueSpartan } from "@/app/fonts";

import dynamic from "next/dynamic";
const FormDialog = dynamic(() => import("./home/form-dialouge"), {
  ssr: false,
});

const ArHeaderClient: React.FC = () => {
  const { toggleDrawer } = useDrawer();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={styles.containedBtn}
        className={leagueSpartan.className}
        onClick={handleClick}
      >
        احجز حصة تجريبية
      </Button>
      <MenuRoundedIcon onClick={toggleDrawer} sx={styles.menu} />
      {open && <FormDialog open={open} handleClose={handleClose} />}
    </>
  );
};

export default ArHeaderClient;

const styles = {
  containedBtn: {
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: 600,
    textTransform: "none" as const,
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
    "@media (max-width: 1200px)": {
      display: "none",
    },
  },
  menu: {
    color: "#333",
    cursor: "pointer",
    display: "none",
    "@media (max-width: 1200px)": {
      display: "block",
    },
  },
};