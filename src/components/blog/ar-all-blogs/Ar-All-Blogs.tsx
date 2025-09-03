"use client";
import React, { useState } from "react";
import styles from "./Ar-All-blogs.module.css";
import ArBlogCard, { BlogsProps } from "../ar-blog-card/Ar-BlogCard";
import { Button } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { AllBlogsData } from "@/types/grade-subject-level.types";

interface Props {
  blogs: AllBlogsData[];
}

function ArAllBlogs({ blogs }: Props) {
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMore = 3;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMore);
  };
  return (
    <div className={`${styles.blogs} ${styles.blogsRTL}`}>
      <div className={`${styles.blogContainer} ${styles.blogContainerRTL}`}>
        {blogs.slice(0, visibleCount).map((blog) => (
          <ArBlogCard data={blog} key={blog.id} />
        ))}
      </div>
      {blogs?.length > 3 && visibleCount < blogs.length && (
        <div className={styles.fadeEffect} />
      )}

      {visibleCount < blogs.length && (
        <div className={styles.loadMoreButton}>
          <Button
            onClick={handleLoadMore}
            variant="contained"
            className={`${leagueSpartan.className} ${styles.containedButton}`}
          >
            المزيد
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArAllBlogs;