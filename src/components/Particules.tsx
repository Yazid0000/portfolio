"use client";

import { useEffect, useRef } from "react";

type Particule = {
  tx: number; ty: number; // position cible (dans la lettre)
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  accent: boolean;
  k: number; // raideur du ressort : les points arrivent par vagues
};

const ACCENT = "#6d5dfc";

// Pseudo-aléatoire déterministe : la composition est identique à chaque chargement.
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Le nom est dessiné en particules par-dessus le vrai <h1> (rendu transparent, gardé pour le SEO).
// Les points fuient la souris, se dispersent au clic et reviennent toujours à leur place.
// Mouvement réduit : rien n'est dessiné et le <h1> reste visible (classe motion-safe du Hero).
export default function Particules() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const zone = canvas?.closest("section"); // le Hero
    const texte = zone?.querySelector("h1");
    if (!canvas || !texte || !zone) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let particules: Particule[] = [];
    let couleur = "#000";
    const pointeur = { x: 0, y: 0, actif: false };
    let raf = 0;
    let visible = true;
    let annule = false;

    const lireCouleur = () => {
      couleur = document.documentElement.classList.contains("dark") ? "#fff" : "#000";
    };

    // Dessine le nom hors écran, à l'emplacement exact du <h1>, et garde chaque pixel plein comme cible.
    function cibles() {
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const style = getComputedStyle(texte!);
      const rect = texte!.getBoundingClientRect();
      const base = canvas!.getBoundingClientRect();
      o.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      o.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(texte!.textContent ?? "", rect.left - base.left + rect.width / 2, rect.top - base.top + rect.height / 2);

      const data = o.getImageData(0, 0, W, H).data;
      let pleins = 0;
      for (let i = 3; i < data.length; i += 16) if (data[i] > 128) pleins++;
      pleins *= 4;
      // Pas de la grille choisi pour rester entre ~1 500 (mobile) et ~2 500 particules.
      const pas = Math.max(3, Math.round(Math.sqrt(pleins / (W < 768 ? 1500 : 2500))));
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += pas) {
        for (let x = (y / pas) % 2 ? pas / 2 : 0; x < W; x += pas) {
          if (data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      return { pts, pas };
    }

    function construire(intro: boolean) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = Math.round(rect.width); H = Math.round(rect.height);
      if (!W || !H) return;
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      lireCouleur();

      const { pts, pas } = cibles();
      const r = Math.max(1.1, pas * 0.36);
      particules = pts.map((p, i) => {
        const a = rand(i * 3.1) * Math.PI * 2;
        const d = Math.max(W, H) * (0.55 + rand(i * 7.7) * 0.5);
        return {
          tx: p.x, ty: p.y,
          x: intro ? W / 2 + Math.cos(a) * d : p.x,
          y: intro ? H / 2 + Math.sin(a) * d : p.y,
          vx: 0, vy: 0,
          r: r * (0.75 + rand(i * 5.3) * 0.5),
          accent: rand(i * 9.9) < 0.07,
          k: 0.018 + rand(i * 2.2) * 0.03,
        };
      });
    }

    function disperser(cx: number, cy: number, force: number) {
      for (const p of particules) {
        const dx = p.x - cx, dy = p.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        const f = (force * (0.6 + Math.random() * 0.8)) / Math.max(1, d / 120);
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    }

    function image() {
      ctx!.clearRect(0, 0, W, H);
      const R = Math.max(70, Math.min(W, H) * 0.12), R2 = R * R;
      for (const p of particules) {
        p.vx += (p.tx - p.x) * p.k;
        p.vy += (p.ty - p.y) * p.k;
        if (pointeur.actif) {
          const dx = p.x - pointeur.x, dy = p.y - pointeur.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 6;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
      }
      // Un seul tracé par couleur : des milliers de points restent peu coûteux.
      for (const accent of [false, true]) {
        ctx!.fillStyle = accent ? ACCENT : couleur;
        ctx!.beginPath();
        for (const p of particules) {
          if (p.accent !== accent) continue;
          const vitesse = Math.min(1, Math.hypot(p.vx, p.vy) / 12);
          const rr = p.r * (1 + vitesse * 0.8);
          ctx!.moveTo(p.x + rr, p.y);
          ctx!.arc(p.x, p.y, rr, 0, Math.PI * 2);
        }
        ctx!.fill();
      }
      raf = visible ? requestAnimationFrame(image) : 0;
    }

    const position = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointeur.x = e.clientX - rect.left;
      pointeur.y = e.clientY - rect.top;
    };
    // Souris : les points fuient le curseur. Toucher : seulement la dispersion, pour ne pas gêner le défilement.
    const bouger = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      position(e);
      pointeur.actif = true;
    };
    const sortir = () => { pointeur.actif = false; };
    const appuyer = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      position(e);
      disperser(pointeur.x, pointeur.y, 38);
    };
    zone.addEventListener("pointermove", bouger);
    zone.addEventListener("pointerleave", sortir);
    zone.addEventListener("pointerdown", appuyer);

    // Pause quand le Hero n'est plus à l'écran.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(image);
    });

    // Changement de thème : les points changent de couleur.
    const mo = new MutationObserver(lireCouleur);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let minuteur: ReturnType<typeof setTimeout>;
    const redimensionner = () => {
      clearTimeout(minuteur);
      minuteur = setTimeout(() => construire(false), 150);
    };
    addEventListener("resize", redimensionner);

    // On attend la police pour que les points prennent la forme de Syne, pas d'une police de secours.
    document.fonts.ready.then(() => {
      if (annule) return;
      construire(true);
      io.observe(canvas);
      raf = requestAnimationFrame(image);
    });

    return () => {
      annule = true;
      cancelAnimationFrame(raf);
      clearTimeout(minuteur);
      io.disconnect();
      mo.disconnect();
      removeEventListener("resize", redimensionner);
      zone.removeEventListener("pointermove", bouger);
      zone.removeEventListener("pointerleave", sortir);
      zone.removeEventListener("pointerdown", appuyer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="w-full h-full" />;
}
