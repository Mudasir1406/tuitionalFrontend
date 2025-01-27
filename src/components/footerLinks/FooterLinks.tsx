"use client";

import Link from "next/link";
import { Typography } from "@mui/material"; // Adjust based on your imports
import { leagueSpartan } from "@/app/fonts";
import { findExactSubjectURL } from "@/utils/helper";

const FooterLinks = ({ footerData }: { footerData: any }) => {
  return (
    <>
      {footerData?.slice(0, 10).map((item: string, index: number) => {
        const href = findExactSubjectURL(item);
        return (
          <Link
            href={href}
            key={index}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography
              sx={styles.text}
              variant="body2"
              className={leagueSpartan.className}
            >
              {item}
            </Typography>
          </Link>
        );
      })}
    </>
  );
};

export default FooterLinks;

const styles = {
  text: {
    lineHeight: {
      xs: "35px",
      sm: "40px",
      md: "40px",
      lg: "45px",
    },
    color: "black",
  },
};
