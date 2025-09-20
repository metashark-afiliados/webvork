// hooks/useUserPreferences.ts
/**
 * @file useUserPreferences.ts
 * @description Hook Soberano para la gestión de preferencias de usuario persistentes.
 *              - v2.0.0: Refactorizado para ser "SSR-safe". La inicialización
 *                del estado se retrasa a un `useEffect` para garantizar que
 *                `localStorage` solo se acceda en el lado del cliente.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { logger } from "@/shared/lib/logging";
import { supportedLocales, type Locale } from "@/shared/lib/i18n.config";

const PREFERENCES_STORAGE_KEY = "user-preferences";

const UserPreferencesSchema = z.object({
  locale: z.enum(supportedLocales).optional(),
  theme: z.enum(["light", "dark"]).optional(),
});

type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export const useUserPreferences = () => {
  // [1] INICIALIZACIÓN SEGURA: Se inicializa con un estado vacío en el servidor.
  const [preferences, setPreferences] = useState<UserPreferences>({});

  // [2] HIDRATACIÓN DEL LADO DEL CLIENTE: Este `useEffect` solo se ejecuta en el navegador.
  useEffect(() => {
    try {
      const storedItem = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (storedItem) {
        const parsed = JSON.parse(storedItem);
        const validation = UserPreferencesSchema.safeParse(parsed);
        if (validation.success) {
          setPreferences(validation.data);
          logger.info(
            "Preferencias de usuario cargadas desde localStorage.",
            validation.data
          );
        }
      }
    } catch (error) {
      logger.warn("No se pudieron leer las preferencias del localStorage.", {
        error,
      });
    }
  }, []); // Se ejecuta solo una vez, al montar el componente en el cliente.

  const setPreference = useCallback(
    <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      setPreferences((prev) => {
        const newPrefs = { ...prev, [key]: value };
        try {
          // La escritura también se encapsula aquí para mayor seguridad.
          localStorage.setItem(
            PREFERENCES_STORAGE_KEY,
            JSON.stringify(newPrefs)
          );
          logger.trace(
            "Preferencias de usuario persistidas en localStorage",
            newPrefs
          );
        } catch (error) {
          logger.error("Fallo al guardar las preferencias en localStorage.", {
            error,
          });
        }
        return newPrefs;
      });
    },
    []
  );

  return { preferences, setPreference };
};
