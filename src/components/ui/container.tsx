import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * House Container — replaces MUI <Container maxWidth="...">.
 * See .claude/skills/ui-pipeline/components/container.md for full audit.
 *
 * @example
 * <Container size="lg">{children}</Container>
 * <Container size="xl" disableGutters>{children}</Container>
 * <Container as="section" size="md">…</Container>
 *
 * Size map mirrors MUI's `maxWidth`:
 *   sm → max-w-screen-sm  (600px)
 *   md → max-w-screen-md  (900px)
 *   lg → max-w-screen-lg  (1200px) — the default, matches MUI's default
 *   xl → max-w-screen-xl  (1500px)
 *  "2xl" → max-w-screen-2xl (2000px)
 */

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: Size;
  disableGutters?: boolean;
  as?: "div" | "section" | "main" | "article" | "header" | "footer" | "nav";
}

const sizeClasses: Record<Size, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
};

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    { size = "lg", disableGutters = false, as = "div", className, children, ...props },
    ref,
  ) => {
    const Tag = as as "div";
    return (
      <Tag
        ref={ref as never}
        className={cn(
          "mx-auto w-full",
          sizeClasses[size],
          !disableGutters && "px-4 sm:px-6 lg:px-8",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
Container.displayName = "Container";
