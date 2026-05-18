"use client";

import { leagueSpartan } from "@/app/fonts";
import { findExactSubjectURL, findGetHelpURL } from "@/utils/helper";
import { useI18n } from "@/context/language-context";
import Link from "next/link";

const FooterLinks = ({
  footerData,
  exact,
}: {
  footerData: string[] | undefined;
  exact: boolean;
}) => {
  const { locale } = useI18n();

  if (!Array.isArray(footerData) || footerData.length === 0) {
    return null;
  }

  return (
    <>
      {footerData.slice(0, 10).map((item: string, index: number) => {
        if (!item || typeof item !== "string" || item.trim() === "") {
          return null;
        }

        const href = exact ? findExactSubjectURL(item) : findGetHelpURL(item);
        let finalHref = href || "/";

        if (locale === "ar" && finalHref !== "/" && !finalHref.startsWith("/ar")) {
          finalHref = `/ar${finalHref}`;
        }

        return (
          <Link href={finalHref} key={index}>
            <p
              className={`${leagueSpartan.className} cursor-pointer font-heading text-small text-black leading-[24px] sm:leading-[26px] md:leading-[28px] lg:text-base lg:leading-[30px]`}
            >
              {item}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default FooterLinks;
