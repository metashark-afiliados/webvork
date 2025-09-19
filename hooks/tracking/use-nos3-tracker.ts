// RUTA: hooks/tracking/use-nos3-tracker.ts
/**
 * @file use-nos3-tracker.ts
 * @description Hook soberano y orquestador para el colector de `nos3`.
 *              Este aparato gestiona el ciclo de vida de la grabación de sesiones
 *              del lado del cliente utilizando `rrweb`. Se activa tras el
 *              consentimiento e interacción del usuario, captura un rico conjunto
 *              de metadatos y envía los datos de interacción a nuestro ingestor
 *              Edge de forma eficiente y resiliente.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { record } from "rrweb";
import { createId } from "@paralleldrive/cuid2";
import { logger } from "@/lib/logging";

const SESSION_STORAGE_KEY = "nos3_session_id";
const BATCH_INTERVAL_MS = 15000; // Enviar datos cada 15 segundos
const MAX_EVENTS_PER_BATCH = 100; // O cuando se alcancen 100 eventos

type RrwebEvent = any; // rrweb emite eventos con estructuras variadas

export function useNos3Tracker(enabled: boolean): void {
  const isRecording = useRef(false);
  const eventsBuffer = useRef<RrwebEvent[]>([]);
  const pathname = usePathname();

  /**
   * @function getOrCreateSessionId
   * @description Obtiene el ID de sesión de sessionStorage o crea uno nuevo.
   *              Esto asegura la persistencia de la sesión a través de recargas de página.
   */
  const getOrCreateSessionId = useCallback((): string => {
    try {
      let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionId) {
        sessionId = createId();
        sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
        logger.trace(`[nos3-colector] Nueva sesión iniciada: ${sessionId}`);
      }
      return sessionId;
    } catch (error) {
      logger.warn(
        "[nos3-colector] sessionStorage no está disponible. Usando ID efímero."
      );
      return createId();
    }
  }, []);

  /**
   * @function flushEvents
   * @description Envía el lote de eventos acumulados al ingestor.
   */
  const flushEvents = useCallback(
    async (isUnloading = false) => {
      if (eventsBuffer.current.length === 0) return;

      const eventsToSend = [...eventsBuffer.current];
      eventsBuffer.current = [];

      const sessionId = getOrCreateSessionId();
      const payload = {
        sessionId,
        events: eventsToSend,
        metadata: {
          pathname,
          timestamp: Date.now(),
          // --- Metadatos de Élite ---
          userAgent: navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          language: navigator.language,
        },
      };

      try {
        const body = JSON.stringify(payload);
        // navigator.sendBeacon es ideal para enviar datos al descargar la página
        if (isUnloading && navigator.sendBeacon) {
          navigator.sendBeacon("/api/nos3/ingest", body);
          logger.trace(
            `[nos3-colector] Lote final enviado vía sendBeacon para sesión ${sessionId}.`
          );
        } else {
          await fetch("/api/nos3/ingest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true, // Crucial para que la petición no se cancele si el usuario navega
          });
          logger.trace(
            `[nos3-colector] Lote enviado vía fetch para sesión ${sessionId}.`
          );
        }
      } catch (error) {
        logger.error("[nos3-colector] Fallo al enviar lote de eventos.", {
          error,
        });
        // Si falla el envío, reinsertamos los eventos al buffer para el próximo intento.
        eventsBuffer.current = [...eventsToSend, ...eventsBuffer.current];
      }
    },
    [pathname, getOrCreateSessionId]
  );

  // Efecto principal que controla el ciclo de vida de la grabación
  useEffect(() => {
    if (!enabled || isRecording.current) {
      return;
    }

    logger.info(
      "[nos3-colector] Condiciones cumplidas. Iniciando grabación de sesión."
    );
    isRecording.current = true;

    // Iniciar el temporizador para enviar lotes periódicamente
    const intervalId = setInterval(flushEvents, BATCH_INTERVAL_MS);

    // Iniciar la grabación con rrweb
    const stopRecording = record({
      emit(event) {
        eventsBuffer.current.push(event);
        if (eventsBuffer.current.length >= MAX_EVENTS_PER_BATCH) {
          flushEvents();
        }
      },
      maskAllInputs: true, // Pilar 7: Privacidad por defecto
      blockClass: "nos3-block", // Pilar 7: Permite bloquear elementos sensibles
      maskTextClass: "nos3-mask", // Pilar 7: Permite enmascarar texto sensible
    });

    // Listener para enviar el lote final antes de que el usuario abandone la página
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushEvents(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Función de limpieza
    return () => {
      logger.info("[nos3-colector] Deteniendo grabación de sesión.");
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (stopRecording) {
        stopRecording();
      }
      flushEvents(true); // Intenta enviar cualquier evento restante
      isRecording.current = false;
    };
  }, [enabled, flushEvents]);
}
