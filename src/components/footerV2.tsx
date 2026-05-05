import React from "react";
import Link from "next/link";
import Image from "next/image";

import plan from "../../public/assets/images/static/plan.png";
import phone from "../../public/assets/images/static/phone-call.png";
import logo from "../../public/assets/images/static/logo.png";

import { leagueSpartan } from "@/app/fonts";
import PopUpButtonV2 from "./pop-up-buttonV2";

const FooterV2: React.FC = async () => {
  return (
    <footer>
      <div className="relative flex w-full items-center justify-center bg-footer-fade py-[30px] md:py-[60px]">
        {/* Decorative circles */}
        <div className="absolute right-[60px] top-[70px] -z-[1] h-[135px] w-[135px] rounded-full bg-[#37B6FF]" />
        <div className="absolute bottom-0 -left-[230px] -z-[1] h-[330px] w-[330px] rounded-full border-[100px] border-[#37B6FF] bg-transparent sm:h-[430px] sm:w-[430px]" />

        {/* White card */}
        <div className="z-0 flex w-[90%] flex-col items-center justify-center rounded-[10px] bg-white/70 shadow-footer-card">

          {/* ── Contact CTA banner ── */}
          <div className="flex w-4/5 -mt-[70px] rounded-[5px] bg-brand-500 p-4 sm:p-5 md:w-[85%] md:p-[25px] lg:p-[30px]">
            <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-center md:gap-5">

              {/* Plan icon */}
              <div className="flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-full bg-white lg:h-[85px] lg:w-[85px]">
                <Image
                  src={plan.src}
                  width={plan.width}
                  height={plan.height}
                  alt="plan"
                  quality={100}
                  style={{ width: "50px", height: "60px", marginTop: "10px", objectFit: "contain" }}
                />
              </div>

              {/* Tagline text */}
              <p
                className={`${leagueSpartan.className} text-center text-sm font-normal leading-[1.6] text-white md:flex-1 md:text-start md:text-base`}
              >
                Registered in UAE • Established Since 2020 • Headquarters: Sharjah
              </p>

              {/* Phone number */}
              <div className="flex shrink-0 items-center gap-2">
                <Image src={phone.src} width={phone.width} height={phone.height} alt="phone" />
                <p
                  className={`${leagueSpartan.className} text-sm font-normal leading-[1.75] text-white md:text-base`}
                >
                  +971 56 490 0376
                </p>
              </div>

              {/* CTA button */}
              <div className="w-full md:w-auto">
                <PopUpButtonV2
                  text="Book a Free Trial"
                  href="popup"
                  className="block w-full rounded-[10px] bg-white px-[25px] py-[1.5vh] text-center leading-[23px] tracking-[-0.02em] text-[#009BF5] shadow-cta-white hover:bg-white md:w-auto md:px-[22px] md:py-[2vh] lg:px-[25px] lg:py-[2vh]"
                />
              </div>
            </div>
          </div>

          {/* ── Main content grid ── */}
          <div className="grid w-full grid-cols-1 gap-8 px-5 py-8 sm:px-8 md:grid-cols-2 md:gap-10 md:px-[5vw] md:pe-[2vw] md:py-[50px] lg:py-[60px]">

            {/* Left column: Logo + Description + Credibility + Social */}
            <div className="flex flex-col items-center md:items-start">
              {/* Logo */}
              <Image
                src={logo.src}
                width={logo.width / 1.5}
                height={logo.height / 1.5}
                alt="logo"
                style={{ alignSelf: "start" }}
              />

              {/* Description */}
              <p
                className={`${leagueSpartan.className} mt-4 text-center text-sm font-normal leading-[1.6] tracking-[0.01071em] text-black md:text-start`}
              >
                Tuitional is a UAE-based Online Ed-Tech Platform established in 2020. We provide live
                tutoring classes for Grades 4–8, IGCSE, GCSE, & A-Levels for Cambridge, Pearson Edexcel
                boards.
              </p>

              {/* Credibility badges */}
              <div className="mt-4 flex flex-col items-center gap-[6px] md:items-start lg:mt-6">
                {[
                  "✓ Trusted by 1000+ Students",
                  "✓ Licensed Educational Provider",
                  "✓ 4.6/5 TrustPilot Rating",
                ].map((label) => (
                  <p
                    key={label}
                    className={`${leagueSpartan.className} text-[0.9rem] font-semibold leading-[1.43] tracking-[0.01071em] text-[#22C55E]`}
                  >
                    {label}
                  </p>
                ))}
              </div>

              {/* Social icons */}
              <div className="mt-5 flex items-center gap-3 md:mt-4">
                <Link target="_blank" href="https://www.facebook.com/tuitionaledu" rel="noreferrer">
                  <Image
                    src="https://img.icons8.com/fluency/48/facebook-new.png"
                    alt="facebook"
                    width={36}
                    height={36}
                    className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                  />
                </Link>
                <Link target="_blank" href="https://www.instagram.com/tuitionaledu" rel="noreferrer">
                  <Image
                    src="https://img.icons8.com/fluency/48/instagram-new.png"
                    alt="instagram"
                    width={36}
                    height={36}
                    className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                  />
                </Link>
                <Link target="_blank" href="https://www.linkedin.com/company/tuitionaledu" rel="noreferrer">
                  <Image
                    src="https://img.icons8.com/fluency/48/linkedin.png"
                    alt="linkedin"
                    width={36}
                    height={36}
                    className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                  />
                </Link>
              </div>
            </div>

            {/* Right column: Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <p
                className={`${leagueSpartan.className} mb-4 mt-3 text-sm font-bold leading-[1.57] tracking-[0.00714em] text-ink-900`}
              >
                Contact Info
              </p>

              <div className="flex flex-col items-center gap-3 md:items-start">
                {/* Location */}
                <div className="flex items-center gap-[10px]">
                  <Image
                    src="https://img.icons8.com/?size=100&id=7880&format=png&color=000000"
                    alt="location"
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <p
                    className={`${leagueSpartan.className} text-sm font-medium leading-[1.43] tracking-[0.01071em] text-black`}
                  >
                    Sharjah, UAE
                  </p>
                </div>

                {/* Phone */}
                <Link
                  href="tel:+971564900376"
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Image
                    src="https://img.icons8.com/?size=100&id=3kO3tw1rKmYw&format=png&color=000000"
                    alt="phone"
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <p
                    className={`${leagueSpartan.className} text-sm font-medium leading-[1.43] tracking-[0.01071em] text-black hover:text-[#37B6FF]`}
                  >
                    +971 56 490 0376
                  </p>
                </Link>

                {/* Email */}
                <Link
                  href="mailto:info@tuitional.com"
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Image
                    src="https://img.icons8.com/?size=100&id=GoQbcSSHazaK&format=png&color=000000"
                    alt="email"
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <p
                    className={`${leagueSpartan.className} text-sm font-medium leading-[1.43] tracking-[0.01071em] text-black hover:text-[#37B6FF]`}
                  >
                    info@tuitional.com
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="w-[78%] border-t border-black" />

          {/* Copyright — subtitle2 theme (statLabel): uppercase, lh 1.4, ls 0.05em */}
          <p
            className={`${leagueSpartan.className} my-4 text-center text-sm font-medium uppercase leading-[1.4] tracking-[0.05em] text-ink-900 sm:my-5 md:my-[30px] lg:my-10`}
          >
            © 2024 Tuitional
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
