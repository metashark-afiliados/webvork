// components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado inteligente y resiliente.
 *              - v2.0.0 (Zen of Renderer): Re-arquitecturado para realizar
 *                validación de datos Just-In-Time por componente, consumiendo
 *                la SSoT `sections.config.ts`. Es ahora resiliente a errores
 *                de contenido en secciones individuales.
 *              - v3.0.0 (Type Assertion Fix): Resuelve el error de tipo TS2322
 *                utilizando una aserción de tipo segura (`as any`) después de la
 *                validación con Zod, informando a TypeScript que el contrato de
 *                props es correcto.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import { sectionsConfig, type SectionName } from "@/lib/config/sections.config";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { ValidationError } from "@/components/ui/ValidationError";

interface SectionRendererProps {
  sections: { name: string }[];
  dictionary: Dictionary;
  locale: Locale;
}

export function SectionRenderer({
  sections,
  dictionary,
  locale,
}: SectionRendererProps): React.ReactElement {
  logger.info(
    "[SectionRenderer v3.0] Ensamblando página con validación JIT..."
  );

  return (
    <>
      {sections.map((section, index) => {
        const sectionName = section.name as SectionName;
        const config = sectionsConfig[sectionName];

        if (!config) {
          logger.warn(
            `[SectionRenderer] Configuración para sección "${sectionName}" no encontrada. Se omitirá.`
          );
          return null;
        }

        const { component: Component, dictionaryKey, schema } = config;
        const contentData = dictionary[dictionaryKey as keyof Dictionary];

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
        };

        logger.trace(
          `[SectionRenderer] Renderizando sección #${index + 1}: ${sectionName} (Datos Válidos)`
        );

        // --- [INICIO DE CORRECCIÓN DE TIPO] ---
        // Después de validar con Zod, sabemos que `componentProps` cumple el
        // contrato del `Component` específico. Usamos `as any` para indicárselo a TypeScript.
        return (
          <Component
            key={`${sectionName}-${index}`}
            {...(componentProps as any)}
          />
        );
        // --- [FIN DE CORRECCIÓN DE TIPO] ---
      })}
    </>
  );
}
// components/layout/SectionRenderer.tsx
