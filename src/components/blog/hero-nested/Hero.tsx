"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import facebook from "../../../../public/assets/images/static/facebook-png-icon-follow-us-facebook-1.png";
import twitter from "../../../../public/assets/images/static/1707226109new-twitter-logo-png.png";
import linkedin from "../../../../public/assets/images/static/linkedIn_PNG27.png";
import whatsapp from "../../../../public/assets/images/static/pngimg.com - whatsapp_PNG21.png";

interface AuthorProfile {
  authorName?: string;
  blogDate?: string;
  authorCountry?: string;
  authorStars?: number;
}

interface Props {
  data: {
    category: { data: { id: string; name: { ar: string; en: string } }[] };
    date: string;
    headerTag: any;
    header: string;
    imageAltText: string;
    image: string;
  };
  timestamp: number;
  showSocial: boolean;
  authorProfile?: AuthorProfile;
}

const Hero = ({ data, timestamp, showSocial, authorProfile }: Props) => {
  const pathname = usePathname();
  const currentUrl = `https://tuitionaledu.com${pathname}`;
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
  };

  const HeaderTag = (data?.headerTag?.trim() || "h1").toLowerCase() as
    | "h1"
    | "h2"
    | "h3";

  return (
    <div
      className="relative flex h-[70vh] items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #d6f0ff, rgba(255, 255, 255, 0.9))",
      }}
    >
      {/* Left decorative bg */}
      <div
        className="absolute left-0 top-[10%] z-[1] h-[250px] w-[250px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/static/blogBg1.png')" }}
      />
      {/* Right decorative bg */}
      <div
        className="absolute bottom-0 right-0 z-[1] h-[250px] w-[250px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/static/blogBg2.png')" }}
      />

      {/* Main content */}
      <div className="relative z-[2] flex w-full max-w-[75vw] flex-col items-center px-4 text-center sm:max-w-[70vw] lg:max-w-[60vw]">
        <HeaderTag className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-black">
          {data?.header}
        </HeaderTag>

        {/* Author / date pill */}
        <div className="mt-[2vh] flex max-w-[290px] flex-col items-center rounded-md bg-[#08b463] px-3 py-2">
          <span className="font-heading text-body-mobile text-white">
            {`${authorProfile?.authorName} | ${authorProfile?.blogDate}`}
          </span>
        </div>

        {/* Social share icons */}
        {showSocial && (
          <div className="mt-[5vh] flex flex-row items-center justify-center gap-2">
            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="h-[47px] w-[47px] cursor-pointer object-cover"
                src={facebook}
                alt="facebook"
              />
            </a>
            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="h-[47px] w-[47px] cursor-pointer object-cover"
                src={twitter}
                alt="twitter"
              />
            </a>
            <a
              href={shareUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="h-[47px] w-[47px] cursor-pointer object-cover"
                src={whatsapp}
                alt="whatsapp"
              />
            </a>
            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="h-[47px] w-[47px] cursor-pointer object-cover"
                src={linkedin}
                alt="linkedin"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
