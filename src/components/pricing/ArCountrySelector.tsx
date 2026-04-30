"use client";

import React, { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Check, ChevronDown } from "lucide-react";

import {
  SUPPORTED_COUNTRIES,
  getCountryInfo,
  mapApiCountryToPricing,
  mapPricingToDisplayCountry,
} from "@/utils/pricing-helpers";
import { cn } from "@/utils/cn";

interface ArCountrySelectorProps {
  currentCountry: string;
  onCountryChange: (country: string) => void;
  className?: string;
}

const ArCountrySelector: React.FC<ArCountrySelectorProps> = ({
  currentCountry,
  onCountryChange,
  className,
}) => {
  const displayCountry = mapPricingToDisplayCountry(currentCountry);
  const countryInfo = getCountryInfo(displayCountry);

  return (
    <Listbox value={currentCountry} onChange={onCountryChange}>
      <div className={cn("relative inline-block", className)} dir="rtl">
        <ListboxButton className="flex items-center gap-2 rounded-md border border-ink-200 bg-white px-4 py-2 font-body text-form-input text-ink-900 shadow-card hover:bg-ink-50">
          <span className="text-xl">{countryInfo.flag}</span>
          <span className="font-semibold">{countryInfo.nameAr}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </ListboxButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ListboxOptions className="absolute z-50 mt-1 max-h-[350px] min-w-[280px] overflow-auto rounded-md bg-white py-1 shadow-xl ring-1 ring-ink-200 focus:outline-none">
            {SUPPORTED_COUNTRIES.map((country) => {
              const pricingKey = mapApiCountryToPricing(country.dbKey || country.code);
              return (
                <ListboxOption
                  key={country.dbKey || country.code}
                  value={pricingKey}
                  className={({ focus, selected }) =>
                    cn(
                      "flex w-full cursor-pointer items-center gap-3 px-4 py-3",
                      focus && "bg-brand-50",
                      selected && "bg-brand-50",
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="text-2xl">{country.flag}</span>
                      <span className="flex-1 text-start font-body text-form-input text-ink-900">
                        {country.nameAr}
                      </span>
                      {selected && <Check size={18} className="text-brand-500" />}
                    </>
                  )}
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ArCountrySelector;
