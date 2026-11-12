import Image from "next/image";
import { useTranslations } from "next-intl";
import { projets, type Projet } from "@/data/projets";
import { Apparition, Element } from "@/components/Apparition";
import { Sortie } from "@/components/Icones";

// Lien texte souligné, ouvert dans un nouvel onglet.
function Lien({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 underline decoration-current/30 underline-offset-4 hover:decoration-current transition-colors"
    >
      {children} <Sortie />
    </a>
  );
}

// Un projet : sa capture (qui mène au site, ou au code s'il n'y a pas de site), puis le texte dessous ou à côté.
function Carte({ projet, vedette = false }: { projet: Projet; vedette?: boolean }) {
  const t = useTranslations("Projets");
  const titre = projet.titre === "cePortfolio" ? t("cePortfolio") : projet.titre;
  const cible = projet.lien ?? projet.code;

  return (
    <Element
      as="li"
      className={`group grid gap-6 ${vedette ? "md:col-span-2 md:grid-cols-[3fr_2fr] md:gap-12 md:items-end" : "content-start"}`}
    >
      <a
        href={cible}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-2/1 overflow-hidden rounded-xl border border-current/15 bg-current/5"
      >
        <Image
          src={projet.image}
          alt=""
          fill
          sizes={vedette ? "(min-width: 768px) 660px, 90vw" : "(min-width: 768px) 540px, 90vw"}
          priority={vedette}
          className="object-cover object-top-left transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </a>

      <div className="flex flex-col gap-3">
        <p className="text-sm opacity-60">
          {t(`types.${projet.type}`)}
          {projet.demo && <span className="ml-2 rounded-full border border-current/30 px-2 py-0.5 text-xs">{t("demo")}</span>}
        </p>
        <h3 className={`font-display font-extrabold tracking-tight leading-tight ${vedette ? "text-4xl md:text-5xl" : "text-3xl"}`}>
          {titre}
        </h3>
        <p className="opacity-80 max-w-[48ch]">{t(`descriptions.${projet.cle}`)}</p>
        <p className="font-mono text-xs opacity-60">{projet.stack}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-1">
          {projet.lien && <Lien href={projet.lien}>{t("site")}</Lien>}
          {projet.code && <Lien href={projet.code}>{t("code")}</Lien>}
        </div>
      </div>
    </Element>
  );
}

// Réalisations : le premier projet de la liste en grand, les suivants en grille de deux colonnes.
// Sur mobile, tout passe en une colonne, dans l'ordre de la liste.
// `ordre` (facultatif) : les clés des projets à afficher, dans l'ordre voulu (pages de candidature).
export default function Projets({ ordre }: { ordre?: Projet["cle"][] }) {
  const t = useTranslations("Projets");
  const liste = ordre?.length ? ordre.flatMap((cle) => projets.filter((p) => p.cle === cle)) : projets;
  const [vedette, ...autres] = liste;

  return (
    <Apparition decalage={0.12}>
      <section id="projets" className="px-6 py-24 max-w-6xl mx-auto">
        <Element as="h2" className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</Element>

        <ul className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
          <Carte projet={vedette} vedette />
          {autres.map((p) => (
            <Carte key={p.cle} projet={p} />
          ))}
        </ul>
      </section>
    </Apparition>
  );
}
