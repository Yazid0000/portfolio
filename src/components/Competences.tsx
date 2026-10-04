const groupes = [
  { titre: "Front-end", techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { titre: "Back-end", techs: ["PHP", "MySQL", "Node.js"] },
  { titre: "Outils", techs: ["Git", "GitHub", "VS Code", "Vercel"] },
];

export default function Competences() {
  return (
    <section id="competences" className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Compétences</h2>

      <div className="space-y-10">
        {groupes.map((g) => (
          <div key={g.titre}>
            <h3 className="text-xl font-semibold mb-4 opacity-60">{g.titre}</h3>
            <div className="flex flex-wrap gap-3">
              {g.techs.map((t) => (
                <span key={t} className="px-4 py-2 rounded-full border border-current/30 text-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}