const etapes = [
  { titre: "Brief", description: "On définit ensemble vos besoins, vos objectifs et votre budget." },
  { titre: "Maquette", description: "Je vous propose un design. Vous validez avant le développement." },
  { titre: "Développement", description: "Je construis le site. Vous suivez l'avancement." },
  { titre: "Livraison", description: "Mise en ligne, tests sur mobile et ordinateur." },
  { titre: "Suivi", description: "Corrections et accompagnement après la livraison." },
];

export default function Methode() {
  return (
    <section id="methode" className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Méthode</h2>

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