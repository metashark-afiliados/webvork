// src/hooks/tracking/useWebvorkGuid.ts
/**
 * @file useWebvorkGuid.ts
 * @description Hook Atómico de Efecto para obtener el GUID de Webvork.
 *              Diseñado para ser activado una sola vez por un hook orquestador.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { producerConfig } from "@/config/producer.config";
import { logger } from "@/lib/logging";

// --- Helper Puro ---
const setCookie = (name: string, value: string, days: number = 30): void => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

/**
 * @function useWebvorkGuid
 * @description Gestiona la obtención del GUID de Webvork mediante JSONP.
 *              Se ejecuta una sola vez cuando el parámetro 'enabled' pasa a ser true.
 * @param {boolean} enabled - El interruptor de activación proporcionado por el orquestador.
 */
export function useWebvorkGuid(enabled: boolean): void {
  const hasExecuted = useRef(false);

  useEffect(() => {
    // Guarda de seguridad: Solo se ejecuta si está habilitado y no se ha ejecutado antes.
    if (!enabled || hasExecuted.current) {
      return;
    }

    logger.startGroup("Hook: useWebvorkGuid");

    const { LANDING_ID, OFFER_ID } = producerConfig;

    // Guarda de seguridad: Verifica que la configuración necesaria esté presente.
    if (!LANDING_ID || !OFFER_ID) {
      logger.warn(
        "LANDING_ID o OFFER_ID no configurados. Abortando llamada de GUID."
      );
      logger.endGroup();
      return;
    }

    logger.trace("Activado. Iniciando solicitud de GUID a Webvork...");

    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
    const scriptTagId = `script_${callbackName}`;

    (window as any)[callbackName] = () => {
      logger.startGroup("Callback: Webvork GUID Recibido");
      try {
        const guidFromHtml = document.documentElement.getAttribute("data-guid");
        if (guidFromHtml) {
          logger.info(
            `GUID confirmado desde atributo data-guid: ${guidFromHtml}`
          );
          setCookie("wv_guid", guidFromHtml, 30);
        } else {
          logger.warn(
            "Callback recibido, pero el atributo data-guid no fue encontrado."
          );
        }
      } catch (error) {
        logger.error("Error procesando callback de GUID.", { error });
      } finally {
        delete (window as any)[callbackName];
        const scriptElement = document.getElementById(scriptTagId);
        scriptElement?.remove();
        logger.endGroup();
      }
    };

    const trackerUrl = `//webvkrd.com/js.php?landing_id=${LANDING_ID}&offer_id=${OFFER_ID}&page_type=landing&callback=${callbackName}`;
    const scriptTag = document.createElement("script");
    scriptTag.id = scriptTagId;
    scriptTag.src = trackerUrl;
    document.body.appendChild(scriptTag);

    // Marcamos como ejecutado para prevenir futuras ejecuciones.
    hasExecuted.current = true;
    logger.endGroup();
  }, [enabled]); // La única dependencia es el interruptor de activación.
}
// src/hooks/tracking/useWebvorkGuid.ts
