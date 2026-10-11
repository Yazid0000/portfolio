"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

type Champ = "nom" | "email" | "message";

export type EtatContact = {
  statut: "idle" | "succes" | "erreurChamps" | "erreurEnvoi";
  // Champs à corriger, pour afficher le message sous chacun d'eux
  erreurs?: Partial<Record<Champ, true>>;
  // Ce que le visiteur a tapé : le formulaire est réinitialisé après l'envoi, on le lui rend en cas d'erreur
  valeurs?: Record<Champ, string>;
};

// Limite d'envoi : au plus 3 messages par adresse IP et par heure, pour qu'un script ne puisse ni inonder
// la boîte mail ni épuiser le quota Resend. La mémoire n'est pas partagée entre les instances Vercel :
// c'est un frein, pas une garantie (pour une garantie, un compteur partagé comme Upstash Redis).
const LIMITE = 3;
const FENETRE = 60 * 60 * 1000;
const envois = new Map<string, number[]>();

function limiteAtteinte(ip: string) {
  const maintenant = Date.now();
  const recents = (envois.get(ip) ?? []).filter((t) => maintenant - t < FENETRE);
  if (recents.length >= LIMITE) return true;
  envois.set(ip, [...recents, maintenant]);
  return false;
}

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

  // Sur Vercel, la première adresse de x-forwarded-for est celle du visiteur (Vercel l'écrit lui-même).
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "inconnue";
  if (limiteAtteinte(ip)) return { statut: "erreurEnvoi", valeurs };

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
    // Pas de retour à la ligne dans l'objet : il finit dans les en-têtes de l'email.
    subject: `Nouveau message de ${valeurs.nom.replace(/[\r\n]+/g, " ")}`,
    text: `Nom : ${valeurs.nom}\nEmail : ${valeurs.email}\n\n${valeurs.message}`,
  });

  if (error) {
    console.error("Erreur Resend :", error);
    return { statut: "erreurEnvoi", valeurs };
  }
  return { statut: "succes" };
}
