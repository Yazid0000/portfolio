import { useTranslations } from "next-intl";
import { Apparition, Element } from "@/components/Apparition";

type Service = { titre: string; description: string; points: string[] };

export default function Services() {
  const t = useTranslations("Services");
  const services = t.raw("liste") as Service[];

  return (
    <Apparition decalage={0.15}>
      <section id="services" className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
        <Element as="h2" className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</Element>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Element key={s.titre} className="p-6 rounded-2xl border border-current/20">
              <h3 className="text-2xl font-semibold mb-3">{s.titre}</h3>
              <p className="opacity-70 mb-4">{s.description}</p>
              <ul className="space-y-1">
                {s.points.map((p) => (
                  <li key={p}>→ {p}</li>
                ))}
              </ul>
            </Element>
          ))}
        </div>
      </section>
    </Apparition>
  );
}
