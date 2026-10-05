import { useTranslations } from "next-intl";

export default function Competences() {
  const t = useTranslations("Competences");

  const groupes = [
    { titre: "Front-end", techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { titre: "Back-end", techs: ["PHP", "MySQL", "Node.js"] },
    { titre: t("outils"), techs: ["Git", "GitHub", "VS Code", "Vercel"] },
  ];

  return (
    <section id="competences" className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</h2>

      <div className="space-y-10">
        {groupes.map((g) => (
          <div key={g.titre}>
            <h3 className="text-xl font-semibold mb-4 opacity-60">{g.titre}</h3>
            <div className="flex flex-wrap gap-3">
              {g.techs.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full border border-current/30 text-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
