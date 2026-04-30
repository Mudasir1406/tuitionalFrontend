"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ArTag from "@/components/ar-tags/Ar-Tag";
import facebook from "../../../../public/assets/images/static/facebook-png-icon-follow-us-facebook-1.png";
import twitter from "../../../../public/assets/images/static/1707226109new-twitter-logo-png.png";
import linkedin from "../../../../public/assets/images/static/linkedIn_PNG27.png";
import whatsapp from "../../../../public/assets/images/static/pngimg.com - whatsapp_PNG21.png";

interface Props {
  tags: { name: { en: string; ar: string }; id: string }[];
  showSocial: boolean;
}

function ArTagsAndSocial({ tags, showSocial }: Props) {
  const pathname = usePathname();
  const currentUrl = `https://tuitionaledu.com${pathname}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
  };
  const tagsBase = "/ar/blog/tag";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" dir="rtl">
      <div>
        <p className="font-heading text-stat-label uppercase text-ink-700">الوسوم</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags?.map((tag: any, i) => (
            <ArTag
              label={tag.name.ar || tag.name.en}
              key={i}
              link={`${tagsBase}/${tag?.id}`}
            />
          ))}
        </div>
      </div>
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
  );
}

export default ArTagsAndSocial;
