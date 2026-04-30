import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * House Input + Textarea — replace MUI <TextField>.
 * See .claude/skills/mui-to-tailwind/Cookbook.md §11.
 *
 * @example
 * <Input label="Email" type="email" name="email" value={v} onChange={e => setV(e.target.value)} />
 * <Input label="Phone" name="phone" error={errors.phone} />
 * <Input name="topic" helper="Optional — used for routing" />
 * <Textarea label="Message" name="message" rows={4} />
 *
 * The form-input font-size is locked at 1rem (16px) on mobile to prevent iOS auto-zoom.
 */

interface BaseFieldProps {
  label?: string;
  error?: string;
  helper?: string;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className, id, name, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <label htmlFor={inputId} className="flex flex-col gap-1">
        {label && (
          <span className="font-body text-form-label text-ink-700">{label}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            "h-11 w-full rounded-md bg-white px-4 font-body text-form-input text-ink-900 shadow-card",
            "placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            "disabled:cursor-not-allowed disabled:bg-ink-100",
            error && "ring-2 ring-danger",
            className,
          )}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || helper ? `${inputId}-msg` : undefined}
          {...props}
        />
        {(error || helper) && (
          <span
            id={inputId ? `${inputId}-msg` : undefined}
            className={cn(
              "font-body text-small",
              error ? "text-danger" : "text-ink-500",
            )}
          >
            {error ?? helper}
          </span>
        )}
      </label>
    );
  },
);
Input.displayName = "Input";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, className, id, name, rows = 4, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <label htmlFor={inputId} className="flex flex-col gap-1">
        {label && (
          <span className="font-body text-form-label text-ink-700">{label}</span>
        )}
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          rows={rows}
          className={cn(
            "w-full rounded-md bg-white px-4 py-3 font-body text-form-input text-ink-900 shadow-card",
            "placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            "disabled:cursor-not-allowed disabled:bg-ink-100",
            "resize-y",
            error && "ring-2 ring-danger",
            className,
          )}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || helper ? `${inputId}-msg` : undefined}
          {...props}
        />
        {(error || helper) && (
          <span
            id={inputId ? `${inputId}-msg` : undefined}
            className={cn(
              "font-body text-small",
              error ? "text-danger" : "text-ink-500",
            )}
          >
            {error ?? helper}
          </span>
        )}
      </label>
    );
  },
);
Textarea.displayName = "Textarea";
