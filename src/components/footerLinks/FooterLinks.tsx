"use client";

import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { findExactSubjectURL, findGetHelpURL } from "@/utils/helper";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

const FooterLinks = ({
  footerData,
  exact,
}: {
  footerData: string[] | undefined;
  exact: boolean;
}) => {
  // const router = useRouter();

  // Early return if footerData is not a valid array
  if (!Array.isArray(footerData) || footerData.length === 0) {
    return null;
  }

  return (
    <>
      {footerData.slice(0, 10).map((item: string, index: number) => {
        // Skip empty, null, or undefined items
        if (!item || typeof item !== 'string' || item.trim() === '') {
          return null;
        }
        
        const href = exact ? findExactSubjectURL(item) : findGetHelpURL(item);
        const finalHref = href || "/"; // Ensure we always have a valid href
        
        return (
          <a href={finalHref} key={index}>
            <Typography
              sx={styles.text}
              variant="body2"
              className={leagueSpartan.className}
            >
              {item}
            </Typography>
          </a>
        );
      })}
    </>
  );
};

export default FooterLinks;

const styles = {
  text: {
    cursor: "pointer",
    lineHeight: {
      xs: "35px",
      sm: "40px",
      md: "40px",
      lg: "45px",
    },
    color: "black",
  },
};
