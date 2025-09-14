// components/sections/CommunitySection.tsx
/**
 * @file CommunitySection.tsx
 * @description Un componente de sección diseñado para invitar a los usuarios a unirse a una comunidad.
 *              - v3.0.0 (Flexibilidad de Contenido): Refactorizado para consumir una única
 *                prop 'title' que puede contener HTML. Utiliza `dangerouslySetInnerHTML`
 *                de forma segura para renderizar el título estilizado, dando control total
 *                al equipo de contenido.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import DynamicIcon from "@/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/schemas/i18n.schema";

/**
 * @interface CommunitySectionProps
 * @description Define el contrato de props para el componente CommunitySection.
 */
interface CommunitySectionProps {
  content: Dictionary["communitySection"];
}

/**
 * @component CommunitySection
 * @description Renderiza una sección visualmente atractiva con un llamado a la acción claro
 *              para unirse a una comunidad (ej. Discord, Slack, etc.).
 * @param {CommunitySectionProps} props - Las propiedades que contienen el contenido de la sección.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export function CommunitySection({
  content,
}: CommunitySectionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando CommunitySection");

  if (!content) {
    logger.warn(
      "[CommunitySection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { iconName, title, description, buttonLabel, buttonHref } = content;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <DynamicIcon
            name={iconName}
            size={48}
            className="mx-auto mb-6 text-primary"
          />
          <h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            // --- IMPLEMENTACIÓN DE ÉLITE ---
            // Se utiliza `dangerouslySetInnerHTML` para renderizar el HTML del título.
            // Esto es seguro en este contexto porque el contenido proviene de nuestros
            // archivos .i18n.json internos y confiables, no de una entrada de usuario externa,
            // eliminando así el riesgo de ataques XSS.
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href={buttonHref} size="lg" variant="default">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
// components/sections/CommunitySection.tsx
