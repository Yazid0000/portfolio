import { useTranslations } from "next-intl";
import { Apparition, Element } from "@/components/Apparition";

type Service = { titre: string; description: string; points: string[] };

export default function Services() {
  const t = useTranslations("Services");
  const services = t.raw("liste") as Service[];

  return (
    <Apparition decalage={0.15}>
      <section id="services" className="px-6 py-24 max-w-6xl mx-auto">
        <Element as="h2" className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</Element>

        {/* Une ligne par service : le titre à gauche, le détail à droite sur ordinateur. */}
        <ul>
          {services.map((s) => (
            <Element as="li" key={s.titre} className="grid md:grid-cols-[1fr_2fr] gap-2 md:gap-6 py-8 border-t border-current/20">
              <h3 className="text-2xl font-semibold">{s.titre}</h3>
              <div>
                <p className="text-lg mb-2">{s.description}</p>
                <p className="opacity-70">{s.points.join(" · ")}</p>
              </div>
            </Element>
          ))}
        </ul>
      </section>
    </Apparition>
  );
}
