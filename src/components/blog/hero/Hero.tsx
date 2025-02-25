"use client";

import React, { useState } from "react";
import styles from "./Hero.module.css";
import { leagueSpartan } from "@/app/fonts";
import { Box, Button, TextField, Typography } from "@mui/material";
import PopUpButton from "@/components/pop-up-button";
import Image from "next/image";
import greenstar from "../../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../../public/assets/images/svg/greenstars.svg";
interface Props {
  slug?: string;
}

const Hero = ({ slug }: Props) => {
  const [formData, setFormData] = useState<{ phone: string }>({
    phone: "",
  });
  const handleChange = (key: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const handleClick = () => {};

  return (
    <div className={styles.heroContainer}>
      <Typography
        className={`${styles.expertText} ${leagueSpartan.className}`}
        variant="h1"
        component={"h1"}
      >
        {slug ? slug : "Our Blogs"}
      </Typography>

      <Typography
        className={`${styles.desc} ${leagueSpartan.className}`}
        variant="body2"
      >
        Your source for expert tips, academic strategies, and learning resources
        for Cambridge, AP, and more
      </Typography>

      <div className={styles.mobileContanier}>
        <TextField
          placeholder="Your Email*"
          //   sx={style.textField}
          className={styles.textField}
          value={formData.phone}
          onChange={(e) => {
            handleChange("phone", e.target.value);
          }}
        />
        <Button
          variant="contained"
          //   classN={styles.button}
          className={`${leagueSpartan.className} ${styles.button}`}
          onClick={() => handleClick()}
        >
          Subscribe!{" "}
        </Button>
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "row",
          },
          alignItems: {
            xs: "center",
            lg: "flex-start",
          },
          justifyContent: {
            xs: "center",
            lg: "start",
          },
          marginTop: { xs: "1vh", sm: "2vh", lg: "6vh" },

          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src={greenstar}
            alt="img"
            style={{ height: "3vh", width: "3vh" }}
          />
          <Typography
            sx={{
              //   fontSize: "2.3vh",
              padding: ".7vh 0 0 1vh",
              //   fontWeight: 600,
            }}
            className={leagueSpartan.className}
            component={"p"}
            variant="subtitle2"
          >
            Trustpilot
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // gap: "1rem",
          }}
        >
          <Typography
            sx={{
              // fontSize: { lg: "2vh", xs: "1.7vh" },
              // fontWeight: 400,
              padding: "1vh 0 0 0",
            }}
            className={leagueSpartan.className}
            component={"p"}
            variant="caption"
          >
            Excellent (4.7/5)
          </Typography>
          <Image
            src={greenstars}
            alt="img"
            style={{
              height: "3vh",
              width: "14vh",
              padding: ".7vh 0 0 2vh",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Hero;

const style = {};
