"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Ligne = { type: "entree" | "sortie"; texte: string };

const accueil: Ligne[] = [
  { type: "sortie", texte: "Bienvenue dans le terminal de Yazid." },
  { type: "sortie", texte: "Tape 'help' pour voir les commandes." },
];

function allerA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Terminal() {
  const [ouvert, setOuvert] = useState(false);
  const [saisie, setSaisie] = useState("");
  const [lignes, setLignes] = useState<Ligne[]>(accueil);
  const inputRef = useRef<HTMLInputElement>(null);
  const basRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const touche = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "²") {
        e.preventDefault();
        setOuvert((o) => !o);
      }
      if (e.key === "Escape") setOuvert(false);
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, []);

  useEffect(() => {
    if (ouvert) inputRef.current?.focus();
  }, [ouvert]);

  useEffect(() => {
    basRef.current?.scrollIntoView();
  }, [lignes]);

  const executer = (commande: string) => {
    const cmd = commande.trim().toLowerCase();
    let reponse: string[] = [];

    switch (cmd) {
      case "help":
        reponse = [
          "about     → qui je suis",
          "projets   → voir mes projets",
          "services  → ce que je propose",
          "contact   → me contacter",
          "theme     → changer de thème",
          "clear     → vider le terminal",
          "exit      → fermer",
        ];
        break;
      case "about":
        reponse = ["Yazid, développeur web basé au Maroc.", "Sites vitrine, e-commerce, applications web."];
        break;
      case "projets":
      case "services":
      case "contact":
        reponse = [`→ Direction ${cmd}...`];
        setOuvert(false);
        allerA(cmd);
        break;
      case "theme": {
        const sombre = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", sombre ? "dark" : "light");
        reponse = [`Thème ${sombre ? "sombre" : "clair"} activé.`];
        break;
      }
      case "clear":
        setLignes([]);
        return;
      case "exit":
        setOuvert(false);
        return;
      case "":
        return;
      default:
        reponse = [`Commande inconnue : ${cmd}. Tape 'help'.`];
    }

    setLignes((l) => [
      ...l,
      { type: "entree", texte: commande },
      ...reponse.map((texte) => ({ type: "sortie" as const, texte })),
    ]);
  };

  return (
    <>
      <p className="hidden md:block fixed bottom-4 left-4 z-30 text-xs font-mono opacity-40">
        Appuie sur ² ou ` 
      </p>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-[520px] z-50 rounded-xl bg-neutral-950 text-green-400 font-mono text-sm shadow-2xl border border-white/10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-white/50 text-xs">yazid@portfolio</span>
            </div>

            <div className="h-72 overflow-y-auto p-4 space-y-1">
              {lignes.map((l, i) => (
                <p key={i} className={l.type === "entree" ? "text-white" : ""}>
                  {l.type === "entree" ? `$ ${l.texte}` : l.texte}
                </p>
              ))}

              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  executer(saisie);
                  setSaisie("");
                }}
              >
                <span className="text-white">$</span>
                <input
                  ref={inputRef}
                  value={saisie}
                  onChange={(e) => setSaisie(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white"
                  aria-label="Commande du terminal"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
              <div ref={basRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}