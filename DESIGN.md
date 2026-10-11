---
name: Yazid — Portfolio
description: L'atelier en noir et blanc d'un développeur web freelance.
colors:
  ink: "#000000"
  paper: "#ffffff"
  spark-violet: "#6d5dfc"
  terminal-black: "oklch(14.5% 0 0)"
  terminal-green: "oklch(79.2% 0.209 151.711)"
  alert-red: "oklch(57.7% 0.245 27.325)"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(4rem, 17vw, 16vw)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
  showcase-title:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0.1em"
  mono:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    fontFeature: "\"tnum\""
rounded:
  panel: "12px"
  pill: "9999px"
spacing:
  tight: "8px"
  stack: "24px"
  gutter: "24px"
  block: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  row-service:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "32px 0"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "12px 0"
  terminal:
    backgroundColor: "{colors.terminal-black}"
    textColor: "{colors.terminal-green}"
    typography: "{typography.mono}"
    rounded: "{rounded.panel}"
---

# Design System: Yazid — Portfolio

## Overview

**Creative North Star: "L'atelier en noir et blanc"**

Le site est l'atelier d'un artisan numérique. Tout y est sobre, net et fonctionnel : du noir, du blanc, de la typographie, et le travail montré tel qu'il est, sans décor. Au milieu de cette sobriété, quelques gestes techniques surprennent : le nom en particules qui fuient la souris, le prisme qui pivote pour révéler un projet, le terminal caché. Ils prouvent le savoir-faire sans jamais devenir de la décoration.

La densité est faible : de grandes marges, peu d'éléments à la fois ; seuls l'accueil et les réalisations occupent un écran entier. Le contraste est maximal et s'inverse entièrement avec le thème sombre (le noir devient blanc et inversement, sans gris intermédiaire pour les surfaces). La hiérarchie vient de la taille et de la graisse des lettres, et de l'opacité du texte, pas de la couleur.

Le relief vient du mouvement, pas des ombres : les éléments entrent en glissant, réagissent à la souris, pivotent. Chaque animation a une version fixe pour le mouvement réduit.

**Key Characteristics:**
- Noir et blanc purs, inversés entre les thèmes ; un seul accent, le violet, réservé à une étincelle.
- Deux voix typographiques : Syne très gras et large pour l'affiche, Geist pour tout le reste.
- Formes en pilule pour tout ce qui se touche ; coins de 12px pour les panneaux.
- Aucune ombre : profondeur par le mouvement et la perspective (particules, prisme 3D).
- Hiérarchie par l'opacité du texte (100 %, 80 %, 70 %, 60 %, 50 %, 30 %).

## Colors

Une palette d'encre et de papier, où une seule couleur a le droit d'exister, et seulement en petite quantité.

### Primary
- **Encre** (`ink`) : texte, boutons pleins, traits et bordures en mode clair. En mode sombre, elle devient la couleur de fond.
- **Papier** (`paper`) : fond de page et texte des boutons pleins en mode clair. En mode sombre, elle devient la couleur du texte.

### Secondary
- **Étincelle violette** (`spark-violet`) : environ 7 % des points des particules du Hero. Elle ne colore ni texte, ni bouton, ni surface.

### Neutral
- **Noir terminal** (`terminal-black`) : fond du terminal caché, identique dans les deux thèmes.
- **Vert phosphore** (`terminal-green`) : texte de sortie du terminal. Il n'existe que dans le terminal.
- **Rouge alerte** (`alert-red`) : messages d'erreur du formulaire de contact (texte et ligne du champ en erreur), et rien d'autre. En mode sombre, il passe à une teinte plus claire (Tailwind `red-400`) pour garder au moins 4,5:1 de contraste.

Les gris n'existent pas comme couleurs : ce sont l'encre ou le papier à opacité réduite (`currentColor` à 15–30 % pour les bordures, texte à 50–80 % pour les niveaux secondaires).

### Named Rules
**The Spark Rule.** Le violet est une étincelle : quelques points dans les particules, jamais un bouton, un lien, un texte ou un fond. S'il devient visible comme « couleur du site », il est de trop.

