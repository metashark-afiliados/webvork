// RUTA: hooks/tracking/use-nos3-tracker.ts
/**
 * @file use-nos3-tracker.ts
 * @description Hook soberano y orquestador para el colector de `nos3`.
 *              v1.1.0 (Holistic Integrity & Type Safety): Resuelve errores de
 *              linting y de tipo. Define explícitamente el tipo de evento de
 *              `rrweb` y asegura que todas las variables declaradas se utilicen,
 *              restaurando la integridad del build.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { record, type eventWithTime } from "rrweb"; // Importamos el tipo de evento
import { createId } from "@paralleldrive/cuid2";
import { logger } from "@/lib/logging";

const SESSION_STORAGE_KEY = "nos3_session_id";
const BATCH_INTERVAL_MS = 15000;
const MAX_EVENTS_PER_BATCH = 100;

// Usamos el tipo exportado por rrweb para eliminar el 'any' implícito.
type RrwebEvent = eventWithTime;

export function useNos3Tracker(enabled: boolean): void {
  const isRecording = useRef(false);
  const eventsBuffer = useRef<RrwebEvent[]>([]);
  const pathname = usePathname();

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
      // La variable 'error' ahora se usa en el log.
      logger.warn(
        "[nos3-colector] sessionStorage no está disponible. Usando ID efímero.",
        { error }
      );
      return createId();
    }
  }, []);

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
            keepalive: true,
          });
          logger.trace(
            `[nos3-colector] Lote enviado vía fetch para sesión ${sessionId}.`
          );
        }
      } catch (error) {
        // La variable 'error' ahora se usa en el log.
        logger.error("[nos3-colector] Fallo al enviar lote de eventos.", {
          error,
        });
        eventsBuffer.current = [...eventsToSend, ...eventsBuffer.current];
      }
    },
    [pathname, getOrCreateSessionId]
  );

  useEffect(() => {
    if (!enabled || isRecording.current) {
      return;
    }

    logger.info(
      "[nos3-colector] Condiciones cumplidas. Iniciando grabación de sesión."
    );
    isRecording.current = true;

    const intervalId = setInterval(flushEvents, BATCH_INTERVAL_MS);

    // Se usa el tipo explícito `RrwebEvent` para el parámetro del callback.
    const stopRecording = record({
      emit(event: RrwebEvent) {
        eventsBuffer.current.push(event);
        if (eventsBuffer.current.length >= MAX_EVENTS_PER_BATCH) {
          flushEvents();
        }
      },
      maskAllInputs: true,
      blockClass: "nos3-block",
      maskTextClass: "nos3-mask",
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushEvents(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      logger.info("[nos3-colector] Deteniendo grabación de sesión.");
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (stopRecording) {
        stopRecording();
      }
      flushEvents(true);
      isRecording.current = false;
    };
  }, [enabled, flushEvents]);
}
