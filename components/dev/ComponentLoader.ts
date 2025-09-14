// components/dev/ComponentLoader.ts
/**
 * @file ComponentLoader.ts
 * @description Módulo de servicio para la carga dinámica de componentes en el Dev Canvas.
 *              - v4.2.0 (Sincronización de Contrato): Actualizado para consumir el nuevo
 *                contrato de `getDictionary`, desestructurando la respuesta y resolviendo
 *                los errores de tipo.
 * @version 4.2.0
 * @author RaZ Podestá - MetaShark Tech
 * @date 2025-09-14T18:20:40.121Z
 */
import React from "react";
import {
  getComponentByName,
  type ComponentRegistryEntry,
} from "./ComponentRegistry";
import { logger } from "@/lib/logging";
import { getDictionary } from "@/lib/i18n";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { getFallbackProps } from "./utils/component-props";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { CampaignData } from "@/lib/i18n/campaign.i18n";

interface ComponentLoadResult {
  ComponentToRender: React.ComponentType<any>;
  componentProps: Record<string, any>;
  appliedTheme: CampaignData["theme"] | null;
  entry: ComponentRegistryEntry;
}

const DEV_MOCK_VARIANT_ID = "02"; // Vitality

export async function loadComponentAndProps(
  componentName: string,
  locale: string
): Promise<ComponentLoadResult> {
  logger.startGroup(`[Loader] Cargando "${componentName}"`);

  const entry = getComponentByName(componentName);
  if (!entry) {
    const errorMsg = `Componente "${componentName}" no encontrado en ComponentRegistry.`;
    logger.error(errorMsg);
    logger.endGroup();
    throw new Error(errorMsg);
  }

  let componentProps: Record<string, any> = {};
  let appliedTheme: CampaignData["theme"] | null = null;
  let dictionary: Partial<Dictionary> = {};

  try {
    if (entry.isCampaignComponent) {
      const campaignData = await getCampaignData(
        "12157",
        locale,
        DEV_MOCK_VARIANT_ID
      );
      dictionary = campaignData.dictionary;
      appliedTheme = campaignData.theme;
    } else {
      // --- [INICIO] CORRECCIÓN DE CONTRATO ---
      const { dictionary: globalDictionary } = await getDictionary(locale);
      dictionary = globalDictionary;
      // --- [FIN] CORRECCIÓN DE CONTRATO ---
    }

    const key = entry.dictionaryKey as keyof Dictionary;
    const propsFromDict = dictionary[key];

    componentProps = propsFromDict
      ? { content: propsFromDict }
      : getFallbackProps(componentName);

    if (componentName === "Header") {
      componentProps.devDictionary = dictionary.devRouteMenu;
    }

    logger.trace("Props de i18n cargadas exitosamente.");
  } catch (error) {
    logger.error(
      `Fallo al cargar datos para ${componentName}. Usando fallback.`,
      { error }
    );
    componentProps = getFallbackProps(componentName);
  }

  try {
    const componentModule = await import(
      /* @vite-ignore */ `../../${entry.componentPath.replace("@/", "")}`
    );
    const ComponentToRender =
      componentModule.default ||
      componentModule[componentName] ||
      componentModule[entry.dictionaryKey] ||
      componentModule[Object.keys(componentModule)[0]];

    if (!ComponentToRender) {
      throw new Error(
        `Exportación por defecto o nombrada no encontrada en "${entry.componentPath}"`
      );
    }

    logger.success(
      `Componente "${componentName}" y sus props cargados con éxito.`
    );
    logger.endGroup();

    return { ComponentToRender, componentProps, appliedTheme, entry };
  } catch (error) {
    const errorMsg = `Error crítico al importar dinámicamente el módulo para "${componentName}".`;
    logger.error(errorMsg, { path: entry.componentPath, error });
    logger.endGroup();
    throw new Error(
      `No se pudo cargar el módulo del componente: ${entry.componentPath}`
    );
  }
}
