"use client";

import { leagueSpartan } from "@/app/fonts";
import { PageData } from "@/types/grade-subject-level.types";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { renderWithLineBreaks } from "../line-break-text";
import PopUpButton from "../pop-up-button";
import { FormType } from "../home/form-dialouge";

type IProps = {
  data: PageData["phone_cta"];
};

const ArPhoneCta: React.FunctionComponent<IProps> = ({ data }) => {
  const [formData, setFormData] = useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    message: "",
    sheetName: "Lead Forms",
  });
  const handleChange = (key: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  return (
    <Box sx={style.contanier}>
      <Box sx={style.inner}>
        <Typography
          sx={style.finding}
          variant={data.headerTag ? data.headerTag : ("h3" as any)}
          component={data.headerTag ? data.headerTag : ("h3" as any)}
          className={leagueSpartan.className}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></Typography>
        <Typography
          sx={style.description}
          variant="body2"
          className={leagueSpartan.className}
          component={"p"}
          dangerouslySetInnerHTML={{
            __html: data?.paragraph,
          }}
        ></Typography>

        <Box sx={style.mobileContanier}>
          <TextField
            placeholder="رقم الهاتف مع رمز الدولة"
            InputProps={style.inputProps}
            sx={style.textField}
            value={formData.PhoneNumber}
            onChange={(e) => {
              handleChange("PhoneNumber", e.target.value);
            }}
          />
          <PopUpButton
            sx={style.button}
            href={data.link}
            text={data?.buttonText}
            values={formData}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ArPhoneCta;

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
    borderTopLeftRadius: "14px", // RTL: changed from borderTopRightRadius
    borderBottomLeftRadius: "14px", // RTL: changed from borderBottomRightRadius
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
    "& input": {
      textAlign: "right" as const, // RTL: right align text input
      direction: "rtl" as const,
    },
  },
  inputProps: {
    className: leagueSpartan.className,
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      textAlign: "right", // RTL: right align placeholder
      direction: "rtl",
    },
  },
  mobileContanier: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse" as const, // RTL: reverse the order so button appears on left
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
      sm: "2vh 3vw",
      xs: "2vh 3vw",
      lg: "0",
    },
    direction: "rtl" as const,
  },
  finding: {
    textAlign: "center",
  },
  description: {
    textAlign: {
      xs: "center",
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