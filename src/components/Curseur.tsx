"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Curseur() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xLent = useSpring(x, { stiffness: 150, damping: 20 });
  const yLent = useSpring(y, { stiffness: 150, damping: 20 });
  const [survol, setSurvol] = useState(false);

  useEffect(() => {
    const bouger = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const detecter = (e: MouseEvent) => {
      const cible = e.target as HTMLElement;
      setSurvol(cible.closest("a, button") !== null);
    };

    window.addEventListener("mousemove", bouger);
    window.addEventListener("mouseover", detecter);
    return () => {
      window.removeEventListener("mousemove", bouger);
      window.removeEventListener("mouseover", detecter);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="hidden pointer-fine:block pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="hidden pointer-fine:block pointer-events-none fixed top-0 left-0 z-50 w-10 h-10 rounded-full border border-white mix-blend-difference"
        style={{ x: xLent, y: yLent, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: survol ? 1.8 : 1 }}
      />
    </>
  );
}