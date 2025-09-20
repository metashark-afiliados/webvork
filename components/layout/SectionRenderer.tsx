// RUTA: components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado de élite del lado del servidor.
 *              Implementa validación de contratos en tiempo de ejecución con Zod
 *              para garantizar la máxima resiliencia y seguridad de tipos.
 * @version 12.0.0 (Focus-Aware & Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import {
  sectionsConfig,
  type SectionName,
} from "@/shared/lib/config/sections.config";
import { logger } from "@/shared/lib/logging";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";
import type { Locale } from "@/shared/lib/i18n.config";
import { ValidationError } from "@/components/ui/ValidationError";
import { SectionAnimator } from "./SectionAnimator";

interface SectionRendererProps {
  sections: { name?: string | undefined }[];
  dictionary: Dictionary;
  locale: Locale;
  focusedSection?: string | null;
  sectionRefs?: React.MutableRefObject<Record<string, HTMLElement>>;
}

export function SectionRenderer({
  sections,
  dictionary,
  locale,
  focusedSection = null,
  sectionRefs,
}: SectionRendererProps): React.ReactElement {
  logger.info("[SectionRenderer v12.0] Ensamblando página (Focus-Aware)...");

  const renderSection = (section: { name: string }, index: number) => {
    const sectionName = section.name as SectionName;
    const config = sectionsConfig[sectionName];

    if (!config) {
      logger.warn(
        `[SectionRenderer] Configuración para "${sectionName}" no encontrada.`
      );
      return null;
    }

    const { component: Component, dictionaryKey, schema } = config;
    const contentData = dictionary[dictionaryKey as keyof Dictionary];

    // --- NÚCLEO DE LA SOLUCIÓN ARQUITECTÓNICA: VALIDACIÓN EN TIEMPO DE EJECUCIÓN ---
    const validation = schema.safeParse(contentData);

    if (!validation.success) {
      // En desarrollo, muestra un error detallado. En producción, falla silenciosamente.
      if (
        process.env.NODE_ENV === "development" &&
        dictionary.validationError
      ) {
        return (
          <ValidationError
            key={`${sectionName}-${index}-error`}
            sectionName={sectionName}
            error={validation.error}
            content={dictionary.validationError}
          />
        );
      }
      logger.error(
        `[SectionRenderer] Fallo de validación de datos para la sección '${sectionName}'. No se renderizará en producción.`
      );
      return null;
    }

    // Si la validación pasa, `validation.data` tiene el tipo correcto y seguro.
    const componentProps = {
      content: validation.data,
      locale: locale,
      isFocused: sectionName === focusedSection,
      ref: (el: HTMLElement | null) => {
        if (sectionRefs && el) {
          sectionRefs.current[sectionName] = el;
        } else if (sectionRefs) {
          delete sectionRefs.current[sectionName];
        }
      },
    };

    logger.trace(
      `[SectionRenderer] Renderizando sección #${index + 1}: ${sectionName}`
    );
    return <Component key={`${sectionName}-${index}`} {...componentProps} />;
  };

  return (
    <SectionAnimator>
      {sections
        .filter((section): section is { name: string } => {
          const isValid =
            typeof section.name === "string" && section.name.length > 0;
          if (!isValid)
            logger.warn(`[SectionRenderer] Sección inválida omitida.`, {
              sectionData: section,
            });
          return isValid;
        })
        .map(renderSection)}
    </SectionAnimator>
  );
}
