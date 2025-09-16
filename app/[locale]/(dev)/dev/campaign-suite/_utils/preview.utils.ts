// app/[locale]/(dev)/dev/campaign-suite/_utils/preview.utils.ts
/**
 * @file preview.utils.ts
 * @description Utilidades del lado del cliente para ensamblar los datos de la vista previa.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import type { ContentData, LayoutConfigItem } from "../_types/draft.types";
import { sectionsConfig } from "@/lib/config/sections.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";

/**
 * @function buildPreviewDictionary
 * @description Transforma los datos de contenido del borrador en un diccionario
 *              parcial que el SectionRenderer puede consumir.
 */
export function buildPreviewDictionary(
  contentData: ContentData,
  layoutConfig: LayoutConfigItem[],
  locale: Locale
): Partial<Dictionary> {
  const dictionary: Partial<Dictionary> = {};

  for (const section of layoutConfig) {
    const sectionKey =
      sectionsConfig[section.name as keyof typeof sectionsConfig]
        ?.dictionaryKey;
    if (
      sectionKey &&
      contentData[section.name] &&
      contentData[section.name][locale]
    ) {
      (dictionary as any)[sectionKey] = contentData[section.name][locale];
    }
  }

  return dictionary;
}
// app/[locale]/(dev)/dev/campaign-suite/_utils/preview.utils.ts
