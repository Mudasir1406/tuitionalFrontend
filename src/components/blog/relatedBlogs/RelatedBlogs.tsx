import React from "react";
import BlogCard, { BlogsProps } from "../blog-card/BlogCard";
import styles from "./RelatedBlogs.module.css";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

interface Props {
  blogs: AllBlogsData[] | null | undefined;
}

const RelatedBlogs = ({ blogs }: Props) => {
  return (
    <>
      {" "}
      <Typography
        className={`${styles.heading} ${leagueSpartan.className}`}
        variant="h4"
        component={"p"}
      >
        Related Blogs
      </Typography>
      <div className={styles.blogContainer}>
        {blogs?.slice(0, 3)?.map((blog) => (
          <BlogCard data={blog} key={blog.id} />
        ))}
      </div>
    </>
  );
};
export default RelatedBlogs;
