import React from "react";
import { Box, Container } from "@mui/material";
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
import ArHeader from "../../components/ar-header";
import Image from "next/image";
import { getFilterData } from "@/services/filter-data/filter-data";
import { getStartedData } from "@/services/get-started/get-started";

// Critical above-the-fold - Load with SSR
const ArInfo = dynamic(() => import("../../components/home/ar-info"), {
  ssr: true,
});
const ArFilter = dynamic(() => import("../../components/home/ar-filter"), {
  ssr: true,
});

// Below-the-fold - Lazy load with placeholders
const ArTrusted = dynamic(() => import("../../components/home/ar-trusted"), {
  ssr: false,
  loading: () => <div style={{height: '200px', backgroundColor: '#f5f5f5'}} />,
});
const ArOurClient = dynamic(
  () => import("../../components/home/ar-our-client"),
  {
    ssr: false,
    loading: () => <div style={{height: '400px', backgroundColor: '#f5f5f5'}} />,
  }
);
const ArFaqs = dynamic(() => import("../../components/home/ar-faqs"), {
  ssr: false,
  loading: () => <div style={{height: '300px', backgroundColor: '#f5f5f5'}} />,
});
const ArContactUs = dynamic(
  () => import("../../components/home/ar-contact-us"),
  {
    ssr: false,
    loading: () => <div style={{height: '400px', backgroundColor: '#f5f5f5'}} />,
  }
);
const ArGetStarted = dynamic(
  () => import("../../components/home/ar-get-started"),
  {
    ssr: false,
    loading: () => <div style={{height: '300px', backgroundColor: '#f5f5f5'}} />,
  }
);
const ServerFooter = dynamic(() => import("../../components/ar-server-footer"), {
  ssr: false,
  loading: () => <div style={{height: '500px', backgroundColor: '#f5f5f5'}} />,
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
  const getStarted = await getStartedData('ar');

  return (
    <>
      <Script
        id="faq-schema-ar"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(arabicHomeSchema) }}
      />
      <ArHeader />
      <Container sx={[styles.contanier, styles.containerRTL]}>
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
      </Container>
      <ArTrusted />
      <Box sx={styles.verticalMargin}>
        <ArGetStarted data={getStarted} />
      </Box>
      <ArOurClient data={data} />
      <Box sx={styles.backgroundImage}>
        <Container
          sx={{
            maxWidth: { lg: "1450px" },
          }}
        >
          <ArFaqs />
        </Container>
      </Box>
      <Box sx={styles.verticalMargin}>
        <ArContactUs filterData={filterData} />
      </Box>
      <ServerFooter />
    </>
  );
};

export default ArHome;

const styles = {
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },

  contanier: {
    maxWidth: { lg: "1650px" },
    paddingTop: {
      xs: "120px",
      sm: "120px",
      md: "120px",
      lg: 0,
      xl: 0,
    },
    minHeight: { xs: "100%", lg: "100vh" },
    display: "flex",
    alignItems: "end",
  },

  // RTL specific styles
  containerRTL: {
    direction: "rtl",
  },

  backgroundImage: {
    position: "relative",
    width: "100%",
    height: "100%",

    "::before": {
      content: "''",
      backgroundImage: {
        xs: `url(${lineSmall.src})`,
        lg: `url(${faqLine.src})`,
      },
      backgroundSize: "cover",
      backgroundPosition: "top",
      position: "absolute",
      bottom: {
        xs: "90%",
        sm: "83%",
        md: "80%",
        lg: -90,
      },
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: {
        xs: "25vw",
        lg: "281px",
      },
      objectFit: "contain",
    },
  },
};
