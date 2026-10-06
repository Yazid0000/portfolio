"use client";

import { motion, type Variants } from "motion/react";

const sens = {
  haut: { cache: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } },
  gauche: { cache: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } },
  zoom: { cache: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } },
} satisfies Record<string, Variants>;

const balises = { div: motion.div, li: motion.li, span: motion.span, h2: motion.h2, h3: motion.h3 };

// Conteneur : déclenche ses éléments un par un quand il arrive à l'écran.
export function Apparition({
  children,
  className,
  decalage = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  decalage?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: decalage }}
    >
      {children}
    </motion.div>
  );
}

// Élément animé à l'intérieur d'une Apparition, dans le sens choisi.
export function Element({
  children,
  className,
  sens: s = "haut",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  sens?: keyof typeof sens;
  as?: keyof typeof balises;
}) {
  const Balise = balises[as];
  return (
    <Balise className={className} variants={sens[s]}>
      {children}
    </Balise>
  );
}
