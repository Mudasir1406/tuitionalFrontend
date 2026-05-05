"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ArBlogCard from "../ar-blog-card/Ar-BlogCard";
import { AllBlogsData } from "@/types/grade-subject-level.types";

interface Props {
  blogs: AllBlogsData[];
}

function ArAllBlogs({ blogs }: Props) {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <div className="relative" dir="rtl">
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, visibleCount).map((blog) => (
          <ArBlogCard data={blog} key={blog.id} />
        ))}
      </div>
      {blogs?.length > 3 && visibleCount < blogs.length && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      )}
      {visibleCount < blogs.length && (
        <div className="flex justify-center py-6">
          <Button onClick={() => setVisibleCount((c) => c + 3)} variant="primary" className="font-heading">
            المزيد
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArAllBlogs;
