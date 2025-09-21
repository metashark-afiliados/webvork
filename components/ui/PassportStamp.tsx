// RUTA: components/ui/PassportStamp.tsx
/**
 * @file PassportStamp.tsx
 * @description Componente de animación MEA/UX que simula un sello de pasaporte.
 *              Diseñado para proporcionar un feedback kinestésico de éxito.
 * @version 1.0.0
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

export function PassportStamp({ label }: PassportStampProps): React.ReactElement {
  logger.trace("[PassportStamp] Renderizando animación MEA/UX.");

  const stampVariants = {
    hidden: { scale: 1.5, opacity: 0, rotate: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

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
