// components/dev/ComponentLoader.ts
/**
 * @file ComponentLoader.ts
 * @description Módulo de servicio para la carga dinámica de componentes en el Dev Canvas.
 *              - v4.3.0 (Type Safety): Se erradica el uso de 'any', reforzando
 *                los contratos de tipos y la seguridad del orquestador.
 * @version 4.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import {
  getComponentByName,
  type ComponentRegistryEntry,
} from "./ComponentRegistry";
import { logger } from "@/shared/lib/logging";
import { getDictionary } from "@/shared/lib/i18n";
import { getCampaignData } from "@/shared/lib/i18n/campaign.i18n";
import { getFallbackProps } from "./utils/component-props";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";
import type { AssembledTheme } from "@/shared/lib/schemas/theming/assembled-theme.schema";

interface ComponentLoadResult {
  ComponentToRender: React.ComponentType<Record<string, unknown>>; // Tipo más seguro
  componentProps: Record<string, unknown>; // Tipo más seguro
  appliedTheme: AssembledTheme | null;
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

  let componentProps: Record<string, unknown> = {}; // Tipo más seguro
  let appliedTheme: AssembledTheme | null = null;
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
      const { dictionary: globalDictionary } = await getDictionary(locale);
      dictionary = globalDictionary;
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
      `../../${entry.componentPath.replace("@/", "")}`
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
// components/dev/ComponentLoader.ts
