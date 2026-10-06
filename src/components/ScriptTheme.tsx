"use client";

import { useLayoutEffect } from "react";

const code = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

// Applique le thème avant l'affichage, dans les deux cas :
// - chargement initial : le <script> s'exécute pendant la lecture du HTML ;
// - changement de langue (navigation client) : React recrée <html> sans la classe "dark".
//   Le script n'est alors plus exécuté ("text/plain"), c'est l'effet qui remet la classe.
//   Ce composant est le premier de l'arbre : son effet passe avant ceux qui mesurent la page,
//   sinon la transition de couleur de <main> partirait du blanc (flash gris).
export default function ScriptTheme() {
  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
      }
    } catch {}
  }, []);

  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
