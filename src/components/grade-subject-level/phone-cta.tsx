import { leagueSpartan } from "@/app/fonts";
import { PageData } from "@/types/grade-subject-level.types";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { renderWithLineBreaks } from "../line-break-text";
import PopUpButton from "../pop-up-button";

type IProps = {
  data: PageData["phone_cta"];
};

const PhoneCta: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <Box sx={style.contanier}>
      <Box sx={style.inner}>
        {/* <Typography
          sx={style.finding}
          // component={data.headerTag as keyof JSX.IntrinsicElements}
          className={leagueSpartan.className}
          component={"div"}
        >
          <div
            className={leagueSpartan.className}
            dangerouslySetInnerHTML={{
              __html: data?.header,
            }}
          ></div>
        </Typography> */}
        <Typography
          sx={style.finding}
          className={leagueSpartan.className}
          component={"h2"}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></Typography>
        <Typography
          sx={style.description}
          className={leagueSpartan.className}
          component={"p"}
          dangerouslySetInnerHTML={{
            __html: data?.paragraph,
          }}
        ></Typography>
        {/* <Typography
          sx={style.description}
          className={leagueSpartan.className}
          component={"div"}
          // component={"p"}
        >
          <div
            className={leagueSpartan.className}
            dangerouslySetInnerHTML={{
              __html: data?.paragraph,
            }}
          ></div>
        </Typography> */}
        <Box sx={style.mobileContanier}>
          <TextField
            placeholder="Mobile Number with Country Code"
            InputProps={style.inputProps}
            sx={style.textField}
          />
          <PopUpButton
            sx={style.button}
            href={data.link}
            text={data?.buttonText}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PhoneCta;

const style = {
  button: {
    backgroundColor: "#38B6FF",
    boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20) inset",
    backgroundFilter: " blur(5px)",
    color: "#FFFFFF",
    width: {
      xs: "40%",
      lg: "40%",
    },
    height: {
      xs: "8vh",
      sm: "6vh",
      lg: "8.5vh",
    },
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    fontSize: {
      xs: "1.5vh",
      lg: "auto",
    },
    ":hover": {
      backgroundColor: "#38B6FF",
    },
  },
  textField: {
    width: {
      xs: "60%",
      lg: "70%",
    },
    border: "none",
  },
  inputProps: {
    className: leagueSpartan.className,
    sx: {
      fontSize: "20px",
      fontWeight: 400,
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
  mobileContanier: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: {
      xs: "8vh",
      sm: "6vh",
      lg: "8.5vh",
    },
    background: "#FFF",
    boxShadow:
      "0px -5px 15px 0px rgba(0, 0, 0, 0.20) inset, 0px 4px 10px 0px rgba(0, 0, 0, 0.25) inset",
    borderRadius: "2vh",
  },
  inner: { width: "100%", maxWidth: "145vh", textAlign: "center" },
  contanier: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: {
      sm: "2vh 4vh",
      xs: "2vh 2vh",
      lg: "0",
    },
  },
  finding: {
    fontSize: {
      xs: "3.5vh",
      lg: "4vh",
    },
    fontWeight: 600,
    textAlign: "center",
    // padding: {
    //   xs: "1vh 0",
    //   lg: "2vh 0 0 0",
    // },
  },
  description: {
    fontSize: {
      xs: "2vh",
      lg: "2.2vh",
    },
    fontWeight: 400,
    textAlign: {
      xs: "justify",
      lg: "center",
    },
    padding: {
      xs: "1.5vh 0",
      lg: "2vh 0",
    },
    color: "#2D2D2D",
  },
  width: "80vw",
};
