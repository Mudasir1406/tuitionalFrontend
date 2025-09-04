import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import success from "../../../public/assets/images/svg/success.svg";
import certificate from "../../../public/assets/images/svg/certificate.svg";
import equality from "../../../public/assets/images/svg/equality.svg";
import ethics from "../../../public/assets/images/svg/ethics.svg";
import growth from "../../../public/assets/images/svg/growth.svg";
import handshake from "../../../public/assets/images/svg/handshake.svg";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

type IProps = {
  heading: string;
  dec: string;
  icon: string;
};

const ArTeamValues: React.FunctionComponent = () => {
  return (
    <Box sx={{ marginBottom: { xs: 0, md: 0 } }} dir="rtl">
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.mainHeading}
          className={leagueSpartan.className}
          component={"h2"}
          variant="h2"
        >
          قيم فريقنا
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
          <InfoBox
            heading="النجاح معاً"
            dec="سواء كان ذلك لعملائنا أو لبعضنا البعض، نجعل دائماً وقتاً للمساعدة"
            icon="succeed"
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
          <InfoBox
            heading="كن مفيداً"
            dec={`سواء كان ذلك لعملائنا
أو لبعضنا البعض، نجعل دائماً
وقتاً للمساعدة`}
            icon="helpful"
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
          <InfoBox
            heading="اختر الأخلاق"
            dec="نختار أن نفعل ما هو صحيح، دائماً."
            icon="ethics"
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
          <InfoBox
            heading="اسع للمساواة"
            dec="لا شيء يعمل إلا إذا كنا نعامل بعضنا البعض با-ح-ت-ر-ا-م."
            icon="equality"
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
          <InfoBox
            heading="نقاش شغوف"
            dec={`نناقش الأمور، ونتبادل آراءنا
وخبراتنا حتى نتمكن جميعاً من
اكتساب وجهة نظر`}
            icon="debate"
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", sm: "auto" } }}>
          <InfoBox
            heading="تعلم ونمو"
            dec="نسعى دائماً لتطوير أنفسنا شخصياً ومهنياً."
            icon="grow"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArTeamValues;

const InfoBox: React.FunctionComponent<IProps> = ({ heading, dec, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.7)",
        width: { xs: "100%", sm: "322px", md: "360px", lg: "460px" },
        height: { xs: "200px", sm: "285px", md: "313px", lg: "413px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow:
          "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
        position: "relative",
        direction: "rtl",
      }}
    >
      <Box sx={styles.icon}>
        <Box
          sx={{
            height: {
              xs: "20px",
              sm: "30px",
              md: "45px",
              lg: "45px",
            },
            width: {
              xs: "20px",
              sm: "30px",
              md: "45px",
              lg: "45px",
            },
          }}
        >
          {icon === "succeed" && (
            <Image
              src={success.src}
              width={success.width}
              height={success.height}
              alt="نجاح"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "helpful" && (
            <Image
              src={handshake.src}
              width={handshake.width}
              height={handshake.height}
              alt="مصافحة"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "ethics" && (
            <Image
              src={ethics.src}
              width={ethics.width}
              height={ethics.height}
              alt="أخلاق"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "equality" && (
            <Image
              src={equality.src}
              width={equality.width}
              height={equality.height}
              alt="مساواة"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "debate" && (
            <Image
              src={certificate.src}
              width={certificate.width}
              height={certificate.height}
              alt="شهادة"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "grow" && (
            <Image
              src={growth.src}
              width={growth.width}
              height={growth.height}
              alt="نمو"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ height: "35%" }}>
        <Typography
          sx={styles.heading}
          variant="h5"
          className={leagueSpartan.className}
        >
          {heading}
        </Typography>
        <Typography
          sx={styles.dec}
          variant="body2"
          className={leagueSpartan.className}
        >
          {dec}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  heading: {
    marginBottom: { xs: "10px", sm: "15px", md: "18px", lg: "22px" },
    textAlign: "center",
  },
  dec: {
    textAlign: "center",
    maxWidth: { xs: "90%", sm: "90%", md: "280px", lg: "300px" },
    color: "rgba(0,0,0,0.77)",
    margin: "auto",
  },
  icon: {
    width: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    height: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "60px",
    boxShadow:
      " 0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526",
    marginBottom: { xs: "10px", sm: "20px", md: "30px", lg: "40px" },
  },
  mainHeading: {
    display: "flex",
    marginTop: {
      xs: "40px",
      sm: "50px",
      md: "70px",
      lg: "105px",
    },
    marginBottom: "20px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    "::before": {
      content: "''",
      position: "absolute",
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "19px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "20px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },
      backgroundRepeat: "no-repeat",
      top: {
        xs: -12,
        sm: -35,
        md: -35,
        lg: -35,
      },
      right: { // Changed from left for RTL
        xs: "11%",
        sm: "-6%",
        md: "-6%",
        lg: "-6%",
      },
    },
  },
  headingContanier: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
  },
};