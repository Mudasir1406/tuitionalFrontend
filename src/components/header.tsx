"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDrawer } from "../context/drawer-context";
import { useI18n } from "@/context/language-context";
import RouteLanguageSwitcher from "./route-language-switcher";
import { cn } from "@/utils/cn";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";

const FormDialog = dynamic(() => import("./home/form-dialouge"), { ssr: false });

type IProps = {
  /**
   * Tailwind classes that override the hero strip's height + background.
   * Defaults to the brand hero-fade gradient at 10/10/20/30vh.
   */
  heroClassName?: string;
};

const DEFAULT_HERO =
  "h-[10vh] w-full sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-hero-fade";

const Header: React.FC<IProps> = ({ heroClassName }) => {
  const { toggleDrawer } = useDrawer();
  const { t, isRTL } = useI18n();
  const [open, setOpen] = useState(false);

  const navItems: { href?: string; label: string }[] = isRTL
    ? [
        { href: "/ar", label: t("nav.home") },
        { href: "/ar/about", label: t("nav.about") },
        { label: t("nav.community") },
        { href: "/ar/testimonials", label: t("nav.testimonials") },
        { href: "/ar/contact", label: t("nav.contact") },
      ]
    : [
        { href: "/", label: t("nav.home") },
        { href: "/about", label: t("nav.about") },
        { href: "/blog", label: t("nav.blogs") },
        { href: "/testimonials", label: t("nav.testimonials") },
        { href: "/contact", label: t("nav.contact") },
      ];

  return (
    <div className={cn("relative", heroClassName ?? DEFAULT_HERO)}>
      {/* Decorative brand circles behind the AppBar (preserved from MUI baseline 4969d2b) */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[1.7vh] start-[1.2vw] z-0 h-[3vh] w-[3vh] rounded-full bg-brand-500 sm:start-[2.5vw] sm:h-[4.5vh] sm:w-[4.5vh] md:start-[5vw] md:h-[5vh] md:w-[5vh] lg:start-[4.5vw] lg:h-[7.5vh] lg:w-[7.5vh] lg:animate-[bounceAndForword_4s_linear_infinite_alternate]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-[3.2vh] end-[3.5vw] z-0 h-[6vh] w-[6vh] rounded-full bg-brand-500 sm:h-[7vh] sm:w-[7vh] md:h-[8vh] md:w-[8vh] lg:h-[10.9vh] lg:w-[10.9vh]"
      />

      <header className="sticky top-0 z-[1000] mx-[5vw] mt-[2vh] flex min-h-[72px] w-[90%] items-center justify-between rounded-md bg-white/70 px-4 py-[1vh] shadow-header sm:min-h-20 sm:px-6 lg:justify-evenly">
        <div className="flex w-full items-center justify-between lg:w-[95%]">
          <div className="me-[1.5vw] flex items-center">
            <a href="https://tuitionaledu.com/" rel="noopener noreferrer">
              <Image
                src={logo.src}
                alt={isRTL ? "شعار تيوشنال" : "Logo"}
                width={logo.width}
                height={logo.height}
                priority
                quality={90}
                className="hidden h-[49px] w-[203px] cursor-pointer object-contain lg:block"
              />
              <Image
                src={logoMobile.src}
                alt={isRTL ? "شعار تيوشنال" : "Logo"}
                width={logoMobile.width}
                height={logoMobile.height}
                priority
                quality={90}
                className="block h-[49px] w-[203px] object-contain lg:hidden"
              />
            </a>
          </div>

          <nav className="hidden items-center gap-[2vw] lg:flex">
            {navItems.map((item, index) =>
              item.href ? (
                <a key={index} href={item.href} className="no-underline">
                  <span className="cursor-pointer text-center font-heading text-[2.1vh] font-normal leading-[1.84vh] text-black hover:text-brand-500">
                    {item.label}
                  </span>
                </a>
              ) : (
                <span
                  key={index}
                  className="cursor-pointer text-center font-heading text-[2.1vh] font-normal leading-[1.84vh] text-black"
                >
                  {item.label}
                </span>
              ),
            )}
          </nav>

          <div className="ms-[1.5vw] hidden items-center gap-[0.8vw] lg:flex">
            <Button
              variant="outline"
              className="min-w-fit whitespace-nowrap border-success px-[1.5vw] py-[1.2vh] text-[1.5vh] font-bold leading-[1.84vh] text-success transition-none hover:bg-transparent hover:text-success focus-visible:ring-success"
            >
              {t("buttons.ai_digital_sat")}
            </Button>
            <Button
              variant="primary"
              onClick={() => setOpen(true)}
              className="rounded-[10px] py-[1.5vh] text-[1.5vh] font-bold leading-[1.84vh] tracking-[-0.02em] shadow-brand-glow"
            >
              {t("buttons.book_demo")}
            </Button>
            <RouteLanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={toggleDrawer}
            aria-label="Open menu"
            className="me-[1vw] flex h-[4vh] w-[4vh] items-center justify-center text-brand-500 lg:hidden"
          >
            <Menu className="h-full w-full" />
          </button>
        </div>
      </header>

      {open && <FormDialog open={open} handleClose={() => setOpen(false)} />}

      <div className="fixed bottom-0 right-0 z-[1000] p-[5px] animate-[rotateAnimation_2s_ease-in-out_infinite]">
        <Link href="https://wa.me/97144396296" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://img.icons8.com/fluency/100/whatsapp.png"
            width={60}
            height={60}
            alt={isRTL ? "واتساب" : "WhatsApp"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
