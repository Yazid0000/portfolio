"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";
import { useReducedMotion } from "motion/react";

function Forme() {
  const reduit = useReducedMotion();
  const ref = useRef<Mesh>(null);
  const souris = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const bouger = (e: MouseEvent) => {
      souris.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      souris.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", bouger);
    return () => window.removeEventListener("mousemove", bouger);
  }, []);

  useFrame(() => {
if (!ref.current || reduit) return;
  const m = souris.current;

  // Rotation vers la souris
  ref.current.rotation.x += (m.y * 1.5 - ref.current.rotation.x) * 0.05;
  ref.current.rotation.y += (m.x * 1.5 - ref.current.rotation.y) * 0.05;

  // Déplacement vers la souris
  ref.current.position.x += (m.x * 0.8 - ref.current.position.x) * 0.05;
  ref.current.position.y += (-m.y * 0.6 - ref.current.position.y) * 0.05;
  
});

  return (
    <Float speed={reduit ? 0 : 2} floatIntensity={reduit ? 0 : 1.5}>
  <mesh ref={ref} scale={1.6}>
    <icosahedronGeometry args={[1, 64]} />
    <MeshDistortMaterial
      color="#6d5dfc"
      distort={reduit ? 0.2 : 0.45}
      speed={reduit ? 0 : 2}
      roughness={0.2}
      metalness={0.6}
    />
  </mesh>
</Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#ff4fd8" />
      <Forme />
    </Canvas>
  );
}