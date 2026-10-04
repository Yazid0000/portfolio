import ThemeToggle from "@/components/ThemeToggle";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <p className="text-sm uppercase tracking-widest opacity-60">Développeur web freelance</p>
      <h1 className="text-6xl md:text-8xl font-bold">Yazid</h1>
      <p className="text-xl max-w-xl opacity-80">
        Je conçois et développe des sites et applications web sur mesure, livrés en quelques jours.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="#projets"
          className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black"
        >
          Voir mes projets
        </a>
        <a href="#contact" className="px-6 py-3 rounded-full border border-current">
          Me contacter
        </a>
      </div>
    </section>
  );
}