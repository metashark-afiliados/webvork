// components/layout/Footer.tsx
/**
 * @file Footer.tsx
 * @description Componente de pie de página principal del portal.
 *              - v4.0.0 (Portal-Grade Upgrade): Reingeniería completa a un diseño
 *                profesional multi-columna con suscripción a newsletter y redes sociales.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { Separator } from "@/components/ui/Separator";

type FooterContent = NonNullable<Dictionary["footer"]>;

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando Footer v4.0 (Portal-Grade)");

  if (!content) {
    logger.warn(
      "[Footer] No se proporcionó contenido. El footer no se renderizará."
    );
    return null;
  }

  const {
    newsletter,
    linkColumns,
    socialLinks,
    copyright,
    disclaimer,
    developerLink,
  } = content;

  return (
    <footer className="bg-muted/40 text-muted-foreground pt-16 pb-8 mt-24">
      <Container>
        {/* Sección Superior: Newsletter y Enlaces */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Columna de Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {newsletter.title}
            </h3>
            <p className="text-sm mb-4">{newsletter.description}</p>
            <NewsletterForm content={newsletter} />
          </div>

          {/* Columnas de Enlaces */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {linkColumns.map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold text-foreground mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-foreground/10" />

        {/* Sección Inferior: Copyright, Redes Sociales y Disclaimer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <div className="text-sm text-center md:text-left">
            <p>
              {copyright}{" "}
              {developerLink && (
                <Link
                  href={developerLink.href}
                  className="underline hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {developerLink.text}
                </Link>
              )}
            </p>
            <p className="text-xs mt-1 opacity-70">{disclaimer}</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <DynamicIcon name={social.icon} className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
