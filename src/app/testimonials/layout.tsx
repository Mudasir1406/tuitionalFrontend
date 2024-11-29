import { getSchema } from "@/utils/helper";
import Script from "next/script";
import React, { ReactNode } from "react";

const Layout = async ({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const testimonialsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://tuitionaledu.com/testimonials/#webpage",
        url: "https://tuitionaledu.com/testimonials",
        name: "Student Testimonials - Tuitional",
        description:
          "See what our students and parents have to say about Tuitional's online tutoring services in the Gulf region. Read their success stories and experiences.",
        isPartOf: {
          "@id": "https://tuitionaledu.com/#website",
        },
        about: {
          "@id": "https://tuitionaledu.com/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://tuitionaledu.com/#organization",
        name: "Tuitional",
        url: "https://tuitionaledu.com/",
        logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
        description:
          "Tuitional is a leading online tutoring platform in the Gulf region, providing personalized tutoring services across various curricula including CAIE, Pearson Edexcel, AQA, and more.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          telephone: "+971 56 490 0376",
          email: "hello@tuitionaledu.com",
          areaServed: [
            "United Arab Emirates",
            "Saudi Arabia",
            "Qatar",
            "Kuwait",
            "Bahrain",
            "Oman",
          ],
          availableLanguage: ["English"],
        },
        sameAs: [
          "https://www.trustpilot.com/review/tuitionaledu.com",
          "https://www.facebook.com/tuitionaledu",
          "https://www.instagram.com/tuitionaledu/",
          "https://www.linkedin.com/company/tuitionaledu/",
        ],
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
          "Tuitional offers expert online tutoring services for students in the Gulf region following various curricula including CAIE, Edexcel, and AQA.",
        inLanguage: "en",
        publisher: {
          "@id": "https://tuitionaledu.com/#organization",
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://tuitionaledu.com/testimonials/#testimonials",
        name: "Tuitional Student Testimonials",
        description:
          "A list of testimonials from students and parents who have benefited from Tuitional's online tutoring services.",
        itemListElement: [
          // Text Testimonials
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#review1",
            reviewBody:
              "I always look forward to these classes, because they are very fun and interactive. He’s a great teacher. I always understand the tutor really well and all of the concepts are explained really well in class.",
            author: {
              "@type": "Person",
              name: "Hannah Maistry",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            description:
              "Hannah Maistry shares her positive experience with Tuitional's interactive online classes and effective teaching methods.",
          },
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#review2",
            reviewBody:
              "He is a very kind & skillful teacher. I have improved in concepts due to his lectures and understanding in class. He is the best chemistry teacher I’ve ever had. I would rate him 10/10.",
            author: {
              "@type": "Person",
              name: "Amir Ahmed Khan",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            description:
              "Amir Ahmed Khan praises the chemistry tutor for being skillful, kind, and effective in helping him improve his understanding.",
          },
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#review3",
            reviewBody:
              "The teacher is friendly and explains everything properly. I am able to understand everything he says.",
            author: {
              "@type": "Person",
              name: "Zareb Amber",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            description:
              "Zareb Amber highlights the friendly approach of the tutor and how well the concepts are explained during the online sessions.",
          },
          // Audio Testimonials
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#audioReview1",
            reviewBody:
              "I had an amazing experience with Tuitional. The tutors are fantastic and the sessions are very informative.",
            author: {
              "@type": "Person",
              name: "Ahmed Ali",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            reviewAspect: "Audio",
            audio: {
              "@type": "AudioObject",
              name: "Ahmed Ali Testimonial",
              contentUrl: "https://tuitionaledu.com/audio/testimonial1.mp3",
              encodingFormat: "audio/mp3",
              thumbnailUrl:
                "https://tuitionaledu.com/images/audio-thumbnail1.jpg",
              description:
                "Ahmed Ali shares his positive experience with Tuitional’s tutoring, praising the quality of tutors and the helpfulness of the sessions.",
            },
          },
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#audioReview2",
            reviewBody:
              "The tutors are very knowledgeable and explain concepts in a way that is easy to understand.",
            author: {
              "@type": "Person",
              name: "Fatima Raza",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            reviewAspect: "Audio",
            audio: {
              "@type": "AudioObject",
              name: "Fatima Raza Testimonial",
              contentUrl: "https://tuitionaledu.com/audio/testimonial2.mp3",
              encodingFormat: "audio/mp3",
              thumbnailUrl:
                "https://tuitionaledu.com/images/audio-thumbnail2.jpg",
              description:
                "Fatima Raza appreciates the tutors for their in-depth knowledge and clear explanations during online sessions.",
            },
          },
          // Video Testimonials
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#videoReview1",
            reviewBody:
              "Tuitional's tutors are highly skilled and very friendly. I always enjoy the online sessions.",
            author: {
              "@type": "Person",
              name: "Omar Al-Bayati",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            reviewAspect: "Video",
            video: {
              "@type": "VideoObject",
              name: "Omar Al-Bayati Testimonial",
              contentUrl: "https://tuitionaledu.com/video/testimonial1.mp4",
              thumbnailUrl:
                "https://tuitionaledu.com/images/video-thumbnail1.jpg",
              uploadDate: "2024-11-01T10:00:00Z",
              description:
                "Omar Al-Bayati shares his positive experience with Tuitional's highly skilled tutors and enjoyable online sessions.",
            },
          },
          {
            "@type": "Review",
            "@id": "https://tuitionaledu.com/testimonials/#videoReview2",
            reviewBody:
              "The lessons are engaging, and I feel confident about my upcoming exams thanks to the support from Tuitional.",
            author: {
              "@type": "Person",
              name: "Sara Khalil",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
              worstRating: "1",
            },
            itemReviewed: {
              "@id": "https://tuitionaledu.com/#organization",
            },
            reviewAspect: "Video",
            video: {
              "@type": "VideoObject",
              name: "Sara Khalil Testimonial",
              contentUrl: "https://tuitionaledu.com/video/testimonial2.mp4",
              thumbnailUrl:
                "https://tuitionaledu.com/images/video-thumbnail2.jpg",
              uploadDate: "2024-11-01T10:00:00Z",
              description:
                "Sara Khalil talks about how Tuitional’s engaging lessons have helped her feel prepared for her exams.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div>
      <Script
        id="page-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />

      {children}
    </div>
  );
};

export default Layout;
