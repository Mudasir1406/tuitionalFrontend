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
              "@type": "Organization",
              "@id": "https://tuitionaledu.com/#organization",
              "name": "Tuitional Education",
              "alternateName": "Tuitional",
              "url": "https://tuitionaledu.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tuitionaledu.com/_next/static/media/logo.16d39b17.png",
                "width": 640,
                "height": 120
              },
              "image": "https://tuitionaledu.com/_next/static/media/logo.16d39b17.png",
              "description": "Tuitional is a UAE-licensed online tutoring platform providing live 1-on-1 sessions for Grades 1–12 across IGCSE, GCSE, A-Levels, IB, and standardised test prep. Serving students across the Gulf region and beyond with personalised study plans and vetted tutors.",
              "foundingDate": "2020",
              "founder": [
                {
                  "@type": "Person",
                  "name": "Ahmed Shaheer"
                },
                {
                  "@type": "Person",
                  "name": "Mirza Sinan Baig"
                },
                {
                  "@type": "Person",
                  "name": "Abdul Wahid Sheikh"
                },
                {
                  "@type": "Person",
                  "name": "Sheikh Zeeshan Ahmed"
                },
                {
                  "@type": "Person",
                  "name": "Juliana Nogueria"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AE",
                "addressRegion": "Dubai"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+971-56-490-0376",
                  "contactType": "customer service",
                  "email": "hello@tuitionaledu.com",
                  "availableLanguage": ["English", "Arabic"],
                  "areaServed": ["AE", "SA", "QA", "OM", "BH", "GB", "ES"]
                }
              ],
              "sameAs": [
                "https://www.facebook.com/tuitionaledu/",
                "https://www.instagram.com/tuitionaledu/",
                "https://www.linkedin.com/company/tuitionaledu",
                "https://www.trustpilot.com/review/tuitionaledu.com"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "108",
                "reviewCount": "108"
              },
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 50,
                "maxValue": 200
              }
            },
            {
              "@type": "WebSite",
              "@id": "https://tuitionaledu.com/#website",
              "url": "https://tuitionaledu.com",
              "name": "Tuitional Education",
              "publisher": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tuitionaledu.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "inLanguage": ["en", "ar"]
            },
            {
              "@type": "WebPage",
              "@id": "https://tuitionaledu.com/#webpage",
              "url": "https://tuitionaledu.com",
              "name": "Tuitional – Live 1-on-1 IGCSE & A-Level Online Tutoring in the Gulf",
              "description": "Tuitional is a UAE-licensed online tutoring platform offering live 1-on-1 sessions for IGCSE, GCSE, A-Levels, IB, SAT, and EmSAT across the Gulf region. Personalised study plans, vetted tutors, and proven student outcomes.",
              "isPartOf": {
                "@id": "https://tuitionaledu.com/#website"
              },
              "about": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "inLanguage": "en"
            },
            {
              "@type": "EducationalOrganization",
              "@id": "https://tuitionaledu.com/#educationalorg",
              "name": "Tuitional Education",
              "url": "https://tuitionaledu.com",
              "sameAs": "https://tuitionaledu.com/#organization",
              "description": "UAE-licensed online tutoring platform delivering live, personalised 1-on-1 academic sessions across the Gulf region and internationally."
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://tuitionaledu.com/#localbusiness",
              "name": "Tuitional Education",
              "image": "https://tuitionaledu.com/_next/static/media/logo.16d39b17.png",
              "url": "https://tuitionaledu.com",
              "telephone": "+971-56-490-0376",
              "email": "hello@tuitionaledu.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.2048,
                "longitude": 55.2708
              },
              "priceRange": "$$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "108",
                "reviewCount": "108"
              },
              "sameAs": [
                "https://www.facebook.com/tuitionaledu/",
                "https://www.instagram.com/tuitionaledu/",
                "https://www.linkedin.com/company/tuitionaledu"
              ]
            },
            {
              "@type": "ProfilePage",
              "@id": "https://tuitionaledu.com/testimonials#profilepage",
              "name": "Tuitional Student Testimonials",
              "url": "https://tuitionaledu.com/testimonials",
              "description": "Read verified student and parent testimonials about their experience with Tuitional Education's live 1-on-1 online tutoring platform.",
              "isPartOf": {
                "@id": "https://tuitionaledu.com/#website"
              },
              "mainEntity": {
                "@type": "Organization",
                "@id": "https://tuitionaledu.com/#organization",
                "name": "Tuitional Education",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "Service",
              "@id": "https://tuitionaledu.com/#igcse-service",
              "name": "IGCSE / GCSE Online Tutoring",
              "description": "Live 1-on-1 online tutoring sessions for IGCSE and GCSE students covering Cambridge (CAIE), Pearson Edexcel, AQA, and OCR examination boards. Subjects include Mathematics, Sciences, English, Commerce, and Humanities.",
              "provider": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "serviceType": "Online Tutoring",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United Arab Emirates"
                },
                {
                  "@type": "Country",
                  "name": "Saudi Arabia"
                },
                {
                  "@type": "Country",
                  "name": "Qatar"
                },
                {
                  "@type": "Country",
                  "name": "Oman"
                }
              ],
              "offers": {
                "@type": "Offer",
                "category": "Paid",
                "availability": "https://schema.org/InStock",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "Service",
              "@id": "https://tuitionaledu.com/#alevel-service",
              "name": "A-Level / AS-Level Online Tutoring",
              "description": "Advanced 1-on-1 online tutoring for A-Level and AS-Level students. Covers Cambridge (CAIE), Pearson Edexcel, AQA, and OCR boards with personalised study plans, mock exams, and dedicated academic consultants.",
              "provider": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "serviceType": "Online Tutoring",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United Arab Emirates"
                },
                {
                  "@type": "Country",
                  "name": "Saudi Arabia"
                },
                {
                  "@type": "Country",
                  "name": "United Kingdom"
                }
              ],
              "offers": {
                "@type": "Offer",
                "category": "Paid",
                "availability": "https://schema.org/InStock",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "Service",
              "@id": "https://tuitionaledu.com/#ib-service",
              "name": "IB (International Baccalaureate) Online Tutoring",
              "description": "Personalised 1-on-1 online tutoring for IB Diploma Programme (IBDP), Middle Years Programme (MYP), and Primary Years Programme (PYP) students. Specialised focus on Mathematics and Sciences.",
              "provider": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "serviceType": "Online Tutoring",
              "offers": {
                "@type": "Offer",
                "category": "Paid",
                "availability": "https://schema.org/InStock",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "Service",
              "@id": "https://tuitionaledu.com/#testprep-service",
              "name": "SAT, EmSAT, IELTS & TOEFL Test Preparation",
              "description": "Targeted 1-on-1 online preparation for SAT, EmSAT, GED, IELTS, and TOEFL examinations. Includes practice tests, performance reviews, and personalised study strategies.",
              "provider": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "serviceType": "Test Preparation",
              "offers": {
                "@type": "Offer",
                "category": "Paid",
                "availability": "https://schema.org/InStock",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "Service",
              "@id": "https://tuitionaledu.com/#middle-school-service",
              "name": "Grades 1–8 Online Tutoring",
              "description": "Foundation-level 1-on-1 online tutoring for primary and middle school students in Mathematics, English, and Science. Builds strong academic fundamentals aligned to the student's school curriculum.",
              "provider": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "serviceType": "Online Tutoring",
              "offers": {
                "@type": "Offer",
                "category": "Paid",
                "availability": "https://schema.org/InStock",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "Service",
              "@id": "https://tuitionaledu.com/#language-service",
              "name": "1-on-1 Language Speaking Lessons",
              "description": "Live online language speaking lessons available in Arabic, French, English, Spanish, and German. Personalised sessions focused on conversational fluency and communication skills.",
              "provider": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "serviceType": "Language Tutoring",
              "offers": {
                "@type": "Offer",
                "category": "Paid",
                "availability": "https://schema.org/InStock",
                "url": "https://tuitionaledu.com"
              }
            },
            {
              "@type": "HowTo",
              "@id": "https://tuitionaledu.com/#howto-enrol",
              "name": "How to Get Started with Tuitional",
              "description": "A simple 3-step process to begin your personalised online tutoring journey with Tuitional Education.",
              "totalTime": "PT1H",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Submit Your Academic Details",
                  "text": "Provide your academic details and learning requirements so Tuitional can find the best personalised online tutor to match your academic needs and specifications.",
                  "url": "https://tuitionaledu.com/about"
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Meet Your Academic Consultant",
                  "text": "A dedicated Academic Consultant will reach out to you within an hour, selecting a highly vetted online tutor matched to your academic requirements.",
                  "url": "https://tuitionaledu.com/about"
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Enrol and Begin Learning",
                  "text": "Once you are satisfied with the academic approach offered by Tuitional, enrol and begin your personalised learning journey with live 1-on-1 sessions.",
                  "url": "https://tuitionaledu.com/about"
                }
              ]
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://tuitionaledu.com/#breadcrumb",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://tuitionaledu.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://tuitionaledu.com/about"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Blog",
                  "item": "https://tuitionaledu.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Testimonials",
                  "item": "https://tuitionaledu.com/testimonials"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Contact",
                  "item": "https://tuitionaledu.com/contact"
                }
              ]
            },
            {
              "@type": "Article",
              "@id": "https://tuitionaledu.com/about#article",
              "headline": "About Tuitional Education — Elevating Personalised Online Tutoring Across the Gulf",
              "description": "Learn about Tuitional Education, a UAE-licensed online tutoring platform founded in 2020. Delivering personalised 1-on-1 academic support for IGCSE, GCSE, A-Levels, and IB students across the Gulf region.",
              "url": "https://tuitionaledu.com/about",
              "datePublished": "2022-01-01",
              "dateModified": "2025-06-01",
              "author": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "publisher": {
                "@id": "https://tuitionaledu.com/#organization"
              },
              "image": "https://tuitionaledu.com/_next/static/media/about-hero-2.fbeb5f77.png",
              "mainEntityOfPage": "https://tuitionaledu.com/about"
            },
            {
              "@type": "Review",
              "@id": "https://tuitionaledu.com/#review-1",
              "reviewBody": "We have been with Tuitional for a few months now. Both admin and academic support are excellent. I can fully rely on the admin team to assist with all schedules including last minute requirements.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Person",
                "name": "Tuitional Parent"
              },
              "itemReviewed": {
                "@type": "LocalBusiness",
                "name": "Tuitional Education",
                "image": "https://tuitionaledu.com/_next/static/media/logo.16d39b17.png"
              }
            },
            {
              "@type": "Review",
              "@id": "https://tuitionaledu.com/#review-2",
              "reviewBody": "My sessions with my teacher have been amazing. They explain things clearly, are patient with questions, and make even tough topics easy to understand. I always leave feeling more confident.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Tuitional Student"
              },
              "itemReviewed": {
                "@type": "LocalBusiness",
                "name": "Tuitional Education",
                "image": "https://tuitionaledu.com/_next/static/media/logo.16d39b17.png"
              }
            },
            {
              "@type": "Review",
              "@id": "https://tuitionaledu.com/#review-3",
              "reviewBody": "The teaching is great. The teachers make everyone understand, you can ask any questions you may have. The classes are fun and comfortable.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Tuitional Learner"
              },
              "itemReviewed": {
                "@type": "LocalBusiness",
                "name": "Tuitional Education",
                "image": "https://tuitionaledu.com/_next/static/media/logo.16d39b17.png"
              }
            },
            {
              "@type": "ItemList",
              "@id": "https://tuitionaledu.com/#features",
              "name": "Tuitional Platform Features",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Live 1-on-1 Sessions",
                  "url": "https://tuitionaledu.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Personalised Study Plans",
                  "url": "https://tuitionaledu.com"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Dedicated Academic Consultant",
                  "url": "https://tuitionaledu.com"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Mock Exams and Performance Feedback",
                  "url": "https://tuitionaledu.com"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "24/7 Academic Support",
                  "url": "https://tuitionaledu.com"
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "name": "Parent and Student Dashboard",
                  "url": "https://tuitionaledu.com"
                }
              ]
            },
            {
              "@type": "SiteNavigationElement",
              "@id": "https://tuitionaledu.com/#navigation",
              "name": "Main Navigation",
              "url": "https://tuitionaledu.com",
              "hasPart": [
                {
                  "@type": "WebPage",
                  "name": "Home",
                  "url": "https://tuitionaledu.com"
                },
                {
                  "@type": "WebPage",
                  "name": "About",
                  "url": "https://tuitionaledu.com/about"
                },
                {
                  "@type": "WebPage",
                  "name": "Blog",
                  "url": "https://tuitionaledu.com/blog"
                },
                {
                  "@type": "WebPage",
                  "name": "Testimonials",
                  "url": "https://tuitionaledu.com/testimonials"
                },
                {
                  "@type": "WebPage",
                  "name": "Contact",
                  "url": "https://tuitionaledu.com/contact"
                }
              ]
            }
          ]
        }),
      }}
    />
  );
};

export default UniversalSchema;
