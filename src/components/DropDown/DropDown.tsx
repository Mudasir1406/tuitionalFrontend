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
      width: 190,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type IProps = {
  placeholder: string;
  data: string[];
};

const MultipleSelectPlaceholder: React.FunctionComponent<IProps> = ({
  placeholder,
  data,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          className="select"
          displayEmpty
          sx={{
            borderRadius: "10px",
          }}
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <Typography
                  sx={styles.placeholderText}
                  className={leagueSpartan.className}
                >
                  {placeholder}
                </Typography>
              );
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            {/* <em>Placeholder</em> */}
          </MenuItem>
          {data.map((item, index) => (
            <MenuItem
              key={index}
              value={item}
              style={getStyles(item, personName, theme)}
            >
              <Typography
                sx={styles.placeholderText}
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
    fontFamily: "League Spartan",
    fontSize: "16px",
    fontWeight: 400,
    // lineHeight: "14px",
  },
};