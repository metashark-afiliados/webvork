// src/components/dev/ComponentLoader.ts
/**
 * @file ComponentLoader.ts
 * @description Módulo de servicio para la carga dinámica de componentes en el Dev Canvas.
 *              Refactorizado para eliminar el mapa de módulos estático y depender exclusivamente
 *              de `ComponentRegistry` como la única fuente de verdad (SSoT), respetando el principio DRY.
 * @version 3.0.0
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

/**
 * @interface ComponentLoadResult
 * @description Define la estructura del objeto devuelto por el loader.
 */
interface ComponentLoadResult {
  ComponentToRender: React.ComponentType<any>;
  componentProps: Record<string, any>;
  appliedTheme: CampaignData["theme"] | null;
  entry: ComponentRegistryEntry;
}

/**
 * @constant DEV_MOCK_VARIANT_ID
 * @description Define la variante de campaña por defecto a usar para mock data en el Canvas.
 *              Centralizado para facilitar futuras modificaciones.
 */
const DEV_MOCK_VARIANT_ID = "02"; // Vitality

/**
 * @function loadComponentAndProps
 * @description Carga dinámicamente un componente y sus props de i18n para el Dev Canvas.
 * @param {string} componentName El identificador del componente en el registro.
 * @param {string} locale El locale para cargar el contenido.
 * @returns {Promise<ComponentLoadResult>} Un objeto con el componente, sus props, el tema y la entrada del registro.
 * @throws {Error} Si el componente o su módulo no se encuentran.
 */
export async function loadComponentAndProps(
  componentName: string,
  locale: string
): Promise<ComponentLoadResult> {
  logger.startGroup(`[Loader] Cargando "${componentName}"`);

  // 1. Obtener metadatos del componente desde la SSoT (`ComponentRegistry`).
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
  let dictionary: Dictionary;

  try {
    // 2. Cargar el diccionario de datos apropiado basado en los metadatos.
    if (entry.isCampaignComponent) {
      const campaignData = await getCampaignData(
        "12157", // ID de campaña hardcodeado para desarrollo
        locale,
        DEV_MOCK_VARIANT_ID
      );
      dictionary = campaignData.dictionary;
      appliedTheme = campaignData.theme;
    } else {
      dictionary = await getDictionary(locale);
    }

    // 3. Extraer las props específicas del componente desde el diccionario.
    const key = entry.dictionaryKey as keyof typeof dictionary;
    const propsFromDict = dictionary[key];

    // Si las props no se encuentran en el diccionario, usa el fallback.
    componentProps = propsFromDict
      ? { content: propsFromDict }
      : getFallbackProps(componentName);

    // Caso especial para Header que necesita dos props de diccionario
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
    // 4. Importar dinámicamente el módulo del componente usando la ruta de la SSoT.
    // La advertencia de "dependencia crítica" es aceptada aquí por la naturaleza de la herramienta.
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
// src/components/dev/ComponentLoader.ts
