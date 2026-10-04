const projets = [
  {
    titre: "Entre Tables",
    type: "E-commerce",
    description: "Boutique en ligne d'art de la table : textiles artisanaux marocains.",
    stack: ["PHP", "MySQL", "JavaScript"],
    demo: "#",
    github: "#",
  },
  {
    titre: "ReservSys",
    type: "Application web",
    description: "Application de gestion de réservations avec back-office.",
    stack: ["PHP", "MySQL"],
    demo: "#",
    github: "#",
  },
  {
    titre: "Riad (démo)",
    type: "Site vitrine",
    description: "Site vitrine pour un riad marocain. À venir.",
    stack: ["Next.js", "Tailwind"],
    demo: "#",
    github: "#",
  },
  {
    titre: "SaaS (démo)",
    type: "Landing page",
    description: "Landing page orientée conversion pour un produit fictif. À venir.",
    stack: ["Next.js", "Tailwind"],
    demo: "#",
    github: "#",
  },
  {
    titre: "Dashboard (démo)",
    type: "Application web",
    description: "Dashboard avec authentification et données en temps réel. À venir.",
    stack: ["Next.js", "TypeScript"],
    demo: "#",
    github: "#",
  },
  {
    titre: "Ce portfolio",
    type: "Site créatif",
    description: "Portfolio interactif avec 3D et animations.",
    stack: ["Next.js", "Three.js", "GSAP"],
    demo: "#",
    github: "https://github.com/Yazid0000/portfolio",
  },
];

export default function Projets() {
  return (
    <section id="projets" className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Projets</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projets.map((p) => (
          <article key={p.titre} className="p-6 rounded-2xl border border-current/20">
            <p className="text-sm uppercase tracking-widest opacity-60">{p.type}</p>
            <h3 className="text-2xl font-semibold mt-1 mb-3">{p.titre}</h3>
            <p className="opacity-70 mb-4">{p.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {p.stack.map((tech) => (
                <span key={tech} className="text-xs px-3 py-1 rounded-full border border-current/30">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm underline">
              <a href={p.demo}>Voir le site</a>
              <a href={p.github}>Code</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}