// components/dev/ComponentLoader.ts
/**
 * @file ComponentLoader.ts
 * @description Módulo de servicio para la carga dinámica de componentes en el Dev Canvas.
 *              - v4.0.0 (Ingeniería de Resiliencia): Refactorizado para ser antifrágil.
 *                Ahora maneja correctamente el tipo `Partial<Dictionary>` devuelto por el
 *                motor de i18n, utilizando acceso seguro a propiedades y activando el
 *                fallback de forma robusta. Resuelve el error de tipo TS2322.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
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
    logger.error(
      `Componente "${componentName}" no encontrado en ComponentRegistry.`
    );
    logger.endGroup();
    throw new Error(
      `Componente "${componentName}" no encontrado en el registro.`
    );
  }

  let componentProps: Record<string, any> = {};
  let appliedTheme: CampaignData["theme"] | null = null;

  // --- INICIO DE CORRECCIÓN: Manejo de Partial<Dictionary> ---
  let dictionary: Partial<Dictionary>;

  try {
    if (entry.isCampaignComponent) {
      const campaignData = await getCampaignData(
        "12157",
        locale,
        DEV_MOCK_VARIANT_ID
      );
      // El diccionario de campaña ya es completo y validado por su propio orquestador.
      dictionary = campaignData.dictionary;
      appliedTheme = campaignData.theme;
    } else {
      // getDictionary devuelve un diccionario potencialmente parcial.
      dictionary = await getDictionary(locale);
    }

    const key = entry.dictionaryKey as keyof Dictionary;
    const propsFromDict = dictionary[key];

    // Lógica de fallback robusta: si la clave no existe en el diccionario parcial, usa el fallback.
    componentProps = propsFromDict
      ? { content: propsFromDict }
      : getFallbackProps(componentName);

    // Caso especial para Header, ahora con acceso seguro.
    if (componentName === "Header") {
      componentProps.devDictionary = dictionary?.devRouteMenu;
    }

    logger.trace("Props de i18n cargadas exitosamente.");
  } catch (error) {
    logger.error(
      `Fallo al cargar datos para ${componentName}. Usando fallback.`,
      { error }
    );
    componentProps = getFallbackProps(componentName);
  }
  // --- FIN DE CORRECCIÓN ---

  try {
    const componentModule = await import(
      /* @vite-ignore */ `${entry.componentPath}`
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

    logger.info(
      `Componente "${componentName}" y sus props cargados con éxito.`
    );
    logger.endGroup();

    return { ComponentToRender, componentProps, appliedTheme, entry };
  } catch (error) {
    logger.error(
      `Error crítico al importar dinámicamente el módulo para "${componentName}".`,
      { path: entry.componentPath, error }
    );
    logger.endGroup();
    throw new Error(
      `No se pudo cargar el módulo del componente: ${entry.componentPath}`
    );
  }
}
// components/dev/ComponentLoader.ts
