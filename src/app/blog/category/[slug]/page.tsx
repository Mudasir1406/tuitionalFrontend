import { Header } from "@/components";
import Footer from "@/components/footer";
import React, { useState } from "react";

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
  const data = await getDocumentsByName("blogs");
  console.log("getDocumentsByName", data);

  // const filteredData = slug
  //   ? data.filter((blog: AllBlogsData) =>
  //       blog?.heroSection?.category?.some((tag: { name: string; id: string }) =>
  //         tag.name?.toLowerCase().includes(slug.toLowerCase())
  //       )
  //     )
  //   : data;

  const filteredData = slug
    ? data.filter((blog: AllBlogsData) =>
        blog?.heroSection?.category?.some(
          (tag: { name: string; id: string }) => {
            const normalizedTagName = tag.name
              ?.toLowerCase()
              .replace(/[-\s]+/g, " ");
            const normalizedSlug = slug.toLowerCase().replace(/[-\s]+/g, " ");
            return normalizedTagName.includes(normalizedSlug);
          }

          // tag.name
          //   ?.toLowerCase()
          //   .includes(slug.replace(/-/g, " ").toLowerCase())
        )
      )
    : data;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero
              slug={slug
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            />{" "}
          </div>
          <div className={styles["hero-picture"]}>{/* <HeroInfo /> */}</div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      {/* <SearchBar searchQuery={slug || ""} type={'category'}/> */}
      <Breadcrumb />

      <AllBlogs blogs={filteredData} />

      <Footer />
    </>
  );
};
export default Page;
