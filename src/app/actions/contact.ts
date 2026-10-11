"use server";

import { Resend } from "resend";

type Champ = "nom" | "email" | "message";

export type EtatContact = {
  statut: "idle" | "succes" | "erreurChamps" | "erreurEnvoi";
  // Champs à corriger, pour afficher le message sous chacun d'eux
  erreurs?: Partial<Record<Champ, true>>;
  // Ce que le visiteur a tapé : le formulaire est réinitialisé après l'envoi, on le lui rend en cas d'erreur
  valeurs?: Record<Champ, string>;
};

// Server Action : ce code s'exécute uniquement sur le serveur.
// La clé API n'est donc jamais envoyée au navigateur.
export async function envoyerMessage(_etat: EtatContact, formData: FormData): Promise<EtatContact> {
  // Piège à robots : ce champ est caché aux humains. S'il est rempli, c'est un spam.
  if (formData.get("site")) return { statut: "succes" };

  const valeurs = {
    nom: String(formData.get("nom") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const erreurs: EtatContact["erreurs"] = {};
  if (!valeurs.nom || valeurs.nom.length > 100) erreurs.nom = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.email)) erreurs.email = true;
  if (!valeurs.message || valeurs.message.length > 5000) erreurs.message = true;
  if (Object.keys(erreurs).length) return { statut: "erreurChamps", erreurs, valeurs };

  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_EMAIL;
  if (!cle || !destinataire) {
    console.error("RESEND_API_KEY ou CONTACT_EMAIL manquant dans les variables d'environnement");
    return { statut: "erreurEnvoi", valeurs };
  }

  const resend = new Resend(cle);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: destinataire,
    replyTo: valeurs.email,
    subject: `Nouveau message de ${valeurs.nom}`,
    text: `Nom : ${valeurs.nom}\nEmail : ${valeurs.email}\n\n${valeurs.message}`,
  });

  if (error) {
    console.error("Erreur Resend :", error);
    return { statut: "erreurEnvoi", valeurs };
  }
  return { statut: "succes" };
}
