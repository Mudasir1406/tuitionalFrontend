"use client";
import React, { useState } from "react";
import styles from "./All-blogs.module.css";
import BlogCard, { BlogsProps } from "../blog-card/BlogCard";
import { Button } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { AllBlogsData } from "@/types/grade-subject-level.types";

interface Props {
  blogs: AllBlogsData[];
}

function AllBlogs({ blogs }: Props) {
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMore = 3;

  console.log("allBlogs", blogs);
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMore);
  };
  return (
    <div className={styles.blogs}>
      <div className={styles.blogContainer}>
        {blogs.slice(0, visibleCount).map((blog) => (
          <BlogCard data={blog} key={blog.id} />
        ))}
      </div>
      <div className={styles.fadeEffect} />

      {visibleCount < blogs.length && (
        <div className={styles.loadMoreButton}>
          <Button
            onClick={handleLoadMore}
            variant="contained"
            className={`${leagueSpartan.className} ${styles.containedButton}`}
          >
            More
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllBlogs;
