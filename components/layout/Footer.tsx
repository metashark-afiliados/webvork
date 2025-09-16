// components/layout/Footer.tsx
/**
 * @file Footer.tsx
 * @description Componente de pie de página principal del portal.
 *              - v5.0.0 (Type Safety): Importa y aplica tipos explícitos
 *                desde el schema SSoT para resolver errores de 'any' implícito (TS7006).
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { DynamicIcon } from "@/components/ui";
import { Separator } from "@/components/ui/Separator";
// --- [INICIO] REFACTORIZACIÓN DE TIPOS ---
import type {
  LinkColumn,
  Link as LinkType,
  SocialLink,
} from "@/lib/schemas/components/footer.schema";
// --- [FIN] REFACTORIZACIÓN DE TIPOS ---

type FooterContent = NonNullable<Dictionary["footer"]>;

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando Footer v5.0 (Type-Safe)");

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {newsletter.title}
            </h3>
            <p className="text-sm mb-4">{newsletter.description}</p>
            <NewsletterForm content={newsletter} />
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* --- [INICIO] APLICACIÓN DE TIPOS --- */}
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
            {/* --- [FIN] APLICACIÓN DE TIPOS --- */}
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
            {/* --- [INICIO] APLICACIÓN DE TIPOS --- */}
            {socialLinks.map((social: SocialLink) => (
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
            {/* --- [FIN] APLICACIÓN DE TIPOS --- */}
          </div>
        </div>
      </Container>
    </footer>
  );
}
// components/layout/Footer.tsx
