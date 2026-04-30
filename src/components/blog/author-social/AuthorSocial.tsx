"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import facebook from "../../../../public/assets/images/static/facebook-png-icon-follow-us-facebook-1.png";
import twitter from "../../../../public/assets/images/static/1707226109new-twitter-logo-png.png";
import linkedin from "../../../../public/assets/images/static/linkedIn_PNG27.png";
import whatsapp from "../../../../public/assets/images/static/pngimg.com - whatsapp_PNG21.png";

interface Props {
  authorName: string;
  authorBio?: string;
}

function AuthorSocial({ authorName, authorBio }: Props) {
  const pathname = usePathname();
  const currentUrl = `https://tuitionaledu.com${pathname}`;
  const isArabic = pathname.startsWith("/ar");
  const writtenBy = isArabic ? "كتبه" : "Written by";
  const shareTitle = isArabic ? "شارك هذا المقال" : "Share this article";

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-heading text-h5 text-ink-900">
          {writtenBy} {authorName}
        </p>
        {authorBio && (
          <p className="mt-1 font-heading text-small text-ink-700">{authorBio}</p>
        )}
      </div>
      <div>
        <p className="font-heading text-stat-label uppercase text-ink-700">
          {shareTitle}
        </p>
        <div className="mt-2 flex gap-3">
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
      </div>
    </div>
  );
}

export default AuthorSocial;
