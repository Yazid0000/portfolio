import type { NextConfig } from "next";

// next-intl : on indique où se trouve la configuration des traductions.
// (Équivalent du plugin next-intl, sans sa dépendance SWC.)
const nextConfig: NextConfig = {
  reactCompiler: true,
  // En-têtes de sécurité : pas d'affichage du site dans une iframe d'un autre site (clickjacking),
  // pas de devinette du type des fichiers, et des permissions sensibles désactivées.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
};

export default nextConfig;
