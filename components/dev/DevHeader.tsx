// components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Encabezado para el entorno de desarrollo.
 *              - v4.0.0 (Ingeniería de Resiliencia): Refactorizado para ser antifrágil.
 *                Ahora maneja correctamente el tipo `Partial<Dictionary>` devuelto
 *                por el motor de i18n, utilizando acceso seguro a propiedades y
 *                valores de fallback para prevenir errores de tipo (TS2322) y mejorar
 *                la robustez del componente.
 * @devonly
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface DevHeaderProps {
  locale: Locale;
}

/**
 * @component DevHeader
 * @description Renderiza la barra de navegación superior para todas las páginas del
 *              dominio de desarrollo (`/dev/*`).
 * @param {DevHeaderProps} props - Las propiedades que contienen el locale.
 * @returns {Promise<React.ReactElement>} El elemento JSX del header.
 */
export default async function DevHeader({
  locale,
}: DevHeaderProps): Promise<React.ReactElement> {
  logger.info(`[DevHeader] Renderizando para locale: ${locale}`);

  // --- INICIO DE CORRECCIÓN: Se maneja el tipo Partial<Dictionary> ---
  const t: Partial<Dictionary> = await getDictionary(locale);
  const content = t?.devHeader; // Acceso seguro

  // Se utiliza un fallback si el contenido no está definido.
  const headerTitle = content?.title ?? "Dev Canvas [Fallback]";

  if (!content) {
    logger.warn(
      "[DevHeader] Contenido para 'devHeader' no encontrado en el diccionario. Usando fallback."
    );
  }
  // --- FIN DE CORRECCIÓN ---

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
        </div>
      </Container>
    </header>
  );
}
// components/dev/DevHeader.tsx
