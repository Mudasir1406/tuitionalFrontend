import { leagueSpartan } from "@/app/fonts";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={cn(
          leagueSpartan.className,
          "h-full w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-400",
          className,
        )}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