**The Inversion Rule.** Le thème sombre est l'inverse exact du clair : encre et papier échangent leurs rôles. Pas de gris foncé « confortable » à la place du noir.

**The Terminal Exception.** Le vert, les trois pastilles (rouge, jaune, vert) et le fond noir fixe n'appartiennent qu'au terminal. Ils ne sortent jamais de ce composant.

## Typography

**Display Font:** Syne (police variable, graisses 400 à 800), avec repli sans-serif
**Body Font:** Geist, avec repli sans-serif
**Label/Mono Font:** Geist Mono, avec repli monospace

**Character:** Syne, très large et très grasse, joue le rôle d'affiche : elle ne sert que pour les grands noms (le nom du Hero, les titres des réalisations). Geist, neutre et précise, porte tout le reste. Le contraste entre les deux fait la personnalité du site.

### Hierarchy
- **Display** (Syne 800, de 17vw sur mobile à 16vw sur ordinateur, interligne 1, approche -0.025em) : uniquement le nom « YAZID » du Hero, dessiné par les particules.
- **Showcase title** (Syne 800, de 2,25rem à 3,75rem, interligne 1) : le nom du projet affiché à côté du prisme.
- **Headline** (Geist 700, de 2,25rem à 3rem) : titres de sections (Services, Méthode, À propos, Contact).
- **Title** (Geist 600, 1,5rem) : titres des services, des étapes de la méthode et du bloc Compétences.
- **Body** (Geist 400, de 1,125rem à 1,25rem) : accroche, descriptions et paragraphes, à 70–80 % d'opacité, largeur limitée (environ 36rem pour l'accroche).
- **Label** (Geist 400, 0,875rem, espacement 0.1em, en capitales) : surtitres comme « Développeur web freelance » ou « Réalisations », à 60 % d'opacité.
- **Mono** (Geist Mono 400, 0,875rem, chiffres à chasse fixe) : compteur `01 / 03`, terminal, astuce du terminal.

### Named Rules
**The Poster Rule.** Syne est réservée aux noms : le nom de Yazid et les noms de projets. Jamais pour un paragraphe, un bouton ou un libellé.

**The Variable Weight Rule.** Syne étant variable, la graisse peut s'animer (survol, état actif), mais toujours entre 400 et 800, et seulement sur les noms.

## Layout

Seuls le Hero et les Réalisations occupent un écran entier (hauteur minimale de 100vh) ; les autres sections prennent la hauteur de leur contenu. Conteneur de 72rem pour les sections larges (Services, Réalisations) ou de 56rem pour les sections de lecture (Méthode, À propos). Marges latérales de 24px, espacement vertical de 96px par section.

À l'intérieur, l'espacement suit un rythme simple : 8px entre éléments liés, 24px entre blocs d'une même section, 48px entre le titre et le contenu ou entre deux colonnes.

Un seul point de rupture compte (768px) : en dessous, tout passe en une colonne (titre de chaque service au-dessus de son détail, prisme au-dessus du texte du projet). Le Hero est centré, le reste est aligné à gauche, et le Contact revient au centre pour conclure.

Les éléments fixes restent aux coins : langue et thème en haut à droite, astuce du terminal en bas à gauche, terminal en bas à droite.

## Elevation & Depth

Le système est entièrement plat : aucune ombre portée nulle part, sauf la grande ombre du terminal, qui flotte au-dessus de la page. La profondeur vient du mouvement et de la vraie perspective : particules qui s'écartent sous la souris, prisme en CSS 3D dont les faces s'assombrissent en s'éloignant (jusqu'à 70 % de noir), éléments qui entrent en glissant au défilement.

### Named Rules
**The Motion-Not-Shadow Rule.** Pour donner du relief, on fait bouger ou on met en perspective ; on n'ajoute pas d'ombre. La seule ombre autorisée est celle du terminal.

## Shapes

Deux formes seulement : la pilule (tout élément cliquable ou étiquette : boutons, sélecteur de langue, bouton de thème, flèches du carrousel), et le coin de 12px pour les panneaux (terminal, faces du prisme). Les bordures sont fines (1px), en encre à 15–30 % d'opacité au repos et pleine au survol ou à l'état actif. Les champs du formulaire n'ont qu'une ligne de base, sans cadre.

