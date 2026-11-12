// Liste des projets de la section Réalisations (le premier est mis en avant, en grand).
// Seulement les projets terminés, chacun avec sa capture (format 2:1, dans public/projets/).
// Pour ajouter un projet : une ligne ici, et sa description dans messages/fr.json et en.json (Projets.descriptions).
// La grille gagne une carte toute seule.
export type Projet = {
  cle: "riad" | "solde" | "nourargan" | "kopilot" | "homelab" | "portfolio"; // clé de la description dans messages (Projets.descriptions)
  titre: string;
  type: "ecommerce" | "app" | "vitrine" | "landing" | "creatif" | "infra";
  stack: string;
  lien?: string; // site en ligne ; absent pour un projet sans site (le bouton « Voir le code » passe alors en premier)
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
    cle: "nourargan",
    titre: "Nour Argan",
    demo: true,
    type: "app",
    stack: "Next.js · Postgres · Better Auth",
    lien: "https://nour-argan-back-office.vercel.app/",
    image: "/projets/nour-argan.jpg",
  },
  {
    cle: "kopilot",
    titre: "Kopilot",
    demo: true,
    type: "app",
    stack: "PHP · MySQL · PDO",
    code: "https://github.com/Yazid0000/syndic_app",
    image: "/projets/kopilot.jpg",
  },
  {
    cle: "homelab",
    titre: "Home Lab",
    type: "infra",
    stack: "Linux · Docker · Tailscale",
    code: "https://github.com/Yazid0000/homelab",
    image: "/projets/homelab.jpg",
  },
  {
    cle: "portfolio",
    titre: "cePortfolio",
    type: "creatif",
    stack: "Next.js · Canvas",
    lien: "https://yazid-bennouna.vercel.app/",
    code: "https://github.com/Yazid0000/portfolio",
    image: "/projets/portfolio-clair.jpg",
  },
];
