import type { MetadataRoute } from "next";
import { siteUrl, cheminLangue } from "@/i18n/site";

// Généré automatiquement à l'adresse /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: string) => new URL(cheminLangue(locale), siteUrl).toString();

  return ["fr", "en"].map((locale) => ({
    url: url(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "fr" ? 1 : 0.9,
    alternates: { languages: { fr: url("fr"), en: url("en") } },
  }));
}
