"use client";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./DropDown.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "10vh",
    },
  },
};

type IProps = {
  placeholder: string;
  marginBottom?: string;
  marginTop?: string;
  data: string[];
  multiple?: boolean;
  boxShadow?: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
};

const MultipleSelectPlaceholder: React.FunctionComponent<IProps> = ({
  placeholder,
  data,
  multiple,
  boxShadow,
  marginBottom,
  marginTop,
  value,
  onChange,
}) => {
  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          className={`select ${leagueSpartan.className}`}
          displayEmpty
          multiple={multiple}
          sx={{
            borderRadius: "10px",
            boxShadow: boxShadow,
            marginBottom: marginBottom,
            marginTop: marginTop,
            height: "5.5vh",
            fontSize: "1.5vh", // Adjusted font size with vh unit
            fontWeight: 400,
            lineHeight: "1.6vh",
            minHeight: "50px", // Ensure minHeight of the OutlinedInput

            // minHeight: "5.5vh", // Ensure minHeight is also set to vh unit
            "& .MuiOutlinedInput-root": {
              height: "5.5vh", // Set the height of the OutlinedInput
              minHeight: "50px", // Ensure minHeight of the OutlinedInput
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          value={value}
          onChange={onChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected?.length === 0) {
              return (
                <Typography
                  sx={styles.placeholderText}
                  className={leagueSpartan.className}
                >
                  {placeholder}
                </Typography>
              );
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item}>
              <Typography
                sx={[styles.placeholderText, { textAlign: "justify" }]}
                className={leagueSpartan.className}
              >
                {item}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectPlaceholder;

const styles = {
  placeholderText: {
    fontSize: "1.5vh", // Adjusted font size with vh unit
    fontWeight: 400,
    lineHeight: "1.6vh",
    // Adjusted line height if necessary
  },
};
