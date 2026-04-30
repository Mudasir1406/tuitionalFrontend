import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/images/static/logo.png";
import { leagueSpartan } from "@/app/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const ThankYouPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <div className="mx-auto flex max-w-[800px] flex-1 flex-col items-center justify-center px-4 pt-[120px] text-center sm:px-8">
        <div className="mb-12">
          <Image
            src={logo.src}
            alt="Tuitional Logo"
            width={300}
            height={73}
            priority
            className="h-[60px] w-auto object-contain"
          />
        </div>

        <h1
          className={`${leagueSpartan.className} mb-6 text-[2rem] font-bold leading-tight text-[#2c3e50] sm:text-[2.5rem] md:text-[3rem]`}
        >
          ✅ You&apos;re All Set! Thanks for Registering.
        </h1>

        <h2
          className={`${leagueSpartan.className} mb-8 text-[1.2rem] font-medium leading-snug text-[#34495e] sm:text-[1.4rem] md:text-[1.6rem]`}
        >
          Our team will contact you shortly. 🎉
        </h2>

        <p
          className={`${leagueSpartan.className} mb-12 text-[1rem] leading-relaxed text-[#7f8c8d] sm:text-[1.1rem] md:text-[1.2rem]`}
        >
          While you wait, check our Testimonials page for past experiences. ☺️
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/testimonials" className="no-underline">
            <button
              className={`${leagueSpartan.className} min-w-[200px] rounded-lg bg-brand-500 px-8 py-3 text-base font-semibold normal-case text-white shadow-[0_4px_15px_rgba(56,182,255,0.3)] transition hover:bg-[#2196F3] hover:shadow-[0_6px_20px_rgba(56,182,255,0.4)]`}
            >
              View Testimonials
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
