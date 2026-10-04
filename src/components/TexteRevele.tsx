"use client";

import { motion } from "motion/react";

export default function TexteRevele({ texte }: { texte: string }) {
  return (
    <span aria-label={texte} className="inline-flex">
      {texte.split("").map((lettre, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {lettre === " " ? "\u00A0" : lettre}
          </motion.span>
        </span>
      ))}
    </span>
  );
}