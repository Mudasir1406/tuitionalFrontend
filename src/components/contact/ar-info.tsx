import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { leagueSpartan } from "@/app/fonts";

type IProps = {
  heading: string;
  dec: string;
  icon: string;
};

const ArInfo: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }} dir="rtl">
      <Grid item>
        <ArInfoBox heading="العنوان" dec="مسجل في دولة الإمارات العربية المتحدة" icon="address" />
      </Grid>
      <Grid item>
        <ArInfoBox heading="الاتصال" dec={`+971 56 490 0376`} icon="phone" />
      </Grid>
      <Grid item>
        <ArInfoBox heading="البريد الإلكتروني" dec="hello@tuitionaledu.com" icon="email" />
      </Grid>
    </Grid>
  );
};

export default ArInfo;

const ArInfoBox: React.FunctionComponent<IProps> = ({ heading, dec, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F0FAFF",
        paddingY: {
          xs: "48px",
          sm: "50px",
          md: "70px",
          lg: "100px",
          xl: "100px",
          xxl: "100px",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow:
          "0px -3px 8px 0px #009BF526 inset, 0px 2px 1px 0px #0000000D",
        position: "relative",
        minWidth: { xs: "340px", sm: "340px", md: "340px", lg: "420px" },
        marginTop: { xs: "70px" },
      }}
    >
      <Box sx={styles.icon}>
        {icon === "email" && (
          <EmailOutlinedIcon
            sx={{ color: "#009BF5", width: "35px", height: "30px" }}
          />
        )}
        {icon === "phone" && (
          <LocalPhoneOutlinedIcon
            sx={{ color: "#009BF5", width: "35px", height: "30px" }}
          />
        )}
        {icon === "address" && (
          <PlaceOutlinedIcon
            sx={{ color: "#009BF5", width: "35px", height: "30px" }}
          />
        )}
      </Box>
      <Typography sx={styles.heading} className={leagueSpartan.className}>
        {heading}
      </Typography>
      <Typography sx={styles.dec} className={leagueSpartan.className}>
        {dec}
      </Typography>
    </Box>
  );
};

const styles = {
  infoBoxContanier: {},
  heading: {
    fontSize: {
      xs: "35px",
      sm: "30px",
      md: "35px",
      lg: "35px",
    },
    fontWeight: 500,
    lineHeight: {
      xs: "35px",
      sm: "35px",
      md: "35px",
      lg: "33px",
    },
    marginBottom: "22px",
    textAlign: "center",
  },
  dec: {
    fontSize: {
      xs: "18px",
      sm: "22px",
      md: "25px",
      lg: "25px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "27px",
      sm: "23px",
      md: "23px",
      lg: "23px",
    },
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: -50,
    zIndex: 10,
    width: { xs: "85px", sm: "95px", md: "100px", lg: "115px" },
    height: { xs: "85px", sm: "95px", md: "100px", lg: "115px" },
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "60px",
    boxShadow:
      " 0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526",
  },
};