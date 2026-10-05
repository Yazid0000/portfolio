import { useTranslations } from "next-intl";

type Etape = { titre: string; description: string };

export default function Methode() {
  const t = useTranslations("Methode");
  const etapes = t.raw("etapes") as Etape[];

  return (
    <section id="methode" className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</h2>

      <ol className="space-y-8">
        {etapes.map((e, i) => (
          <li key={e.titre} className="flex gap-6">
            <span className="text-4xl font-bold opacity-30">0{i + 1}</span>
            <div>
              <h3 className="text-2xl font-semibold">{e.titre}</h3>
              <p className="opacity-70">{e.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
