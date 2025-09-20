// RUTA: hooks/tracking/use-nos3-tracker.ts
/**
 * @file use-nos3-tracker.ts
 * @description Hook soberano y orquestador para el colector de `nos3`.
 *              v2.0.0 (Official Types): Refactorizado para usar el tipo oficial
 *              `eventWithTime` de `@rrweb/types`, garantizando la máxima
 *              compatibilidad y seguridad de tipos.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { record } from "rrweb";
// --- [INICIO DE REFACTORIZACIÓN ARQUITECTÓNICA] ---
// Se importa el tipo oficial desde su propio paquete.
import type { eventWithTime } from "@rrweb/types";
// --- [FIN DE REFACTORIZACIÓN ARQUITECTÓNICA] ---
import { createId } from "@paralleldrive/cuid2";
import { logger } from "@/lib/logging";

const SESSION_STORAGE_KEY = "nos3_session_id";
const BATCH_INTERVAL_MS = 15000;
const MAX_EVENTS_PER_BATCH = 100;

export function useNos3Tracker(enabled: boolean): void {
  const isRecording = useRef(false);
  // El buffer ahora utiliza el tipo oficial.
  const eventsBuffer = useRef<eventWithTime[]>([]);
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

    const stopRecording = record({
      emit(event: eventWithTime) { // Ahora se usa el tipo oficial directamente.
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
