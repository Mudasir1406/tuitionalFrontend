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
  style?: any;
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
  style,
}: CustomInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {/* <label
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
         className={`${styles.input} ${leagueSpartan.className}`}
         required={required}
       /> */}
      <input
        style={style}
        value={label}
        onChange={handleInputChange}
        placeholder={placeholder}
        //  placeholder={isFocused ? placeholder : ""}
        className={`${styles.input} ${leagueSpartan.className}`}
      />
    </div>
  );
}

export default Input;
