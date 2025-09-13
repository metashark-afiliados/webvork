// components/layout/sections/team.tsx
/**
 * @file team.tsx
 * @description Sección de equipo. Totalmente refactorizada para ser data-driven,
 *              utilizar DynamicIcon y cumplir con los estándares del proyecto.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { TeamMember } from "@/lib/schemas/components/team-section.schema";

interface TeamSectionProps {
  content: Dictionary["teamSection"];
}

export const TeamSection = ({
  content,
}: TeamSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando TeamSection");

  if (!content) {
    logger.warn(
      "[TeamSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, members } = content;

  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          {eyebrow}
        </h2>
        <h3 className="text-3xl md:text-4xl text-center font-bold">{title}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member: TeamMember) => (
          <Card
            key={`${member.firstName}-${member.lastName}`}
            className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
          >
            <CardHeader className="p-0 gap-0">
              <div className="h-full overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={`Foto de ${member.firstName} ${member.lastName}`}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                />
              </div>
              <CardTitle className="py-6 pb-4 px-6">
                {member.firstName}
                <span className="text-primary ml-2">{member.lastName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 px-6">
              {member.positions.join(", ")}
            </CardContent>

            <CardFooter className="space-x-4 mt-auto px-6 pb-6">
              {member.socialNetworks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Perfil de ${social.name} de ${member.firstName}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <DynamicIcon name={social.icon} size={20} />
                </Link>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
// components/layout/sections/team.tsx
