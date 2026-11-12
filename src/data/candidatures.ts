import type { Projet } from "@/data/projets";

// Une page par entreprise où je postule : /pour/<slug> (et /en/pour/<slug> en anglais).
// Le lien va dans le CV envoyé à cette entreprise. Ces pages ne sont ni dans le plan du site
// ni indexées par Google : seul celui qui a le lien les voit.
//
// Pour ajouter une candidature : une entrée ici, rien d'autre.
// - slug : ce qui suit /pour/ dans le lien. Ajouter quelques caractères au nom (ex. "acme-k7")
//   évite que quelqu'un devine la page en tapant le nom de l'entreprise.
// - poste : l'intitulé de l'offre (facultatif).
// - mot : un paragraphe écrit pour cette entreprise (facultatif) : pourquoi elle, pourquoi ce poste.
// - projets : l'ordre des réalisations, la plus parlante pour cette entreprise en premier (facultatif).
type Texte = { fr: string; en: string };

export type Candidature = {
  slug: string;
  entreprise: string;
  poste?: Texte;
  mot?: Texte;
  projets?: Projet["cle"][];
};

// Ordre par défaut pour un poste full-stack : l'application avec base de données et comptes d'abord.
export const ordreFullStack: Projet["cle"][] = ["nourargan", "homelab", "portfolio", "riad", "solde"];

export const candidatures: Candidature[] = [
  // Stage en développement PHP à Tanger (offre Quintel Job, à pourvoir avant le 01/01/2027).
  {
    slug: "logidesk-7tq",
    entreprise: "Logidesk Maroc",
    poste: { fr: "Stage en développement PHP", en: "PHP development internship" },
    mot: {
      fr: "Votre plateforme de rendez-vous et votre outil de gestion des salaires reposent sur PHP et MySQL, que je pratique. Nour Argan, ci-dessous, est un outil du même genre : un back-office avec des comptes, des rôles et des données métier à tenir à jour. Et mon serveur maison tourne sous Linux.",
      en: "Your appointment platform and your payroll tool are built on PHP and MySQL, which I work with. Nour Argan, below, is a tool of the same kind: a back office with accounts, roles and business data to keep up to date. And my home server runs on Linux.",
    },
  },
];

export const trouverCandidature = (slug: string) => candidatures.find((c) => c.slug === slug);
