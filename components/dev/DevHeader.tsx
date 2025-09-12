// src/components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Encabezado para el entorno de desarrollo. Proporciona una identidad
 *              visual clara para las páginas de herramientas de desarrollo y un enlace
 *              para volver al dashboard principal del DCC. Refactorizado para ser
 *              resiliente ante la falta de contenido i18n.
 * @devonly
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/dev/DevHeader.tsx.md
 */
import React from "react";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { clientLogger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface DevHeaderProps {
  locale: Locale;
}

/**
 * @component DevHeader
 * @description Renderiza la barra de navegación superior para todas las páginas del
 *              dominio de desarrollo (`/dev/*`). Es un Server Component que obtiene
 *              su propio contenido.
 * @param {DevHeaderProps} props - Las propiedades que contienen el locale.
 * @returns {Promise<React.ReactElement>} El elemento JSX del header.
 */
export default async function DevHeader({
  locale,
}: DevHeaderProps): Promise<React.ReactElement> {
  clientLogger.info(`[DevHeader] Renderizando para locale: ${locale}`);

  const t: Dictionary = await getDictionary(locale);
  const content: Dictionary["devHeader"] = t.devHeader;

  // <<-- MEJORA DE ROBUSTEZ: Se utiliza un fallback si el contenido no está definido.
  //      Esto previene un error si la clave `devHeader` falta en el diccionario.
  const headerTitle = content?.title ?? "Dev Canvas - Content Missing";

  return (
    <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-muted/50 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href={routes.devDashboard.path({ locale })}
            className="flex items-center gap-2 group"
            aria-label="Volver al Developer Command Center"
          >
            <FlaskConical className="h-6 w-6 text-accent group-hover:animate-shake" />
            <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {headerTitle}
            </span>
          </Link>
          {/* Espacio reservado para futuros controles en el header de desarrollo, como un LanguageSwitcher específico para dev. */}
        </div>
      </Container>
    </header>
  );
}
// src/components/dev/DevHeader.tsx
