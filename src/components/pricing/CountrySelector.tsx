"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

import {
  SUPPORTED_COUNTRIES,
  getCountryInfo,
  mapApiCountryToPricing,
  mapPricingToDisplayCountry,
} from "@/utils/pricing-helpers";
import { cn } from "@/utils/cn";

interface CountrySelectorProps {
  currentCountry: string;
  onCountryChange?: (country: string) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  currentCountry,
  onCountryChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"down" | "up">("down");
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const displayCountry = mapPricingToDisplayCountry(currentCountry);
  const [selectedCountry, setSelectedCountry] = useState(displayCountry);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setIsOpen(false);
    onCountryChange?.(mapApiCountryToPricing(countryCode));
  };

  const handleToggleOpen = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = Math.min(350, SUPPORTED_COUNTRIES.length * 60);
      setDropdownPosition(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight ? "up" : "down");
      setDropdownRect(rect);
    }
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    setSelectedCountry(mapPricingToDisplayCountry(currentCountry));
  }, [currentCountry]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleScrollResize = () => {
      if (containerRef.current) setDropdownRect(containerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", handleScrollResize, true);
    window.addEventListener("resize", handleScrollResize);
    return () => {
      window.removeEventListener("scroll", handleScrollResize, true);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, [isOpen]);

  const currentCountryInfo = getCountryInfo(selectedCountry);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={handleToggleOpen}
        className="flex items-center gap-2 rounded-md border border-ink-200 bg-white px-4 py-2 font-body text-form-input text-ink-900 shadow-card hover:bg-ink-50"
      >
        <span className="text-xl">{currentCountryInfo.flag}</span>
        <span className="font-semibold">{currentCountryInfo.code}</span>
        <span className="text-ink-700">({currentCountryInfo.currency})</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {isOpen && dropdownRect && createPortal(
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              "fixed z-50 min-w-[280px] rounded-md bg-white shadow-xl ring-1 ring-ink-200",
              dropdownPosition === "up" && "-translate-y-full",
            )}
            style={{
              left: dropdownRect.left,
              top: dropdownPosition === "up" ? dropdownRect.top - 8 : dropdownRect.bottom + 8,
              width: dropdownRect.width,
            }}
          >
            <div className="max-h-[350px] overflow-auto py-1">
              {SUPPORTED_COUNTRIES.map((country) => {
                const isSelected = selectedCountry === country.code;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountryChange(country.code)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-start hover:bg-ink-50",
                      isSelected && "bg-brand-50",
                    )}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex-1">
                      <p className="font-body text-form-input font-semibold text-ink-900">
                        {country.name}
                      </p>
                      <p className="font-body text-small text-ink-700">
                        Prices in {country.currency}
                      </p>
                    </div>
                    {isSelected && <Check size={18} className="text-brand-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>,
        document.body,
      )}
    </div>
  );
};

export default CountrySelector;
