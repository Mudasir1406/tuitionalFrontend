"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import greenstar from "../../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../../public/assets/images/svg/greenstars.svg";

interface Props {
  slug?: string;
}

const Hero = ({ slug }: Props) => {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <h1
        className="relative inline-block mt-[1vh] mb-[0vh] pr-[2vw] font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-brand-500
          before:content-[''] before:absolute before:z-10 before:bg-no-repeat before:bg-contain
          before:left-0 before:-top-[2.5vh] before:h-[1.9vh] before:w-[2vh] before:bg-[url('/assets/images/static/linesMobile.png')]
          md:before:left-auto md:before:right-0
          lg:before:-top-[3vh] lg:before:h-[4.3vh] lg:before:w-[4.3vh] lg:before:bg-[url('/assets/images/static/lines.png')]"
      >
        {slug ?? "Our Blogs"}
      </h1>

      <p className="mt-[1vh] px-[2vh] font-heading text-body-mobile sm:text-body text-black lg:px-0 lg:w-[90%]">
        Your source for expert tips, academic strategies, and learning resources
        for Cambridge, AP, and more
      </p>

      <div
        className="mt-[1vh] flex items-center justify-center w-[95%] h-[5.5vh] md:max-w-[50vw] lg:mt-[1.5vh] lg:h-[8.5vh] bg-white rounded-[2vh]
          shadow-[0px_-5px_5px_0px_rgba(0,0,0,0.2)_inset,0px_4px_5px_0px_rgba(0,0,0,0.25)_inset]"
      >
        <input
          type="email"
          placeholder="Your Email*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[60%] h-full bg-transparent border-0 px-4 font-heading text-form-input text-ink-900 outline-none placeholder:text-ink-400"
        />
        <Button
          onClick={() => {}}
          variant="primary"
          className="w-[40%] h-full rounded-l-none rounded-r-[14px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.2)_inset] hover:scale-[1.02] hover:shadow-[1px_4px_14px_0px_rgba(56,182,255,0.54)] transition-all duration-500"
        >
          Subscribe!
        </Button>
      </div>

      <div className="mt-[1vh] flex flex-row items-center justify-center gap-3 sm:mt-[1.5vh] lg:mt-[2vh] lg:justify-start">
        <div className="inline-flex items-center gap-2 leading-none">
          <Image
            src={greenstar}
            alt=""
            className="block h-[3vh] w-[3vh] shrink-0 object-contain"
          />
          <span className="font-heading text-stat-label uppercase">
            Trustpilot
          </span>
        </div>
        <div className="inline-flex items-center gap-2 leading-none">
          <span className="font-heading text-small">Excellent (4.7/5)</span>
          <Image
            src={greenstars}
            alt=""
            className="block h-[3vh] w-[14vh] shrink-0 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
