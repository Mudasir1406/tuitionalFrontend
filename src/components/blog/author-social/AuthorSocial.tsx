"use client";
import React from "react";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./AuthorSocial.module.css";
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

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
  };

  return (
    <div className={styles.authorContainer}>
      <div className={styles.authorInfo}>
        <Typography
          className={`${leagueSpartan.className} ${styles.authorName}`}
          variant="subtitle1"
          component="p"
        >
          Written by {authorName}
        </Typography>
        {authorBio && (
          <Typography
            className={`${leagueSpartan.className} ${styles.authorBio}`}
            variant="body2"
            component="p"
          >
            {authorBio}
          </Typography>
        )}
      </div>
      <div className={styles.shareSection}>
        <Typography
          className={`${leagueSpartan.className} ${styles.shareTitle}`}
          variant="subtitle2"
          component="p"
        >
          Share this article
        </Typography>
        <div className={styles.socialIcons}>
          <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={facebook} alt="facebook" />
          </a>
          <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={twitter} alt="twitter" />
          </a>
          <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={whatsapp} alt="whatsapp" />
          </a>
          <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AuthorSocial;
