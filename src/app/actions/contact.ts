"use server";

import { Resend } from "resend";

export type EtatContact = { statut: "idle" | "succes" | "erreurChamps" | "erreurEnvoi" };

// Server Action : ce code s'exécute uniquement sur le serveur.
// La clé API n'est donc jamais envoyée au navigateur.
export async function envoyerMessage(_etat: EtatContact, formData: FormData): Promise<EtatContact> {
  // Piège à robots : ce champ est caché aux humains. S'il est rempli, c'est un spam.
  if (formData.get("site")) return { statut: "succes" };

  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!nom || !message || !emailValide || nom.length > 100 || message.length > 5000) {
    return { statut: "erreurChamps" };
  }

  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_EMAIL;
  if (!cle || !destinataire) {
    console.error("RESEND_API_KEY ou CONTACT_EMAIL manquant dans les variables d'environnement");
    return { statut: "erreurEnvoi" };
  }

  const resend = new Resend(cle);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: destinataire,
    replyTo: email,
    subject: `Nouveau message de ${nom}`,
    text: `Nom : ${nom}\nEmail : ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Erreur Resend :", error);
    return { statut: "erreurEnvoi" };
  }
  return { statut: "succes" };
}
