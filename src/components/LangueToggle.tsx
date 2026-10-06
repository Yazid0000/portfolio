"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { cheminLangue } from "@/i18n/site";

const langues = ["fr", "en"] as const;

const anim = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

// Navigation côté client (pas de rechargement) : /fr et /en partagent le même layout racine.
// La pastille glisse tout de suite au clic, pendant que la nouvelle langue se charge.
export default function LangueToggle() {
  const locale = useLocale();
  const [choisie, setChoisie] = useState(locale);

  return (
    <div className="relative grid grid-cols-2 rounded-full border border-current text-sm uppercase overflow-hidden">
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1/2 bg-black dark:bg-white transition-transform ${anim} ${
          choisie === "en" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {langues.map((code) => (
        <Link
          key={code}
          href={cheminLangue(code)}
          hrefLang={code}
          scroll={false}
          onClick={() => setChoisie(code)}
          aria-current={code === locale ? "true" : undefined}
          className={`relative px-3 py-2 text-center transition-[color,opacity] ${anim} ${
            code === choisie ? "text-white dark:text-black" : "opacity-60"
          }`}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
