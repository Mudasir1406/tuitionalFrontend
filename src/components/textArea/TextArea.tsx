import React from "react";
import styles from "./TextArea.module.css";
import { leagueSpartan } from "@/app/fonts";

interface CustomTextAreaProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
}

function TextArea({
  name,
  value,
  onChange,
  label,
  placeholder = "",
  type = "text",
  required = false,
  className = "",
}: CustomTextAreaProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(name, e.target.value);
  };
  return (
    <textarea
      value={label}
      onChange={handleInputChange}
      placeholder={placeholder}
      // placeholder={isFocused ? placeholder : ""}
      className={`${styles.textArea} ${leagueSpartan.className}`}
    />
  );
}

export default TextArea;
