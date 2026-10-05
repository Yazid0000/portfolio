// Adresse publique du site.
// Sur Vercel, VERCEL_PROJECT_PRODUCTION_URL est fourni automatiquement (ex. portfolio-xxx.vercel.app).
// Quand tu auras ton nom de domaine, ajoute NEXT_PUBLIC_SITE_URL=https://ton-domaine dans Vercel.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Chemin de la page d'accueil pour chaque langue ("/" pour le français, "/en" pour l'anglais).
export const cheminLangue = (locale: string) => (locale === "fr" ? "/" : `/${locale}`);
