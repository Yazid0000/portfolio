import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Image affichée quand le lien est partagé (WhatsApp, LinkedIn, X...).
// Même monde que le site : encre et papier, le nom en Syne, aucun dégradé.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Yazid";

const syne = readFile(join(process.cwd(), "assets/Syne-ExtraBold.ttf"));
const geist = readFile(join(process.cwd(), "assets/Geist-Regular.ttf"));

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
          background: "#000000",
          fontFamily: "Geist",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", opacity: 0.6 }}>{t("role")}</div>
        <div style={{ fontFamily: "Syne", fontSize: 200, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>YAZID</div>
        <div style={{ fontSize: 34, lineHeight: 1.35, maxWidth: 860, opacity: 0.8 }}>{t("accroche")}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: await geist, weight: 400, style: "normal" },
        { name: "Syne", data: await syne, weight: 800, style: "normal" },
      ],
    }
  );
}
