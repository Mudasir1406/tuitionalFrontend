import { Box, Grid } from "@mui/material";
import React from "react";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import Image from "next/image";
type IProps = {
  image: string;
  imageAltText: string;
};

const HeroInfo: React.FunctionComponent<IProps> = ({ image, imageAltText }) => {
  return (
    <>
      <Grid
        item
        lg={6}
        md={12}
        sm={12}
        xs={12}
        sx={{
          position: "relative",
          "::before": {
            content: "''",
            backgroundImage: `url(${image || subjectLevelImage.src})`,
            backgroundPosition: "bottom",
            backgroundSize: {
              xs: "contain",
              lg: "contain",
            },
            height: {
              xs: "100%",
              sm: "100%",
              md: "70vh",
              lg: "80vh",
            },
            width: "100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            bottom: 0,
            zIndex: "0",
            loading: "lazy",
          },
        }}
      >
        <Box sx={styles.container}></Box>
        <Image
          className="sr-only"
          alt={imageAltText}
          src={image}
          width={1}
          height={1}
          loading="lazy"
        ></Image>
      </Grid>
    </>
  );
};

export default HeroInfo;
const styles = {
  container: {
    width: "100%",
    height: {
      xs: "45vh",
      sm: "80vh",
      md: "70vh",
      lg: "80vh",
    },
    marginTop: {
      xs: "2.5vh",
      sm: "0vh",
      md: "1.5vh",
      lg: "1vh",
    },
    position: "relative",
  },
};
