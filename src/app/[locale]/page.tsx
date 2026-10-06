import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projets from "@/components/Projets";
import Methode from "@/components/Methode";
import Competences from "@/components/Competences";
import APropos from "@/components/APropos";
import Contact from "@/components/Contact";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white transition-colors">
      <Hero />
      <Services />
      <Reveal><Projets /></Reveal>
      <Methode />
      <Competences />
      <Reveal><APropos /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  );
}
