"use client";

import React from "react";
import dynamic from "next/dynamic";

const BlogSidebarForm = dynamic(() => import("./BlogSidebarForm"), { ssr: false });

interface Props {
  categories?: { name: { en: string; ar: string }; id: string }[];
  tags: { name: { en: string; ar: string }; id: string }[];
}

function LeftSection({ categories, tags }: Props) {
  return (
    <div>
      <BlogSidebarForm />
    </div>
  );
}

export default LeftSection;
