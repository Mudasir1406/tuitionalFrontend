import React, { useEffect, useRef, useState } from "react";
import "./DropDown.css";
import { leagueSpartan } from "@/app/fonts";
import { translateSubject, getOriginalSubjectName } from "@/utils/subject-translations";

type IProps = {
  placeholder: string;
  data: string[];
  multiple?: boolean;
  value: string | string[];
  onChange: (field: string, value: string | string[]) => void;
  className?: string;
  marginTop?: string;
  marginBottom?: string;
  name: string;
  locale?: string; // Add locale prop
  isSubjectField?: boolean; // Flag to indicate if this dropdown contains subjects
};

const TranslatableDropDown: React.FunctionComponent<IProps> = ({
  placeholder,
  data,
  multiple = false,
  value,
  onChange,
  className,
  marginTop,
  marginBottom,
  name,
  locale = 'en',
  isSubjectField = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Translate data for display if it's a subject field and Arabic locale
  const displayData = isSubjectField 
    ? data.map(item => translateSubject(item, locale))
    : data;

  const handleSelect = (displayItem: string) => {
    // Always submit original English values
    const originalItem = isSubjectField && locale === 'ar' 
      ? getOriginalSubjectName(displayItem)
      : displayItem;

    let newValue: string | string[];

    if (multiple) {
      const selectedValues = Array.isArray(value) ? [...value] : [];
      const index = selectedValues.indexOf(originalItem);
      if (index > -1) {
        selectedValues.splice(index, 1);
      } else {
        selectedValues.push(originalItem);
      }
      newValue = selectedValues;
    } else {
      newValue = originalItem;
      setIsOpen(false);
    }

    onChange(name, newValue);
  };

  const renderSelectedValue = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      
      // Translate selected values for display
      const translatedValues = isSubjectField && locale === 'ar'
        ? value.map(item => translateSubject(item, locale))
        : value;
        
      return translatedValues.join(", ");
    }
    
    // Translate single value for display
    const displayValue = isSubjectField && locale === 'ar' && value
      ? translateSubject(value as string, locale)
      : value;
      
    return displayValue || placeholder;
  };

  const isPlaceholder = renderSelectedValue() === placeholder;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${leagueSpartan.className} ${className || ""}`}
      style={{ marginTop, marginBottom }}
    >
      <div
        className="dropdown-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="">
          <span
            className="dropdown-placeholder"
            style={{
              color: isPlaceholder ? "gray" : "black",
            }}
          >
            {renderSelectedValue()}
          </span>
        </div>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {displayData.map((displayItem, index) => {
            const originalItem = isSubjectField && locale === 'ar' 
              ? getOriginalSubjectName(displayItem)
              : displayItem;
              
            const isSelected = multiple && Array.isArray(value) 
              ? value.includes(originalItem)
              : value === originalItem;
              
            return (
              <li
                key={index}
                className={`dropdown-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(displayItem)}
              >
                {displayItem}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TranslatableDropDown;