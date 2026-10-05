import { useTranslations } from "next-intl";

export default function APropos() {
  const t = useTranslations("APropos");
  const paragraphes = t.raw("paragraphes") as string[];

  return (
    <section id="apropos" className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</h2>

      <div className="space-y-4 text-lg opacity-80">
        {paragraphes.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
