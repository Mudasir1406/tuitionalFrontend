import { getAllDocumentsFromCollection } from "@/services/grade-subject-level/grade-subject-level";
import { SITE_URL } from "@/utils/env";
import type { MetadataRoute } from "next";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllDocumentsFromCollection("grade-subject-level");
  if (slugs)
    return slugs.map((slug) => ({
      url: `${SITE_URL}/online/${slug.id}`,
      lastModified: new Date(),
      priority: 0.8,
    }));
  else return [];
}
