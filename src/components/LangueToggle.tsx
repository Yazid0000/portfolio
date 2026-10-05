"use client";

import { useLocale } from "next-intl";

const langues = [
  { code: "fr", href: "/" },
  { code: "en", href: "/en" },
];

// De vrais liens <a> : la page se recharge complètement au changement de langue.
// Le script du thème s'exécute donc avant l'affichage, sans flash.
export default function LangueToggle() {
  const locale = useLocale();

  return (
    <div className="flex rounded-full border border-current text-sm uppercase overflow-hidden">
      {langues.map((l) => (
        <a
          key={l.code}
          href={l.href}
          hrefLang={l.code}
          aria-current={l.code === locale ? "true" : undefined}
          className={`px-3 py-2 transition-colors ${
            l.code === locale ? "bg-black text-white dark:bg-white dark:text-black" : "opacity-60"
          }`}
        >
          {l.code}
        </a>
      ))}
    </div>
  );
}
