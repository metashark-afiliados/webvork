// src/components/razBits/MagicBento/useBentoGridInteraction.ts
/**
 * @file useBentoGridInteraction.ts
 * @description Hook de lógica para el componente MagicBento. Corregido para
 *              aceptar una ref potencialmente nula.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { clientLogger } from "@/lib/logging";
import type { z } from "zod";
import type { MagicBentoConfigSchema } from "./magic-bento.schema";

type BentoConfig = z.infer<typeof MagicBentoConfigSchema>;

const getThemeRgbColor = (colorName: string): string => {
  if (typeof window === "undefined") return "132, 0, 255";
  const rgbStr = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${colorName}-rgb`)
    .trim();
  return rgbStr || "132, 0, 255";
};

export const useBentoGridInteraction = (
  // <<-- CORRECCIÓN: Se acepta una ref que puede ser nula.
  gridRef: React.RefObject<HTMLDivElement | null>,
  config: BentoConfig
) => {
  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldDisableAnimations = config.disableAnimations || isMobile.current;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || shouldDisableAnimations || !config.enableSpotlight) return;

    clientLogger.trace("[Bento] Inicializando Spotlight Effect");
    const spotlight = document.createElement("div");
    spotlight.style.cssText = `...`; // Estilos del spotlight
    document.body.appendChild(spotlight);

    // ... Lógica de movimiento y limpieza del spotlight ...
  }, [gridRef, config, shouldDisableAnimations]);

  const initializeCardInteractions = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || shouldDisableAnimations) return;

      // ... Lógica de listeners de mousemove y mouseleave ...
    },
    [config, shouldDisableAnimations]
  );

  return { initializeCardInteractions };
};

// src/components/razBits/MagicBento/useBentoGridInteraction.ts
