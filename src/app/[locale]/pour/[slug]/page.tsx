import { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { candidatures, ordreFullStack, trouverCandidature } from "@/data/candidatures";
import { cheminLangue } from "@/i18n/site";
import { Apparition, Element } from "@/components/Apparition";
import Reveal from "@/components/Reveal";
import Projets from "@/components/Projets";
import FormulaireContact from "@/components/FormulaireContact";
import LangueToggle from "@/components/LangueToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { EMAIL, WHATSAPP } from "@/components/Contact";
import { profils } from "@/components/PiedDePage";
import { plein, contour } from "@/components/boutons";

type Params = { locale: string; slug: string };
type Apport = { titre: string; description: string; points: string[] };

// Seules les candidatures de la liste existent : tout autre lien donne une page 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return candidatures.map((c) => ({ slug: c.slug }));
}

const chemin = (locale: string, slug: string) => `${locale === "fr" ? "" : `/${locale}`}/pour/${slug}`;

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const candidature = trouverCandidature(slug);
  if (!candidature) return {};
  const t = await getTranslations({ locale, namespace: "Candidature" });
  const title = t("metaTitre", { entreprise: candidature.entreprise });
  // Définir openGraph ici remplace celui du layout : on reprend son image pour garder un aperçu de lien complet.
  const { openGraph, twitter } = await parent;

  return {
    title,
    description: t("accroche"),
    // Page privée : elle ne doit pas apparaître dans les moteurs de recherche.
    robots: { index: false, follow: false },
    alternates: {
      canonical: chemin(locale, slug),
      languages: { fr: chemin("fr", slug), en: chemin("en", slug) },
    },
    openGraph: {
      type: "website",
      url: chemin(locale, slug),
      siteName: "Yazid",
      title,
      description: t("accroche"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: openGraph?.images,
    },
    twitter: { card: "summary_large_image", title, description: t("accroche"), images: twitter?.images },
  };
}

export default function PageCandidature({ params }: { params: Promise<Params> }) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);
  const candidature = trouverCandidature(slug);
  if (!candidature) notFound();

  const t = useTranslations("Candidature");
  const langue = locale === "en" ? "en" : "fr";
  const { entreprise } = candidature;
  const poste = candidature.poste?.[langue];
  const mot = candidature.mot?.[langue];
  const apports = t.raw("apports") as Apport[];
  const [, linkedin] = profils.find(([nom]) => nom === "LinkedIn")!;
  const lien = "py-3 opacity-70 hover:opacity-100 transition-opacity";

  return (
    <>
      <main id="contenu" tabIndex={-1} className="bg-white text-black dark:bg-black dark:text-white transition-colors outline-none">
        <section id="hero" className="relative px-6 pt-28 pb-24 md:min-h-screen flex items-center">
          <header className="absolute top-6 inset-x-6 flex items-center gap-6">
            <Link href={cheminLangue(locale)} className="py-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t("retour")}
            </Link>
            <div className="ml-auto flex gap-2">
              <LangueToggle chemin={`/pour/${slug}`} />
              <ThemeToggle />
            </div>
          </header>

          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
            <Image
              src="/yazid.jpg"
              alt={t("photo")}
              width={640}
              height={640}
              preload
              sizes="(min-width: 768px) 320px, 160px"
              className="w-40 md:w-80 aspect-square object-cover rounded-xl border border-current/15"
            />

            <div className="min-w-0 flex flex-col items-start gap-5">
              <p className="text-sm uppercase tracking-widest opacity-60">
                {t("surtitre", { entreprise })}
                {poste && ` · ${poste}`}
              </p>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight">
                Yazid Bennouna
              </h1>
              <p className="text-2xl font-semibold">{t("role")}</p>
              <p className="text-xl max-w-xl opacity-80">{t("accroche")}</p>
              {mot && <p className="text-lg max-w-xl opacity-80">{mot}</p>}

              <div className="flex flex-wrap gap-4 mt-2">
                <a href="#contact" className={`${plein} px-6 py-3`}>
                  {t("contacter")}
                </a>
                <a href="#projets" className={`${contour} px-6 py-3`}>
                  {t("voirProjets")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Apparition decalage={0.15}>
          <section id="services" className="px-6 py-24 max-w-6xl mx-auto">
            <Element as="h2" className="text-4xl md:text-5xl font-bold mb-12">{t("apportsTitre")}</Element>
            <ul>
              {apports.map((a) => (
                <Element as="li" key={a.titre} className="grid md:grid-cols-[1fr_2fr] gap-2 md:gap-6 py-8 border-t border-current/20">
                  <h3 className="text-2xl font-semibold">{a.titre}</h3>
                  <div>
                    <p className="text-lg mb-2">{a.description}</p>
                    <p className="opacity-70">{a.points.join(" · ")}</p>
                  </div>
                </Element>
              ))}
            </ul>
          </section>
        </Apparition>

        <Projets ordre={candidature.projets ?? ordreFullStack} />

        <Reveal>
          <section id="contact" className="px-6 py-24 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">{t("contactTitre")}</h2>
            <p className="text-xl opacity-70 mb-10">{t("contactSousTitre")}</p>

            {/* Email d'abord : c'est le canal habituel d'un recruteur. L'objet est déjà rempli. */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`${EMAIL}?subject=${encodeURIComponent(t("objet", { entreprise }))}`}
                className={`${plein} px-6 py-3`}
              >
                {t("email")}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${contour} px-6 py-3`}>
                {t("whatsapp")}
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className={`${contour} px-6 py-3`}>
                LinkedIn
              </a>
            </div>

            <p className="text-sm opacity-60 mt-14 mb-8">{t("ou")}</p>

            <FormulaireContact origine={slug} />
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-current/20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
          <p className="opacity-70">© {new Date().getFullYear()} Yazid Bennouna</p>
          <nav aria-label={t("plan")} className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href={cheminLangue(locale)} className={lien}>
              {t("retour")}
            </Link>
            {profils.map(([nom, url]) => (
              <a key={nom} href={url} target="_blank" rel="noopener noreferrer" className={lien}>
                {nom}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
