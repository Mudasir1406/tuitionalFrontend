"use client";

import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import {
  findExactSubjectURL,
  generateSlug,
  redirectToExternal,
} from "@/utils/helper";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FooterLinks = ({
  footerData,
  exact,
}: {
  footerData: any;
  exact: boolean;
}) => {
  const router = useRouter();

  return (
    <>
      {footerData?.slice(0, 10).map((item: string, index: number) => {
        const href = findExactSubjectURL(item);
        const href2 = `/${generateSlug(item)}`;
        return (
          <Link href={exact ? href : href2}>
            <Typography
              key={index}
              // onClick={() => router.push(exact ? href : href2)}
              // onClick={() => redirectToExternal(exact ? href : href2, false)}
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
