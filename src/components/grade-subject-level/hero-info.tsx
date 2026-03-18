"use client";

import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import Image from "next/image";
type IProps = {
  image: string;
  imageAltText: string;
};

const HeroInfo: React.FunctionComponent<IProps> = ({ image, imageAltText }) => {
  const validSrc = image?.trim() && image.trim() !== "undefined" ? image.trim() : subjectLevelImage.src;
  const [src, setSrc] = useState(validSrc);

  return (
    <>
      <Grid
        item
        lg={6}
        md={12}
        sm={12}
        xs={12}
      >
        <Box sx={styles.container}>
          <Image
            alt={imageAltText || ""}
            src={src}
            fill
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 50vw"
            style={{ objectFit: "contain", objectPosition: "bottom" }}
            onError={() => setSrc(subjectLevelImage.src)}
          />
        </Box>
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
