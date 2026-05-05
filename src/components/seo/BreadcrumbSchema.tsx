import Script from "next/script";
import React from "react";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Renders a JSON-LD BreadcrumbList schema for the current page.
 * Home is always position 1. Pass additional crumbs in order.
 *
 * Usage:
 *   <BreadcrumbSchema id="about-breadcrumb" items={[{ name: "About", url: "https://tuitionaledu.com/about" }]} />
 *   <BreadcrumbSchema id="blog-post-breadcrumb" items={[
 *     { name: "Blog", url: "https://tuitionaledu.com/blog" },
 *     { name: "My Post Title", url: "https://tuitionaledu.com/blog/my-post" },
 *   ]} />
 */
const BreadcrumbSchema = ({
  id,
  items,
}: {
  id: string;
  items: BreadcrumbItem[];
}) => {
  const allItems = [
    { name: "Home", url: "https://tuitionaledu.com" },
    ...items,
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default BreadcrumbSchema;
