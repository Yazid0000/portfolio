// Icônes dessinées dans le même trait que celles du bouton de thème (24 × 24, trait de 2, bouts arrondis).
const trait = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function Fleche({ sens, className = "w-5 h-5" }: { sens: "gauche" | "droite"; className?: string }) {
  return (
    <svg {...trait} className={`${className} ${sens === "gauche" ? "-scale-x-100" : ""}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Lien qui s'ouvre dans un nouvel onglet.
export function Sortie({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg {...trait} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
