// app/[locale]/(dev)/dev/test-page/page.tsx
/**
 * @file page.tsx
 * @description Página de servidor para la Vitrina de Componentes de Resiliencia.
 *              v8.4.0: Desacopla la definición del tipo `AvailableTheme` a su
 *              propia SSoT para romper la dependencia circular con el cliente.
 * @version 8.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import {
  getCampaignData,
  resolveCampaignVariant,
} from "@/lib/i18n/campaign.i18n";
import { getAllCampaignsAndVariants } from "@/lib/dev/campaign.utils";
import { loadJsonAsset } from "@/lib/i18n/campaign.data.loader";
import {
  AssembledThemeSchema,
  type AssembledTheme,
} from "@/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import TestPageClient from "./_components/TestPageClient";
import { ZodError } from "zod";
import { deepMerge } from "@/lib/utils/merge";
import { parseThemeNetString } from "@/lib/utils/theme.utils";
import { netTracePrefixToPathMap } from "@/lib/config/theming.config";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { AvailableTheme } from "./_types/themes.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

interface DevTestPageProps {
  params: { locale: Locale };
}

// ... (El resto del componente permanece exactamente igual)
// El tipo `AvailableTheme` ya no se exporta desde aquí.
const ErrorDisplay = ({
  error,
  validationError,
}: {
  error: Error;
  validationError: ZodError | Error | null;
}) => (
  // ... JSX sin cambios
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
    const [{ dictionary: globalDictionary, error: dictError }, campaignData] =
      await Promise.all([
        getDictionary(locale),
        getCampaignData("12157", locale, "02"),
      ]);
    validationError = dictError;
    if (dictError)
      throw new Error("Fallo en la validación del diccionario global.");
    const masterDictionary = {
      ...globalDictionary,
      ...campaignData.dictionary,
    };
    logger.success("Diccionario Maestro ensamblado con éxito.");
    const campaignVariants = await getAllCampaignsAndVariants();
    const baseTheme = await loadJsonAsset<Partial<AssembledTheme>>(
      "theme-fragments",
      "base",
      "global.theme.json"
    );
    const themePromises = campaignVariants.map(async (variantInfo) => {
      try {
        const { variant } = await resolveCampaignVariant(
          variantInfo.campaignId,
          variantInfo.variantId
        );
        const themePlan = parseThemeNetString(variant.theme);
        const fragmentPromises = Object.entries(themePlan).map(
          ([prefix, name]) => {
            const dir =
              netTracePrefixToPathMap[
                prefix as keyof typeof netTracePrefixToPathMap
              ];
            if (!dir) return Promise.resolve({});
            return loadJsonAsset<Partial<AssembledTheme>>(
              "theme-fragments",
              dir,
              `${name}.${dir}.json`
            );
          }
        );
        const themeFragments = await Promise.all(fragmentPromises);
        let finalTheme: AssembledTheme = baseTheme as AssembledTheme;
        for (const fragment of themeFragments) {
          finalTheme = deepMerge(finalTheme, fragment as AssembledTheme);
        }
        finalTheme = deepMerge(
          finalTheme,
          (variant.themeOverrides ?? {}) as AssembledTheme
        );
        const validation = AssembledThemeSchema.safeParse(finalTheme);
        if (validation.success) {
          return {
            id: variantInfo.variantId,
            name: variantInfo.name,
            themeData: validation.data,
          };
        }
      } catch (e) {
        logger.warn(`No se pudo cargar el tema para ${variantInfo.name}`, {
          e,
        });
      }
      return null;
    });
    const availableThemes = (await Promise.all(themePromises)).filter(
      Boolean
    ) as AvailableTheme[];
    logger.success(`${availableThemes.length} temas de campaña cargados.`);
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
// app/[locale]/(dev)/dev/test-page/page.tsx
