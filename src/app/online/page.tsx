import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/utils/env";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { Metadata } from "next";

const Header = dynamic(() => import("@/components").then(mod => ({ default: mod.Header })), { ssr: true });
const ServerFooter = dynamic(() => import("@/components/server-footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Online Tutoring Services - Tuitional",
  description:
    "Get personalized online tutoring from qualified teachers for British curriculum subjects across the Gulf region",
  alternates: {
    canonical: `${SITE_URL}/online`,
  },
  openGraph: {
    title: "Online Tutoring Services - Tuitional",
    description:
      "Get personalized online tutoring from qualified teachers for British curriculum subjects across the Gulf region",
    url: `${SITE_URL}/online`,
    locale: "en",
  },
};

const OnlinePage = async () => {
  const data = await getDocumentsByName("grade-subject-level-en");

  return (
    <>
      <Header />
      <div className="min-h-screen px-[3vw] py-[2vh] pt-[120px] md:px-[5vw] md:py-[4vh]">
        <div className="mb-[4vh] text-center md:mb-[6vh]">
          <h1 className="mb-4 text-[2.5rem] font-bold text-[#1a1a1a]">
            Personalized Online Learning
          </h1>
          <p className="mx-auto max-w-[800px] text-[1.2rem] text-[#666]">
            Get personalized online tutoring from qualified teachers for British curriculum subjects across the Gulf region
          </p>
        </div>

        {data && data.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((course: any) => (
              <Link
                key={course.id}
                href={`/online/${course.id}`}
                className="group block rounded-lg border border-[#e0e0e0] p-6 text-inherit no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2196f3] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              >
                {course.hero_section?.image && (
                  <Image
                    src={course.hero_section.image}
                    alt={course.hero_section.imageAltText || course.hero_section.title}
                    width={400}
                    height={200}
                    className="mb-4 h-[200px] w-full rounded object-cover"
                  />
                )}
                <h3 className="mb-2 text-[1.25rem] font-semibold text-[#1a1a1a]">
                  {course.hero_section?.title || course.id}
                </h3>
                {course.hero_section?.subtitle && (
                  <p className="mb-4 text-[0.95rem] leading-snug text-[#666]">
                    {course.hero_section.subtitle}
                  </p>
                )}
                <span className="inline-block rounded bg-[#2196f3] px-4 py-2 text-[0.9rem] font-medium text-white">
                  Learn More
                </span>
              </Link>
            ))}
          </div>
        )}

        {(!data || data.length === 0) && (
          <div className="mt-16 text-center">
            <p className="text-[1.1rem] text-[#666]">
              No online courses available at the moment.
            </p>
          </div>
        )}
      </div>
      <ServerFooter />
    </>
  );
};

export default OnlinePage;
