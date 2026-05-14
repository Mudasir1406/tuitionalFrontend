import Script from "next/script";

const UniversalSchema = () => {
  return (
    <Script
      id="universal-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": [
                "Organization",
                "EducationalOrganization",
                "LocalBusiness",
              ],
              "@id": "https://tuitionaledu.com/#organization",
              name: "Tuitional",
              alternateName: ["Tuitional Edu", "Tuitional Education"],
              legalName: "Tuitional",
              description:
                "Tuitional is an online tutoring platform delivering live 1-on-1 sessions with 500+ vetted expert tutors for IGCSE, GCSE, O-Level, A-Level, IB, Pearson Edexcel and SAT students across the GCC.",
              disambiguatingDescription:
                "Tuitional (tuitionaledu.com) is an online tutoring company headquartered in Dubai, UAE, serving students across the Gulf region.",
              slogan: "Live 1-on-1 tutoring for IGCSE, A-Levels and IB",
              url: "https://tuitionaledu.com/",
              foundingDate: "2022",
              numberOfEmployees: { "@type": "QuantitativeValue", value: 100 },
              email: "hello@tuitionaledu.com",
              telephone: "+971-56-490-0376",
              priceRange: "$$",
              currenciesAccepted: "AED, SAR, USD",
              paymentAccepted: "Credit Card, Debit Card, Bank Transfer",
              image: { "@id": "https://tuitionaledu.com/#logo" },
              logo: { "@id": "https://tuitionaledu.com/#logo" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressRegion: "Dubai",
                addressCountry: "AE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.2048,
                longitude: 55.2708,
              },
              areaServed: [
                { "@type": "Country", name: "United Arab Emirates" },
                { "@type": "Country", name: "Saudi Arabia" },
                { "@type": "Country", name: "Kuwait" },
                { "@type": "Country", name: "Oman" },
                { "@type": "Country", name: "Qatar" },
                { "@type": "Country", name: "Bahrain" },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+971-56-490-0376",
                  contactType: "customer service",
                  email: "hello@tuitionaledu.com",
                  areaServed: ["AE", "SA", "KW", "OM", "QA", "BH"],
                  availableLanguage: ["English", "Arabic"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+971-44-396-296",
                  contactType: "technical support",
                  areaServed: ["AE", "SA", "KW", "OM", "QA", "BH"],
                  availableLanguage: ["English", "Arabic"],
                },
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "21:00",
              },
              knowsAbout: [
                "IGCSE tutoring",
                "Cambridge IGCSE curriculum",
                "Pearson Edexcel IGCSE",
                "GCSE tutoring",
                "O-Level tutoring",
                "A-Level tutoring",
                "International Baccalaureate (IB)",
                "IB Diploma Programme",
                "IB Middle Years Programme",
                "SAT preparation",
                "Online mathematics tutoring",
                "Online physics tutoring",
                "Online chemistry tutoring",
                "Online biology tutoring",
                "Online English tutoring",
                "Online economics tutoring",
                "Online business studies tutoring",
                "Online computer science tutoring",
                "Exam preparation",
                "1-on-1 online tutoring",
              ],
              knowsLanguage: [
                { "@type": "Language", name: "English", alternateName: "en" },
                { "@type": "Language", name: "Arabic", alternateName: "ar" },
              ],
              founder: [
                { "@id": "https://tuitionaledu.com/#ahmed-shaheer" },
                { "@id": "https://tuitionaledu.com/#sinan-baig" },
              ],
              sameAs: [
                "https://www.facebook.com/tuitionaledu",
                "https://www.instagram.com/tuitionaledu/",
                "https://www.youtube.com/@tuitionaledu",
                "https://www.linkedin.com/company/tuitionaledu/",
                "https://www.trustpilot.com/review/tuitionaledu.com",
              ],
              hasOfferCatalog: {
                "@id": "https://tuitionaledu.com/#service-catalog",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1089",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Amir Ahmed Khan" },
                  datePublished: "2025-11-04",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  reviewBody:
                    "Best chemistry teacher I have studied with online — concepts explained clearly and patiently.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Hannah Maistry" },
                  datePublished: "2025-12-12",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  reviewBody:
                    "Sessions are fun and interactive — my daughter actually looks forward to them.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Zareb Amber" },
                  datePublished: "2026-01-18",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  reviewBody:
                    "Tutors break down every topic step by step until it actually clicks.",
                },
              ],
            },

            {
              "@type": "ImageObject",
              "@id": "https://tuitionaledu.com/#logo",
              url: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90",
              contentUrl:
                "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90",
              caption: "Tuitional logo",
              width: 800,
              height: 400,
            },

            {
              "@type": "Person",
              "@id": "https://tuitionaledu.com/#ahmed-shaheer",
              name: "Ahmed Shaheer",
              jobTitle: "Co-Founder",
              url: "https://www.linkedin.com/in/ahmed-shaheer-76b371229/",
              sameAs: ["https://www.linkedin.com/in/ahmed-shaheer-76b371229/"],
              worksFor: { "@id": "https://tuitionaledu.com/#organization" },
              knowsAbout: [
                "EdTech",
                "Online tutoring",
                "Education business operations",
              ],
            },
            {
              "@type": "Person",
              "@id": "https://tuitionaledu.com/#sinan-baig",
              name: "Mirza Sinan Baig",
              jobTitle: "Co-Founder",
              url: "https://www.linkedin.com/in/sinanbaig/",
              sameAs: ["https://www.linkedin.com/in/sinanbaig/"],
              worksFor: { "@id": "https://tuitionaledu.com/#organization" },
              knowsAbout: ["EdTech", "Online tutoring", "Product and growth"],
            },

            {
              "@type": "WebSite",
              "@id": "https://tuitionaledu.com/#website",
              url: "https://tuitionaledu.com/",
              name: "Tuitional",
              description:
                "Live 1-on-1 online tutoring for IGCSE, GCSE, A-Levels, IB and SAT students across the Gulf.",
              publisher: { "@id": "https://tuitionaledu.com/#organization" },
              inLanguage: ["en-US", "ar"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://tuitionaledu.com/?s={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },

            {
              "@type": "WebPage",
              "@id": "https://tuitionaledu.com/#webpage",
              url: "https://tuitionaledu.com/",
              name: "Tuitional — Online Tutoring for IGCSE, A-Levels and IB",
              description:
                "Live 1-on-1 sessions with 500+ vetted tutors. IGCSE, GCSE, O-Level, A-Level, IB, Pearson Edexcel and SAT. Book a free demo.",
              isPartOf: { "@id": "https://tuitionaledu.com/#website" },
              about: { "@id": "https://tuitionaledu.com/#organization" },
              primaryImageOfPage: { "@id": "https://tuitionaledu.com/#logo" },
              breadcrumb: { "@id": "https://tuitionaledu.com/#breadcrumb" },
              inLanguage: "en-US",
              datePublished: "2022-01-01",
              dateModified: "2026-05-13",
            },

            {
              "@type": "BreadcrumbList",
              "@id": "https://tuitionaledu.com/#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://tuitionaledu.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Online Tutoring",
                  item: "https://tuitionaledu.com/online",
                },
              ],
            },

            {
              "@type": "ItemList",
              "@id": "https://tuitionaledu.com/#course-carousel",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: { "@id": "https://tuitionaledu.com/#course-igcse" },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: { "@id": "https://tuitionaledu.com/#course-gcse" },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: { "@id": "https://tuitionaledu.com/#course-alevel" },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: { "@id": "https://tuitionaledu.com/#course-ib" },
                },
              ],
            },

            {
              "@type": "Course",
              "@id": "https://tuitionaledu.com/#course-igcse",
              name: "IGCSE Exam Preparation",
              description:
                "Live 1-on-1 IGCSE tutoring across Cambridge and Pearson Edexcel boards. Subject coverage includes Mathematics, Physics, Chemistry, Biology, English, Economics, Business Studies and Computer Science.",
              provider: { "@id": "https://tuitionaledu.com/#organization" },
              educationalLevel: "Secondary",
              about: [
                "IGCSE",
                "Cambridge IGCSE",
                "Edexcel IGCSE",
                "Exam preparation",
              ],
              teaches: "IGCSE syllabus mastery and exam technique",
              inLanguage: ["en", "ar"],
              url: "https://tuitionaledu.com/online/igcse-tutors",
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                courseWorkload: "PT2H",
                inLanguage: ["en", "ar"],
                instructor: { "@id": "https://tuitionaledu.com/#organization" },
              },
              offers: {
                "@type": "Offer",
                category: "Paid",
                priceCurrency: "AED",
                price: "0",
                availability: "https://schema.org/InStock",
                url: "https://tuitionaledu.com/online/igcse-tutors",
                validFrom: "2026-01-01",
              },
            },
            {
              "@type": "Course",
              "@id": "https://tuitionaledu.com/#course-gcse",
              name: "GCSE Exam Preparation",
              description:
                "Live 1-on-1 GCSE tutoring for UK curriculum students preparing for AQA, Edexcel and OCR exams.",
              provider: { "@id": "https://tuitionaledu.com/#organization" },
              educationalLevel: "Secondary",
              about: ["GCSE", "AQA GCSE", "Edexcel GCSE", "OCR GCSE"],
              teaches: "GCSE subject mastery and exam strategy",
              inLanguage: ["en", "ar"],
              url: "https://tuitionaledu.com/online/gcse-tutors",
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                courseWorkload: "PT2H",
                inLanguage: ["en", "ar"],
                instructor: { "@id": "https://tuitionaledu.com/#organization" },
              },
              offers: {
                "@type": "Offer",
                category: "Paid",
                priceCurrency: "AED",
                price: "0",
                availability: "https://schema.org/InStock",
                url: "https://tuitionaledu.com/online/gcse-tutors",
                validFrom: "2026-01-01",
              },
            },
            {
              "@type": "Course",
              "@id": "https://tuitionaledu.com/#course-alevel",
              name: "A-Level Exam Preparation",
              description:
                "Live 1-on-1 A-Level tutoring for Cambridge International, Pearson Edexcel and AQA students across STEM, business and humanities subjects.",
              provider: { "@id": "https://tuitionaledu.com/#organization" },
              educationalLevel: "Higher Secondary",
              about: [
                "A-Levels",
                "AS Levels",
                "Cambridge International A-Level",
                "Edexcel A-Level",
              ],
              teaches:
                "A-Level subject mastery and university-entry exam technique",
              inLanguage: ["en", "ar"],
              url: "https://tuitionaledu.com/online/a-level-tutors",
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                courseWorkload: "PT2H",
                inLanguage: ["en", "ar"],
                instructor: { "@id": "https://tuitionaledu.com/#organization" },
              },
              offers: {
                "@type": "Offer",
                category: "Paid",
                priceCurrency: "AED",
                price: "0",
                availability: "https://schema.org/InStock",
                url: "https://tuitionaledu.com/online/a-level-tutors",
                validFrom: "2026-01-01",
              },
            },
            {
              "@type": "Course",
              "@id": "https://tuitionaledu.com/#course-ib",
              name: "IB Diploma Programme Tutoring",
              description:
                "Live 1-on-1 IB tutoring covering HL and SL subjects, Extended Essay, TOK and Internal Assessments. Dubai-based tutors with IB examiner experience.",
              provider: { "@id": "https://tuitionaledu.com/#organization" },
              educationalLevel: "Higher Secondary",
              about: [
                "International Baccalaureate",
                "IB Diploma Programme",
                "IB Higher Level",
                "IB Standard Level",
                "TOK",
                "Extended Essay",
              ],
              teaches: "IB syllabus mastery, IA support and exam preparation",
              inLanguage: ["en", "ar"],
              url: "https://tuitionaledu.com/online/ib-tutors-dubai",
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                courseWorkload: "PT2H",
                inLanguage: ["en", "ar"],
                instructor: { "@id": "https://tuitionaledu.com/#organization" },
              },
              offers: {
                "@type": "Offer",
                category: "Paid",
                priceCurrency: "AED",
                price: "0",
                availability: "https://schema.org/InStock",
                url: "https://tuitionaledu.com/online/ib-tutors-dubai",
                validFrom: "2026-01-01",
              },
            },

            {
              "@type": "OfferCatalog",
              "@id": "https://tuitionaledu.com/#service-catalog",
              name: "Tuitional Online Tutoring Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "1-on-1 Online Tutoring",
                    description:
                      "Personalised live one-to-one online tutoring sessions matched to each student's curriculum and pace.",
                    serviceType: "Online tutoring",
                    provider: {
                      "@id": "https://tuitionaledu.com/#organization",
                    },
                    areaServed: ["AE", "SA", "KW", "OM", "QA", "BH"],
                    availableLanguage: ["en", "ar"],
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Free Demo Class",
                    description:
                      "Trial session to assess fit between student and tutor before committing.",
                    serviceType: "Demo class",
                    provider: {
                      "@id": "https://tuitionaledu.com/#organization",
                    },
                  },
                  price: "0",
                  priceCurrency: "AED",
                },
              ],
            },

            {
              "@type": "Event",
              "@id": "https://tuitionaledu.com/#event-demo",
              name: "Tuitional Free Demo Class",
              description:
                "Book a free 1-on-1 demo session with a Tuitional tutor to experience the teaching method before enrolling.",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OnlineEventAttendanceMode",
              startDate: "2026-01-01T09:00:00+04:00",
              endDate: "2026-12-31T21:00:00+04:00",
              url: "https://tuitionaledu.com/demo",
              image: { "@id": "https://tuitionaledu.com/#logo" },
              location: {
                "@type": "VirtualLocation",
                url: "https://tuitionaledu.com/demo",
              },
              organizer: { "@id": "https://tuitionaledu.com/#organization" },
              performer: { "@id": "https://tuitionaledu.com/#organization" },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "AED",
                url: "https://tuitionaledu.com/demo",
                availability: "https://schema.org/InStock",
                validFrom: "2026-01-01",
              },
            },

            {
              "@type": "FAQPage",
              "@id": "https://tuitionaledu.com/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Tuitional?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tuitional is an online tutoring platform founded in 2022 and based in Dubai, UAE. It connects students across the Gulf with 500+ vetted expert tutors for live, one-on-one sessions in IGCSE, GCSE, O-Level, A-Level, IB, Pearson Edexcel and SAT subjects.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which curriculums and exam boards does Tuitional cover?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tuitional covers IGCSE (Cambridge and Edexcel), GCSE (AQA, Edexcel, OCR), O-Level, A-Level (Cambridge International, Edexcel, AQA), the IB Diploma Programme, and SAT preparation. Tutors are matched to the student's exact board and subject.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are Tuitional tutors qualified?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Every tutor is screened for subject expertise, teaching experience and curriculum knowledge before being onboarded. Many have direct examiner or marker experience for the boards they tutor.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do Tuitional sessions work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sessions are live and 1-on-1, conducted over an interactive online classroom. Each session is tailored to the student's current syllabus position, learning pace and exam goals.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I try Tuitional before paying?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Tuitional offers a free demo class so students and parents can experience the teaching method and assess tutor fit before committing to a package.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which countries does Tuitional serve?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tuitional serves students across the GCC: United Arab Emirates, Saudi Arabia, Kuwait, Oman, Qatar and Bahrain. Sessions are delivered in English and Arabic.",
                  },
                },
              ],
            },

            {
              "@type": "HowTo",
              "@id": "https://tuitionaledu.com/#howto-getstarted",
              name: "How to Get Started with Tuitional",
              description:
                "Three steps to book a tutor and start learning with Tuitional.",
              totalTime: "PT10M",
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Choose your curriculum and subjects",
                  text: "Select your exam board (IGCSE, GCSE, A-Level, IB, etc.) and the subjects you need help with on the Tuitional website.",
                  url: "https://tuitionaledu.com/#step1",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Book your free demo class",
                  text: "Schedule a free 1-on-1 demo class at a time that suits your schedule.",
                  url: "https://tuitionaledu.com/demo",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Start your personalised tutoring",
                  text: "Begin regular live sessions with your matched tutor, with progress reviewed against your exam goals.",
                  url: "https://tuitionaledu.com/#step3",
                },
              ],
            },
          ],
        }),
      }}
    />
  );
};

export default UniversalSchema;
