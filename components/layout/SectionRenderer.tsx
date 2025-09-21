// RUTA: components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado de élite del lado del servidor.
 *              v14.0.0 (Definitive Type Safety): Erradica el uso de 'any',
 *              reemplazándolo con una aserción de tipo genérica pero segura que
 *              cumple con los estándares de 'no-explicit-any' y la higiene de código.
 * @version 14.0.0
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

// --- [INICIO DE REFACTORIZACIÓN DE ÉLITE: TIPADO SEGURO] ---
/**
 * @type GenericSectionComponent
 * @description Define un contrato de tipo genérico para cualquier componente de sección
 *              que pueda ser renderizado dinámicamente. Es un componente forwardRef
 *              que acepta un conjunto mínimo de props requeridas.
 */
type GenericSectionComponent = React.ForwardRefExoticComponent<
  {
    content: Record<string, unknown>; // Validado por Zod en tiempo de ejecución
    locale: Locale;
    isFocused?: boolean;
  } & React.RefAttributes<HTMLElement>
>;
// --- [FIN DE REFACTORIZACIÓN DE ÉLITE: TIPADO SEGURO] ---

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
  logger.info(
    "[SectionRenderer v14.0] Ensamblando página (Definitive Type Safety)..."
  );

  const renderSection = (section: { name: string }, index: number) => {
    const sectionName = section.name as SectionName;
    const config = sectionsConfig[sectionName];

    if (!config) {
      logger.warn(
        `[SectionRenderer] Configuración para "${sectionName}" no encontrada.`
      );
      return null;
    }

    const { component, dictionaryKey, schema } = config;
    const contentData = dictionary[dictionaryKey as keyof Dictionary];
    const validation = schema.safeParse(contentData);

    if (!validation.success) {
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

    // --- [INICIO DE REFACTORIZACIÓN DE ÉLITE: TIPADO SEGURO] ---
    // Se realiza un cast al tipo genérico seguro en lugar de 'any'.
    const Component = component as GenericSectionComponent;
    // --- [FIN DE REFACTORIZACIÓN DE ÉLITE: TIPADO SEGURO] ---

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
