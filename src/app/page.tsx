import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projets from "@/components/Projets";
import Methode from "@/components/Methode";
import Competences from "@/components/Competences";
import APropos from "@/components/APropos";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white transition-colors">
      <Hero />
      <Reveal><Services /></Reveal>
      <Reveal><Projets /></Reveal>
      <Reveal><Methode /></Reveal>
      <Reveal><Competences /></Reveal>
      <Reveal><APropos /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  );
}