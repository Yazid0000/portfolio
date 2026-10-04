"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [sombre, setSombre] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", sombre);
  }, [sombre]);

  return (
    <button
      onClick={() => setSombre(!sombre)}
      className="px-4 py-2 rounded-full border border-current text-sm"
    >
      {sombre ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
}