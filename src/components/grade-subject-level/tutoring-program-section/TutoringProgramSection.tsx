import { leagueSpartan } from "@/app/fonts";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./TutoringProgramSection.module.css";
import Image from "next/image";
import PopUpButton from "@/components/pop-up-button";
import phone from "../../../../public/assets/images/static/phone-call.png";
import plan from "../../../../public/assets/images/static/plan.png";

interface props {
  data: {
    headerTag: string;
    header: string;
    paragraph: string;
    buttonTitle: string;
    link: string;
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
        component={data?.headerTag ? data.headerTag:'h3' as any}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>
      <Typography
        // clas={styles.desc}
        className={`${leagueSpartan.className} ${styles.description}`}
        component={"p"}
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: data?.paragraph,
        }}
      ></Typography>
      <div className={styles.contactContanier}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={2}
        >
          <Grid item lg={1} sm={12}>
            <div className={styles.imageContanier}>
              <Image
                src={plan.src}
                width={plan.width}
                height={plan.height}
                alt="plan"
                style={{
                  width: "60px",
                  height: "60px",
                  marginTop: "10px",
                  objectFit: "contain",
                }}
                quality={100}
              ></Image>
            </div>
          </Grid>
          <Grid item lg={8.5}>
            <Typography
              variant="subtitle1"
              //   sx={styles.admissionText}
              className={`${leagueSpartan.className} ${styles.heading}`}
            >
              Admissions are Open for the Next Year Batch
            </Typography>
          </Grid>

          <Grid item lg={2.5}>
            {data.link ? (
              <Button
                onClick={() => handleRedirect(data.link)}
                variant="outlined"
                sx={style.contactButton}
                className={leagueSpartan.className}
              >
                {data.buttonTitle}
              </Button>
            ) : (
              <PopUpButton
                text="Enroll Now!"
                href="popup"
                sx={style.contactButton}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TutoringProgramSection;

const style = {
  contactButton: {
    boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",

    fontSize: {
      xs: "4vw",
      sm: "2.1vw",
      md: "2vw",
      lg: "1.4vw",
    },
    borderRadius: "10px",
    letterSpacing: "-2%",
    fontWeight: 700,
    lineHeight: "23px",
    color: "#009BF5",
    textTransform: "none",
    paddingY: {
      xs: "15px",
      sm: "21px",
      md: "22px",
      lg: "22px",
    },
    paddingX: {
      xs: "25px",
      sm: "25px",
      md: "22px",
      lg: "25px",
    },
    ":hover": {
      backgroundColor: "white",
      borderRadius: "10px",
      letterSpacing: "-2%",
      boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    },
  },
};
