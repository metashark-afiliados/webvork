// src/hooks/tracking/useGoogleAnalytics.ts
/**
 * @file useGoogleAnalytics.ts
 * @description Hook Atómico de Efecto para el píxel de Google Analytics.
 *              Diseñado para ser activado una sola vez por un hook orquestador.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect, useRef } from "react";
import { producerConfig } from "@/config/producer.config";
import { clientLogger } from "@/lib/logging";

const GA_REMOTE_SCRIPT_ID = "google-analytics-gtag";
const GA_INIT_SCRIPT_ID = "google-analytics-init";

/**
 * @function useGoogleAnalytics
 * @description Gestiona la inyección de los scripts de Google Analytics (gtag).
 *              Se ejecuta una sola vez cuando el parámetro 'enabled' pasa a ser true.
 * @param {boolean} enabled - El interruptor de activación proporcionado por el orquestador.
 */
export function useGoogleAnalytics(enabled: boolean): void {
  const hasExecuted = useRef(false);

  useEffect(() => {
    // Guarda de seguridad: Solo se ejecuta si está habilitado y no se ha ejecutado antes.
    if (!enabled || hasExecuted.current) {
      return;
    }

    const gaId = producerConfig.TRACKING.GOOGLE_ANALYTICS_ID;

    // Guarda de seguridad: No hace nada si el ID no está configurado.
    if (!gaId) {
      return;
    }

    // Guarda de seguridad: Evita la reinyección si los scripts ya existen en el DOM.
    if (
      document.getElementById(GA_REMOTE_SCRIPT_ID) ||
      document.getElementById(GA_INIT_SCRIPT_ID)
    ) {
      return;
    }

    clientLogger.startGroup("Hook: useGoogleAnalytics");
    clientLogger.trace(
      `Activado. Inyectando scripts de Google Analytics con ID: ${gaId}`
    );

    const remoteScript = document.createElement("script");
    remoteScript.id = GA_REMOTE_SCRIPT_ID;
    remoteScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    remoteScript.async = true;
    document.head.appendChild(remoteScript);

    const initScript = document.createElement("script");
    initScript.id = GA_INIT_SCRIPT_ID;
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(initScript);

    clientLogger.info("Pixel de Google Analytics inyectado y activado.", {
      id: gaId,
    });

    // Marcamos como ejecutado para prevenir futuras ejecuciones.
    hasExecuted.current = true;
    clientLogger.endGroup();
  }, [enabled]); // La única dependencia es el interruptor de activación.
}
// src/hooks/tracking/useGoogleAnalytics.ts
