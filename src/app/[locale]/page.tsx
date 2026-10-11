import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projets from "@/components/Projets";
import Methode from "@/components/Methode";
import APropos from "@/components/APropos";
import Contact from "@/components/Contact";
import PiedDePage from "@/components/PiedDePage";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      {/* tabIndex -1 : le lien d'évitement peut y déplacer le focus clavier */}
      <main id="contenu" tabIndex={-1} className="bg-white text-black dark:bg-black dark:text-white transition-colors outline-none">
        <Hero />
        <Services />
        <Reveal><Projets /></Reveal>
        <Methode />
        <Reveal><APropos /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <PiedDePage />
    </>
  );
}
