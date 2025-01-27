"use client";

import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { findExactSubjectURL } from "@/utils/helper";
import { useRouter } from "next/navigation";

const FooterLinks = ({ footerData }: { footerData: any }) => {
  const router = useRouter();
  return (
    <>
      {footerData?.slice(0, 10).map((item: string, index: number) => {
        const href = findExactSubjectURL(item);
        return (
          // <Link
          //   href={href}
          //   key={index}
          //   style={{
          //     textDecoration: "none",
          //     color: "inherit",
          //   }}
          // >
          <Typography
            onClick={() => router.push(href)}
            sx={styles.text}
            variant="body2"
            className={leagueSpartan.className}
          >
            {item}
          </Typography>
          // </Link>
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
