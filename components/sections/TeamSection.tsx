// components/sections/TeamSection.tsx
/**
 * @file TeamSection.tsx
 * @description Componente de sección para presentar a los miembros del equipo.
 *              - v1.1.0: Confirma la consistencia en la observabilidad y el uso de DynamicIcon
 *                para la iconografía de las redes sociales de los miembros del equipo.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { TeamMember } from "@/lib/schemas/components/team-section.schema";

/**
 * @interface TeamSectionProps
 * @description Define el contrato de props para el componente TeamSection.
 */
interface TeamSectionProps {
  content: Dictionary["teamSection"];
}

/**
 * @component TeamSection
 * @description Renderiza una sección que muestra tarjetas para cada miembro del equipo.
 * @param {TeamSectionProps} props - Las propiedades que contienen el contenido de la sección.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export function TeamSection({
  content,
}: TeamSectionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando TeamSection (Server Component)");

  if (!content) {
    logger.warn(
      "[TeamSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, members } = content;

  return (
    <section id="team" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            {eyebrow}
          </h2>
          <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {members.map((member: TeamMember) => (
            <li key={`${member.firstName}-${member.lastName}`}>
              <Image
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={member.imageUrl}
                alt={`Fotografía de ${member.firstName} ${member.lastName}`}
                width={400}
                height={267}
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-foreground">
                {member.firstName} {member.lastName}
              </h3>
              <div className="text-base leading-7 text-muted-foreground">
                {member.positions.map((position, index) => (
                  <p key={index}>{position}</p>
                ))}
              </div>
              <ul role="list" className="mt-6 flex gap-x-6">
                {member.socialNetworks.map((social) => (
                  <li key={social.name}>
                    <Link
                      href={social.url}
                      className="text-muted-foreground hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{social.name}</span>
                      <DynamicIcon name={social.icon} className="h-6 w-6" />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
