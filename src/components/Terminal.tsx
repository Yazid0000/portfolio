"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

type Ligne = { type: "entree" | "sortie"; texte: string };

// Machine à écrire : la ligne se tape caractère par caractère, avec un curseur qui clignote.
function LigneTapee({ texte, onFin }: { texte: string; onFin: () => void }) {
  const reduit = useReducedMotion();
  const [n, setN] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  // Garde : onFin ne doit être appelé qu'une fois, même si l'effet est rejoué (mode strict en dev).
  const fini = useRef(false);
  const finir = useEffectEvent(() => {
    if (fini.current) return;
    fini.current = true;
    onFin();
  });

  useEffect(() => {
    if (reduit) {
      finir();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(i);
      ref.current?.scrollIntoView({ block: "nearest" });
      if (i >= texte.length) {
        clearInterval(id);
        finir();
      }
    }, 16);
    return () => clearInterval(id);
  }, [texte, reduit]);

  return (
    <p ref={ref}>
      {reduit ? texte : texte.slice(0, n)}
      <span aria-hidden className="animate-clignote">▋</span>
    </p>
  );
}

function allerA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Terminal() {
  const t = useTranslations("Terminal");
  const [ouvert, setOuvert] = useState(false);
  const [saisie, setSaisie] = useState("");
  const [lignes, setLignes] = useState<Ligne[]>(() => [
    { type: "sortie", texte: t("bienvenue") },
    { type: "sortie", texte: t("aide") },
  ]);
  // Nombre de lignes de sortie déjà tapées : elles s'affichent en entier, la suivante se tape, les autres attendent.
  const [finies, setFinies] = useState(0);
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
        reponse = t.raw("commandes") as string[];
        break;
      case "about":
        reponse = t.raw("about") as string[];
        break;
      case "projets":
      case "projects":
        reponse = [t("direction", { section: cmd })];
        setOuvert(false);
        allerA("projets");
        break;
      case "services":
      case "contact":
        reponse = [t("direction", { section: cmd })];
        setOuvert(false);
        allerA(cmd);
        break;
      case "theme": {
        const sombre = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", sombre ? "dark" : "light");
        reponse = [t("themeActive", { theme: sombre ? t("sombre") : t("clair") })];
        break;
      }
      case "clear":
        setLignes([]);
        setFinies(0);
        return;
      case "exit":
        setOuvert(false);
        return;
      case "":
        return;
      default:
        reponse = [t("inconnue", { cmd })];
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
        {t("astuce")}
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
              {(() => {
                let k = 0; // rang de la ligne parmi les sorties
                return lignes.map((l, i) => {
                  if (l.type === "entree") {
                    return k <= finies ? (
                      <p key={i} className="text-white">$ {l.texte}</p>
                    ) : null;
                  }
                  const rang = k++;
                  if (rang < finies) return <p key={i}>{l.texte}</p>;
                  if (rang === finies) {
                    return <LigneTapee key={i} texte={l.texte} onFin={() => setFinies((f) => f + 1)} />;
                  }
                  return null;
                });
              })()}

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
                  aria-label={t("label")}
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