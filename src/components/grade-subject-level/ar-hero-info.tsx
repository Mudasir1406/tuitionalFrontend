import { Box, Grid } from "@mui/material";
import React from "react";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import Image from "next/image";

type IProps = {
  image: string;
  imageAltText: string;
};

const ArHeroInfo: React.FunctionComponent<IProps> = ({ image, imageAltText }) => {
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
          direction: "ltr", // Keep images in LTR for proper display
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
        />
      </Grid>
    </>
  );
};

export default ArHeroInfo;

const styles = {
  container: {
    display: {
      xs: "none",
      sm: "none",
      md: "flex",
      lg: "flex",
    },
  },
};