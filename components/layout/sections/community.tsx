// components/layout/sections/community.tsx
/**
 * @file community.tsx
 * @description Sección de llamada a la acción para unirse a la comunidad.
 *              Totalmente refactorizada para ser un componente de presentación
 *              puro, data-driven y alineado con los estándares del proyecto.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface CommunitySectionProps
 * @description Contrato de props para el componente CommunitySection.
 */
interface CommunitySectionProps {
  content: Dictionary["communitySection"];
}

/**
 * @component CommunitySection
 * @description Renderiza la sección de comunidad. Es un componente de presentación puro
 *              que recibe todo su contenido a través de props.
 * @param {CommunitySectionProps} props - Las propiedades con el contenido de la sección.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export const CommunitySection = ({
  content,
}: CommunitySectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando CommunitySection");

  if (!content) {
    logger.warn(
      "[CommunitySection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const {
    iconName,
    titlePart1,
    titlePart2,
    description,
    buttonLabel,
    buttonHref,
  } = content;

  return (
    <section id="community" className="py-12">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <DynamicIcon
                  name={iconName}
                  size={48}
                  className="mb-4 text-primary"
                />
                <div>
                  {titlePart1}
                  <span className="text-primary pl-2">{titlePart2}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              {description}
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href={buttonHref} target="_blank" rel="noopener noreferrer">
                  {buttonLabel}
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
// components/layout/sections/community.tsx
