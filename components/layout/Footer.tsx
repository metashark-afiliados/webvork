// RUTA: components/layout/Footer.tsx
/**
 * @file Footer.tsx
 * @description Componente de pie de página principal del portal.
 *              v6.1.0 (MEA/UX Animation): Se inyecta una animación de entrada
 *              sutil con Framer Motion para una experiencia de usuario de élite
 *              al final de la página.
 * @version 6.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client"; // Se requiere "use client" para el hook de animación y los tooltips

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Separator } from "@/components/ui/Separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type {
  LinkColumn,
  Link as LinkType,
  SocialLink,
} from "@/lib/schemas/components/footer.schema";

type FooterContent = NonNullable<Dictionary["footer"]>;

interface FooterProps {
  content: FooterContent;
}

/**
 * @const footerVariants
 * @description Define la animación de entrada para la sección del footer.
 */
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Curva de easing profesional
    },
  },
};

export function Footer({ content }: FooterProps): React.ReactElement | null {
  logger.info(
    "[Footer] Renderizando componente de élite (v6.1 - MEA/UX Animation)."
  );

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
    <motion.footer
      className="bg-muted/40 text-muted-foreground pt-16 pb-8 mt-24"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // La animación se dispara cuando el 20% del footer es visible
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {newsletter.title}
            </h3>
            <p className="text-sm mb-4">{newsletter.description}</p>
            <NewsletterForm content={newsletter} />
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {linkColumns.map((column: LinkColumn) => (
              <div key={column.title}>
                <h4 className="font-semibold text-foreground mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link: LinkType) => (
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
            <TooltipProvider>
              {socialLinks.map((social: SocialLink) => (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className="hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <DynamicIcon name={social.icon} className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}
