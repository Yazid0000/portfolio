"use client";

import { useTranslations } from "next-intl";

// Animation commune : le libellé glisse et l'icône tourne. "visibility" fait partie de la transition
// pour que le libellé sortant reste visible pendant qu'il s'anime, puis soit caché aux lecteurs d'écran.
const anim =
  "col-start-1 row-start-1 flex items-center justify-center gap-2 transition-[translate,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
const icone = "w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export default function ThemeToggle() {
  const t = useTranslations("Theme");

  const basculer = () => {
    const sombre = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", sombre ? "dark" : "light");
  };

  // Les deux libellés sont dans le HTML. Le CSS affiche le bon selon la classe "dark",
  // dès le premier affichage, sans attendre React.
  return (
    <button
      onClick={basculer}
      className="grid overflow-hidden px-4 py-2 rounded-full border border-current text-sm"
    >
      {/* Mode clair : propose de passer en sombre (lune) */}
      <span className={`${anim} dark:-translate-y-full dark:opacity-0 dark:invisible`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${icone} dark:-rotate-90`}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
        {t("sombre")}
      </span>

      {/* Mode sombre : propose de passer en clair (soleil) */}
      <span className={`${anim} translate-y-full opacity-0 invisible dark:translate-y-0 dark:opacity-100 dark:visible`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`${icone} rotate-90 dark:rotate-0`}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        {t("clair")}
      </span>
    </button>
  );
}
