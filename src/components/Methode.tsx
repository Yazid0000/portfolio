import { useTranslations } from "next-intl";
import { Apparition, Element } from "@/components/Apparition";
import EtapesMethode from "@/components/EtapesMethode";

type Etape = { titre: string; description: string };

export default function Methode() {
  const t = useTranslations("Methode");
  const etapes = t.raw("etapes") as Etape[];

  return (
    <Apparition decalage={0.12}>
      <section id="methode" className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
        <Element as="h2" className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</Element>
        <EtapesMethode etapes={etapes} />
      </section>
    </Apparition>
  );
}
