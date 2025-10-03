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

const SearchBar = dynamic(
  () => import("@/components/blog/search-bar/SearchBar"),
  {
    ssr: true,
  }
);

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  
  // Fetch English blogs and categories
  const [data, categories] = await Promise.all([
    getDocumentsByName("blogs-v1-en"),
    getDocumentsByName("categories")
  ]);

  // Find the category
  const category = categories?.[0]?.data?.find((cat: any) => cat.id === slug);

  // Filter blogs by category
  const filteredData = data?.filter((blog: AllBlogsData) =>
    blog?.heroSection?.category?.data?.some((cat: any) => cat.id === category?.id)
  ) || [];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero slug={category?.name?.en || "Category"} />{" "}
          </div>
          <div className={styles["hero-picture"]}></div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      {/* <SearchBar searchQuery={slug || ""} type={'category'}/> */}
      <Breadcrumb />

      <AllBlogs blogs={filteredData} locale="en" />

      <Footer />
    </>
  );
};
export default Page;
