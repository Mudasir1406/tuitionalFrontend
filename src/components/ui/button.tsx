import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * House Button — replaces MUI <Button>. See .claude/skills/mui-to-tailwind/Cookbook.md §5.
 *
 * @example
 * <Button variant="primary" size="md">Save</Button>
 * <Button variant="outline">Cancel</Button>
 * <Button variant="ghost" size="sm" disabled>Loading…</Button>
 *
 * Variant map from MUI:
 *   contained + primary  → variant="primary"
 *   outlined  + primary  → variant="outline"
 *   text      + any      → variant="ghost"
 *   contained + error    → variant="destructive"
 */

type Variant = "primary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500 shadow-card",
  outline:
    "border border-brand-500 text-brand-500 bg-transparent hover:bg-brand-50 focus-visible:ring-brand-500",
  ghost:
    "text-ink-900 bg-transparent hover:bg-ink-100 focus-visible:ring-ink-300",
  destructive:
    "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-button-mobile",
  md: "h-10 px-6 text-button-mobile sm:text-button",
  lg: "h-12 px-8 text-button",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-body font-semibold",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
