import { leagueSpartan } from "@/app/fonts";
import { TextField, Typography, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, onChange, placeholder, ...rest }, ref) => {
    return (
      <TextField
        inputRef={ref}
        value={value}
        // sx={{}}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          className: leagueSpartan.className,
          // sx: {
          //   // fontSize: "1.9vh",
          //   fontWeight: 400,
          //   "& .MuiOutlinedInput-notchedOutline": {
          //     border: "none",
          //   },
          // },
        }}
        {...rest}
        // label={
        //   <Typography sx={styles.label} className={leagueSpartan.className}>
        //     Phone
        //   </Typography>
        // }
        // variant="outlined"
        className={leagueSpartan.className}
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
