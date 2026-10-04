const services = [
  {
    titre: "Site vitrine",
    description: "Présentez votre activité avec un site rapide, moderne et bien référencé.",
    points: ["Design sur mesure", "Responsive mobile", "SEO de base", "Formulaire de contact"],
  },
  {
    titre: "E-commerce",
    description: "Vendez en ligne avec une boutique simple à gérer.",
    points: ["Catalogue produits", "Panier et paiement", "Gestion des commandes", "Mobile-first"],
  },
  {
    titre: "Application web",
    description: "Automatisez votre activité avec un outil adapté à vos besoins.",
    points: ["Réservations", "Back-office", "Comptes utilisateurs", "Base de données"],
  },
];

export default function Services() {
  return (
    <section id="services" className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Services</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.titre} className="p-6 rounded-2xl border border-current/20">
            <h3 className="text-2xl font-semibold mb-3">{s.titre}</h3>
            <p className="opacity-70 mb-4">{s.description}</p>
            <ul className="space-y-1">
              {s.points.map((p) => (
                <li key={p}>→ {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}