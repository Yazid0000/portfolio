"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Element } from "@/components/Apparition";

type Etape = { titre: string; description: string };

// Tracé : une ligne relie les étapes et se dessine au fil du défilement.
// Chaque numéro s'allume quand la ligne l'atteint. Mouvement réduit : ligne et numéros affichés d'emblée.
export default function EtapesMethode({ etapes }: { etapes: Etape[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduit = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <ol ref={ref} className="relative space-y-8">
      <span aria-hidden className="absolute left-7 top-5 bottom-5 w-px -translate-x-1/2 bg-current opacity-15" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduit ? 1 : scrollYProgress }}
        className="absolute left-7 top-5 bottom-5 w-px -translate-x-1/2 bg-current origin-top"
      />
      {etapes.map((e, i) => (
        <Element as="li" sens="gauche" key={e.titre} className="flex gap-6">
          <Numero n={i} seuil={i / etapes.length} progres={scrollYProgress} reduit={!!reduit} />
          <div>
            <h3 className="text-2xl font-semibold">{e.titre}</h3>
            <p className="opacity-70">{e.description}</p>
          </div>
        </Element>
      ))}
    </ol>
  );
}

function Numero({ n, seuil, progres, reduit }: { n: number; seuil: number; progres: MotionValue<number>; reduit: boolean }) {
  const opacite = useTransform(progres, [seuil, seuil + 0.05], [0.3, 1]);

  // Le fond masque la ligne derrière le numéro.
  return (
    <span className="relative w-14 shrink-0 text-center bg-white dark:bg-black transition-colors">
      <motion.span style={{ opacity: reduit ? 1 : opacite }} className="text-4xl font-bold">
        0{n + 1}
      </motion.span>
    </span>
  );
}
