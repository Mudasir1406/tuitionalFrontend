"use client";
import React from "react";
import styles from "./Ar-TagsAndSocial.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import Image from "next/image";
import ArTag from "@/components/ar-tags/Ar-Tag";
import facebook from "../../../../public/assets/images/static/facebook-png-icon-follow-us-facebook-1.png";
import twitter from "../../../../public/assets/images/static/1707226109new-twitter-logo-png.png";
import linkedin from "../../../../public/assets/images/static/linkedIn_PNG27.png";
import whatsapp from "../../../../public/assets/images/static/pngimg.com - whatsapp_PNG21.png";
import { usePathname } from "next/navigation";

interface Props {
  tags: { name: { en: string; ar: string }; id: string }[];
  showSocial: boolean;
}
function ArTagsAndSocial({ tags, showSocial }: Props) {
  // console.log("showSocial", showSocial);
  const pathname = usePathname();
  const currentUrl = `https://tuitionaledu.com${pathname}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`, // Twitter share URL
  };
  const newUrl = `/ar/blog/tag`;

  return (
    <div className={styles.tagsAndSocial}>
      <div className={styles.tags}>
        <Typography
          className={leagueSpartan.className}
          component={"p"}
          variant="subtitle2"
        >
          الوسوم
        </Typography>
        <div className={styles.allTags}>
          {tags?.map((tag: any, i) => (
            <ArTag
              label={tag.name.ar || tag.name.en}
              key={i}
              link={`${newUrl}/${tag?.id}`}
            />
          ))}
        </div>
      </div>
      {showSocial && (
        <div className={styles.socialDiv}>
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.socialIcon}
              src={facebook}
              alt="facebook"
            />{" "}
          </a>
          <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={twitter} alt="twitter" />{" "}
          </a>
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.socialIcon}
              src={whatsapp}
              alt="whatsapp"
            />{" "}
          </a>
          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.socialIcon}
              src={linkedin}
              alt="linkedin"
            />{" "}
          </a>
        </div>
      )}
    </div>
  );
}

export default ArTagsAndSocial;