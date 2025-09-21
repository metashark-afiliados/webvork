// RUTA: components/ui/PassportStamp.tsx
/**
 * @file PassportStamp.tsx
 * @description Componente de animación MEA/UX que simula un sello de pasaporte.
 *              Resuelve el error de tipo TS2322 con una aserción `as const` para
 *              una inferencia de tipos de élite.
 * @version 1.1.0 (Type Safety Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { logger } from "@/shared/lib/logging";

interface PassportStampProps {
  label: string;
}

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA DE TIPOS] ---
// Se añade 'as const' para que TypeScript infiera los tipos más específicos.
const stampVariants = {
  hidden: { scale: 1.5, opacity: 0, rotate: -15 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
} as const;
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA DE TIPOS] ---

export function PassportStamp({
  label,
}: PassportStampProps): React.ReactElement {
  logger.trace("[PassportStamp] Renderizando animación MEA/UX (v1.1).");

  return (
    <motion.div
      variants={stampVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center"
      aria-live="polite"
    >
      <div className="relative w-32 h-32">
        <DynamicIcon
          name="CircleCheck"
          className="w-full h-full text-green-500"
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-foreground">{label}</p>
    </motion.div>
  );
}
