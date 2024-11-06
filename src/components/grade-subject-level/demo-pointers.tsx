import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import tutors from "../../../public/assets/images/static/tutoring.webp";
import icon from "../../../public/assets/images/svg/blueminusicon.svg";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";

interface IProps {
  data: PageData["demo_pointers"];
}

const DemoPointers: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <>
      <Box sx={style.contanier}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box>
              <Typography
                className={leagueSpartan.className}
                sx={style.tutorheading}
                // component={data?.headerTag as keyof JSX.IntrinsicElements}
                component={"div"}
              >
                <div
                  className={leagueSpartan.className}
                  dangerouslySetInnerHTML={{
                    __html: data?.header,
                  }}
                ></div>
              </Typography>
              <Box sx={style.imageContanier}>
                <Image
                  src={tutors.src}
                  alt="image"
                  style={style.image}
                  width={tutors.width}
                  height={tutors.height}
                />
              </Box>
              <PopUpButton
                sx={style.containButton}
                href={data.buttonLink}
                text={data?.buttonText}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={2}>
              {data?.demoPointersData?.map(
                (box, index: React.Key | null | undefined) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={style.boxes}>
                      <Box>
                        <Typography
                          sx={style.titlebox}
                          className={leagueSpartan.className}
                          // component={"h2"}
                          component={"div"}
                        >
                          <div
                            className={leagueSpartan.className}
                            dangerouslySetInnerHTML={{
                              __html: box.header,
                            }}
                          ></div>
                        </Typography>
                        <Typography
                          sx={style.desc}
                          className={leagueSpartan.className}
                          // component={"p"}
                          component={"div"}
                        >
                          <div
                            className={leagueSpartan.className}
                            dangerouslySetInnerHTML={{
                              __html: box.body,
                            }}
                          ></div>
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: "block", sm: "block" } }}>
                        <Image
                          src={icon}
                          alt="icon"
                          style={{ height: "5vh", width: "5vh" }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DemoPointers;

const style = {
  contanier: { margin: { lg: "6vh 7vh", xs: "3vh", sm: "0 5vh" } },
  tutorheading: {
    fontSize: {
      xs: "3vh",
      sm: "4vh",
      md: "4vh",
      lg: "5vh",
    },
    width: {
      xs: "auto",
      // sm: "66vh",
    },
    fontWeight: 600,
    textAlign: { xs: "center", sm: "left", lg: "left" },
  },
  image: {
    width: "100%",
    // maxWidth: "43vw",
    height: "100%",
  },
  imageContanier: { textAlign: { xs: "center", sm: "left" } },
  boxes: {
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: { xs: "row", sm: "row" },
    justifyContent: "space-between",
    background: "#D3EFFF",
    backdropFilter: "blur(10px)",
    borderRadius: "2vh",
    mb: { xs: 2, sm: 0 },
    alignItems: "center",
    boxShadow: "0px -5px 15px 0px rgba(56, 182, 255, 0.2) inset",
  },
  titlebox: {
    marginBottom: 1,
    fontSize: {
      xs: "2vh",
      sm: "2.1vh",
    },
    color: "#2D2D2D",
    fontWeight: 600,
  },
  desc: {
    color: "#505050",
    fontSize: {
      xs: "1.7vh",
      sm: "1.8vh",
    },
    fontWeight: 400,
    width: "90%",
    textWrap: "pretty",
  },
  containButton: {
    backgroundColor: "#38B6FF",
    color: "#FFF",
    width: { xs: "88%", sm: "60%" },
    height: "8vh",
    borderRadius: "2vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2vh",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    marginLeft: "6vw",
    marginTop: "2vh",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",
    },
  },
};
