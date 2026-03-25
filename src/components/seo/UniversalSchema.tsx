import Script from "next/script";

const UniversalSchema = () => {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tuitionaledu.com/"},
              {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://tuitionaledu.com/#services"},
              {"@type": "ListItem", "position": 3, "name": "Contact", "item": "https://tuitionaledu.com/contact"},
              {"@type": "ListItem", "position": 4, "name": "IGCSE Tutors", "item": "https://tuitionaledu.com/online/igcse-tutors"},
              {"@type": "ListItem", "position": 5, "name": "GCSE Tutors", "item": "https://tuitionaledu.com/online/gcse-tutors"},
              {"@type": "ListItem", "position": 6, "name": "IB Tutors Dubai", "item": "https://tuitionaledu.com/online/ib-tutors-dubai"},
              {"@type": "ListItem", "position": 7, "name": "Pearson Edexcel Tutors", "item": "https://tuitionaledu.com/online/pearson-edexcel-tutors"},
              {"@type": "ListItem", "position": 8, "name": "A Level Tutors", "item": "https://tuitionaledu.com/online/a-level-tutors"},
              {"@type": "ListItem", "position": 9, "name": "O Level Tutors", "item": "https://tuitionaledu.com/online/o-level-tutors"}
            ]
          }),
        }}
      />

      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Tuitional",
            "alternateName": "Tuitional Edu",
            "description": "Struggling to find quality tutors in the Gulf? Tuitional offers live 1-on-1 sessions with 500+ experts for IGCSE, A-Levels & IB. Start free today!",
            "url": "https://tuitionaledu.com/",
            "keywords": "Tuitional, Tuitional Edu, online tutoring Dubai, online tutoring UAE, IGCSE tutoring online, GCSE tutoring online, A-Level tutoring online, SAT online tutoring, math tutor online, science tutor online, English tutor online, affordable online tutoring UAE, expert online tutors, best online tutoring platform",
            "email": "hello@tuitionaledu.com",
            "telephone": "+971 56 490 0376",
            "logo": {"@type": "ImageObject", "url": "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90"},
            "image": "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90",
            "address": {"@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE"},
            "contactPoint": [
              {"@type": "ContactPoint", "telephone": "+971 56 490 0376", "contactType": "Customer Service", "email": "hello@tuitionaledu.com", "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"], "availableLanguage": ["en", "ar"]},
              {"@type": "ContactPoint", "telephone": "+971 44 396 296", "contactType": "WhatsApp", "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"]}
            ],
            "sameAs": ["https://www.facebook.com/tuitionaledu", "https://www.instagram.com/tuitionaledu/", "https://www.youtube.com/@tuitionaledu", "https://www.trustpilot.com/review/tuitionaledu.com", "https://www.linkedin.com/company/tuitionaledu/"],
            "foundingDate": "2022",
            "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1089", "bestRating": "5", "worstRating": "3.5"},
            "review": [
              {"@type": "Review", "author": {"@type": "Person", "name": "Amir Ahmed Khan"}, "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "3.5"}, "reviewBody": "Best chemistry teacher!"},
              {"@type": "Review", "author": {"@type": "Person", "name": "Hannah Maistry"}, "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "3.5"}, "reviewBody": "Fun and interactive classes!"},
              {"@type": "Review", "author": {"@type": "Person", "name": "Zareb Amber"}, "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "3.5"}, "reviewBody": "Explains everything properly!"}
            ]
          }),
        }}
      />

      <Script
        id="educational-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Tuitional",
            "url": "https://tuitionaledu.com/",
            "logo": {"@type": "ImageObject", "url": "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90"},
            "email": "hello@tuitionaledu.com",
            "telephone": "+971 56 490 0376",
            "address": {"@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE"},
            "educationLevel": ["Secondary", "Higher Secondary"]
          }),
        }}
      />

      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Tuitional",
            "url": "https://tuitionaledu.com/",
            "logo": {"@type": "ImageObject", "url": "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90"},
            "email": "hello@tuitionaledu.com",
            "telephone": "+971 56 490 0376",
            "address": {"@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE"},
            "contactPoint": {"@type": "ContactPoint", "telephone": "+971 56 490 0376", "contactType": "Customer Service"},
            "openingHours": "Mo,Tu,We,Th,Fr 09:00-21:00",
            "priceRange": "$$$"
          }),
        }}
      />

      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Tuitional",
            "url": "https://tuitionaledu.com/",
            "description": "Struggling to find quality tutors in the Gulf? Tuitional offers live 1-on-1 sessions with 500+ experts for IGCSE, A-Levels & IB. Start free today!",
            "potentialAction": {"@type": "SearchAction", "target": {"@type": "EntryPoint", "urlTemplate": "https://tuitionaledu.com/?s={search_term_string}"}, "query-input": "required name=search_term_string"}
          }),
        }}
      />

      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {"@type": "SiteNavigationElement", "position": 1, "name": "Home", "url": "https://tuitionaledu.com/"},
              {"@type": "SiteNavigationElement", "position": 2, "name": "About", "url": "https://tuitionaledu.com/about"},
              {"@type": "SiteNavigationElement", "position": 3, "name": "Contact", "url": "https://tuitionaledu.com/contact"},
              {"@type": "SiteNavigationElement", "position": 4, "name": "IGCSE Tutors", "url": "https://tuitionaledu.com/online/igcse-tutors"},
              {"@type": "SiteNavigationElement", "position": 5, "name": "GCSE Tutors", "url": "https://tuitionaledu.com/online/gcse-tutors"},
              {"@type": "SiteNavigationElement", "position": 6, "name": "IB Tutors Dubai", "url": "https://tuitionaledu.com/online/ib-tutors-dubai"},
              {"@type": "SiteNavigationElement", "position": 7, "name": "Pearson Edexcel Tutors", "url": "https://tuitionaledu.com/online/pearson-edexcel-tutors"},
              {"@type": "SiteNavigationElement", "position": 8, "name": "A-Level Tutors", "url": "https://tuitionaledu.com/online/a-level-tutors"},
              {"@type": "SiteNavigationElement", "position": 9, "name": "O-Level Tutors", "url": "https://tuitionaledu.com/online/o-level-tutors"}
            ]
          }),
        }}
      />

      <Script
        id="course-igcse-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "IGCSE Exam Preparation",
            "description": "Expert IGCSE tutoring for all subjects.",
            "provider": {"@type": "Organization", "name": "Tuitional", "url": "https://tuitionaledu.com/"},
            "educationLevel": "Secondary",
            "inLanguage": ["en", "ar"]
          }),
        }}
      />

      <Script
        id="course-gcse-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "GCSE Exam Preparation",
            "description": "Professional GCSE exam tutoring.",
            "provider": {"@type": "Organization", "name": "Tuitional", "url": "https://tuitionaledu.com/"},
            "educationLevel": ["Primary", "Secondary"],
            "inLanguage": ["en", "ar"]
          }),
        }}
      />

      <Script
        id="course-alevel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "A-Levels Exam Preparation",
            "description": "High-quality A-Levels tutoring.",
            "provider": {"@type": "Organization", "name": "Tuitional", "url": "https://tuitionaledu.com/"},
            "educationLevel": "Higher Secondary",
            "inLanguage": ["en", "ar"]
          }),
        }}
      />

      <Script
        id="course-grades6-8-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Grades 6-8 Tutoring",
            "description": "Comprehensive middle school tutoring.",
            "provider": {"@type": "Organization", "name": "Tuitional", "url": "https://tuitionaledu.com/"},
            "educationLevel": "Primary"
          }),
        }}
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question", "name": "What is Tuitional?", "acceptedAnswer": {"@type": "Answer", "text": "A premier online tutoring platform providing personalized 1:1 sessions."}},
              {"@type": "Question", "name": "How does it work?", "acceptedAnswer": {"@type": "Answer", "text": "Live sessions tailored to each student's learning pace."}},
              {"@type": "Question", "name": "Are tutors qualified?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, all tutors are screened experts."}},
              {"@type": "Question", "name": "What subjects?", "acceptedAnswer": {"@type": "Answer", "text": "Grades 6-8, IGCSE, GCSE, A-Levels, SAT."}},
              {"@type": "Question", "name": "Flexible scheduling?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, choose times that fit your schedule."}}
            ]
          }),
        }}
      />

      <Script
        id="offer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            "name": "Online Tutoring Services",
            "description": "Professional 1:1 online tutoring.",
            "availability": "https://schema.org/OnlineOnly",
            "priceCurrency": "AED",
            "priceRange": "$$$",
            "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"],
            "url": "https://tuitionaledu.com/"
          }),
        }}
      />

      <Script
        id="brand-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Brand",
            "name": "Tuitional",
            "url": "https://tuitionaledu.com/",
            "logo": {"@type": "ImageObject", "url": "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90"}
          }),
        }}
      />

      <Script
        id="opening-hours-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:00",
            "closes": "21:00"
          }),
        }}
      />

      <Script
        id="contact-point-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "telephone": "+971 56 490 0376",
            "email": "hello@tuitionaledu.com",
            "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"],
            "availableLanguage": ["en", "ar"]
          }),
        }}
      />

      <Script
        id="contact-whatsapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "contactType": "WhatsApp",
            "telephone": "+971 56 490 0376",
            "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"]
          }),
        }}
      />

      <Script
        id="address-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PostalAddress",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "addressCountry": "AE",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "25.2048",
              "longitude": "55.2708"
            }
          }),
        }}
      />

      <Script
        id="logo-image-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.16d39b17.png&w=640&q=90",
            "name": "Tuitional Logo",
            "height": 400,
            "width": 800
          }),
        }}
      />

      <Script
        id="demo-event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Free Demo Class",
            "description": "Experience our teaching method.",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "startDate": "2026-04-01",
            "endDate": "2026-12-31",
            "url": "https://tuitionaledu.com/demo",
            "organizer": {"@type": "Organization", "name": "Tuitional", "url": "https://tuitionaledu.com/"},
            "offers": {"@type": "Offer", "price": "0", "priceCurrency": "AED", "url": "https://tuitionaledu.com/demo", "availability": "https://schema.org/InStock"}
          }),
        }}
      />

      <Script
        id="founders-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "Ahmed Shaheer",
                "jobTitle": "Co-Founder",
                "url": "https://www.linkedin.com/in/ahmed-shaheer-76b371229/",
                "worksFor": {"@type": "Organization", "name": "Tuitional"}
              },
              {
                "@type": "Person",
                "name": "Mirza Sinan Baig",
                "jobTitle": "Co-Founder",
                "url": "https://www.linkedin.com/in/sinanbaig/",
                "worksFor": {"@type": "Organization", "name": "Tuitional"}
              }
            ]
          }),
        }}
      />

      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "1:1 Online Tutoring Service",
            "description": "Personalized one-on-one online tutoring.",
            "provider": {"@type": "Organization", "name": "Tuitional", "url": "https://tuitionaledu.com/"},
            "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"],
            "availableLanguage": ["en", "ar"],
            "offers": {"@type": "Offer", "availability": "https://schema.org/OnlineOnly", "priceCurrency": "AED", "priceRange": "$$$"}
          }),
        }}
      />

      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Get Started with Tuitional",
            "step": [
              {"@type": "HowToStep", "name": "Choose Curriculum", "text": "Select your curriculum and subjects"},
              {"@type": "HowToStep", "name": "Book Demo", "text": "Schedule your free demo class"},
              {"@type": "HowToStep", "name": "Start Learning", "text": "Begin your personalized tutoring journey"}
            ]
          }),
        }}
      />

      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Tuitional - Online Tutoring",
            "description": "Premium online tutoring platform.",
            "url": "https://tuitionaledu.com/",
            "inLanguage": "en-US"
          }),
        }}
      />

      <Script
        id="org-extended-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Tuitional",
            "url": "https://tuitionaledu.com/",
            "sameAs": ["https://www.facebook.com/tuitionaledu", "https://www.instagram.com/tuitionaledu/", "https://www.trustpilot.com/review/tuitionaledu.com", "https://www.youtube.com/@tuitionaledu", "https://www.linkedin.com/company/tuitionaledu/"],
            "foundingDate": "2022",
            "numberOfEmployees": 100
          }),
        }}
      />

      <Script
        id="local-business-extended-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Tuitional",
            "description": "Comprehensive online tutoring platform.",
            "url": "https://tuitionaledu.com/",
            "availableLanguage": ["en", "ar"],
            "areaServed": ["AE", "SA", "KW", "OM", "QA", "BH"]
          }),
        }}
      />
    </>
  );
};

export default UniversalSchema;
