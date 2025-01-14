import React from "react";
import BlogCard, { BlogsProps } from "../blog-card/BlogCard";
import styles from "./RelatedBlogs.module.css";

interface Props {
  blogs: BlogsProps[];
}

const RelatedBlogs = ({ blogs }: Props) => {
  return (
    <>
      <div className={styles.blogContainer}>
        {blogs?.slice(0, 3)?.map((blog) => (
          <BlogCard data={blog} key={blog._id} />
        ))}
      </div>
    </>
  );
};
export default RelatedBlogs;
