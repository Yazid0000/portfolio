import ThemeToggle from "@/components/ThemeToggle";
import Scene3D from "@/components/Scene3D";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-sm uppercase tracking-widest opacity-60">Développeur web freelance</p>
        <h1 className="text-6xl md:text-8xl font-bold mix-blend-difference text-white">Yazid</h1>
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
      </div>
    </section>
  );
}