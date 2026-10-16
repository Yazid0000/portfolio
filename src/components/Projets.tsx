"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import { projets } from "@/data/projets";
import { plein, contour } from "@/components/boutons";
import { Fleche, Sortie } from "@/components/Icones";

const n = projets.length;
const PAS = 360 / n; // angle entre deux faces du prisme
// Distance du centre du prisme à une face, en largeurs de face : apothème d'un polygone à n côtés.
// Arrondie : Math.tan peut différer à la 16e décimale entre Node et le navigateur, et le style
// rendu côté serveur ne correspondrait plus à celui du client (erreur d'hydratation).
const APOTHEME = n > 2 ? Math.round((0.5 / Math.tan(Math.PI / n)) * 1e4) / 1e4 : 0;
// Rotation avec un léger rebond à l'arrivée.
const RESSORT = { type: "spring", stiffness: 110, damping: 14 } as const;

const modulo = (a: number, b: number) => ((a % b) + b) % b;
const deux = (i: number) => String(i + 1).padStart(2, "0");

// Une face du prisme : la capture du projet. Elle s'assombrit quand elle tourne le dos à l'écran.
function Face({ i, rotation, titre }: { i: number; rotation: MotionValue<number>; titre: string }) {
  const ombre = useTransform(rotation, (r) => ((1 - Math.cos(((i * PAS + r) * Math.PI) / 180)) / 2) * 0.7);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-xl border border-current/15 bg-current/5 backface-hidden"
      style={{ transform: `rotateY(${i * PAS}deg) translateZ(calc(var(--w) * ${APOTHEME}))` }}
    >
      <Image
        src={projets[i].image}
        alt={titre}
        fill
        sizes="(min-width: 768px) 640px, 90vw"
        draggable={false}
        className="object-cover object-top-left select-none"
      />
      <motion.div aria-hidden className="absolute inset-0 bg-black" style={{ opacity: ombre }} />
    </div>
  );
}

