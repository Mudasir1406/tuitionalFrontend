import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import counsling from "../../../public/assets/images/static/Guidence.png";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";
import Tag from "../tag/Tag";

const EducationalCounseling: React.FunctionComponent<{
  data: PageData["why_igsce"];
}> = ({ data }) => {
  return (
    <div>
      <Box sx={{ paddingX: "5vw", paddingTop: "10vh" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box>
              <Typography
                sx={style.counseling}
                className={leagueSpartan.className}
                component={"p"}
                variant="subtitle2"
              >
                Educational Counseling
              </Typography>

              <Typography
                sx={style.guidence}
                variant={data.headerTag as any}
                className={leagueSpartan.className}
                component={data.headerTag as keyof JSX.IntrinsicElements}
                dangerouslySetInnerHTML={{
                  __html: data?.header,
                }}
              ></Typography>
              <Typography
                sx={style.desc}
                className={leagueSpartan.className}
                component={"p"}
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: data?.paragraph,
                }}
              ></Typography>
              {/* {data?.tags && ( */}
              <Box sx={style.btnDiv}>
                {data?.subjects && data?.subjects?.length > 0 && (
                  <div style={style.tagsDiv}>
                    <Typography
                      sx={style.guidence}
                      variant={"subtitle2"}
                      className={leagueSpartan.className}
                      component={"p"}
                    >
                      Key Focus Areas
                    </Typography>

                    <div>
                      {/* {data?.tags?.map((tag, index) => ( */}
                      {data?.subjects?.map((tag, index) => (
                        <Tag key={index} label={tag.name} index={index} />
                      ))}
                    </div>
                  </div>
                )}
                <div style={style.buttonDiv}>
                  <PopUpButton
                    sx={style.containedBtn}
                    text="Enroll Now"
                    href="popup"
                  />
                </div>
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
      sm: "3.6vw",
    },
    paddingY: {
      xs: "2vh",
      sm: "1.5vh",
    },
    color: "#1F90D1",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: { xs: "100%", md: "90%" },
    marginRight: "auto",
  },
  tagsDiv: {
    width: "50%",
  },
  guidence: {
    // fontWeight: "700",
    width: {
      xs: "80vw",
      lg: "40vw",
    },
    // fontSize: {
    //   xs: "3.1vh",
    //   sm: "3.5vh",
    //   md: "6vh",
    //   lg: "6vh",
    // },
    // lineHeight: {
    //   xs: "6vh",
    //   sm: "6.5vh",
    //   md: "7vh",
    //   lg: "7vh",
    // },
    paddingY: {
      xs: "2vh",
      sm: "2.5vh",
      md: "3vh",
      lg: "3vh",
    },
  },

  desc: {
    color: "#2D2D2D",
    // fontWeight: 400,
    width: {
      xs: "80vw",
      lg: "40vw",
    },
    // fontSize: {
    //   xs: "2vh",
    //   sm: "2.2vh",
    //   md: "2.4vh",
    //   lg: "2vh",
    // },
  },
  buttonDiv: {
    display: "flex",
    alignItems: "flex-end",
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
    marginY: "2vh",
    paddingX: {
      xs: "3vh",
      sm: "4vh",
    },
    textTransform: "none",
    borderRadius: "10px",

    width: {
      xs: "100%", // Wider on mobile
      sm: "100%",
      md: "100%",
      lg: "100%",
    },
    // width: {
    //   xs: "40%", // Wider on mobile
    //   sm: "60%",
    //   md: "60%",
    //   lg: "30%",
    // },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
};
