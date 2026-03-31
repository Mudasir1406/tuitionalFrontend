import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import styles from "./BlogAuthorProfile.module.css";

interface AuthorProfileData {
  authorName?: string;
  authorImage?: string;
  blogDate?: string;
  authorAbout?: string;
  authorCountry?: string;
  authorStars?: number;
}

interface Props {
  data: AuthorProfileData;
}

const StarRating = ({ stars }: { stars: number }) => {
  const total = 5;
  return (
    <div className={styles.stars} aria-label={`${stars} out of 5 stars`}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < stars ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
};

const BlogAuthorProfile: React.FC<Props> = ({ data }) => {
  if (!data?.authorName) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          {data.authorImage ? (
            <Image
              src={data.authorImage}
              alt={data.authorName}
              fill
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {data.authorName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <Typography
            className={`${leagueSpartan.className} ${styles.name}`}
            variant="h6"
            component="p"
          >
            {data.authorName}
          </Typography>

          <div className={styles.meta}>
            {data.authorCountry && (
              <Typography
                className={`${leagueSpartan.className} ${styles.metaText}`}
                variant="body2"
                component="span"
              >
                📍 {data.authorCountry}
              </Typography>
            )}
            {data.blogDate && (
              <Typography
                className={`${leagueSpartan.className} ${styles.metaText}`}
                variant="body2"
                component="span"
              >
                🗓 {data.blogDate}
              </Typography>
            )}
          </div>

          {data.authorStars ? (
            <StarRating stars={Number(data.authorStars)} />
          ) : null}

          {data.authorAbout && (
            <Typography
              className={`${leagueSpartan.className} ${styles.about}`}
              variant="body2"
              component="p"
            >
              {data.authorAbout}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAuthorProfile;
