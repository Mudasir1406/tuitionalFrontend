import React from "react";
import lineSmall from "../../public/assets/images/static/linesmall.png";
import faqLine from "../../public/assets/images/static/faq-line.webp";
import dynamic from "next/dynamic";

import homeImage from "../../public/assets/images/static/girl-with-book.webp";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import Script from "next/script";

import "./globals.css";
import style from "./page.module.css";
import { Header } from "../components";
import Image from "next/image";
import { getFilterData } from "@/services/filter-data/filter-data";
import { getStartedData } from "@/services/get-started/get-started";

const Info = dynamic(() => import("../components/home/info"), { ssr: true });
const Filter = dynamic(() => import("../components/home/filter"), { ssr: true });

const Trusted = dynamic(() => import("../components/home/trusted"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[200px] items-center justify-center bg-transparent">
      <div className="h-[30px] w-[30px] rounded-full bg-[#e2e8f0] opacity-50" />
    </div>
  ),
});
const OurClient = dynamic(() => import("../components/home/our-client"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-transparent" />,
});
const Faqs = dynamic(() => import("../components/home/faqs"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-transparent" />,
});
const ContactUs = dynamic(() => import("../components/home/contact-us"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-transparent" />,
});

const GetStarted = dynamic(
  () => import("@/components/grade-subject-level/get-started"),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-[#f5f5f5]" />,
  },
);
const ServerFooter = dynamic(() => import("../components/server-footer"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-[#f5f5f5]" />,
});

export const metadata: Metadata = {
  title: "Tuitional: Live 1-on-1 IGCSE & A-Level Tutoring in the Gulf",
  description:
    "Struggling to find quality tutors in the Gulf? Tuitional offers live 1-on-1 sessions with 500+ experts for IGCSE, A-Levels & IB. Start today!",
  alternates: {
    canonical: `${SITE_URL}`,
  },
};
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tuitionaledu.com/#organization",
      name: "Tuitional",
      url: "https://tuitionaledu.com/",
      logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
      description:
        "Tuitional is a leading online tutoring platform in the Gulf region, providing personalized tutoring services across various curricula including CAIE, Pearson Edexcel, AQA, and more.",
      sameAs: [
        "https://www.facebook.com/tuitionaledu",
        "https://www.instagram.com/tuitionaledu/",
        "https://www.linkedin.com/company/tuitionaledu/",
        "https://www.trustpilot.com/review/tuitionaledu.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        telephone: "+971 56 490 0376",
        email: "hello@tuitionaledu.com",
        availableLanguage: ["English"],
        areaServed: [
          "United Arab Emirates",
          "Saudi Arabia",
          "Qatar",
          "Kuwait",
          "Bahrain",
          "Oman",
        ],
      },
      foundingDate: "2022",
      foundingLocation: "Sharjah, UAE",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.4",
        reviewCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://tuitionaledu.com/#website",
      url: "https://tuitionaledu.com/",
      name: "Tuitional - Expert Online Tutoring",
      description:
        "Tuitional provides high-quality online tutoring services for students following the British curriculum in the Gulf region.",
      inLanguage: "en",
      publisher: {
        "@id": "https://tuitionaledu.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://tuitionaledu.com/#home",
      url: "https://tuitionaledu.com/",
      name: "Tuitional - Expert Online Tutoring",
      description:
        "Tuitional offers personalised online tutoring for all international curriculums to students in the Gulf regions. Book your free demo class today!",
      isPartOf: {
        "@id": "https://tuitionaledu.com/#website",
      },
      inLanguage: "en",
      about: {
        "@id": "https://tuitionaledu.com/#organization",
      },
    },
  ],
};

const Home: React.FC = async () => {
  const data = await getTestimonials();
  const filterData = await getFilterData();
  const getStarted = await getStartedData();
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header />
      <div className="mx-auto flex min-h-full items-end pt-[120px] sm:pt-[120px] md:pt-[120px] lg:min-h-screen lg:max-w-[1650px] lg:pt-[70px] xl:pt-[70px]">
        <div className={style["grid-container"]}>
          <div className={style["hero"]}>
            <Filter data={filterData} />
          </div>
          <div className={style["hero-picture"]}>
            <div className={style["image-container"]}>
              <Image
                src={homeImage}
                alt="Student learning with Tuitional"
                fill
                priority
                quality={85}
                sizes="(max-width: 575px) 90vw, (max-width: 768px) 45vw, (max-width: 1200px) 35vw, 500px"
                className={style.image}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDY0MCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idHJhbnNwYXJlbnQiIC8+PC9zdmc+"
                loading="eager"
              />
            </div>
            <Info />
          </div>
        </div>
      </div>
      <Trusted />
      <div className="my-[5vh] md:my-[10vh]">
        <GetStarted data={getStarted} />
      </div>
      <OurClient data={data} />
      <div className="relative h-full w-full">
        <div
          className="absolute bottom-[90%] h-[25vw] w-screen bg-cover bg-top bg-no-repeat sm:bottom-[83%] md:bottom-[80%] lg:hidden"
          style={{ backgroundImage: `url(${lineSmall.src})` }}
        />
        <div
          className="absolute bottom-[-90px] hidden h-[281px] w-screen bg-cover bg-top bg-no-repeat lg:block"
          style={{ backgroundImage: `url(${faqLine.src})` }}
        />
        <div className="mx-auto lg:max-w-[1450px]">
          <Faqs />
        </div>
      </div>
      <div className="my-[5vh] md:my-[10vh]">
        <ContactUs filterData={filterData} />
      </div>
      <ServerFooter />
    </>
  );
};

export default Home;
