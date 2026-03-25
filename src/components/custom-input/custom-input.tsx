import { leagueSpartan } from "@/app/fonts";
import { TextField, Typography, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, onChange, placeholder, ...rest }, ref) => {
    return (
      <TextField
        inputRef={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          className: leagueSpartan.className,
          sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            padding: 0,
            height: 0,
          },
        }}
        {...rest}
        className={leagueSpartan.className}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
