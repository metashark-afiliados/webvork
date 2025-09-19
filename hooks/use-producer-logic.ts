// RUTA: hooks/use-producer-logic.ts
/**
 * @file use-producer-logic.ts
 * @description Hook Soberano Orquestador para toda la lógica del productor.
 *              v5.0.0 (nos3 System Integration): Integra la activación del nuevo
 *              sistema de inteligencia comportamental `nos3`, posicionando a este
 *              orquestador como el punto de entrada único para toda la lógica
 *              de tracking de la aplicación.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect } from "react";
import { logger } from "@/lib/logging";
import { producerConfig } from "@/config/producer.config";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { useUtmTracker } from "./tracking/use-utm-tracker";
import { useYandexMetrika } from "./tracking/use-yandex-metrika";
import { useGoogleAnalytics } from "./tracking/use-google-analytics";
import { useTrufflePixel } from "./tracking/use-truffle-pixel";
import { useWebvorkGuid } from "./tracking/use-webvork-guid";
import { useNos3Tracker } from "./tracking/use-nos3-tracker"; // <-- NUEVO APARATO INTEGRADO

const ORCHESTRATOR_STYLE =
  "color: #8b5cf6; font-weight: bold; border: 1px solid #8b5cf6; padding: 2px 4px; border-radius: 4px;";

export function useProducerLogic(): void {
  const { status: consentStatus } = useCookieConsent();
  const [hasInteracted, setHasInteracted] = useState(false);

  // Efecto para detectar la primera interacción del usuario de forma pasiva.
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

  // SSoT para la decisión de inicializar CUALQUIER script de tracking.
  const canInitializeTracking =
    producerConfig.TRACKING_ENABLED && consentStatus === "accepted";
  const shouldInitialize = canInitializeTracking && hasInteracted;

  // Logging de estado para máxima observabilidad.
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

  // --- Invocación de los hooks de tracking atómicos ---
  // Cada hook es responsable de su propia lógica, pero su activación
  // es controlada soberanamente por este orquestador.
  useUtmTracker(shouldInitialize);
  useYandexMetrika(shouldInitialize);
  useGoogleAnalytics(shouldInitialize);
  useTrufflePixel(shouldInitialize);
  useWebvorkGuid(shouldInitialize);
  useNos3Tracker(shouldInitialize); // <-- NUEVO APARATO ACTIVADO
}
