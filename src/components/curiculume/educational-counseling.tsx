import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import counsling from "../../../public/assets/images/static/Guidence.png";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import { renderWithLineBreaks } from "../line-break-text";
import PopUpButton from "../pop-up-button";

const EducationalCounseling: React.FunctionComponent<{
  data: PageData["education_counseling"];
}> = ({ data }) => {
  return (
    <div>
      <Box sx={{ paddingX: "5vw", paddingTop: "10vh" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography
                sx={style.counseling}
                className={leagueSpartan.className}
                // component={"p"}
                component={"div"}
              >
                Educational Counseling
              </Typography>
              {/* <Typography
                sx={style.guidence}
                className={leagueSpartan.className}
                component={"div"}
                // component={data.headerTag as keyof JSX.IntrinsicElements}
              >
                <div
                  className={leagueSpartan.className}
                  dangerouslySetInnerHTML={{
                    __html: data?.header,
                  }}
                ></div>
              </Typography> */}
              <Typography
                sx={style.guidence}
                className={leagueSpartan.className}
                component={"h3"}
                dangerouslySetInnerHTML={{
                  __html: data?.header,
                }}
              ></Typography>
              <Typography
                sx={style.desc}
                className={leagueSpartan.className}
                component={"p"}
                dangerouslySetInnerHTML={{
                  __html: data?.paragraph,
                }}
              ></Typography>

              {/* <Typography
                sx={style.desc}
                className={leagueSpartan.className}
                // component={"p"}
                component={"div"}
              >
                <div
                  className={leagueSpartan.className}
                  dangerouslySetInnerHTML={{
                    __html: data?.paragraph,
                  }}
                ></div>
              </Typography> */}
              <Box>
                <PopUpButton
                  sx={style.containedBtn}
                  text="Enroll Now"
                  href="popup"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} alignItems="end">
            <Box>
              <Image
                src={counsling}
                alt="Counseling Image"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default EducationalCounseling;

const style = {
  counseling: {
    background: "#B8E1F9",
    borderRadius: "5vh",
    width: {
      xs: "53%",
      sm: "28vh",
      md: "30vh",
      lg: "22vh",
    },
    fontSize: {
      xs: "2vh",
      sm: "2.5vh",
      md: "2.2vh",
      lg: "2vh",
    },
    paddingX: {
      xs: "3vh",
      sm: "4vw",
    },
    paddingY: {
      xs: "2vh",
      sm: "1.5vh",
    },
    color: "#1F90D1",
  },

  guidence: {
    fontWeight: "700",
    width: {
      xs: "80vw",
      lg: "40vw",
    },
    fontSize: {
      xs: "3.1vh",
      sm: "3.5vh",
      md: "6vh",
      lg: "6vh",
    },
    lineHeight: {
      xs: "6vh",
      sm: "6.5vh",
      md: "7vh",
      lg: "7vh",
    },
    paddingY: {
      xs: "2vh",
      sm: "2.5vh",
      md: "3vh",
      lg: "3vh",
    },
  },

  desc: {
    color: "#2D2D2D",
    fontWeight: 400,
    width: {
      xs: "80vw",
      lg: "40vw",
    },
    fontSize: {
      xs: "2vh",
      sm: "2.2vh",
      md: "2.4vh",
      lg: "2vh",
    },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    color: "white",
    fontSize: {
      xs: "1.8vh",
      sm: "2vh",
      md: "2vh",
      lg: "2vh",
    },
    fontWeight: 700,
    paddingY: {
      xs: "1.5vh",
      sm: "2vh",
      lg: "1.5vh",
    },
    marginY: "4vh",
    paddingX: {
      xs: "3vh",
      sm: "4vh",
    },
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "40%", // Wider on mobile
      sm: "60%",
      md: "60%",
      lg: "30%",
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
};
