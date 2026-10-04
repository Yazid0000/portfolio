import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center bg-white text-black dark:bg-black dark:text-white transition-colors">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <h1 className="text-6xl font-bold">Yazid</h1>
      <p className="text-xl max-w-xl">
        Développeur web : sites vitrine, e-commerce et applications web sur mesure.
      </p>

      <div className="flex gap-4">
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
    </main>
  );
}