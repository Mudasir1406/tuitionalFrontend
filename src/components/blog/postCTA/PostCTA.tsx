import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "@/components/pop-up-button";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import plan from "../../../../public/assets/images/static/plan.png";
import phone from "../../../../public/assets/images/static/phone-call.png";

function PostCTA() {
  return (
    <Box sx={styles.contactContanier}>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        spacing={2}
      >
        <Grid item lg={2.5}>
          <Box sx={styles.imageContanier}>
            <Image
              src={plan.src}
              width={plan.width}
              height={plan.height}
              alt="plan"
              style={{
                width: "50px",
                height: "60px",
                marginTop: "10px",
                objectFit: "contain",
              }}
              quality={100}
            ></Image>
          </Box>
        </Grid>
        <Grid item lg={6.5}>
          <Typography
            variant="subtitle1"
            sx={styles.admissionText}
            className={leagueSpartan.className}
          >
            Admissions are Open for the Next Year Batch
          </Typography>
        </Grid>
        {/* <Grid item lg={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={phone.src}
              width={phone.width}
              height={phone.height}
              alt="phone"
            ></Image>
            <Typography
              variant="subtitle1"
              sx={styles.phoneText}
              className={leagueSpartan.className}
            >
              +971 56 490 0376
            </Typography>
          </Box>
        </Grid> */}
        <Grid item lg={3}>
          <PopUpButton
            text="Enroll Now!"
            href="popup"
            sx={styles.contactButton}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PostCTA;

const styles = {
  imageContanier: {
    maxWidth: "90px",
    maxHeight: "90px",
    minWidth: "75px",
    minHeight: "75px",
    width: "9vh",
    height: "9vh",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  admissionText: {
    marginLeft: "10px",
    color: "white",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
    },
  },
  contactContanier: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(56, 182, 255, 1)",
    padding: {
      xs: "10px",
      sm: "20px",
      md: "25px",
      lg: "30px",
    },
    borderRadius: "5px",
    marginTop: "-70px",
    width: "auto",
  },
  phoneText: {
    // fontSize: {
    //   xs: "5vw",
    //   sm: "3vw",
    //   md: "1.5vw",
    //   lg: "1.5vw",
    // },
    // fontWeight: 700,
    // lineHeight: "23px",
    color: "white",
    marginX: "10px",
  },
  contactButton: {
    boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",

    borderRadius: "10px",
    letterSpacing: "-2%",
    // fontWeight: 700,
    lineHeight: "23px",
    color: "#009BF5",
    textTransform: "none",
    paddingY: {
      xs: "1.5vh",
      sm: "1.5vh",
      md: "2vh",
      lg: "2vh",
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
