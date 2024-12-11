import { leagueSpartan } from "@/app/fonts";
import { Box, Grid, Typography } from "@mui/material";
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

function TutoringProgramSection({ data }: props) {
  return (
    <div>
      <Typography
        // clas={styles.guidence}
        variant={data.headerTag as any}
        className={`${leagueSpartan.className} ${styles.title}`}
        component={data.headerTag as keyof JSX.IntrinsicElements}
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
          <Grid item lg={5.5}>
            <Typography
              variant="subtitle1"
              //   sx={styles.admissionText}
              className={leagueSpartan.className}
            >
              Admissions are Open for the Next Year Batch
            </Typography>
          </Grid>
          <Grid item lg={3}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={phone.src}
                width={phone.width}
                height={phone.height}
                alt="phone"
              ></Image>
              <Typography
                variant="subtitle1"
                // sx={styles.phoneText}
                className={leagueSpartan.className}
              >
                +971 56 490 0376
              </Typography>
            </div>
          </Grid>
          <Grid item lg={2.5}>
            <PopUpButton
              text="Enroll Now!"
              href="popup"
              //   sx={styles.contactButton}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TutoringProgramSection;
