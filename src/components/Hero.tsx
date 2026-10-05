import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/ThemeToggle";
import LangueToggle from "@/components/LangueToggle";
import Scene3D from "@/components/Scene3D";
import TexteRevele from "@/components/TexteRevele";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <LangueToggle />
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-sm uppercase tracking-widest opacity-60">{t("role")}</p>
        <h1 className="font-display font-extrabold text-[22vw] md:text-[16vw] leading-none tracking-tight text-black dark:text-white">
          <TexteRevele texte="YAZID" />
        </h1>
        <p className="text-xl max-w-xl opacity-80">{t("accroche")}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projets"
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            {t("voirProjets")}
          </a>
          <a href="#contact" className="px-6 py-3 rounded-full border border-current">
            {t("contact")}
          </a>
        </div>
      </div>
    </section>
  );
}
