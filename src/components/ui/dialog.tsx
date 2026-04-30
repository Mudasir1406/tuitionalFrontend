"use client";

import {
  Dialog as HUIDialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * House Dialog — replaces MUI <Dialog> + <DialogContent>.
 * Built on Headless UI 2.x; gives focus trap, Escape, outside click, scroll lock,
 * and ARIA for free.
 *
 * See .claude/skills/mui-to-tailwind/Cookbook.md §9.
 *
 * @example
 * <Dialog open={open} onClose={close} title={t("pricing.title")} size="md">
 *   {body}
 * </Dialog>
 *
 * <Dialog open={open} onClose={close}>
 *   {/* No title bar — render your own header inside children *\/}
 *   {body}
 * </Dialog>
 */

type Size = "sm" | "md" | "lg" | "xl";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  size?: Size;
  /** Hides the built-in close button when a custom header is rendered in `children`. */
  hideCloseButton?: boolean;
  className?: string;
  /** aria-label for the close button. Defaults to "Close". */
  closeLabel?: string;
  children: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const Dialog = ({
  open,
  onClose,
  title,
  size = "md",
  hideCloseButton = false,
  className,
  closeLabel = "Close",
  children,
}: DialogProps) => (
  <Transition show={open} as={Fragment}>
    <HUIDialog onClose={onClose} className="relative z-50">
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      </TransitionChild>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPanel
            className={cn(
              "w-full rounded-lg bg-white shadow-xl",
              sizeClasses[size],
              className,
            )}
          >
            {(title || !hideCloseButton) && (
              <div className="flex items-center justify-between gap-4 border-b border-ink-200 p-4">
                {title ? (
                  <DialogTitle className="font-heading text-h4 text-ink-900">
                    {title}
                  </DialogTitle>
                ) : (
                  <span aria-hidden="true" />
                )}
                {!hideCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={closeLabel}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}
            <div className="p-4 sm:p-6">{children}</div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </HUIDialog>
  </Transition>
);
