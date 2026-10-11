// Les deux pilules du site. La marge intérieure reste au choix de chaque bouton.
// Au survol : la pilule pleine s'éclaircit à peine, la pilule à contour se remplit d'encre.
const base = "inline-flex items-center justify-center gap-1.5 rounded-full transition-colors duration-200";

export const plein = `${base} bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80`;

export const contour = `${base} border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black`;
