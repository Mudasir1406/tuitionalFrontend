import React from "react";
import styles from "./TagsAndSocial.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import Image from "next/image";
import Tag from "@/components/tags/Tag";
import facebook from "../../../../public/assets/images/static/facebook 1.png";
import share from "../../../../public/assets/images/static/share 1.png";
import instagram from "../../../../public/assets/images/static/instagram 1.png";
import social from "../../../../public/assets/images/static/social 1.png";

interface Props {
  tags: string[];
}
function TagsAndSocial({ tags }: Props) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      currentUrl
    )}`,
    instagram: "https://www.instagram.com/", // Instagram does not have a direct URL sharing mechanism
  };
  return (
    <div className={styles.tagsAndSocial}>
      <div className={styles.tags}>
        <Typography
          className={leagueSpartan.className}
          component={"p"}
          variant="subtitle2"
        >
          Tags
        </Typography>
        <div className={styles.allTags}>
          {tags?.map((tag, i) => (
            <Tag label={tag} key={i} />
          ))}
        </div>
      </div>
      <div className={styles.socialDiv}>
        <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
          <Image className={styles.socialIcon} src={facebook} alt="facebook" />{" "}
        </a>
        <a href={shareUrls.instagram} target="_blank" rel="noopener noreferrer">
          <Image
            className={styles.socialIcon}
            src={instagram}
            alt="instagram"
          />{" "}
        </a>
        <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
          <Image className={styles.socialIcon} src={social} alt="social" />{" "}
        </a>
        <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
          <Image className={styles.socialIcon} src={share} alt="share" />{" "}
        </a>
      </div>{" "}
    </div>
  );
}

export default TagsAndSocial;
