// Liste des projets affichés dans le prisme de la section Réalisations.
// Seulement les projets terminés, chacun avec sa capture (format 2:1, dans public/projets/).
// Pour ajouter un projet : une ligne ici, et sa description dans messages/fr.json et en.json (Projets.descriptions).
// Le prisme gagne une face tout seul.
export type Projet = {
  cle: "riad" | "solde" | "portfolio"; // clé de la description dans messages (Projets.descriptions)
  titre: string;
  type: "ecommerce" | "app" | "vitrine" | "landing" | "creatif";
  stack: string;
  lien: string;
  image: string;
  code?: string; // lien vers le code source, seulement si le repo est public
  demo?: true; // projet de démonstration (pas de client réel) : affiché honnêtement comme tel
};

export const projets: Projet[] = [
  {
    cle: "riad",
    titre: "Riad Dar Selma",
    demo: true,
    type: "vitrine",
    stack: "Next.js · Tailwind",
    lien: "https://riad-dar-selma.vercel.app/",
    code: "https://github.com/Yazid0000/riad-dar-selma",
    image: "/projets/riad-dar-selma.jpg",
  },
  {
    cle: "solde",
    titre: "Soldé",
    demo: true,
    type: "landing",
    stack: "Next.js · Motion",
    lien: "https://sold-five.vercel.app/",
    code: "https://github.com/Yazid0000/Sold-",
    image: "/projets/solde.jpg",
  },
  {
    cle: "portfolio",
    titre: "cePortfolio",
    type: "creatif",
    stack: "Next.js · Canvas",
    lien: "https://yazid-bennouna.vercel.app/",
    code: "https://github.com/Yazid0000/portfolio",
    image: "/projets/portfolio.jpg",
  },
];
