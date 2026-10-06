"use client";

import dynamic from "next/dynamic";

// Three.js (~250 Ko gzip) est chargé à part, après l'affichage de la page, pour ne pas bloquer l'interactivité
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default Scene3D;
