"use client";
import React from "react";
import styles from "./Ar-RelatedBlogs.module.css";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import ArBlogCard from "../ar-blog-card/Ar-BlogCard";

interface Props {
  allBlogs: AllBlogsData[] | null | undefined;
  currentBlogId?: string;
}

const ArRelatedBlogs: React.FC<Props> = ({ allBlogs, currentBlogId }) => {
  if (!allBlogs || allBlogs.length === 0) return null;

  // Filter out the current blog and get random related blogs
  const filteredBlogs = allBlogs.filter(blog => blog.id !== currentBlogId);
  const relatedBlogs = filteredBlogs.slice(0, 3); // Show 3 related blogs

  if (relatedBlogs.length === 0) return null;

  return (
    <div className={`${styles.container} ${styles.containerRTL}`} dir="rtl">
      <Typography
        variant="h2"
        className={`${styles.title} ${styles.titleRTL} ${leagueSpartan.className}`}
      >
        مقالات ذات صلة
      </Typography>
      
      <div className={`${styles.blogsGrid} ${styles.blogsGridRTL}`}>
        {relatedBlogs.map((blog) => (
          <div key={blog.id} className={styles.blogCard}>
            <ArBlogCard data={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArRelatedBlogs;