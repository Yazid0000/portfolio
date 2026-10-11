import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/ThemeToggle";
import LangueToggle from "@/components/LangueToggle";
import Particules from "@/components/Particules";
import { plein, contour } from "@/components/boutons";

// Sections de la navigation : [ancre, clé de traduction]
export const liens = [
  ["services", "services"],
  ["projets", "realisations"],
  ["methode", "methode"],
  ["contact", "contact"],
] as const;

export default function Hero() {
  const t = useTranslations("Hero");
  const n = useTranslations("Navigation");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center overflow-hidden touch-pan-y"
    >
      <div className="absolute inset-0">
        <Particules />
      </div>

      <header className="absolute top-6 inset-x-6 z-20 flex items-center gap-6">
        {/* Sur mobile, la navigation est dans le pied de page : ici, la place va aux réglages. */}
        <nav aria-label={n("menu")} className="hidden md:flex gap-6 text-sm">
          {liens.map(([id, cle]) => (
            <a key={id} href={`#${id}`} className="py-2 opacity-70 hover:opacity-100 transition-opacity">
              {n(cle)}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex gap-2">
          <LangueToggle />
          <ThemeToggle />
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-sm uppercase tracking-widest opacity-60">{t("role")}</p>
        {/* Le vrai titre reste dans le HTML (SEO, lecteurs d'écran). Il est transparent :
            ce sont les particules qui le dessinent. En mouvement réduit, il s'affiche normalement. */}
        <h1 className="font-display font-extrabold text-[17vw] md:text-[16vw] leading-none tracking-tight motion-safe:text-transparent">
          YAZID
        </h1>
        <p className="text-xl max-w-xl opacity-80">{t("accroche")}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projets"
            className={`${plein} px-6 py-3`}
          >
            {t("voirProjets")}
          </a>
          <a href="#contact" className={`${contour} px-6 py-3`}>
            {t("contact")}
          </a>
        </div>
      </div>
    </section>
  );
}
