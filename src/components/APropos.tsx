import { useTranslations } from "next-intl";

export default function APropos() {
  const t = useTranslations("APropos");
  const paragraphes = t.raw("paragraphes") as string[];

  const groupes = [
    { titre: "Front-end", techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { titre: "Back-end", techs: ["PHP", "MySQL", "Node.js"] },
    { titre: t("outils"), techs: ["Git", "GitHub", "VS Code", "Vercel"] },
  ];

  return (
    <section id="apropos" className="px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</h2>

      <div className="space-y-4 text-lg opacity-80">
        {paragraphes.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-12 mb-4">{t("competences")}</h3>
      <dl className="space-y-3">
        {groupes.map((g) => (
          <div key={g.titre} className="grid sm:grid-cols-[8rem_1fr] gap-x-6">
            <dt className="opacity-60">{g.titre}</dt>
            <dd>{g.techs.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
