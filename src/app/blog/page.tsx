import { Header } from "@/components";
import Footer from "@/components/footer";
import React, { useState } from "react";

import styles from "./blog.module.css";
import AllBlogs from "@/components/blog/all-blogs/All-Blogs";
import Hero from "@/components/blog/hero/Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import SearchBar from "@/components/blog/search-bar/SearchBar";
import { BlogsProps } from "@/components/blog/blog-card/BlogCard";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";


const Page = async () => {
  const data = await getDocumentsByName("blogs");

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero />
          </div>
          <div className={styles["hero-picture"]}></div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      <SearchBar />
      <AllBlogs blogs={data} />

      <Footer />
    </>
  );
};
export default Page;
