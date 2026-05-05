"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * House Select — replaces MUI <Select> + <MenuItem>.
 * Built on Headless UI Listbox; gives keyboard nav, type-ahead, and ARIA.
 *
 * See .claude/skills/ui-pipeline/components/select.md for full audit.
 *
 * @example
 * <Select
 *   value={country}
 *   onChange={setCountry}
 *   options={countries.map(c => ({ value: c.code, label: c.name }))}
 *   placeholder={t("form.selectCountry")}
 * />
 *
 * For label/error/helper text, wrap in your own <label> or compose with the
 * pattern from Cookbook.md §10.
 */

export interface SelectOption<T extends string | number> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

interface SelectProps<T extends string | number> {
  value: T | null;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  /** aria-label when no surrounding <label> is present. */
  ariaLabel?: string;
  className?: string;
  /** Tailwind class controlling button width. Default: w-full. */
  buttonClassName?: string;
}

export function Select<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  ariaLabel,
  className,
  buttonClassName,
}: SelectProps<T>) {
  const selected = options.find((o) => o.value === value);

  return (
    <Listbox value={value ?? undefined} onChange={onChange} disabled={disabled}>
      <div className={cn("relative", className)}>
        <ListboxButton
          aria-label={ariaLabel}
          className={cn(
            "relative h-11 cursor-default rounded-md bg-white pe-10 ps-4 text-start font-heading text-form-input shadow-card",
            "outline-none focus:outline-none focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:bg-ink-100",
            buttonClassName ?? "w-full",
          )}
        >
          <span className={cn("block truncate", selected ? "text-ink-900" : "text-ink-400")}>
            {selected?.label ?? placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-ink-500">
            <ChevronDown size={18} aria-hidden="true" />
          </span>
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
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-card ring-1 ring-ink-200 focus:outline-none">
            {options.map((opt) => (
              <ListboxOption
                key={String(opt.value)}
                value={opt.value}
                disabled={opt.disabled}
                className={({ focus, selected: isSel }) =>
                  cn(
                    "relative cursor-default select-none py-2 pe-4 ps-10",
                    focus ? "bg-brand-50 text-brand-700" : "text-ink-900",
                    isSel && "font-semibold",
                    opt.disabled && "cursor-not-allowed opacity-50",
                  )
                }
              >
                {({ selected: isSel }) => (
                  <>
                    <span className="block truncate">{opt.label}</span>
                    {isSel && (
                      <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-brand-500">
                        <Check size={18} aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
