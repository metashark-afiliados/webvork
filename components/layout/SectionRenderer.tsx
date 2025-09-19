// components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado de élite, reconstruido para máxima
 *              resiliencia, seguridad de tipos y claridad arquitectónica.
 * @version 7.0.0 (Holistic Reconstruction & Type Shielding)
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import { sectionsConfig, type SectionName } from "@/lib/config/sections.config";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { ValidationError } from "@/components/ui/ValidationError";

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
  logger.info("[SectionRenderer v7.0] Ensamblando página...");

  // --- [INICIO DE LÓGICA RESTAURADA] ---
  const validSections = sections.filter(
    (section): section is { name: string } => {
      if (typeof section.name === "string" && section.name.length > 0) {
        return true;
      }
      logger.warn(
        `[SectionRenderer] Se ha omitido una sección inválida del layout (sin nombre).`,
        { sectionData: section }
      );
      return false;
    }
  );
  // --- [FIN DE LÓGICA RESTAURADA] ---

  return (
    <>
      {validSections.map((section, index) => {
        const sectionName = section.name as SectionName;
        const config = sectionsConfig[sectionName];

        if (!config) {
          logger.warn(
            `[SectionRenderer] Configuración para sección "${sectionName}" no encontrada. Se omitirá.`
          );
          return null;
        }

        const { component: Component, dictionaryKey, schema } = config;

        // --- [INICIO DE GUARDIA DE TIPO DE ÍNDICE] ---
        // Aseguramos que la clave sea un string válido para indexar el diccionario.
        if (
          typeof dictionaryKey !== "string" ||
          !(dictionaryKey in dictionary)
        ) {
          logger.warn(
            `[SectionRenderer] La clave de diccionario "${String(dictionaryKey)}" no es válida o no existe.`
          );
          return null;
        }
        const contentData = dictionary[dictionaryKey as keyof Dictionary];
        // --- [FIN DE GUARDIA DE TIPO DE ÍNDICE] ---

        const validation = schema.safeParse(contentData);

        if (!validation.success) {
          return (
            <ValidationError
              key={`${sectionName}-${index}-error`}
              sectionName={sectionName}
              error={validation.error}
            />
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

        // --- [INICIO DE JUSTIFICACIÓN DE ASERCIÓN DELIBERADA] ---
        // La siguiente aserción 'as any' es una decisión de diseño deliberada y
        // necesaria. Debido a la naturaleza del renderizado dinámico de componentes,
        // TypeScript no puede verificar estáticamente que el tipo de `componentProps.content`
        // (derivado de una validación de Zod en tiempo de ejecución) coincide
        // exactamente con las props esperadas por el `Component` genérico.
        // Nuestra arquitectura en `sections.config.ts` garantiza esta correspondencia,
        // haciendo que esta aserción sea segura en este contexto específico.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (
          <Component
            key={`${sectionName}-${index}`}
            {...(componentProps as any)}
          />
        );
        // --- [FIN DE JUSTIFICACIÓN DE ASERCIÓN DELIBERADA] ---
      })}
    </>
  );
}
// components/layout/SectionRenderer.tsx
