"use client";

import {
  Dialog as HUIDialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * House Drawer — replaces MUI <Drawer>. A side-anchored Headless UI dialog
 * that slides in from the inline-start (LTR: left, RTL: right) by default.
 *
 * See .claude/skills/mui-to-tailwind/Cookbook.md §8.
 *
 * `side="start"` flips automatically with `dir="rtl"`. The `translate-x` classes
 * use the `rtl:` variant because Tailwind's translate utilities are physical,
 * not logical (Tailwind 3.x limitation).
 *
 * @example
 * <Drawer open={isOpen} onClose={close}>{menu}</Drawer>
 * <Drawer open={isOpen} onClose={close} side="end" widthClassName="w-96">{cart}</Drawer>
 */

type Side = "start" | "end";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: Side;
  /** Tailwind class controlling panel width. Default: w-80 (320px). */
  widthClassName?: string;
  className?: string;
  children: ReactNode;
}

const transformClasses = (side: Side) => {
  // Closed (off-screen) transform per side, with rtl: variant flipping the axis.
  const closed =
    side === "start"
      ? "-translate-x-full rtl:translate-x-full"
      : "translate-x-full rtl:-translate-x-full";
  return { closed, open: "translate-x-0" };
};

export const Drawer = ({
  open,
  onClose,
  side = "start",
  widthClassName = "w-80",
  className,
  children,
}: DrawerProps) => {
  const transforms = transformClasses(side);
  const positionStyle =
    side === "start" ? { insetInlineStart: 0 } : { insetInlineEnd: 0 };

  return (
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

        <div className="fixed inset-y-0 flex" style={positionStyle}>
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom={transforms.closed}
            enterTo={transforms.open}
            leave="transform transition ease-in-out duration-200"
            leaveFrom={transforms.open}
            leaveTo={transforms.closed}
          >
            <DialogPanel
              className={cn(
                "relative h-full bg-white shadow-xl",
                widthClassName,
                className,
              )}
            >
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </HUIDialog>
    </Transition>
  );
};
