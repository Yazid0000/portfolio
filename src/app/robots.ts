import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/site";

// Généré automatiquement à l'adresse /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
