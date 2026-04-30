"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import moment from "moment";
import facebook from "../../../../public/assets/images/static/facebook-png-icon-follow-us-facebook-1.png";
import twitter from "../../../../public/assets/images/static/1707226109new-twitter-logo-png.png";
import linkedin from "../../../../public/assets/images/static/linkedIn_PNG27.png";
import whatsapp from "../../../../public/assets/images/static/pngimg.com - whatsapp_PNG21.png";

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
}

const ArHero = ({ data, timestamp, showSocial }: Props) => {
  const pathname = usePathname();
  const currentUrl = `https://tuitionaledu.com${pathname}`;
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
  };

  const HeaderTag = (data?.headerTag ?? "h1") as "h1" | "h2" | "h3";

  return (
    <div className="relative bg-brand-50 px-4 pt-32 pb-12 lg:pt-40" dir="rtl">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
        <HeaderTag className="text-center font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-black">
          {data?.header}
        </HeaderTag>
        <p className="font-heading text-body-mobile text-ink-700">
          {`${data?.category?.data?.[0]?.name?.ar || data?.category?.data?.[0]?.name?.en} | ${moment(timestamp * 1000).format("MMMM DD,YYYY")}`}
        </p>
        {showSocial && (
          <div className="flex gap-3">
            <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
              <Image className="h-8 w-8 object-contain" src={facebook} alt="facebook" />
            </a>
            <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
              <Image className="h-8 w-8 object-contain" src={twitter} alt="twitter" />
            </a>
            <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
              <Image className="h-8 w-8 object-contain" src={whatsapp} alt="whatsapp" />
            </a>
            <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
              <Image className="h-8 w-8 object-contain" src={linkedin} alt="linkedin" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArHero;
