"use client";

import { useSyncExternalStore } from "react";

function sAbonner(callback: () => void) {
  const observateur = new MutationObserver(callback);
  observateur.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observateur.disconnect();
}

const lireTheme = () => document.documentElement.classList.contains("dark");
const lireServeur = () => false;

export default function ThemeToggle() {
  const sombre = useSyncExternalStore(sAbonner, lireTheme, lireServeur);

  const basculer = () => {
    const nouveau = !sombre;
    document.documentElement.classList.toggle("dark", nouveau);
    localStorage.setItem("theme", nouveau ? "dark" : "light");
  };

  return (
    <button
      onClick={basculer}
      className="px-4 py-2 rounded-full border border-current text-sm"
    >
      {sombre ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
}