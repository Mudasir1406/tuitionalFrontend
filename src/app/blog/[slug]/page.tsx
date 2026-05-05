import BlogSequences from "@/components/blog/blogSequences/blog-sequences";
import {
  getBlogData,
  getDocumentsByName,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  AllBlogsData,
  PageData,
} from "@/types/grade-subject-level.types";
import { SITE_URL } from "@/utils/env";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import Script from "next/script";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getBlogData(params.slug, "en");
  if (!data) return {};

  const mt = data.meta_tags ?? {};
  const title = mt.title || data.hero_section?.header || "Blog";
  const description = mt.description || data.hero_section?.paragraph || "";
  const canonical = mt.canonicalTag || `${SITE_URL}/blog/${params.slug}`;
  const ogImage = mt.ogImage || data.hero_section?.image || "";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/blog/${params.slug}`,
        ar: `${SITE_URL}/ar/blog/${params.slug}`,
        "x-default": `${SITE_URL}/blog/${params.slug}`,
      },
    },
    openGraph: {
      title: mt.ogTitle || title,
      description: mt.ogDescription || description,
      url: mt.ogUrl || canonical,
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export type TagItem = {
  data: { name: { en: string; ar: string }; id: string }[];
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const [data, allBlogs, allTags, allCategories]: [
    PageData | undefined | null,
    AllBlogsData[] | null | undefined,
    TagItem[],
    TagItem[],
  ] = await Promise.all([
    getBlogData(params.slug, "en"),
    getDocumentsByName("blogs-v1-en"),
    getDocumentsByName("tags"),
    getDocumentsByName("categories"),
  ]);

  if (!data) {
    // If the post doesn't exist in EN, check AR and send the user there.
    const arData = await getBlogData(params.slug, "ar");
    if (arData) return redirect(`/ar/blog/${params.slug}`);
    return notFound();
  }

  const sortJsonObjectBySequenceNumber = (jsonObject: {
    [key: string]: any;
  }): { [key: string]: any } => {
    const entries = Object.entries(jsonObject);
    const sortedEntries = entries.sort(([, valueA], [, valueB]) => {
      const seqA = valueA.sequenceNumber ?? Infinity;
      const seqB = valueB.sequenceNumber ?? Infinity;
      return seqA - seqB;
    });
    return Object.fromEntries(sortedEntries);
  };

  const mt = data.meta_tags ?? {};
  const articleTitle = mt.title || data.hero_section?.header || "";
  const articleDescription = mt.description || data.hero_section?.paragraph || "";
  const articleImage = mt.ogImage || data.hero_section?.image || "";
  const articleUrl = `${SITE_URL}/blog/${params.slug}`;
  const datePublished = data.timestamp
    ? new Date(data.timestamp.seconds * 1000).toISOString()
    : undefined;
  const rawContent = (data as any).blogContent?.content ?? "";
  const wordCount = rawContent
    ? rawContent.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
    : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleUrl,
    headline: articleTitle,
    description: articleDescription,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    ...(articleImage ? { image: articleImage } : {}),
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    author: {
      "@type": "Organization",
      name: "Tuitional",
      "@id": "https://tuitionaledu.com/#organization",
    },
    publisher: {
      "@id": "https://tuitionaledu.com/#organization",
    },
    inLanguage: "en",
    ...(wordCount ? { wordCount } : {}),
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        id="blog-post-breadcrumb"
        items={[
          { name: "Blog", url: "https://tuitionaledu.com/blog" },
          { name: articleTitle, url: `https://tuitionaledu.com/blog/${params.slug}` },
        ]}
      />
      <BlogSequences
        data={sortJsonObjectBySequenceNumber(data) as any}
        allBlogs={allBlogs}
        allTags={allTags?.[0]?.data}
        allCategories={allCategories?.[0]?.data}
      />
    </>
  );
};

export default Page;
