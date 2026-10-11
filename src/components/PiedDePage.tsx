import { useTranslations } from "next-intl";
import { liens } from "@/components/Hero";

// Profils publics : des références sur le travail, rangées ici plutôt que parmi les moyens de contact.
const profils = [
  ["GitHub", "https://github.com/Yazid0000"],
  ["LinkedIn", "https://www.linkedin.com/in/yazid-bennouna-09918a441/"],
] as const;

// Pied de page : qui, où, et la navigation (la seule disponible sur mobile).
export default function PiedDePage() {
  const n = useTranslations("Navigation");

  return (
    <footer className="border-t border-current/20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
        <p className="opacity-70">
          © {new Date().getFullYear()} Yazid Bennouna · {n("lieu")}
        </p>
        <nav aria-label={n("plan")} className="flex flex-wrap gap-x-6 gap-y-1">
          {liens.map(([id, cle]) => (
            <a key={id} href={`#${id}`} className="py-3 opacity-70 hover:opacity-100 transition-opacity">
              {n(cle)}
            </a>
          ))}
          <a href="#contenu" className="py-3 opacity-70 hover:opacity-100 transition-opacity">
            {n("haut")}
          </a>
          {profils.map(([nom, url]) => (
            <a key={nom} href={url} target="_blank" rel="noopener noreferrer" className="py-3 opacity-70 hover:opacity-100 transition-opacity">
              {nom}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
