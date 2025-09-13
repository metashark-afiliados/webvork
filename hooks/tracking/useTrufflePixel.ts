// src/hooks/tracking/useTrufflePixel.ts
/**
 * @file useTrufflePixel.ts
 * @description Hook Atómico de Efecto para el píxel de Truffle.bid.
 *              Diseñado para ser activado una sola vez por un hook orquestador.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect, useRef } from "react";
import { producerConfig } from "@/config/producer.config";
import { logger } from "@/lib/logging";

const TRUFFLE_SCRIPT_ID = "truffle-pixel-init";

/**
 * @function useTrufflePixel
 * @description Gestiona la inyección del script de Truffle.bid.
 *              Se ejecuta una sola vez cuando el parámetro 'enabled' pasa a ser true.
 * @param {boolean} enabled - El interruptor de activación proporcionado por el orquestador.
 */
export function useTrufflePixel(enabled: boolean): void {
  const hasExecuted = useRef(false);

  useEffect(() => {
    // Guarda de seguridad: Solo se ejecuta si está habilitado y no se ha ejecutado antes.
    if (!enabled || hasExecuted.current) {
      return;
    }

    const truffleId = producerConfig.TRACKING.TRUFFLE_PIXEL_ID;

    // Guarda de seguridad: No hace nada si el ID no está configurado.
    if (!truffleId) {
      return;
    }

    // Guarda de seguridad: Evita la reinyección si el script ya existe en el DOM.
    if (document.getElementById(TRUFFLE_SCRIPT_ID)) {
      return;
    }

    logger.startGroup("Hook: useTrufflePixel");
    logger.trace(
      `Activado. Inyectando script de Truffle.bid con ID: ${truffleId}`
    );

    const truffleScriptContent = `
      !function (p,i,x,e,l,j,s) {p[l] = p[l] || function (pixelId) {p[l].pixelId = pixelId};j = i.createElement(x), s = i.getElementsByTagName(x)[0], j.async = 1, j.src = e, s.parentNode.insertBefore(j, s)}(window, document, "script", "https://cdn.truffle.bid/p/inline-pixel.js", "ttf");
      ttf("${truffleId}");
    `;

    const script = document.createElement("script");
    script.id = TRUFFLE_SCRIPT_ID;
    script.innerHTML = truffleScriptContent;
    document.head.appendChild(script);

    logger.info("Pixel de Truffle.bid inyectado y activado.", {
      id: truffleId,
    });

    // Marcamos como ejecutado para prevenir futuras ejecuciones.
    hasExecuted.current = true;
    logger.endGroup();
  }, [enabled]); // La única dependencia es el interruptor de activación.
}
// src/hooks/tracking/useTrufflePixel.ts
