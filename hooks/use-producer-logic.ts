// hooks/use-producer-logic.ts
/**
 * @file use-producer-logic.ts
 * @description Hook Soberano Orquestador para la lógica del productor.
 *              v4.1.0 (Module Resolution Fix): Corrige la ruta de importación
 *              del hook `useCookieConsent` para alinearse con la convención
 *              de nomenclatura `kebab-case` y resolver el error de build.
 * @version 4.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect } from "react";
import { logger } from "@/lib/logging";
import { producerConfig } from "@/config/producer.config";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import { useCookieConsent } from "@/hooks/use-cookie-consent";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { useUtmTracker } from "./tracking/use-utm-tracker";
import { useYandexMetrika } from "./tracking/use-yandex-metrika";
import { useGoogleAnalytics } from "./tracking/use-google-analytics";
import { useTrufflePixel } from "./tracking/use-truffle-pixel";
import { useWebvorkGuid } from "./tracking/use-webvork-guid";

const ORCHESTRATOR_STYLE =
  "color: #8b5cf6; font-weight: bold; border: 1px solid #8b5cf6; padding: 2px 4px; border-radius: 4px;";

export function useProducerLogic(): void {
  const { status: consentStatus } = useCookieConsent();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;

    const handleInteraction = () => {
      logger.info(
        "[useProducerLogic] Interacción de usuario detectada. Activando lógica de tracking diferido."
      );
      setHasInteracted(true);
      removeListeners();
    };

    const eventListeners: (keyof WindowEventMap)[] = [
      "mousedown",
      "touchstart",
      "keydown",
      "scroll",
    ];

    const addListeners = () => {
      eventListeners.forEach((event) =>
        window.addEventListener(event, handleInteraction, {
          once: true,
          passive: true,
        })
      );
    };

    const removeListeners = () => {
      eventListeners.forEach((event) =>
        window.removeEventListener(event, handleInteraction)
      );
    };

    addListeners();

    return () => removeListeners();
  }, [hasInteracted]);

  const canInitializeTracking =
    producerConfig.TRACKING_ENABLED && consentStatus === "accepted";
  const shouldInitialize = canInitializeTracking && hasInteracted;

  useEffect(() => {
    if (!producerConfig.TRACKING_ENABLED) {
      logger.warn(
        "[useProducerLogic] Tracking deshabilitado por configuración global."
      );
      return;
    }

    if (consentStatus === "rejected") {
      logger.info(
        "[useProducerLogic] Tracking deshabilitado por preferencia del usuario."
      );
    } else if (consentStatus === "accepted" && !hasInteracted) {
      console.log(
        `%c[useProducerLogic] Tracking en espera de interacción del usuario...`,
        ORCHESTRATOR_STYLE
      );
    }
  }, [consentStatus, hasInteracted]);

  useUtmTracker(shouldInitialize);
  useYandexMetrika(shouldInitialize);
  useGoogleAnalytics(shouldInitialize);
  useTrufflePixel(shouldInitialize);
  useWebvorkGuid(shouldInitialize);
}
