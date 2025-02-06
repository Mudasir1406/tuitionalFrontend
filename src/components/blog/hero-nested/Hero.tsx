"use client";

import React, { useState } from "react";
import styles from "./Hero.module.css";
import { leagueSpartan } from "@/app/fonts";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import arrow from "../../../../public/assets/images/static/Arrow 8.png";
import facebook from "../../../../public/assets/images/static/facebook-png-icon-follow-us-facebook-1.png";
import twitter from "../../../../public/assets/images/static/1707226109new-twitter-logo-png.png";
import linkedin from "../../../../public/assets/images/static/linkedIn_PNG27.png";
import whatsapp from "../../../../public/assets/images/static/pngimg.com - whatsapp_PNG21.png";
import { usePathname } from "next/navigation";
import moment from "moment";

interface Props {
  data: {
    category: { name: string; id: string }[];
    date: string;
    headerTag: any;
    header: string;
    imageAltText: string;
    image: string;
  };
  timestamp: number;
  showSocial: boolean;
}

const Hero = ({ data, timestamp, showSocial }: Props) => {
  // console.log("timestamp", data);
  const pathname = usePathname();
  const currentUrl = `https://tuitionaledu.com${pathname}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`, // Twitter share URL
  };
  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftIcons} />
      <div className={styles.rightIcons} />
      <div className={styles.main}>
        <Typography
          className={`${styles.expertText} ${leagueSpartan.className}`}
          variant="h1"
          component={data?.headerTag ? data?.headerTag : "h1"}
        >
          {data?.header}
          {/* Unlocking the Secrets to Effective <br /> Online Learning */}
        </Typography>

        <div className={styles.categoryDiv}>
          <Typography
            className={`${styles.expertText} ${leagueSpartan.className}`}
            variant="body2"
            component={"p"}
          >
            {`${data?.category?.[0]?.name} | ${moment(timestamp * 1000).format(
              "MMMM DD,YYYY"
            )}
              `}
          </Typography>
        </div>
        {showSocial && (
          <div className={styles.centerDiv}>
            <div className={styles.arrowDiv}>
              <Image src={arrow} alt="arrow" />
            </div>
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
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.socialIcon}
                  src={twitter}
                  alt="twitter"
                />{" "}
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
            </div>{" "}
          </div>
        )}
{data?.image && (
  <div className={styles.imageDiv}>
    <Image
      src={data?.image}
      alt={data?.imageAltText}
      className={styles.blogImg}
      fill
    />
  </div>
)}
      </div>{" "}
    </div>
  );
};

export default Hero;


