"use client";
import React from "react";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";
import Link from "next/link";
import Image from "next/image";

const HeaderV3: React.FC = () => {
  return (
    <>
      <header className="z-[1100] flex h-[70px] w-full items-center justify-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <Link href="/" className="flex items-center no-underline">
          <span className="hidden items-center md:flex">
            <Image
              src={logo.src}
              alt="Tuitional Logo"
              width={200}
              height={49}
              priority
              className="h-[45px] w-auto object-contain"
            />
          </span>
          <span className="flex items-center md:hidden">
            <Image
              src={logoMobile.src}
              alt="Tuitional Logo"
              width={160}
              height={49}
              priority
              className="h-[40px] w-auto object-contain"
            />
          </span>
        </Link>
      </header>

      <div className="fixed bottom-0 end-0 z-[1000] animate-[rotateAnimation_2s_ease-in-out_infinite] p-5">
        <Link
          href="https://wa.me/97144396296"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/?size=100&id=DUEq8l5qTqBE&format=png&color=000000"
            width={60}
            height={60}
            alt="WhatsApp"
          />
        </Link>
      </div>
    </>
  );
};

export default HeaderV3;
