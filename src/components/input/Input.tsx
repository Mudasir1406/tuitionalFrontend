import React, { ChangeEvent, FocusEvent, useState } from "react";
import styles from "./Input.module.css";
import { leagueSpartan } from "@/app/fonts";

interface CustomInputProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
}

function Input({
  name,
  value,
  onChange,
  label,
  placeholder = "",
  type = "text",
  required = false,
  className = "",
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };
  return (
    <div className={`${styles.container} ${className}`}>
      <label
        htmlFor={name}
        className={`${styles.label} ${
          isFocused || value ? styles.labelFocused : ""
        }  ${leagueSpartan.className}`}
      >
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? placeholder : ""}
        className={`${styles.input} ${leagueSpartan.className}`} // Apply the font class to the input
        required={required}
      />
    </div>
  );
}

export default Input;
