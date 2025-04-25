"use client";
import { leagueSpartan } from "@/app/fonts";
import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, onChange, placeholder, ...rest }, ref) => {
    return (
      <TextField
        inputRef={ref}
        // inputRef={ref}
        value={value}
        // sx={{}}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          className: leagueSpartan.className,
          sx: {
            padding: 0,
            height: 0,
          },
        }}
        {...rest}
        className={leagueSpartan.className}
        inputProps={{
          "aria-label": placeholder,
          ref: null, // Explicitly nullify default ref
        }}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;

const styles = {
  label: {
    // fontSize: "1.7vh",
    // fontWeight: 400,
    // color: "rgba(0,0,0,0.77)",
  },
};
