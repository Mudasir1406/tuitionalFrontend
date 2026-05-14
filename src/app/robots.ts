import type { MetadataRoute } from "next";
import { SITE_URL, IS_DEV_ENV } from "@/utils/env";

export default function robots(): MetadataRoute.Robots {
  if (IS_DEV_ENV) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
