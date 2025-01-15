import { Header } from "@/components";
import ConduciveEnviroment from "@/components/blog/conducive-enviroment";
import Embrace from "@/components/blog/embrace";
import OptionsImageHome from "@/components/blog/options-image-home";
import RelatedBlogs from "@/components/blog/relatedBlogs/RelatedBlogs";
import Footer from "@/components/footer";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import students from "../../../public/assets/images/static/young-students-learning-together-group-study.png";
import BlogCard from "@/components/blog/blog-card/BlogCard";
import dummyImg1 from "../../../public/assets/images/static/blogimg1.png";
import dummyImg2 from "../../../public/assets/images/static/blogimg2.png";
import dummyImg3 from "../../../public/assets/images/static/blogimg3.png";
import dummyImg4 from "../../../public/assets/images/static/blogimg4.png";
import styles from "./blog.module.css";
import AllBlogs from "@/components/blog/all-blogs/All-Blogs";
import HeroInfo from "@/components/about/hero-info";
import Hero from "@/components/blog/hero/Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";

export const dummyBlog = [
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab1",
  },
  {
    image: dummyImg2,
    title: "Unlocking Academic Success",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "June 3, 2024",
    _id: "ab2",
  },
  {
    image: dummyImg3,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab3",
  },
  {
    image: dummyImg4,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab4",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab5",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab1",
  },
  {
    image: dummyImg2,
    title: "Unlocking Academic Success",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "June 3, 2024",
    _id: "ab2",
  },
  {
    image: dummyImg3,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab3",
  },
  {
    image: dummyImg4,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab4",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab5",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab1",
  },
  {
    image: dummyImg2,
    title: "Unlocking Academic Success",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "June 3, 2024",
    _id: "ab2",
  },
  {
    image: dummyImg3,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab3",
  },
  {
    image: dummyImg4,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab4",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab5",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab1",
  },
  {
    image: dummyImg2,
    title: "Unlocking Academic Success",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "June 3, 2024",
    _id: "ab2",
  },
  {
    image: dummyImg3,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab3",
  },
  {
    image: dummyImg4,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab4",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab5",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab1",
  },
  {
    image: dummyImg2,
    title: "Unlocking Academic Success",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "June 3, 2024",
    _id: "ab2",
  },
  {
    image: dummyImg3,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab3",
  },
  {
    image: dummyImg4,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab4",
  },
  {
    image: dummyImg1,
    title: "Embracing the Future of Learning",
    paragraph:
      "Educational apps and software integrated into our platform can offer personalized practice.",
    createdAt: "July 21, 2024",
    _id: "ab5",
  },
];

const Page = () => {
  return (
    <>
      {/* <Header />
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
      <AllBlogs blogs={dummyBlog} />

      <Footer /> */}
    </>
  );
};
export default Page;
