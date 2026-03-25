"use client";

import { leagueSpartan } from "@/app/fonts";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./TutoringProgramSection.module.css";
import PopUpButton from "@/components/pop-up-button";

interface props {
  data: {
    headerTag: string;
    header: string;
    paragraph: string;
    buttonTitle: string;
    buttonLink: string;
  };
}

const handleRedirect = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

function TutoringProgramSection({ data }: props) {
  return (
    <div className={styles.main}>
      <Typography
        // clas={styles.guidence}
        variant={data.headerTag ? data?.headerTag : ("h3" as any)}
        className={`${leagueSpartan.className} ${styles.title}`}
        component={data?.headerTag ? data.headerTag : ("h3" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>
      <Typography
        className={`${leagueSpartan.className} ${styles.description}`}
        component={"p"}
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: data?.paragraph,
        }}
      ></Typography>

      {data?.buttonLink && data?.buttonLink === "popup" ? (
        <div className={styles.btnDiv}>
          <PopUpButton
            sx={style.contactButton}
            text={data?.buttonTitle}
            href="popup"
          />
        </div>
      ) : (
        <>
          {data?.buttonTitle && (
            <div className={styles.btnDiv}>
              <Button
                onClick={() => handleRedirect(data.buttonLink)}
                variant="contained"
                sx={style.contactButton}
                className={leagueSpartan.className}
              >
                {data.buttonTitle}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TutoringProgramSection;

const style = {
  contactButton: {
    boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(56, 182, 255, 1)",
    borderRadius: "10px",
    letterSpacing: "-2%",
    lineHeight: "23px",
    color: "white",
    textTransform: "none",
    paddingY: {
      xs: "1.5vh",
      sm: "1.5vh",
      md: "2vh",
      lg: "2vh",
    },
    paddingX: {
      xs: "25px",
      sm: "25px",
      md: "22px",
      lg: "25px",
    },
    ":hover": {
      backgroundColor: "rgba(56, 182, 255, 1)",
      borderRadius: "10px",
      letterSpacing: "-2%",
      boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    },
  },
};
