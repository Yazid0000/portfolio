import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Image affichée quand le lien est partagé (WhatsApp, LinkedIn, X...).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Yazid";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 75% 40%, #6d5dfc 0%, #ff4fd8 25%, #000000 60%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", opacity: 0.7 }}>
          {t("role")}
        </div>
        <div style={{ fontSize: 220, fontWeight: 800, letterSpacing: -8, lineHeight: 1 }}>YAZID</div>
        <div style={{ fontSize: 34, maxWidth: 900, opacity: 0.85 }}>{t("accroche")}</div>
      </div>
    ),
    size
  );
}
