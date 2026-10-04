"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

const projets = [
  { titre: "Entre Tables", type: "E-commerce", stack: "PHP · MySQL", couleur: "#c8553d", lien: "#" },
  { titre: "ReservSys", type: "Application web", stack: "PHP · MySQL", couleur: "#2a9d8f", lien: "#" },
  { titre: "Riad", type: "Site vitrine", stack: "Next.js · Tailwind", couleur: "#e9c46a", lien: "#" },
  { titre: "Landing SaaS", type: "Landing page", stack: "Next.js · Tailwind", couleur: "#6d5dfc", lien: "#" },
  { titre: "Dashboard", type: "Application web", stack: "Next.js · TypeScript", couleur: "#ff4fd8", lien: "#" },
  { titre: "Ce portfolio", type: "Site créatif", stack: "Next.js · Three.js", couleur: "#111111", lien: "https://github.com/Yazid0000/portfolio" },
];

export default function Projets() {
  const [actif, setActif] = useState<number | null>(null);
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
        Projets sélectionnés
      </h2>

      <ul onMouseLeave={() => setActif(null)}>
        {projets.map((p, i) => (
          <li key={p.titre} className="border-t border-current/20 last:border-b">
            <a
              href={p.lien}
              onMouseEnter={() => setActif(i)}
              className={`group flex flex-col md:flex-row md:items-center justify-between gap-2 py-6 md:py-8 transition-opacity ${
                actif !== null && actif !== i ? "opacity-30" : ""
              }`}
            >
              <span className="flex items-baseline gap-4">
                <span className="text-sm opacity-50">0{i + 1}</span>
                <span className="font-display font-extrabold text-4xl md:text-7xl tracking-tight transition-transform duration-300 group-hover:translate-x-4">
                  {p.titre}
                </span>
              </span>
              <span className="text-sm md:text-right opacity-70">
                {p.type}
                <br />
                {p.stack}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {actif !== null && (
          <motion.div
            key="apercu"
            className="hidden pointer-fine:flex pointer-events-none fixed top-0 left-0 z-40 w-72 h-48 rounded-2xl items-center justify-center font-display font-bold text-white text-xl"
            style={{
              x: xLent,
              y: yLent,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, backgroundColor: projets[actif].couleur }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {projets[actif].type}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}