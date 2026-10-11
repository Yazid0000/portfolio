---
target: page d accueil
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\DELL\\portfolio\\src\\app\\[locale]\\page.tsx"
target_fingerprint: "sha256:1c2bf72a37785c927cbb41878dfe8790e5f489d90ab89546f36110b42e65abe0"
target_path: "C:\\Users\\DELL\\portfolio\\src\\app\\[locale]\\page.tsx"
timestamp: 2026-10-11T03-26-54Z
slug: src-app-locale-page-tsx
closed: true
---
Méthode : double évaluation, avec deux agents indépendants (A : revue de design, B : détecteur et mesures dans le navigateur).

# Critique : page d'accueil du portfolio (src/app/[locale]/page.tsx)

## Note de santé du design
| # | Critère | Note | Problème principal |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | Le compteur du prisme et « Envoi… » renseignent bien. Mais sur une page de 6 000px sans menu, on ne sait jamais où on est. |
| 2 | Langage du visiteur | 2 | Du jargon de développeur pour des commerçants : « SEO de base », « Back-office », « Mobile-first », « Next.js · Tailwind ». « Appuie sur ² ou ` » ne veut rien dire pour eux. |
| 3 | Contrôle et liberté | 2 | Pas de menu ni de retour en haut. Taper ` dans le formulaire ouvre le terminal et vole la saisie. |
| 4 | Cohérence | 2 | Mélange du tutoiement et du vouvoiement. « Réalisations » est un petit surtitre quand les autres sections ont un grand titre. Geist ne s'affiche pas. |
| 5 | Prévention des erreurs | 2 | Libellés réduits au texte indicatif à 50 % d'opacité, qui disparaît pendant la saisie. Validation par la bulle native du navigateur. |
| 6 | Reconnaissance plutôt que mémoire | 2 | Sans menu, on n'avance qu'en faisant défiler. Le rôle du terminal est caché. |
| 7 | Flexibilité | n/a | Portfolio (surface « Experience ») |
| 8 | Esthétique et sobriété | 3 | Palette disciplinée et aucune ombre, mais les grands espaces vides de Services, Compétences et À propos font « inachevé ». |
| 9 | Récupération après erreur | 2 | L'échec d'envoi renvoie vers l'email ou WhatsApp, mais l'erreur de champs ne dit pas quel champ pose problème. |
| 10 | Aide | n/a | Portfolio (surface « Experience ») |
| Total | | 18/32 | Acceptable (56 %) |

## Verdict sur la personnalité du design
Revue de design : trois éléments sont vraiment à toi (les particules, le prisme, le terminal) ; tout ce qu'il y a entre eux est le modèle standard du portfolio de freelance (cartes de services identiques, frise numérotée 01–05, mur de pastilles, « À propos » de trois phrases, formulaire puis pilules de réseaux). Rien ne parle à la moitié marocaine du public, et le positionnement (vitesse, prix, bilinguisme, proximité) n'apparaît qu'une fois, dans l'accroche.

Analyse automatique : détecteur sur le code = 0 problème. Détecteur dans la page = 4 alertes : 3 sur le contraste du texte indicatif des champs (3,9:1), 1 sur le surtitre au-dessus du titre principal (Hero.tsx:24). Fausse alerte : « YAZID » transparent en sombre (voulu, les particules le dessinent). Ajouts des mesures : numéros de Méthode à 2,1:1, astuce du terminal à 2,85:1, « Glisse ou utilise les flèches » à 3,98:1, liens FR/EN de 36px de haut sur mobile, ni lien d'évitement, ni <nav>, ni pied de page. Calque du détecteur : navigateur automatisé, invisible pour l'utilisateur.

## Problèmes prioritaires
- [P0] Geist ne s'affiche nulle part : les variables de police sont sur <body>, mais Tailwind applique la police dès <html>, d'où la police système. Correction : poser les variables sur <html> dans layout.tsx. Commande : /impeccable typeset
- [P1] Le terminal vole la saisie : taper ` ou ² dans le formulaire ouvre le terminal (Terminal.tsx:67). Correction : ignorer la touche dans les champs. Commande : /impeccable harden
- [P1] La prise de contact est mal pensée pour la moitié du public : WhatsApp en quatrième pilule à égalité avec GitHub et LinkedIn, libellés qui disparaissent, texte indicatif à 3,9:1, bulle native du navigateur. Correction : WhatsApp en action principale, GitHub et LinkedIn en pied de page, libellés visibles, erreurs par champ, ligne « ce qui se passe ensuite ». Commandes : /impeccable clarify, puis /impeccable harden
- [P1] Sections du milieu génériques, chacune sur un écran entier (min-h-screen) : cartes identiques dans Services, 14 pastilles de technologies, « À propos » sans visage. Correction : enlever min-h-screen, Services orientés résultats avec une carte mise en avant, Compétences réduites, « À propos » avec un visage, une ville et les langues. Commandes : /impeccable distill, puis /impeccable layout
- [P2] Les projets ne racontent rien : seulement « type · technos ». Correction : une phrase vraie par projet (client, besoin, résultat). Commande : /impeccable clarify

## Signaux d'alerte par profil de visiteur
- Jordan (découvre le site) : « Voir mes projets » saute les Services sans menu pour revenir ; « Appuie sur ² ou ` » ressemble à un bug ; « Réalisations » en petit gris ne se lit pas comme un titre.
- Casey (mobile, pressé) : nom en particules en bande de 66px entourée de vide ; bouton « Sombre » aussi visible que les boutons d'action ; 6 000px sans menu ni bouton WhatsApp fixe.
- Riley (cherche les failles) : la touche ` vole la saisie ; contours de focus du navigateur presque invisibles ; sélection, barre de défilement et curseur de texte pas aux couleurs du site ; le curseur personnalisé masque la flèche du carrousel et « Envoyer ».
- Propriétaire de riad (téléphone, lien WhatsApp) : rien ne dit Maroc, son activité ou WhatsApp ; Services en langage de développeur ; « Site vitrine · Next.js · Tailwind » sous le Riad ; WhatsApp en quatrième position.

## Observations mineures
Icônes en caractères de texte (← → ↗ et puces →) ; même apparition partout, et double animation sur Réalisations, À propos et Contact ; « À propos » à environ 95 caractères par ligne ; bord gauche qui saute entre conteneurs de 72rem et de 56rem ; titres qui flottent loin du contenu qui précède ; pas de theme-color ; titre de page sans ville ; captures du prisme un peu floues sur grand écran ; promesses « Réponse sous 24 h » et « livrés en quelques jours » à confirmer ; lien LinkedIn corrigé, donc la note de PRODUCT.md est périmée.

## Questions à te poser
- Pourquoi WhatsApp est-il la quatrième pilule, et pas l'action principale, toujours visible ?
- Et si chaque face du prisme racontait aussi une histoire en une ligne (client, besoin, résultat) ?
- Compétences et la frise 01–05 méritent-elles deux écrans pleins pour un propriétaire de riad ?
- Le premier écran : ton nom, ou « Sites web pour commerces au Maroc et à l'international, livrés en quelques jours » ?
