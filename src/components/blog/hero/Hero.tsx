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
    <div className="flex flex-col items-center bg-brand-50 px-4 pt-32 pb-12 lg:pt-48">
      <h1 className="text-center font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-black">
        {slug ?? "Our Blogs"}
      </h1>
      <p className="mt-4 text-center font-heading text-body-mobile sm:text-body text-ink-800 max-w-2xl">
        Your source for expert tips, academic strategies, and learning resources
        for Cambridge, AP, and more
      </p>
      <div className="mt-6 flex w-full max-w-md items-center gap-2 rounded-md bg-white p-2 shadow-card">
        <input
          type="email"
          placeholder="Your Email*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 bg-transparent px-2 py-1 font-body text-form-input text-ink-900 outline-none placeholder:text-ink-400"
        />
        <Button onClick={() => {}} variant="primary" size="sm">
          Subscribe!
        </Button>
      </div>
      <div className="mt-[1vh] flex flex-row items-center justify-start gap-4 sm:mt-[2vh] lg:mt-[6vh]">
        <div className="flex items-center">
          <Image src={greenstar} alt="" className="h-[3vh] w-[3vh]" />
          <p className="ps-[1vh] pt-[0.7vh] font-heading text-stat-label uppercase">
            Trustpilot
          </p>
        </div>
        <div className="flex items-center">
          <p className="pt-[1vh] font-heading text-small">Excellent (4.7/5)</p>
          <Image src={greenstars} alt="" className="h-[3vh] w-[14vh] ps-[2vh] pt-[0.7vh]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
