// components/razBits/MagicBento/MagicBento.tsx
/**
 * @file MagicBento.tsx
 * @description Componente orquestador para la sección interactiva MagicBento.
 *              - v2.1.0: Resuelve el error de tipo TS2345 garantizando que el hook
 *                `useBentoGridInteraction` reciba siempre un objeto de configuración
 *                completo y válido, utilizando el schema de Zod para generar los
 *                valores por defecto cuando sea necesario.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useBentoGridInteraction } from "./useBentoGridInteraction";
import { BentoCard } from "./BentoCard";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import {
  type BentoCardData,
  MagicBentoConfigSchema, // <<-- Se importa el schema para la validación/parseo
} from "./magic-bento.schema";
import { logger } from "@/lib/logging";

interface MagicBentoProps {
  content: Dictionary["magicBento"];
  className?: string;
}

export function MagicBento({
  content,
  className,
}: MagicBentoProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando orquestador MagicBento");
  const gridRef = useRef<HTMLDivElement | null>(null);

  // --- INICIO DE LA CORRECCIÓN ---
  // Se asegura de que `configForHook` siempre sea un objeto válido.
  // Si `content.config` no existe, `zod.parse({})` creará un objeto
  // con todos los valores por defecto definidos en `MagicBentoConfigSchema`.
  // Esto satisface el contrato del hook `useBentoGridInteraction` y elimina el error de tipo.
  const configForHook = MagicBentoConfigSchema.parse(content?.config || {});

  const { initializeCardInteractions } = useBentoGridInteraction(
    gridRef,
    configForHook
  );
  // --- FIN DE LA CORRECCIÓN ---

  if (!content) {
    logger.warn("[MagicBento] No se proporcionó contenido. No se renderizará.");
    return null;
  }

  const { config, cards } = content;

  return (
    <div
      ref={gridRef}
      className={twMerge(
        `bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 max-w-7xl mx-auto p-4`,
        className
      )}
      style={
        {
          "--glow-color-rgb": `var(--${config.glowColor}-rgb)`,
        } as React.CSSProperties
      }
    >
      {cards.map((card: BentoCardData, index: number) => (
        <BentoCard
          key={card.title}
          card={card}
          cardRef={initializeCardInteractions}
          textAutoHide={config.textAutoHide}
          className={twMerge(
            index === 2 && "lg:col-span-2 lg:row-span-2",
            index === 3 && "lg:col-span-2"
          )}
        />
      ))}
    </div>
  );
}
// components/razBits/MagicBento/MagicBento.tsx
