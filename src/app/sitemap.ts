import { getAllDocumentsFromCollection } from "@/services/grade-subject-level/grade-subject-level";
import { SITE_URL } from "@/utils/env";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageSlugs, blogSlugs] = await Promise.all([
    getAllDocumentsFromCollection("grade-subject-level-en"),
    getAllDocumentsFromCollection("blogs-v1-en"),
  ]);

  const pageUrls: MetadataRoute.Sitemap = (pageSlugs ?? []).map((slug) => ({
    url: `${SITE_URL}/online/${slug.id}`,
    lastModified: slug.lastModified
      ? new Date(slug.lastModified.seconds * 1000)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogUrls: MetadataRoute.Sitemap = (blogSlugs ?? []).map((slug) => ({
    url: `${SITE_URL}/blogs/${slug.id}`,
    lastModified: slug.lastModified
      ? new Date(slug.lastModified.seconds * 1000)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

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
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tutors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("Thu Nov 15 2024 00:00:00 GMT+0500"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("Tue Oct 01 2024 00:00:00 GMT+0500"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified: new Date("Tue Oct 01 2024 00:00:00 GMT+0500"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: new Date("Tue Oct 01 2024 00:00:00 GMT+0500"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...pageUrls, ...blogUrls];
}
