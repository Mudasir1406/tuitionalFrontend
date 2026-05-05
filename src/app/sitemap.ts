import { getAllDocumentsFromCollection } from "@/services/grade-subject-level/grade-subject-level";
import { SITE_URL } from "@/utils/env";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageSlugsEn, blogSlugsEn, pageSlugsAr, blogSlugsAr] =
    await Promise.all([
      getAllDocumentsFromCollection("grade-subject-level-en"),
      getAllDocumentsFromCollection("blogs-v1-en"),
      getAllDocumentsFromCollection("grade-subject-level-ar"),
      getAllDocumentsFromCollection("blogs-v1-ar"),
    ]);

  const pageUrls: MetadataRoute.Sitemap = (pageSlugsEn ?? []).map((slug) => ({
    url: `${SITE_URL}/online/${slug.id}`,
    lastModified: slug.lastModified
      ? new Date(slug.lastModified.seconds * 1000)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogUrls: MetadataRoute.Sitemap = (blogSlugsEn ?? []).map((slug) => ({
    url: `${SITE_URL}/blog/${slug.id}`,
    lastModified: slug.lastModified
      ? new Date(slug.lastModified.seconds * 1000)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const arPageUrls: MetadataRoute.Sitemap = (pageSlugsAr ?? []).map(
    (slug) => ({
      url: `${SITE_URL}/ar/online/${slug.id}`,
      lastModified: slug.lastModified
        ? new Date(slug.lastModified.seconds * 1000)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const arBlogUrls: MetadataRoute.Sitemap = (blogSlugsAr ?? []).map(
    (slug) => ({
      url: `${SITE_URL}/ar/blog/${slug.id}`,
      lastModified: slug.lastModified
        ? new Date(slug.lastModified.seconds * 1000)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/online`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/igcse`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gcse`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/a-level`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const arStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ar/online`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ar/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ar/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/ar/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/ar/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/ar/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/ar/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/ar/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/ar/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [
    ...staticPages,
    ...arStaticPages,
    ...pageUrls,
    ...arPageUrls,
    ...blogUrls,
    ...arBlogUrls,
  ];
}
