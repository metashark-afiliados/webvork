// app/[locale]/(dev)/dev/test-page/page.tsx
/**
 * @file page.tsx
 * @description Página de servidor para la Vitrina de Componentes de Resiliencia.
 *              - v6.0.0 (Data Orchestration Fix): Reingeniería completa para cargar
 *                y fusionar tanto el diccionario global como un diccionario de campaña
 *                de ejemplo, resolviendo el crash de SSR por datos faltantes.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { getAllCampaignsAndVariants } from "@/lib/dev/campaign.utils";
import { loadCampaignAsset } from "@/lib/i18n/campaign.data.loader";
import {
  CampaignThemeSchema,
  type CampaignTheme,
} from "@/lib/i18n/campaign.data.processor";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import TestPageClient from "./_components/TestPageClient";
import { ZodError } from "zod";

interface DevTestPageProps {
  params: { locale: Locale };
}

export interface AvailableTheme {
  id: string;
  name: string;
  themeData: CampaignTheme;
}

// Componente de error para mostrar un feedback claro en caso de fallo.
const ErrorDisplay = ({
  error,
  validationError,
}: {
  error: Error;
  validationError: ZodError | Error | null;
}) => (
  <div className="text-destructive p-8">
    <h1 className="text-3xl font-bold">Error de Orquestación de Datos</h1>
    <p className="mt-2">{error.message}</p>
    {validationError && validationError instanceof ZodError && (
      <details className="mt-4 text-left bg-muted/50 p-4 rounded-md">
        <summary className="cursor-pointer font-semibold">
          Detalles del Error de Validación de Zod
        </summary>
        <pre className="mt-2 text-xs whitespace-pre-wrap">
          {JSON.stringify(validationError.flatten().fieldErrors, null, 2)}
        </pre>
      </details>
    )}
  </div>
);

export default async function DevTestPage({
  params: { locale },
}: DevTestPageProps): Promise<React.ReactElement> {
  logger.startGroup(
    "Vitrina de Componentes: Fase de Carga de Datos (Servidor)"
  );
  let validationError: ZodError | Error | null = null;

  try {
    // 1. Cargar el diccionario global y el de una campaña de ejemplo en paralelo.
    const [{ dictionary: globalDictionary, error: dictError }, campaignData] =
      await Promise.all([
        getDictionary(locale),
        getCampaignData("12157", locale, "02"), // Usamos la variante 'Vitality' como mock
      ]);

    validationError = dictError;
    if (dictError) {
      throw new Error("Fallo en la validación del diccionario global.");
    }

    // 2. Fusionar ambos diccionarios. El de campaña tiene prioridad.
    const masterDictionary = {
      ...globalDictionary,
      ...campaignData.dictionary,
    };

    logger.success("Diccionario Maestro ensamblado con éxito.");

    // 3. Cargar los temas disponibles (lógica sin cambios).
    const campaignVariants = await getAllCampaignsAndVariants();
    const themePromises = campaignVariants.map(async (variant) => {
      try {
        const campaignMap = await import(
          `@/content/campaigns/${variant.campaignId}/campaign.map.json`
        );
        const themePath = campaignMap.variants[variant.variantId].theme;
        const themeData = await loadCampaignAsset<CampaignTheme>(
          variant.campaignId,
          themePath
        );
        const validation = CampaignThemeSchema.safeParse(themeData);
        if (validation.success) {
          return {
            id: variant.variantId,
            name: variant.name,
            themeData: validation.data,
          };
        }
      } catch (e) {
        logger.warn(`No se pudo cargar el tema para ${variant.name}`, { e });
      }
      return null;
    });

    const availableThemes = (await Promise.all(themePromises)).filter(
      Boolean
    ) as AvailableTheme[];
    logger.success(`${availableThemes.length} temas de campaña cargados.`);

    // 4. Pasar el diccionario maestro COMPLETO al componente cliente.
    return (
      <TestPageClient
        locale={locale}
        masterDictionary={masterDictionary as Dictionary}
        availableThemes={availableThemes}
      />
    );
  } catch (error) {
    logger.error(
      "Fallo crítico al cargar datos para la Vitrina de Componentes",
      { error }
    );
    return (
      <ErrorDisplay error={error as Error} validationError={validationError} />
    );
  } finally {
    logger.endGroup();
  }
}