// Texte qui change en glissant dans une fenêtre (défilement façon compteur), dans le sens de la rotation.
function Defile({ cle, sens, className, children }: { cle: number; sens: number; className?: string; children: React.ReactNode }) {
  return (
    <span className={`relative inline-grid overflow-hidden ${className ?? ""}`}>
      <AnimatePresence initial={false} custom={sens}>
        <motion.span
          key={cle}
          custom={sens}
          variants={{
            entre: (s: number) => ({ y: s > 0 ? "100%" : "-100%" }),
            la: { y: 0 },
            sort: (s: number) => ({ y: s > 0 ? "-100%" : "100%" }),
          }}
          initial="entre"
          animate="la"
          exit="sort"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Réalisations : les captures forment les faces d'un prisme qui pivote pour révéler le projet suivant.
// Commandes : boutons, flèches du clavier, glisser (souris ou doigt). Une face de plus par nouveau projet.
export default function Projets() {
  const t = useTranslations("Projets");
  const nom = (titre: string) => (titre === "cePortfolio" ? t("cePortfolio") : titre);

  // Position « déroulée » (pas de modulo) : de la dernière à la première face, le prisme continue dans le même sens.
  const [pos, setPos] = useState(0);
  const [sens, setSens] = useState(1);
  const rotation = useMotionValue(0);
  // Glisser en cours : un seul pointeur à la fois (un deuxième doigt est ignoré).
  const glisse = useRef<{ id: number; x: number; depart: number } | null>(null);

  const actif = modulo(pos, n);
  const p = projets[actif];

  const aller = (cible: number) => {
    setSens(cible >= pos ? 1 : -1);
    setPos(cible);
    animate(rotation, -cible * PAS, RESSORT);
  };

  const appuyer = (e: React.PointerEvent) => {
    if (glisse.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    rotation.stop();
    glisse.current = { id: e.pointerId, x: e.clientX, depart: rotation.get() };
  };
  const bouger = (e: React.PointerEvent) => {
    if (glisse.current?.id !== e.pointerId) return;
    rotation.set(glisse.current.depart + (e.clientX - glisse.current.x) * 0.4);
  };
  // Fin du glisser (relâché, annulé par le navigateur, capture perdue) : le prisme se cale sur la face la plus proche.
  const lacher = (e: React.PointerEvent) => {
    if (glisse.current?.id !== e.pointerId) return;
    const dx = e.clientX - glisse.current.x;
    glisse.current = null;
    let cible = Math.round(-rotation.get() / PAS);
    // Un petit coup sec suffit pour changer de projet, même sans dépasser la moitié de la rotation.
    if (cible === pos && Math.abs(dx) > 30) cible = pos - Math.sign(dx);
    aller(cible);
  };

  // La fenêtre perd le focus en plein glisser (changement d'onglet, alerte…) : on recale aussi.
  const recaler = useEffectEvent(() => {
    if (!glisse.current) return;
    glisse.current = null;
    aller(Math.round(-rotation.get() / PAS));
  });
  useEffect(() => {
    const surBlur = () => recaler();
    addEventListener("blur", surBlur);
    return () => removeEventListener("blur", surBlur);
  }, []);

  return (
    <section
      id="projets"
      aria-roledescription="carrousel"
      aria-label={t("titre")}
      className="min-h-screen px-6 py-24 max-w-6xl mx-auto flex flex-col justify-center"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") aller(pos + 1);
        if (e.key === "ArrowLeft") aller(pos - 1);
      }}
    >
      <h2 className="text-sm uppercase tracking-widest opacity-60 mb-12">{t("titre")}</h2>

      {/* Sur mobile, les flèches suivent directement le prisme : on change de projet sans le perdre de vue.
          Sur ordinateur, elles reviennent sous le texte, dans la colonne de droite. */}
      <div className="grid gap-y-6 md:grid-cols-[3fr_2fr] md:gap-x-16 md:gap-y-9">
        {/* La scène : la largeur d'une face (--w) sert aussi à placer les faces en profondeur.
            Elle découpe ce qui dépasse : au repos, seul le projet actif est visible (les faces voisines,
            inclinées et assombries, paraissaient floues et débordaient sur le texte) ; en tournant, les faces
            défilent dans le cadre. */}
        <div
          className="@container overflow-hidden rounded-xl cursor-grab active:cursor-grabbing touch-pan-y md:row-span-2 md:self-center"
          onPointerDown={appuyer}
          onPointerMove={bouger}
          onPointerUp={lacher}
          onPointerCancel={lacher}
          onLostPointerCapture={lacher}
        >
          <div className="relative aspect-2/1 perspective-[1800px] [--w:100cqw]">
            <div className="absolute inset-0 transform-3d" style={{ transform: `translateZ(calc(var(--w) * ${-APOTHEME}))` }}>
              <motion.div className="absolute inset-0 transform-3d" style={{ rotateY: rotation }}>
                {projets.map((projet, i) => (
                  <Face key={projet.titre} i={i} rotation={rotation} titre={nom(projet.titre)} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:col-start-2 md:row-start-2 md:self-start">
          <button
            type="button"
            onClick={() => aller(pos - 1)}
            aria-label={t("precedent")}
            className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-current/30 hover:border-current transition-colors"
          >
            <Fleche sens="gauche" />
          </button>
          <button
            type="button"
            onClick={() => aller(pos + 1)}
            aria-label={t("suivant")}
            className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-current/30 hover:border-current transition-colors"
          >
            <Fleche sens="droite" />
          </button>
          <span className="text-xs opacity-60 ml-2">{t("aide")}</span>
        </div>

        <div className="flex flex-col gap-5 md:col-start-2 md:row-start-1 md:self-end" aria-live="polite">
          <p className="font-mono text-sm tabular-nums opacity-60">
            <Defile cle={actif} sens={sens}>{deux(actif)}</Defile> / {deux(n - 1)}
          </p>
          <h3 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight leading-none md:min-h-[2.2em]">
            <Defile cle={actif} sens={sens} className="py-1">{nom(p.titre)}</Defile>
          </h3>
          {/* Ce qu'est le projet, en une phrase ; puis le détail technique, plus discret */}
          <p className="opacity-80 md:min-h-[4.5em] max-w-[42ch]">
            <Defile cle={actif} sens={sens}>{t(`descriptions.${p.cle}`)}</Defile>
          </p>
          <p className="text-sm opacity-70 -mt-2">
            <Defile cle={actif} sens={sens}>
              {p.demo && `${t("demo")} · `}
              {t(`types.${p.type}`)} · {p.stack}
            </Defile>
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {p.lien && (
              <a
                href={p.lien}
                target="_blank"
                rel="noopener noreferrer"
                className={`${plein} px-5 py-3`}
              >
                {t("site")} <Sortie />
              </a>
            )}
            {/* Sans site en ligne, le code devient le bouton principal */}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className={`${p.lien ? contour : plein} px-5 py-3`}>
                {t("code")} <Sortie />
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
