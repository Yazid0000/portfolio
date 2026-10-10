"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";

type Projet = {
  titre: string;
  type: "ecommerce" | "app" | "vitrine" | "landing" | "creatif";
  stack: string;
  couleur: string;
  lien: string;
  // Facultatifs : lien vers le code source (seulement si le repo est public) et capture affichée au survol
  code?: string;
  image?: string;
};

const projets: Projet[] = [
  { titre: "Entre Tables", type: "ecommerce", stack: "PHP · MySQL", couleur: "#c8553d", lien: "#" },
  { titre: "ReservSys", type: "app", stack: "PHP · MySQL", couleur: "#2a9d8f", lien: "#" },
  {
    titre: "Riad Dar Selma",
    type: "vitrine",
    stack: "Next.js · Tailwind",
    couleur: "#2440a8",
    lien: "https://riad-dar-selma.vercel.app/",
    code: "https://github.com/Yazid0000/riad-dar-selma",
    image: "/projets/riad-dar-selma.jpg",
  },
  {
    titre: "Soldé",
    type: "landing",
    stack: "Next.js · Motion",
    couleur: "#0b7a4b",
    lien: "https://sold-five.vercel.app/",
    code: "https://github.com/Yazid0000/Sold-",
    image: "/projets/solde.jpg",
  },
  { titre: "Dashboard", type: "app", stack: "Next.js · TypeScript", couleur: "#ff4fd8", lien: "#" },
  {
    titre: "cePortfolio",
    type: "creatif",
    stack: "Next.js · Canvas",
    couleur: "#111111",
    lien: "https://github.com/Yazid0000/portfolio",
    image: "/projets/portfolio.jpg",
  },
];

export default function Projets() {
  const t = useTranslations("Projets");
  const nom = (titre: string) => (titre === "cePortfolio" ? t("cePortfolio") : titre);
  const [actif, setActif] = useState<number | null>(null);
  // Vrai quand la souris est sur un lien « Voir le code » : l'aperçu devient transparent pour ne pas le cacher
  const [surCode, setSurCode] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xLent = useSpring(x, { stiffness: 200, damping: 25 });
  const yLent = useSpring(y, { stiffness: 200, damping: 25 });

  return (
    <section
      id="projets"
      className="relative min-h-screen px-6 py-24 max-w-6xl mx-auto"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <h2 className="font-display text-sm uppercase tracking-widest opacity-60 mb-8">
        {t("titre")}
      </h2>

      <ul onMouseLeave={() => setActif(null)}>
        {projets.map((p, i) => (
          <li
            key={p.titre}
            onMouseEnter={() => setActif(i)}
            className={`border-t border-current/20 last:border-b flex flex-col md:flex-row md:items-center justify-between gap-2 py-6 md:py-8 transition-opacity ${
              actif !== null && actif !== i ? "opacity-30" : ""
            }`}
          >
            <a
              href={p.lien}
              {...(p.lien.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-baseline gap-4"
            >
              <span className="text-sm opacity-50">0{i + 1}</span>
              {/* Fonte variable : le titre survolé reste épais, les autres s'affinent */}
              <span
                className={`font-display text-4xl md:text-7xl tracking-tight transition-[translate,font-weight] duration-300 motion-reduce:transition-none group-hover:translate-x-4 ${
                  actif !== null && actif !== i ? "font-normal" : "font-extrabold"
                }`}
              >
                {nom(p.titre)}
              </span>
            </a>
            <span className="text-sm md:text-right opacity-70">
              {t(`types.${p.type}`)}
              <br />
              {p.stack}
              {p.code && (
                <>
                  <br />
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setSurCode(true)}
                    onMouseLeave={() => setSurCode(false)}
                    className="underline underline-offset-4 hover:opacity-100"
                  >
                    {t("code")} ↗
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {actif !== null && (
          <motion.div
            key="apercu"
            className="hidden pointer-fine:flex pointer-events-none fixed top-0 left-0 z-40 w-96 aspect-[2/1] rounded-2xl overflow-hidden items-center justify-center font-display font-bold text-white text-xl"
            style={{
              x: xLent,
              y: yLent,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: surCode ? 0.15 : 1, backgroundColor: projets[actif].couleur }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {projets[actif].image ? (
              <Image
                src={projets[actif].image}
                alt=""
                fill
                sizes="384px"
                className="object-cover object-left-top"
              />
            ) : (
              t(`types.${projets[actif].type}`)
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}