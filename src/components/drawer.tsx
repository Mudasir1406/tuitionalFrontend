"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer as HouseDrawer } from "@/components/ui/drawer";
import { useI18n } from "@/context/language-context";
import { useDrawer } from "../context/drawer-context";
import RouteLanguageSwitcher from "./route-language-switcher";

const FormDialog = dynamic(() => import("./home/form-dialouge"), {
  ssr: false,
});

const ResponsiveDrawer = () => {
  const { open, toggleDrawer } = useDrawer();
  const { t } = useI18n();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navItems: { href: string; label: string }[] = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/blog", label: t("nav.blogs") },
    { href: "/testimonials", label: t("nav.testimonials") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <HouseDrawer
        open={open}
        onClose={toggleDrawer}
        side="start"
        widthClassName="w-full"
        className="bg-gradient-to-b from-[#D3EFFE] to-white"
      >
        <div className="flex h-full flex-col">
          <div className="flex w-full items-center justify-end px-6 py-6 sm:px-8 sm:py-8">
            <button
              type="button"
              onClick={toggleDrawer}
              aria-label="Close menu"
              className="rounded-full p-2 hover:bg-black/10"
            >
              {/* <X size={25} className="text-[#545454]" /> */}
            </button>
          </div>

          <div className="mx-6 border-b border-black/10 sm:mx-8" />

          <nav className="flex flex-1 flex-col items-start px-6 pt-6 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={toggleDrawer}
                className="flex w-full items-center border-b border-black/5 py-4 font-heading text-[1.25rem] font-medium text-black hover:text-brand-500"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-8 flex w-full flex-col gap-4 pb-8">
              <Button
                variant="outline"
                className="h-[52px] w-full border-success font-heading text-[1rem] font-bold whitespace-nowrap text-success transition-none hover:bg-transparent hover:text-success focus-visible:ring-success"
              >
                {t("buttons.ai_digital_sat")}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  toggleDrawer();
                  setOpenDialog(true);
                }}
                className="h-[52px] w-full rounded-[10px] font-heading text-[1rem] font-bold tracking-[-0.02em] shadow-brand-glow"
              >
                {t("buttons.book_demo")}
              </Button>
              <div className="mt-2 w-full">
                <RouteLanguageSwitcher fullWidth />
              </div>
            </div>
          </nav>
        </div>
      </HouseDrawer>

      {openDialog && (
        <FormDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default ResponsiveDrawer;
