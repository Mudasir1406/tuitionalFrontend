"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="relative flex w-full items-center justify-center bg-footer-fade py-10 md:py-[100px]">
        {/* styles.rightCircle */}
        <div className="absolute right-[60px] top-[70px] -z-[1] flex h-[135px] w-[135px] rounded-full bg-[#37B6FF]" />
        {/* styles.leftCircle */}
        <div className="absolute bottom-0 -left-[230px] -z-[1] flex h-[330px] w-[330px] rounded-full border-[100px] border-[#37B6FF] bg-transparent sm:h-[430px] sm:w-[430px]" />

        {/* styles.contanier */}
        <div className="z-0 flex w-[90%] flex-col items-center justify-center rounded-[10px] bg-white/70 shadow-footer-card">
          {/* styles.contactContanier */}
          <div className="flex w-4/5 items-center -mt-[70px] rounded-[5px] bg-brand-500 p-[10px] sm:p-5 md:w-[85%] md:p-[25px] lg:p-[30px]">
            {/* <Grid container spacing={2}> with flex/items-center/justify-center sx */}
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {/* <Grid item lg={1} sm={12} display="flex" justifyContent="center"> */}
              <div className="flex w-full justify-center lg:w-[8.333%]">
                {/* styles.imageContanier */}
                <div className="flex h-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px] w-[9vh] items-center justify-center rounded-full bg-white">
                  <Image
                    src={plan.src}
                    width={plan.width}
                    height={plan.height}
                    alt="plan"
                    quality={100}
                    style={{ width: "50px", height: "60px", marginTop: "10px", objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* <Grid item lg={5.5}> */}
              <div className="w-full lg:w-[45.833%]">
                {/* <Typography variant="h2" sx={styles.admissionText}> — h2 default 3.75rem/300/lh 1.2/ls -0.00833em + ms-10 white textAlign xs/sm:center md:start */}
                <p
                  className={`${leagueSpartan.className} ms-[10px] text-center text-white md:text-start text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]`}
                >
                  {t("footer.admission_text")}
                </p>
              </div>

              {/* <Grid item lg={3.5}> */}
              <div className="w-full lg:w-[29.167%]">
                {/* inline <Box sx={{ display: flex, alignItems: center }}> */}
                <div className="flex items-center">
                  <Image src={phone.src} width={phone.width} height={phone.height} alt="phone" />
                  {/* <Typography variant="h2" sx={styles.phoneText}> — h2 default + mx-10 white */}
                  <p
                    className={`${leagueSpartan.className} mx-[10px] text-white text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]`}
                  >
                    +971 56 490 0376
                  </p>
                </div>
              </div>

              {/* <Grid item lg={2}> */}
              <div className="flex w-full justify-center lg:w-[16.667%]">
                {/* PopUpButton with sx=styles.contactButton */}
                <PopUpButton
                  text={t("footer.enroll_now")}
                  href="popup"
                  className="w-full rounded-[10px] bg-white px-[25px] py-[1.5vh] leading-[23px] tracking-[-0.02em] text-[#009BF5] shadow-cta-white md:px-[22px] md:py-[2vh] lg:px-[25px] lg:py-[2vh] hover:bg-white"
                />
              </div>
            </div>
          </div>

          {/* second <Grid container columnSpacing={5}> with marginTop responsive 70/80/90/100, paddingLeft xs:0 md:5vw, paddingRight 2vw */}
          <div className="flex w-full flex-wrap gap-x-10 mt-[70px] pe-[2vw] ps-0 sm:mt-20 md:mt-[90px] md:ps-[5vw] lg:mt-[100px]">
            {/* <Grid item lg={3} sm={12}> — logo + description + social */}
            <div className="w-full lg:w-1/4">
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
                  className={`${leagueSpartan.className} mt-10 text-center text-black md:text-start lg:text-start text-sm font-normal leading-[1.43] tracking-[0.01071em]`}
                >
                  {t("footer.description")}
                </p>

                {/* styles.socialBox: flex flex-col, mt xs:40 lg:20, items xs:center lg:start, justify center, mb 80 */}
                <div className="flex flex-col mt-10 lg:mt-5 items-center lg:items-start justify-center mb-20">
                  {/* styles.iconsOnly: flex items-center, justify xs:center lg:start, mb 15 */}
                  <div className="flex items-center justify-center lg:justify-start mb-[15px]">
                    {footerData?.link?.facebook && (
                      <Link target="_blank" href={footerData.link.facebook} rel="noreferrer">
                        {/* styles.social: 40×40, mr-20, cursor-pointer, z-100 */}
                        <Image
                          src="https://img.icons8.com/?size=40&id=uLWV5A9vXIPu&format=png&color=000000"
                          alt="facebook"
                          width={40}
                          height={40}
                          className="me-5 cursor-pointer z-[100]"
                        />
                      </Link>
                    )}
                    {footerData?.link?.insta && (
                      <Link target="_blank" href={footerData.link.insta} rel="noreferrer">
                        <Image
                          src="https://img.icons8.com/?size=40&id=BrU2BBoRXiWq&format=png&color=000000"
                          alt="insta"
                          width={40}
                          height={40}
                          className="me-5 cursor-pointer z-[100]"
                        />
                      </Link>
                    )}
                    {footerData?.link?.linkdin && (
                      <Link target="_blank" href={footerData.link.linkdin} rel="noreferrer">
                        <Image
                          src="https://img.icons8.com/?size=40&id=MR3dZdlA53te&format=png&color=000000"
                          alt="linkdin"
                          width={40}
                          height={40}
                          className="me-5 cursor-pointer z-[100]"
                        />
                      </Link>
                    )}
                  </div>

                  {/* styles.contactInfo: flex flex-col, items xs:center lg:start, gap-5px */}
                  <div className="flex flex-col items-center lg:items-start gap-[5px]">
                    <Link
                      href="mailto:hello@tuitionaledu.com"
                      style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                    >
                      <Image
                        src="https://img.icons8.com/?size=100&id=GoQbcSSHazaK&format=png&color=000000"
                        alt="email"
                        width={20}
                        height={20}
                        style={{ marginRight: "10px" }}
                      />
                      {/* <Typography variant="body2" sx={styles.contactText}> — body2 base + 14px / 500 / black / hover:#37B6FF */}
                      <p
                        className={`${leagueSpartan.className} text-[14px] font-medium text-black leading-[1.43] tracking-[0.01071em] hover:text-[#37B6FF]`}
                      >
                        hello@tuitionaledu.com
                      </p>
                    </Link>
                    <Link
                      href="tel:+971564900376"
                      style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                    >
                      <Image
                        src="https://img.icons8.com/?size=100&id=3kO3tw1rKmYw&format=png&color=000000"
                        alt="phone"
                        width={20}
                        height={20}
                        style={{ marginRight: "10px" }}
                      />
                      <p
                        className={`${leagueSpartan.className} text-[14px] font-medium text-black leading-[1.43] tracking-[0.01071em] hover:text-[#37B6FF]`}
                      >
                        +971 56 490 0376
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — Curriculums */}
            <div className="w-1/2 lg:w-1/4">
              <div className="flex flex-col">
                {/* <Typography variant="subtitle2" sx={styles.heading}> — subtitle2 base 0.875rem/lh 1.57/ls 0.00714em + fontWeight 700 mb-15 mt-12 capitalize */}
                <p
                  className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[12px] text-ink-900`}
                >
                  {t("footer.sections.curriculums")}
                </p>
                {Array.isArray(footerData?.curriculums) && footerData.curriculums.length > 0 && (
                  <FooterLinks footerData={footerData.curriculums} exact />
                )}
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — Subjects */}
            <div className="w-1/2 lg:w-1/4">
              <div className="flex flex-col">
                <p
                  className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[12px] text-ink-900`}
                >
                  {t("footer.sections.subjects")}
                </p>
                {Array.isArray(footerData?.subjects) && footerData.subjects.length > 0 && (
                  <FooterLinks footerData={footerData.subjects} exact />
                )}
              </div>
            </div>

            {/* <Grid item lg={3} sm={6} xs={6}> — Get Help + About Us (lg only) */}
            <div className="w-1/2 lg:w-1/4">
              <div className="flex flex-col">
                <div>
                  <p
                    className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[12px] text-ink-900`}
                  >
                    {t("footer.sections.get_help")}
                  </p>
                  {Array.isArray(footerData?.getHelp) && footerData.getHelp.length > 0 && (
                    <FooterLinks footerData={footerData.getHelp} exact={false} />
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
                      if (!item || typeof item !== "string" || item.trim() === "") {
                        return null;
                      }
                      let url = findAboutUsURL(item);
                      if (locale === "ar" && url !== "/" && !url.startsWith("/ar")) {
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
            <div className="w-1/2 lg:hidden">
              <div className="flex flex-col">
                <p
                  className={`${leagueSpartan.className} text-sm leading-[1.57] tracking-[0.00714em] font-bold capitalize mb-[15px] mt-[20px] text-start text-ink-900`}
                >
                  {t("footer.sections.about_us")}
                </p>
                {Array.isArray(footerData?.aboutUs) &&
                  footerData.aboutUs.map((item, index) => {
                    if (!item || typeof item !== "string" || item.trim() === "") {
                      return null;
                    }
                    let url = findAboutUsURL(item);
                    if (locale === "ar" && url !== "/" && !url.startsWith("/ar")) {
                      url = `/ar${url}`;
                    }
                    return (
                      <Link href={url} key={index}>
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

          {/* <Divider sx={{ color: "black", width: "78%" }}> */}
          <hr className="w-[78%] border-t border-black" />

          {/* <Typography variant="subtitle2" sx={styles.rights}> — subtitle2 base 0.875rem/500/lh 1.57 + my-20/30/50/70 textAlign center */}
          <p
            className={`${leagueSpartan.className} text-sm font-medium leading-[1.57] tracking-[0.00714em] my-5 sm:my-[30px] md:my-[50px] lg:my-[70px] text-center text-ink-900`}
          >
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
