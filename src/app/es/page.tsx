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
import EsHeader from "../../components/es-header";
import Image from "next/image";
import { getFilterData } from "@/services/filter-data/filter-data";
import { getStartedData } from "@/services/get-started/get-started";

// Critical above-the-fold - Load with SSR
const EsInfo = dynamic(() => import("../../components/home/es-info"), {
  ssr: true,
});
const EsFilter = dynamic(() => import("../../components/home/es-filter"), {
  ssr: true,
});

// Below-the-fold - Lazy load with placeholders
const EsTrusted = dynamic(() => import("../../components/home/es-trusted"), {
  ssr: false,
  loading: () => <div style={{height: '200px', backgroundColor: '#f5f5f5'}} />,
});
const EsOurClient = dynamic(
  () => import("../../components/home/es-our-client"),
  {
    ssr: false,
    loading: () => <div style={{height: '400px', backgroundColor: '#f5f5f5'}} />,
  }
);
const EsFaqs = dynamic(() => import("../../components/home/es-faqs"), {
  ssr: false,
  loading: () => <div style={{height: '300px', backgroundColor: '#f5f5f5'}} />,
});
const EsContactUs = dynamic(
  () => import("../../components/home/es-contact-us"),
  {
    ssr: false,
    loading: () => <div style={{height: '400px', backgroundColor: '#f5f5f5'}} />,
  }
);
const EsGetStarted = dynamic(
  () => import("../../components/home/es-get-started"),
  {
    ssr: false,
    loading: () => <div style={{height: '300px', backgroundColor: '#f5f5f5'}} />,
  }
);
const ServerFooter = dynamic(() => import("../../components/es-server-footer"), {
  ssr: false,
  loading: () => <div style={{height: '500px', backgroundColor: '#f5f5f5'}} />,
});

export const metadata: Metadata = {
  title: "La Mejor Plataforma de Tutoría en Línea 1-a-1 en la Región del Golfo",
  description:
    "¿Buscas tutoría en línea personalizada y no sabes a dónde ir? Contacta a Tuitional para mejorar tus resultados de exámenes a través de sesiones de tutoría en línea individuales.",
  alternates: {
    canonical: `${SITE_URL}/es`,
  },
};

const esHomeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tuitionaledu.com/#organization",
      name: "Tuitional",
      url: "https://tuitionaledu.com/",
      logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
      description:
        "Tuitional es una plataforma líder de tutoría en línea en el Golfo, ofreciendo servicios de tutoría personalizados a través de varios planes de estudios como CAIE, Pearson Edexcel, AQA y más.",
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
        availableLanguage: ["Spanish", "English"],
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
      name: "Tuitional - Tutoría en Línea",
      description:
        "Tuitional ofrece servicios de tutoría en línea de alta calidad para estudiantes siguiendo el plan de estudios británico en la región del Golfo.",
      inLanguage: "es",
      publisher: {
        "@id": "https://tuitionaledu.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://tuitionaledu.com/es/#home",
      url: "https://tuitionaledu.com/es/",
      name: "Tuitional - Tutoría en Línea",
      description:
        "Tuitional ofrece tutoría personalizada en línea para todos los planes de estudio internacionales para estudiantes en la región del Golfo. ¡Reserva tu clase de demostración gratuita hoy!",
      isPartOf: {
        "@id": "https://tuitionaledu.com/#website",
      },
      inLanguage: "es",
      about: {
        "@id": "https://tuitionaledu.com/#organization",
      },
    },
  ],
};

const EsHome: React.FC = async () => {
  const data = await getTestimonials("es");
  const filterData = await getFilterData();
  const getStarted = await getStartedData('es');

  return (
    <>
      <Script
        id="faq-schema-es"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(esHomeSchema) }}
      />
      <EsHeader />
      <Container sx={styles.contanier}>
        <div className={style.container}>
          <div className={style["grid-container"]}>
            <div className={style["hero"]}>
              <EsFilter data={filterData} />
            </div>
            <div className={style["hero-picture"]}>
              <div className={style["image-container"]}>
                <Image
                  src={homeImage}
                  alt="Estudiante aprendiendo con Tuitional"
                  layout="responsive"
                  width={640}
                  height={625}
                  priority
                  quality={85}
                  sizes="(max-width: 575px) 240px, (max-width: 768px) 400px, (max-width: 1200px) 600px, 640px"
                  className={style.image}
                />
              </div>
              <EsInfo />
            </div>
          </div>
        </div>
      </Container>
      <EsTrusted />
      <Box sx={styles.verticalMargin}>
        <EsGetStarted data={getStarted} />
      </Box>
      <EsOurClient data={data} />
      <Box sx={styles.backgroundImage}>
        <Container
          sx={{
            maxWidth: { lg: "1450px" },
          }}
        >
          <EsFaqs />
        </Container>
      </Box>
      <Box sx={styles.verticalMargin}>
        <EsContactUs filterData={filterData} />
      </Box>
      <ServerFooter />
    </>
  );
};

export default EsHome;

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
