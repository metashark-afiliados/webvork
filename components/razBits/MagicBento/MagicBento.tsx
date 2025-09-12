// src/components/razBits/MagicBento/MagicBento.tsx
/**
 * @file MagicBento.tsx
 * @description Componente orquestador para la sección interactiva MagicBento.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useBentoGridInteraction } from "./useBentoGridInteraction";
import { BentoCard } from "./BentoCard";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface MagicBentoProps {
  content: Dictionary["magicBento"];
  className?: string;
}

export function MagicBento({
  content,
  className,
}: MagicBentoProps): React.ReactElement | null {
  const gridRef = useRef<HTMLDivElement | null>(null);

  if (!content) {
    return null;
  }

  const { config, cards } = content;

  const { initializeCardInteractions } = useBentoGridInteraction(
    gridRef,
    config
  );

  console.log("[Observabilidad] Renderizando orquestador MagicBento");

  return (
    <div
      ref={gridRef}
      className={twMerge(
        `bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 max-w-7xl mx-auto p-4`,
        className
      )}
      style={
        {
          "--glow-color": `var(--${config.glowColor}-rgb)`,
        } as React.CSSProperties
      }
    >
      {cards.map((card, index) => (
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
// src/components/razBits/MagicBento/MagicBento.tsx
