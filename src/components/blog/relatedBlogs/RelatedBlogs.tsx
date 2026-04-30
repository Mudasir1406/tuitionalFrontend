import React from "react";
import BlogCard from "../blog-card/BlogCard";
import { AllBlogsData } from "@/types/grade-subject-level.types";

interface Props {
  blogs: AllBlogsData[] | null | undefined;
}

const RelatedBlogs = ({ blogs }: Props) => (
  <>
    <p className="text-center font-heading text-h4">Related Blogs</p>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
      {blogs?.slice(0, 3)?.map((blog) => (
        <BlogCard data={blog} key={blog.id} />
      ))}
    </div>
  </>
);

export default RelatedBlogs;
