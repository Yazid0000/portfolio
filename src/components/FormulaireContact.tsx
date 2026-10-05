"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { envoyerMessage, type EtatContact } from "@/app/actions/contact";

const etatInitial: EtatContact = { statut: "idle" };

const champ =
  "w-full bg-transparent border-b border-current/30 py-3 text-lg outline-none focus:border-current transition-colors placeholder:opacity-50";

export default function FormulaireContact() {
  const t = useTranslations("Contact.form");
  const [etat, action, enCours] = useActionState(envoyerMessage, etatInitial);

  if (etat.statut === "succes") {
    return <p className="text-xl max-w-xl" role="status">{t("succes")}</p>;
  }

  return (
    <form action={action} className="w-full max-w-xl flex flex-col gap-6 text-left">
      <input name="nom" required maxLength={100} placeholder={t("nom")} aria-label={t("nom")} className={champ} />
      <input name="email" type="email" required placeholder={t("email")} aria-label={t("email")} className={champ} />
      <textarea name="message" required maxLength={5000} rows={4} placeholder={t("message")} aria-label={t("message")} className={`${champ} resize-none`} />

      {/* Piège à robots, invisible pour les humains */}
      <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {(etat.statut === "erreurChamps" || etat.statut === "erreurEnvoi") && (
        <p className="text-red-500" role="alert">{t(etat.statut)}</p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="self-start px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black disabled:opacity-50"
      >
        {enCours ? t("envoi") : t("envoyer")}
      </button>
    </form>
  );
}
