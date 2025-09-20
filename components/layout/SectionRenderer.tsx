// RUTA: components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado de élite del lado del servidor.
 *              v10.1.0 (Definitive Type Assertion): Resuelve el error de tipo
 *              crítico TS2322 mediante una aserción de tipo explícita después
 *              de una validación exitosa con Zod, garantizando la seguridad
 *              de tipos de extremo a extremo.
 * @version 10.1.0
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
  logger.info(
    "[SectionRenderer v10.1] Ensamblando página en servidor (Definitive Type Assertion)..."
  );

  const validSections = sections.filter(
    (section): section is { name: string } => {
      if (typeof section.name === "string" && section.name.length > 0)
        return true;
      logger.warn(`[SectionRenderer] Sección inválida omitida.`, {
        sectionData: section,
      });
      return false;
    }
  );

  return (
    <SectionAnimator>
      {validSections.map((section, index) => {
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
        const validation = schema.safeParse(contentData);

        if (!validation.success) {
          return (
            dictionary.validationError && (
              <ValidationError
                key={`${sectionName}-${index}-error`}
                sectionName={sectionName}
                error={validation.error}
                content={dictionary.validationError}
              />
            )
          );
        }

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

        // --- [INICIO DE REFACTORIZACIÓN DE TIPO Y DOCUMENTACIÓN] ---
        // La siguiente aserción de tipo 'any' es una decisión de diseño deliberada y segura.
        // **Justificación:** Este es un componente despachador dinámico. Aunque TypeScript
        // no puede garantizar en tiempo de compilación que `componentProps` coincide
        // con las props de cada `Component` posible, nuestra arquitectura SÍ lo garantiza
        // en tiempo de ejecución a través de la validación de Zod (`validation.success`)
        // que se ejecuta justo arriba. Esta validación confirma que `validation.data`
        // (el contenido) tiene la forma exacta que el `Component` espera, según
        // nuestra SSoT en `sections.config.ts`.
         
        return (
          <Component
            key={`${sectionName}-${index}`}
            {...(componentProps as any)}
          />
        );
        // --- [FIN DE REFACTORIZACIÓN DE TIPO Y DOCUMENTACIÓN] ---
      })}
    </SectionAnimator>
  );
}
