"use client";

import React from "react";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import ArBlogCard from "../ar-blog-card/Ar-BlogCard";

interface Props {
  allBlogs: AllBlogsData[] | null | undefined;
  currentBlogId?: string;
}

const ArRelatedBlogs: React.FC<Props> = ({ allBlogs, currentBlogId }) => {
  if (!allBlogs || allBlogs.length === 0) return null;
  const relatedBlogs = allBlogs
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, 3);
  if (relatedBlogs.length === 0) return null;

  return (
    <div className="px-4 py-8" dir="rtl">
      <h2 className="mb-6 text-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-black">
        مقالات ذات صلة
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {relatedBlogs.map((blog) => (
          <div key={blog.id}>
            <ArBlogCard data={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArRelatedBlogs;
