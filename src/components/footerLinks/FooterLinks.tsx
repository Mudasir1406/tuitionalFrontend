"use client";

import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { findExactSubjectURL, findGetHelpURL } from "@/utils/helper";
import { useI18n } from "@/context/language-context";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const FooterLinks = ({
  footerData,
  exact,
}: {
  footerData: string[] | undefined;
  exact: boolean;
}) => {
  // const router = useRouter();
  const { locale } = useI18n();

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
        let finalHref = href || "/"; // Ensure we always have a valid href
        
        // Add /ar prefix for Arabic locale if not already present
        if (locale === 'ar' && finalHref !== "/" && !finalHref.startsWith('/ar')) {
          finalHref = `/ar${finalHref}`;
        }
        
        return (
          <Link href={finalHref} key={index}>
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
