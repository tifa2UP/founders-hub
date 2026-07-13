import type { MetadataRoute } from "next";

import { residents } from "@/lib/residents.generated";

const SITE_URL = "https://www.founder-hub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/apply`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...residents.map((resident) => ({
      url: `${SITE_URL}/residents/${resident.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
