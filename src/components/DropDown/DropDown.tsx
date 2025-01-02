import React, { useEffect, useRef, useState } from "react";
import "./DropDown.css";
import { leagueSpartan } from "@/app/fonts";

type IProps = {
  placeholder: string;
  data: string[];
  multiple?: boolean;
  value: string | string[];
  onChange: (field: string, value: string | string[]) => void; // Match the handleChange signature
  className?: string;
  marginTop?: string;
  marginBottom?: string;
  name: string; // Add a 'name' prop for reusability
};

const DropDown: React.FunctionComponent<IProps> = ({
  placeholder,
  data,
  multiple = false,
  value,
  onChange,
  className,
  marginTop,
  marginBottom,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
    let newValue: string | string[];

    if (multiple) {
      const selectedValues = Array.isArray(value) ? [...value] : [];
      const index = selectedValues.indexOf(item);
      if (index > -1) {
        selectedValues.splice(index, 1); // Remove item if already selected
      } else {
        selectedValues.push(item); // Add item if not selected
      }
      newValue = selectedValues;
    } else {
      newValue = item;
      setIsOpen(false); // Close dropdown for single selection
    }

    // Pass the updated value and field name to the parent
    onChange(name, newValue);
  };

  const renderSelectedValue = () => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : placeholder;
    }
    return value || placeholder;
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
    // <div
    //   className={`dropdown ${leagueSpartan.className} ${className || ""} `}
    //   style={{ marginTop }}
    // >
    //   <div
    //     className="dropdown-header"
    //     onClick={() => setIsOpen((prev) => !prev)}
    //   >
    //     <span className="dropdown-placeholder">{renderSelectedValue()}</span>
    //     <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
    //   </div>
    //   {isOpen && (
    //     <ul className="dropdown-menu">
    //       {data.map((item, index) => (
    //         <li
    //           key={index}
    //           className={`dropdown-item ${
    //             (multiple && Array.isArray(value) && value.includes(item)) ||
    //             value === item
    //               ? "selected"
    //               : ""
    //           }`}
    //           onClick={() => handleSelect(item)}
    //         >
    //           {item}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>

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
          {data.map((item, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                (multiple && Array.isArray(value) && value.includes(item)) ||
                value === item
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
