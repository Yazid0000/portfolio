import { useTranslations } from "next-intl";
import { Apparition, Element } from "@/components/Apparition";

export default function Competences() {
  const t = useTranslations("Competences");

  const groupes = [
    { titre: "Front-end", techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { titre: "Back-end", techs: ["PHP", "MySQL", "Node.js"] },
    { titre: t("outils"), techs: ["Git", "GitHub", "VS Code", "Vercel"] },
  ];

  return (
    <Apparition decalage={0.04}>
      <section id="competences" className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
        <Element as="h2" className="text-4xl md:text-5xl font-bold mb-12">{t("titre")}</Element>

        <div className="space-y-10">
          {groupes.map((g) => (
            <div key={g.titre}>
              <Element as="h3" sens="gauche" className="text-xl font-semibold mb-4">
                <span className="opacity-60">{g.titre}</span>
              </Element>
              <div className="flex flex-wrap gap-3">
                {g.techs.map((tech) => (
                  <Element as="span" sens="zoom" key={tech} className="px-4 py-2 rounded-full border border-current/30 text-lg">
                    {tech}
                  </Element>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Apparition>
  );
}
