// src/hooks/tracking/useYandexMetrika.ts
/**
 * @file useYandexMetrika.ts
 * @description Hook Atómico de Efecto para el píxel de Yandex Metrika.
 *              Diseñado para ser activado una sola vez por un hook orquestador.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect, useRef } from "react";
import { producerConfig } from "@/config/producer.config";
import { clientLogger } from "@/lib/logging";

const YANDEX_SCRIPT_ID = "yandex-metrika-init";

/**
 * @function useYandexMetrika
 * @description Gestiona la inyección del script de Yandex Metrika.
 *              Se ejecuta una sola vez cuando el parámetro 'enabled' pasa a ser true.
 * @param {boolean} enabled - El interruptor de activación proporcionado por el orquestador.
 */
export function useYandexMetrika(enabled: boolean): void {
  const hasExecuted = useRef(false);

  useEffect(() => {
    // Guarda de seguridad: Solo se ejecuta si está habilitado y no se ha ejecutado antes.
    if (!enabled || hasExecuted.current) {
      return;
    }

    const yandexId = producerConfig.TRACKING.YANDEX_METRIKA_ID;

    // Guarda de seguridad: No hace nada si el ID no está configurado.
    if (!yandexId) {
      return;
    }

    // Guarda de seguridad: Evita la reinyección si el script ya existe en el DOM por algún motivo.
    if (document.getElementById(YANDEX_SCRIPT_ID)) {
      return;
    }

    clientLogger.startGroup("Hook: useYandexMetrika");
    clientLogger.trace(
      `Activado. Inyectando script de Yandex Metrika con ID: ${yandexId}`
    );

    const ymScriptContent = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.com/metrika/tag.js", "ym");
      ym(${yandexId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
    `;

    const script = document.createElement("script");
    script.id = YANDEX_SCRIPT_ID;
    script.innerHTML = ymScriptContent;
    document.head.appendChild(script);

    clientLogger.info("Pixel de Yandex Metrika inyectado y activado.", {
      id: yandexId,
    });

    // Marcamos como ejecutado para prevenir futuras ejecuciones.
    hasExecuted.current = true;
    clientLogger.endGroup();
  }, [enabled]); // La única dependencia es el interruptor de activación.
}
// src/hooks/tracking/useYandexMetrika.ts
