// components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Header de élite para el Developer Command Center.
 *              v8.0.0 (Aesthetic Refinement): Reemplaza el icono por el logo de la
 *              marca y actualiza el título para una apariencia más profesional.
 * @version 8.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Importar Image de Next.js
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { Container } from "@/components/ui/Container";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { ToggleTheme } from "@/components/layout/toogle-theme";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface DevHeaderProps {
  locale: Locale;
}

export default async function DevHeader({
  locale,
}: DevHeaderProps): Promise<React.ReactElement> {
  logger.info(
    `[Observabilidad][DevHeader] Renderizando para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary?.devHeader;
  const devMenuContent = dictionary?.devRouteMenu;
  const headerTitle = content?.title ?? "Developer Command Center"; // Título actualizado

  if (error || !content || !devMenuContent) {
    logger.warn(
      `[DevHeader] Contenido para 'devHeader' o 'devRouteMenu' no encontrado.`,
      { error }
    );
  }

  return (
    <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-primary/20 shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href={routes.devDashboard.path({ locale })}
            className="flex items-center gap-3 group"
            aria-label="Volver al Developer Command Center"
          >
            {/* --- [INICIO DE REFACTORIZACIÓN ESTÉTICA] --- */}
            <Image
              src="/img/layout/header/globalfitwell-logo-v2.svg"
              alt="Global Fitwell Logo"
              width={150}
              height={28}
              className="h-7 w-auto"
              priority
            />
            <span className="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">
              {headerTitle}
            </span>
            {/* --- [FIN DE REFACTORIZACIÓN ESTÉTICA] --- */}
          </Link>

          <div className="flex items-center gap-4">
            <ToggleTheme />
            <LanguageSwitcher
              currentLocale={locale}
              supportedLocales={supportedLocales}
            />
            {devMenuContent && <DevToolsDropdown dictionary={devMenuContent} />}
          </div>
        </div>
      </Container>
    </header>
  );
}
// components/dev/DevHeader.tsx
