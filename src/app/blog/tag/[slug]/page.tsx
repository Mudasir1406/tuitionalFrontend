import { Header } from "@/components";
import Footer from "@/components/footer-wrapper";
import React from "react";

import styles from "./blog.module.css";
import AllBlogs from "@/components/blog/all-blogs/All-Blogs";
import Hero from "@/components/blog/hero/Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import Breadcrumb from "@/components/bread-crumb/bread-crumb";
import type { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tags = await getDocumentsByName("tags");
  const tag = tags?.[0]?.data?.find((t: any) => t.id === params.slug);
  const name = tag?.name?.en || "Tag";

  return {
    title: `${name} Articles - Tutoring Blog | Tuitional`,
    description: `Browse all Tuitional blog articles tagged with ${name}. Expert study tips, exam guides, and education resources for students across the Gulf region.`,
    alternates: {
      canonical: `${SITE_URL}/blog/tag/${params.slug}`,
      languages: {
        en: `${SITE_URL}/blog/tag/${params.slug}`,
        "x-default": `${SITE_URL}/blog/tag/${params.slug}`,
      },
    },
    openGraph: {
      title: `${name} Articles - Tutoring Blog | Tuitional`,
      description: `Browse all Tuitional blog articles tagged with ${name}.`,
      url: `${SITE_URL}/blog/tag/${params.slug}`,
      locale: "en",
      type: "website",
    },
  };
}

const SearchBar = dynamic(
  () => import("@/components/blog/search-bar/SearchBar"),
  {
    ssr: true,
  }
);

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  
  // Fetch English blogs and tags
  const [data, tags] = await Promise.all([
    getDocumentsByName("blogs-v1-en"),
    getDocumentsByName("tags")
  ]);

  // Find the tag
  const tag = tags?.[0]?.data?.find((t: any) => t.id === slug);

  // Filter blogs by tag
  const filteredData = data?.filter((blog: AllBlogsData) =>
    blog?.blog_tag?.tags?.some((t: any) => t.id === tag?.id)
  ) || [];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero slug={tag?.name?.en || "Tag"} />
          </div>
          <div className={styles["hero-picture"]}></div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      {/* <SearchBar searchQuery={slug || ""} type="tags"/> */}
      <Breadcrumb />

      <AllBlogs blogs={filteredData} />

      <Footer />
    </>
  );
};
export default Page;
