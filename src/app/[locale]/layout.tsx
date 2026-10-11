import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteUrl, cheminLangue } from "@/i18n/site";
import "../globals.css";
import Curseur from "@/components/Curseur";
import Providers from "@/components/Providers";
import ScriptTheme from "@/components/ScriptTheme";
import Terminal from "@/components/Terminal";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Couleur de la barre du navigateur mobile, selon le thème du système.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: cheminLangue(locale),
      languages: {
        fr: cheminLangue("fr"),
        en: cheminLangue("en"),
        "x-default": cheminLangue("fr"),
      },
    },
    openGraph: {
      type: "website",
      url: cheminLangue(locale),
      siteName: "Yazid",
      title: t("title"),
      description: t("description"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const n = await getTranslations({ locale, namespace: "Navigation" });

  return (
    // Les variables de police sont sur <html> : Tailwind y applique la police par défaut (Geist).
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ScriptTheme />
      </head>
      <body className="antialiased">
        {/* Lien d'évitement : premier arrêt du clavier, visible seulement au focus */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-5 focus:py-3 focus:rounded-full focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black"
        >
          {n("evitement")}
        </a>
        <NextIntlClientProvider>
          <Providers>
            <Curseur />
            <Terminal />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