## Components

### Buttons
Des pilules franches, sans ombre ni dégradé.
- **Shape :** pilule (9999px).
- **Primary :** fond encre, texte papier, inversé en mode sombre ; 12px × 24px de marge (32px pour l'envoi du formulaire) ; au survol, l'encre passe à 80 %.
- **Secondary :** contour 1px en encre, fond transparent ; au survol, le fond se remplit d'encre et le texte passe en papier.
- **Icon :** flèches du carrousel en cercles de 44px, contour à 30 % qui passe à 100 % au survol.
- **Icônes :** SVG au trait de 2px, bouts arrondis, en couleur du texte (flèches, lien externe, lune et soleil). Jamais de caractère Unicode à la place d'une icône.
- **Code :** les deux styles vivent dans `src/components/boutons.ts` (`plein`, `contour`).

### Lists / Rows
- **Services :** une ligne par offre, séparée par un filet de 1px à 20 % ; titre à gauche, description et points (séparés par « · ») à droite sur ordinateur, empilés sur mobile. Pas de cartes.
- **Compétences :** liste de définitions dans À propos, catégorie à 60 % puis technologies séparées par « · ». Pas de pastilles.

### Inputs / Fields
- **Style :** pas de cadre ni de fond ; une ligne de base de 1px à 30 %, texte 1,125rem, 12px de marge verticale, texte indicatif à 50 %.
- **Focus :** la ligne de base passe à 100 % d'opacité.
- **Error :** message en rouge alerte sous le formulaire.

### Navigation
- **Sélecteur de langue :** pilule à deux segments (FR / EN) ; une pastille pleine glisse sous la langue active (0,5s), le texte actif passe en papier, l'inactif à 60 %.
- **Bouton de thème :** pilule avec icône lune ou soleil ; au clic, le libellé sort par le haut et le nouveau entre par le bas pendant que l'icône pivote.

### Prisme des réalisations (signature)
Les captures des projets (format 2:1) forment les faces d'un prisme en CSS 3D, une face par projet. Il pivote avec les flèches, le clavier ou en le faisant glisser, avec un léger rebond à l'arrivée ; les faces qui s'éloignent s'assombrissent. À côté, le compteur, le nom du projet et sa description défilent dans le sens de la rotation.

### Particules du Hero (signature)
Le nom « YAZID » est formé de 1 500 à 2 500 points, en encre avec quelques étincelles violettes. Ils arrivent en vague et en fondu au chargement, fuient la souris et se dispersent au clic. Le vrai titre reste dans le HTML, transparent.

### Terminal
Panneau flottant en noir terminal, coins de 12px, texte vert phosphore en Geist Mono, trois pastilles de fenêtre ; les réponses se tapent lettre par lettre avec un curseur qui clignote. Ouvert avec la touche ² ou `.

## Do's and Don'ts

### Do:
- **Do** garder la page en encre et papier, et inverser exactement les deux en mode sombre.
- **Do** réserver Syne aux noms (le nom de Yazid, les noms de projets) et Geist à tout le reste.
- **Do** utiliser la pilule pour tout ce qui se clique, le coin de 12px pour les panneaux (terminal, faces du prisme).
- **Do** créer la hiérarchie par la taille, la graisse et l'opacité du texte (100 / 80 / 70 / 60 / 50 %).
- **Do** donner du relief par le mouvement et la perspective, avec une version fixe en mouvement réduit.
- **Do** utiliser l'accélération douce du site (`cubic-bezier(0.22, 1, 0.36, 1)`) pour les entrées et les changements d'état.

### Don't:
- **Don't** utiliser de dégradés colorés ni d'effets lumineux ou néon.
- **Don't** ajouter d'ombres portées sur les cartes, boutons ou images (seul le terminal en a une).
- **Don't** tomber dans le look template : pas d'icônes dans des cercles, de grilles de cartes toutes identiques ni d'images de stock.
- **Don't** mettre d'emojis dans les titres, boutons ou libellés.
- **Don't** étendre le violet au-delà des particules, ni le vert au-delà du terminal.
- **Don't** utiliser Syne pour un paragraphe, un bouton ou un libellé.
