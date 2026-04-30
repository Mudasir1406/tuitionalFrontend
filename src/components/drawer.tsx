"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { X } from "lucide-react";

import { Drawer as HouseDrawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useDrawer } from "../context/drawer-context";
import { useI18n } from "@/context/language-context";
import RouteLanguageSwitcher from "./route-language-switcher";
import logo from "../../public/assets/images/static/logo.png";

const FormDialog = dynamic(() => import("./home/form-dialouge"), { ssr: false });

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
          <div className="flex w-full items-center justify-between bg-gradient-to-b from-[#D3EFFE] to-white px-[7.1%] pt-[50px] pb-6">
            <Image
              src={logo.src}
              alt="Logo"
              width={logo.width}
              height={logo.height}
              className="h-auto w-32 cursor-pointer"
            />
            <button
              type="button"
              onClick={toggleDrawer}
              aria-label="Close menu"
              className="rounded-full p-2 hover:bg-ink-100"
            >
              <X size={25} className="text-[#545454]" />
            </button>
          </div>

          <nav className="flex flex-col items-start px-[7.1%]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={toggleDrawer}
                className="my-[10px] block w-full font-heading text-[1.5rem] font-medium leading-[2] text-black hover:text-brand-500"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-[30px] flex w-full flex-col gap-[15px]">
              <Button
                variant="primary"
                onClick={() => {
                  toggleDrawer();
                  setOpenDialog(true);
                }}
                className="rounded-md py-[1.5vh] text-[1.1rem] font-bold shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66]"
              >
                {t("buttons.book_demo")}
              </Button>
              <div className="mt-[10px] w-full">
                <RouteLanguageSwitcher fullWidth />
              </div>
            </div>
          </nav>
        </div>
      </HouseDrawer>

      {openDialog && (
        <FormDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </>
  );
};

export default ResponsiveDrawer;
