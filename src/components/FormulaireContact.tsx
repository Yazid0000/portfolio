"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { envoyerMessage, type EtatContact } from "@/app/actions/contact";
import { plein } from "@/components/boutons";

const etatInitial: EtatContact = { statut: "idle" };

const champ =
  "w-full bg-transparent border-b border-current/30 py-3 text-lg outline-none focus:border-current transition-colors placeholder:text-current/60 aria-invalid:border-red-600 dark:aria-invalid:border-red-400";
// Rouge foncé en clair, clair en sombre : au moins 4,5:1 de contraste dans les deux thèmes
const rouge = "text-sm text-red-600 dark:text-red-400";

export default function FormulaireContact() {
  const t = useTranslations("Contact.form");
  const [etat, action, enCours] = useActionState(envoyerMessage, etatInitial);

  if (etat.statut === "succes") {
    return <p className="text-xl max-w-xl" role="status">{t("succes")}</p>;
  }

  // Libellé visible en permanence, exemple en texte indicatif, erreur juste sous le champ.
  const champDe = ({ nom, type, multiligne }: { nom: "nom" | "email" | "message"; type?: string; multiligne?: boolean }) => {
    const erreur = etat.erreurs?.[nom];
    const props = {
      id: `contact-${nom}`,
      name: nom,
      required: true,
      placeholder: t(`${nom}Exemple`),
      defaultValue: etat.valeurs?.[nom],
      "aria-invalid": erreur ? true : undefined,
      "aria-describedby": erreur ? `contact-${nom}-erreur` : undefined,
    };
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={props.id} className="text-sm opacity-70">
          {t(nom)}
        </label>
        {multiligne ? (
          <textarea {...props} maxLength={5000} rows={4} className={`${champ} resize-none`} />
        ) : (
          <input {...props} type={type ?? "text"} maxLength={nom === "nom" ? 100 : undefined} autoComplete={nom === "nom" ? "name" : "email"} className={champ} />
        )}
        {erreur && (
          <p id={`contact-${nom}-erreur`} className={rouge}>
            {t(`erreur${nom[0].toUpperCase()}${nom.slice(1)}`)}
          </p>
        )}
      </div>
    );
  };

  return (
    // noValidate : les messages viennent du serveur, sous chaque champ, plutôt que des bulles du navigateur
    <form action={action} noValidate className="w-full max-w-xl flex flex-col gap-6 text-left">
      {champDe({ nom: "nom" })}
      {champDe({ nom: "email", type: "email" })}
      {champDe({ nom: "message", multiligne: true })}

      {/* Piège à robots, invisible pour les humains */}
      <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {(etat.statut === "erreurChamps" || etat.statut === "erreurEnvoi") && (
        <p className={rouge} role="alert">
          {t(etat.statut)}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className={`${plein} self-start px-8 py-3 disabled:opacity-50 disabled:hover:bg-black dark:disabled:hover:bg-white`}
      >
        {enCours ? t("envoi") : t("envoyer")}
      </button>
    </form>
  );
}
