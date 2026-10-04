const liens = [
  { nom: "Email", url: "mailto:ton-email@exemple.com" },
  { nom: "WhatsApp", url: "https://wa.me/2126XXXXXXXX" },
  { nom: "GitHub", url: "https://github.com/Yazid0000" },
  { nom: "LinkedIn", url: "#" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 py-24 flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-6">Un projet en tête ?</h2>
      <p className="text-xl opacity-70 mb-10">Parlons-en. Réponse sous 24 h.</p>

      <div className="flex flex-wrap justify-center gap-4">
        {liens.map((l) => (
          <a
            key={l.nom}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            {l.nom}
          </a>
        ))}
      </div>
    </section>
  );
}