"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AtSign, Phone as PhoneIcon } from "lucide-react";

import plan from "../../public/assets/images/static/plan.png";
import phone from "../../public/assets/images/static/phone-call.png";
import logo from "../../public/assets/images/static/logo.png";

import { FooterData } from "../services/footer/footer";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "./pop-up-button";
import { useI18n } from "@/context/language-context";
import FooterLinks from "./footerLinks/FooterLinks";
import { findAboutUsURL } from "@/utils/helper";

interface FooterProps {
  footerData: FooterData | null;
}

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const { t, locale } = useI18n();

  return (
    <footer>
      {/* styles.background */}
      <div className="relative flex w-full items-center justify-center bg-footer-fade py-6 md:py-[40px]">
        {/* styles.rightCircle */}
        <div className="absolute right-[60px] top-[70px] -z-[1] flex h-[135px] w-[135px] rounded-full bg-[#37B6FF]" />
        {/* styles.leftCircle */}
        <div className="absolute bottom-0 -left-[230px] -z-[1] flex h-[330px] w-[330px] rounded-full border-[100px] border-[#37B6FF] bg-transparent sm:h-[430px] sm:w-[430px]" />

        {/* styles.contanier */}
        <div className="z-0 flex w-[90%] flex-col items-center justify-center rounded-[10px] bg-white/70 shadow-footer-card">
          {/* styles.contactContanier — tuned to reference */}
          <div className="flex w-4/5 items-center -mt-[50px] rounded-[5px] bg-brand-500 p-[12px] sm:p-4 md:w-[85%] md:p-[20px] lg:p-[24px]">
            {/* Row layout: single line on lg, wraps on smaller */}
            <div className="flex w-full flex-wrap items-center justify-center gap-4 lg:flex-nowrap lg:justify-between lg:gap-4">
              {/* plane circle */}
              <div className="flex w-full justify-center lg:w-auto lg:shrink-0">
                {/* styles.imageContanier — sized to reference */}
                <div className="flex h-[70px] min-h-[70px] min-w-[70px] max-h-[85px] max-w-[85px] w-[70px] items-center justify-center rounded-full bg-white lg:h-[80px] lg:w-[80px]">
                  <Image
                    src={plan.src}
                    width={plan.width}
                    height={plan.height}
                    alt="plan"
                    quality={100}
                    style={{
                      width: "44px",
                      height: "52px",
                      marginTop: "8px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>

              {/* admission text — flex-1 at lg, centered on mobile */}
              <div className="w-full text-center md:text-start lg:flex-1 lg:min-w-0">
                <span
                  className={`${leagueSpartan.className} text-white text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] font-bold leading-[1.15] tracking-[0.00833em] md:ms-[10px]`}
                >
                  {t("footer.admission_text")}
                </span>
              </div>

              {/* phone */}
              <div className="w-full lg:w-auto lg:shrink-0">
                <div className="flex items-center justify-center lg:justify-start leading-none">
                  <Image
                    src={phone.src}
                    width={phone.width}
                    height={phone.height}
                    alt="phone"
                    className="block h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 shrink-0"
                  />
                  <span
                    className={`${leagueSpartan.className} mx-[10px] whitespace-nowrap text-white text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.625rem] font-bold leading-none tracking-[-0.01em] m-0`}
                  >
                    +971 56 490 0376
                  </span>
                </div>
              </div>

              {/* enroll CTA */}
              <div className="flex w-full justify-center lg:w-auto lg:shrink-0">
                <PopUpButton
                  text={t("footer.enroll_now")}
                  href="popup"
                  className="w-full rounded-[10px] bg-white px-[18px] py-[12px] text-[0.875rem] font-bold leading-[20px] tracking-[-0.02em] text-[#009BF5] shadow-cta-white md:px-[22px] md:py-[14px] md:text-[1rem] lg:w-auto lg:px-[24px] lg:py-[14px] lg:text-[1rem] hover:bg-white"
                />
              </div>
            </div>
          </div>

          {/* second <Grid container columnSpacing={5}> — switched to CSS grid so 4-col lg layout fits with gap-x-10 (flex-wrap+w-1/4 overflowed and wrapped Get Help to row 2) */}
          <div className="grid w-full grid-cols-2 gap-x-10 mt-10 px-[5vw] sm:mt-12 md:mt-12 md:ps-[5vw] md:pe-[2vw] lg:mt-12 lg:grid-cols-4">
            {/* <Grid item lg={3} sm={12}> — logo + description + social */}
            <div className="col-span-2 lg:col-span-1">
              {/* styles.gridContent */}
              <div className="flex flex-col">
                {/* logo wrapper: w-100%, flex items-center, justifyContent xs/sm:center lg:flex-start */}
                <div className="flex w-full items-center justify-center lg:justify-start">
                  <Image
                    src={logo.src}
                    width={logo.width / 1.5}
                    height={logo.height / 1.5}
                    alt="logo"
                    style={{ alignSelf: "start" }}
                  />
                </div>
                {/* <Typography variant="body2" sx={styles.desc}> — body2 default 0.875rem/400/lh 1.43 + mt-40 black textAlign xs/sm:center md/lg:start */}
                <p
                  className={`${leagueSpartan.className} mt-6 text-center text-black md:text-start lg:text-start text-sm font-normal leading-[1.43] tracking-[0.01071em] lg:text-base`}
                >
                  {t("footer.description")}
                </p>

                {/* styles.socialBox */}
                <div className="flex flex-col mt-6 lg:mt-8 items-center lg:items-start justify-center mb-6 lg:mb-8">
                  {/* styles.iconsOnly: flex items-center, justify xs:center lg:start, mb 15 */}
                  <div className="flex items-center justify-center lg:justify-start mb-[15px]">
                    {footerData?.link?.facebook && (
                      <Link
                        target="_blank"
                        href={footerData.link.facebook}
                        rel="noreferrer"
                      >
                        {/* styles.social: 48×48, mr-20, cursor-pointer, z-100 — fluency colored brand icons */}
                        <Image
                          src="https://img.icons8.com/fluency/48/facebook-new.png"
                          alt="facebook"
                          width={48}
                          height={48}
                          className="me-5 cursor-pointer z-[100]"
                        />
                      </Link>
                    )}
                    {footerData?.link?.insta && (
                      <Link
                        target="_blank"
                        href={footerData.link.insta}
                        rel="noreferrer"
                      >
                        <Image
                          src="https://img.icons8.com/fluency/48/instagram-new.png"
                          alt="insta"
                          width={48}
                          height={48}
                          className="me-5 cursor-pointer z-[100]"
                        />
                      </Link>
                    )}
                    {footerData?.link?.linkdin && (
                      <Link
                        target="_blank"
                        href={footerData.link.linkdin}
                        rel="noreferrer"
                      >
                        <Image
                          src="https://img.icons8.com/fluency/48/linkedin.png"
                          alt="linkdin"
                          width={48}
                          height={48}
                          className="me-5 cursor-pointer z-[100]"
                        />
                      </Link>
                    )}
                  </div>

                  {/* styles.contactInfo: flex flex-col, items xs:center lg:start, gap-5px */}
                  <div className="flex flex-col items-center lg:items-start gap-[5px]">
                    <Link
                      href="mailto:hello@tuitionaledu.com"
                      className="inline-flex items-center no-underline group"
                    >
                      <AtSign
                        size={18}
                        strokeWidth={2}
                        className="me-[10px] shrink-0 text-brand-500 block"
                        aria-hidden="true"
                      />
                      <span
                        className={`${leagueSpartan.className} text-[14px] font-medium text-black leading-[18px] tracking-[0.01071em] group-hover:text-[#37B6FF] m-0`}
                      >
                        hello@tuitionaledu.com
                      </span>
                    </Link>
                    <Link
                      href="tel:+971564900376"
                      className="inline-flex items-center no-underline group"
                    >
                      <PhoneIcon
                        size={18}
                        strokeWidth={2}
                        className="me-[10px] shrink-0 text-brand-500 block"
                        aria-hidden="true"
                      />
                      <span
                        className={`${leagueSpartan.className} text-[14px] font-medium text-black leading-[18px] tracking-[0.01071em] group-hover:text-[#37B6FF] m-0`}
                      >
                        +971 56 490 0376
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — Curriculums */}
            <div>
              <div className="flex flex-col">
                {/* <Typography variant="subtitle2" sx={styles.heading}> — subtitle2 base 0.875rem/lh 1.57/ls 0.00714em + fontWeight 700 mb-15 mt-12 capitalize */}
                <p
                  className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[12px] text-ink-900 lg:text-base`}
                >
                  {t("footer.sections.curriculums")}
                </p>
                {Array.isArray(footerData?.curriculums) &&
                  footerData.curriculums.length > 0 && (
                    <FooterLinks footerData={footerData.curriculums} exact />
                  )}
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — Subjects */}
            <div>
              <div className="flex flex-col">
                <p
                  className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[12px] text-ink-900 lg:text-base`}
                >
                  {t("footer.sections.subjects")}
                </p>
                {Array.isArray(footerData?.subjects) &&
                  footerData.subjects.length > 0 && (
                    <FooterLinks footerData={footerData.subjects} exact />
                  )}
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — Get Help + About Us (lg only) */}
            <div>
              <div className="flex flex-col">
                <div>
                  <p
                    className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[12px] text-ink-900`}
                  >
                    {t("footer.sections.get_help")}
                  </p>
                  {Array.isArray(footerData?.getHelp) &&
                    footerData.getHelp.length > 0 && (
                      <FooterLinks
                        footerData={footerData.getHelp}
                        exact={false}
                      />
                    )}
                </div>
                {/* <Box sx={{ display: { xs: "none", lg: "block" } }}> — about-us, lg only */}
                <div className="hidden lg:block">
                  {/* heading + textAlign:start + marginTop:20 override */}
                  <p
                    className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[20px] text-start text-ink-900`}
                  >
                    {t("footer.sections.about_us")}
                  </p>
                  {Array.isArray(footerData?.aboutUs) &&
                    footerData.aboutUs.map((item, index) => {
                      if (
                        !item ||
                        typeof item !== "string" ||
                        item.trim() === ""
                      ) {
                        return null;
                      }
                      let url = findAboutUsURL(item);
                      if (
                        locale === "ar" &&
                        url !== "/" &&
                        !url.startsWith("/ar")
                      ) {
                        url = `/ar${url}`;
                      }
                      return (
                        <Link href={url} key={index}>
                          {/* <Typography variant="body2" sx={styles.text}> — body2 base + lineHeight 35/40/40/45 + black */}
                          <p
                            className={`${leagueSpartan.className} text-sm font-normal tracking-[0.01071em] text-black leading-[35px] sm:leading-[40px] md:leading-[40px] lg:leading-[45px]`}
                          >
                            {item}
                          </p>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — About Us (xs/sm/md only) */}
            <div className="lg:hidden">
              <div className="flex flex-col">
                <p
                  className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[20px] text-start text-ink-900`}
                >
                  {t("footer.sections.about_us")}
                </p>
                {Array.isArray(footerData?.aboutUs) &&
                  footerData.aboutUs.map((item, index) => {
                    if (
                      !item ||
                      typeof item !== "string" ||
                      item.trim() === ""
                    ) {
                      return null;
                    }
                    let url = findAboutUsURL(item);
                    if (
                      locale === "ar" &&
                      url !== "/" &&
                      !url.startsWith("/ar")
                    ) {
                      url = `/ar${url}`;
                    }
                    return (
                      <Link href={url} key={index}>
                        <p
                          className={`${leagueSpartan.className} text-sm font-normal tracking-[0.01071em] text-black leading-[24px] sm:leading-[26px] md:leading-[28px] lg:text-base lg:leading-[30px]`}
                        >
                          {item}
                        </p>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* <Divider sx={{ color: "black", width: "78%" }}> */}
          <hr className="w-[78%] border-t border-black" />

          {/* <Typography variant="subtitle2" sx={styles.rights}> — theme subtitle2 = statLabel: 0.875rem/500/lh 1.4/ls 0.05em/uppercase + sx my-{20/30/50/70} textAlign center */}
          <p
            className={`${leagueSpartan.className} text-sm font-medium uppercase leading-[1.4] tracking-[0.05em] my-4 sm:my-5 md:my-5 lg:my-6 text-center text-ink-900`}
          >
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
