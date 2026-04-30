import React from "react";
import lineSmall from "../../../public/assets/images/static/linesmall.png";
import faqLine from "../../../public/assets/images/static/faq-line.webp";
import dynamic from "next/dynamic";

import homeImage from "../../../public/assets/images/static/girl-with-book.webp";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import Script from "next/script";

import "../globals.css";
import style from "../page.module.css";
import ArHeader from "../../components/header";
import Image from "next/image";
import { getFilterData } from "@/services/filter-data/filter-data";
import { getStartedData } from "@/services/get-started/get-started";

const ArInfo = dynamic(() => import("../../components/home/info"), { ssr: true });
const ArFilter = dynamic(() => import("../../components/home/filter"), { ssr: true });

const ArTrusted = dynamic(() => import("../../components/home/trusted"), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-[#f5f5f5]" />,
});
const ArOurClient = dynamic(() => import("../../components/home/our-client"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[#f5f5f5]" />,
});
const ArFaqs = dynamic(() => import("../../components/home/faqs"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-[#f5f5f5]" />,
});
const ArContactUs = dynamic(() => import("../../components/home/contact-us"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[#f5f5f5]" />,
});
const ArGetStarted = dynamic(() => import("../../components/home/get-started"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-[#f5f5f5]" />,
});
const ServerFooter = dynamic(() => import("../../components/ar-server-footer"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-[#f5f5f5]" />,
});

export const metadata: Metadata = {
  title: "أفضل منصة تدريس فردي عبر الإنترنت في منطقة الخليج",
  description:
    "تبحث عن تدريس شخصي عبر الإنترنت ولا تعرف إلى أين تتجه؟ اتصل بتيوشنال لتحقيق نتائج امتحانات متميزة من خلال جلسات التدريس الفردي عبر الإنترنت.",
  alternates: {
    canonical: `${SITE_URL}/ar`,
  },
};

const arabicHomeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tuitionaledu.com/#organization",
      name: "Tuitional",
      url: "https://tuitionaledu.com/",
      logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
      description:
        "تيوشنال هي منصة تدريس رائدة عبر الإنترنت في منطقة الخليج، تقدم خدمات تدريس شخصية عبر مناهج مختلفة مثل CAIE وبيرسون إدكسل وAQA وغيرها.",
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
        availableLanguage: ["Arabic", "English"],
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
      name: "تيوشنال - تدريس عبر الإنترنت",
      description:
        "تيوشنال تقدم خدمات تدريس عالية الجودة عبر الإنترنت للطلاب الذين يتبعون المنهج البريطاني في منطقة الخليج.",
      inLanguage: "ar",
      publisher: {
        "@id": "https://tuitionaledu.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://tuitionaledu.com/ar/#home",
      url: "https://tuitionaledu.com/ar/",
      name: "تيوشنال - تدريس عبر الإنترنت",
      description:
        "تيوشنال تقدم تدريساً شخصياً عبر الإنترنت لجميع المناهج الدولية للطلاب في منطقة الخليج. احجز صفك التجريبي المجاني اليوم!",
      isPartOf: {
        "@id": "https://tuitionaledu.com/#website",
      },
      inLanguage: "ar",
      about: {
        "@id": "https://tuitionaledu.com/#organization",
      },
    },
  ],
};

const ArHome: React.FC = async () => {
  const data = await getTestimonials("ar");
  const filterData = await getFilterData();
  const getStarted = await getStartedData("ar");

  return (
    <>
      <Script
        id="faq-schema-ar"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(arabicHomeSchema) }}
      />
      <ArHeader />
      <div className="mx-auto flex min-h-full items-end pt-[120px] sm:pt-[120px] md:pt-[120px] lg:min-h-screen lg:max-w-[1650px] lg:pt-0 xl:pt-0" dir="rtl">
        <div className={`${style.container} ${style.containerRTL}`}>
          <div className={style["grid-container"]}>
            <div className={style["hero"]}>
              <ArFilter data={filterData} />
            </div>
            <div className={style["hero-picture"]}>
              <div className={style["image-container"]}>
                <Image
                  src={homeImage}
                  alt="طالب يتعلم مع تيوشنال"
                  layout="responsive"
                  width={640}
                  height={625}
                  priority
                  quality={85}
                  sizes="(max-width: 575px) 240px, (max-width: 768px) 400px, (max-width: 1200px) 600px, 640px"
                  className={style.image}
                />
              </div>
              <ArInfo />
            </div>
          </div>
        </div>
      </div>
      <ArTrusted locale="ar" />
      <div className="my-[5vh] md:my-[10vh]">
        <ArGetStarted data={getStarted} />
      </div>
      <ArOurClient data={data} />
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
          <ArFaqs locale="ar" />
        </div>
      </div>
      <div className="my-[5vh] md:my-[10vh]">
        <ArContactUs filterData={filterData} />
      </div>
      <ServerFooter />
    </>
  );
};

export default ArHome;
