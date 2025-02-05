import { Header } from "@/components";
import Footer from "@/components/footer";
import React, { useState } from "react";
import dummyImg1 from "../../../../../public/assets/images/static/blogimg1.png";
import dummyImg2 from "../../../../../public/assets/images/static/blogimg2.png";
import dummyImg3 from "../../../../../public/assets/images/static/blogimg3.png";
import dummyImg4 from "../../../../../public/assets/images/static/blogimg4.png";
import styles from "./blog.module.css";
import AllBlogs from "@/components/blog/all-blogs/All-Blogs";
import Hero from "@/components/blog/hero/Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";

const SearchBar = dynamic(
  () => import("@/components/blog/search-bar/SearchBar"),
  {
    ssr: true,
  }
);
// const dummyBlog = [
//   {
//     image: dummyImg1,
//     title:
//       "Embracing the Future of Learning Educational apps and software integrated into our platform ",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab1",
//   },
//   {
//     image: dummyImg2,
//     title:
//       "Unlocking Academic Success  apps and software integrated into our platform asd",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "June 3, 2024",
//     _id: "ab2",
//   },
//   {
//     image: dummyImg3,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab3",
//   },
//   {
//     image: dummyImg4,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab4",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab5",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab1",
//   },
//   {
//     image: dummyImg2,
//     title: "Unlocking Academic Success",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "June 3, 2024",
//     _id: "ab2",
//   },
//   {
//     image: dummyImg3,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab3",
//   },
//   {
//     image: dummyImg4,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab4",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab5",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab1",
//   },
//   {
//     image: dummyImg2,
//     title: "Unlocking Academic Success",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "June 3, 2024",
//     _id: "ab2",
//   },
//   {
//     image: dummyImg3,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab3",
//   },
//   {
//     image: dummyImg4,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab4",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab5",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab1",
//   },
//   {
//     image: dummyImg2,
//     title: "Unlocking Academic Success",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "June 3, 2024",
//     _id: "ab2",
//   },
//   {
//     image: dummyImg3,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab3",
//   },
//   {
//     image: dummyImg4,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab4",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab5",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab1",
//   },
//   {
//     image: dummyImg2,
//     title: "Unlocking Academic Success",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "June 3, 2024",
//     _id: "ab2",
//   },
//   {
//     image: dummyImg3,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab3",
//   },
//   {
//     image: dummyImg4,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab4",
//   },
//   {
//     image: dummyImg1,
//     title: "Embracing the Future of Learning",
//     paragraph:
//       "Educational apps and software integrated into our platform can offer personalized practice.",
//     createdAt: "July 21, 2024",
//     _id: "ab5",
//   },
// ];

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
          <div className={styles["hero-picture"]}>{/* <HeroInfo /> */}</div>
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
