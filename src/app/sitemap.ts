import { getAllDocumentsFromCollection } from "@/services/grade-subject-level/grade-subject-level";
import { SITE_URL } from "@/utils/env";
import type { MetadataRoute } from "next";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllDocumentsFromCollection("grade-subject-level");
  console.log(slugs);
  if (slugs) {
    const urls = slugs.map((slug) => ({
      url: `${SITE_URL}/online/${slug.id}`,
      lastModified: new Date(slug.lastModified.seconds * 1000),
      priority: 0.8,
    }));
    const data: MetadataRoute.Sitemap = [
      {
        url: `${SITE_URL}`,
        priority: 1,
        lastModified: new Date(),
      },
      {
        url: `${SITE_URL}/testimonials`,
        priority: 0.8,
        lastModified: new Date(
          "Tue Oct 01 2024 00:00:00 GMT+0500 (Pakistan Standard Time)"
        ),
      },
      {
        url: `${SITE_URL}/contact`,
        priority: 0.8,
        lastModified: new Date(
          "Tue Oct 01 2024 00:00:00 GMT+0500 (Pakistan Standard Time)"
        ),
      },
      {
        url: `${SITE_URL}/careers`,
        priority: 0.8,
        lastModified: new Date(
          "Tue Oct 01 2024 00:00:00 GMT+0500 (Pakistan Standard Time)"
        ),
      },
    ];
    return [...urls, ...data];
  } else return [];
}
