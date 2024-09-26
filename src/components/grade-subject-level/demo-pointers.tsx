import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import tutors from "../../../public/assets/images/static/tutoring.png";
import icon from "../../../public/assets/images/svg/blueminusicon.svg";
import { PageData } from "@/types/grade-subject-level.types";

interface IProps {
  data: PageData["demo_pointers"];
}

const DemoPointers: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <>
      <Box sx={{ margin: { lg: "6vh 7vh", xs: "3vh", sm: "0 5vh" } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box>
              <Typography
                sx={style.tutorheading}
                component={data?.headerTag as keyof JSX.IntrinsicElements}
              >
                {data?.header}
              </Typography>
              <Box sx={{ my: 2, textAlign: { xs: "center", sm: "left" } }}>
                <Image src={tutors} alt="image" style={style.image} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 2,
                  mb: 3,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#38B6FF",
                    filter:
                      "drop-shadow(1px 15px 34px rgba(56, 182, 255, 0.40))",
                    color: "#FFF",
                    width: { xs: "100%", sm: "50vh" },
                    height: "8vh",
                    borderRadius: "2vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2vh",
                  }}
                >
                  {data?.buttonText}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={2}>
              {data?.demoPointersData?.map(
                (box, index: React.Key | null | undefined) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={style.boxes}>
                      <Box>
                        <Typography sx={style.titlebox}>
                          {box.header}
                        </Typography>
                        <Typography sx={style.desc}>{box.body}</Typography>
                      </Box>
                      <Box sx={{ display: { xs: "block", sm: "block" } }}>
                        <Image
                          src={icon}
                          alt="icon"
                          style={{ height: "6vh", width: "6vh" }}
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
  tutorheading: {
    fontSize: {
      xs: "3vh",
      sm: "4vh",
      md: "4vh",
      lg: "5vh",
    },
    width: {
      xs: "auto",
      sm: "66vh",
    },
    fontWeight: 600,
    textAlign: { xs: "center", sm: "left", lg: "left" },
  },
  image: {
    height: "auto",
    width: "100%",
    maxWidth: "70vh",
  },
  boxes: {
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: { xs: "row", sm: "row" },
    justifyContent: "space-between",
    background: "#D3EFFF",
    boxShadow: "0px -5px 15px 0px rgba(56, 182, 255, 0.20)",
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
    mb: { xs: 2, sm: 0 },
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
    width: {
      xs: "100%",
      sm: "55.5vh",
      md: "72.5vh",
      lg: "72.5vh",
    },
  },
};
