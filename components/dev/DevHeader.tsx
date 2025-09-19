// components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Header de élite para el Developer Command Center. Este componente
 *              de servidor orquesta la barra de navegación superior para todo el
 *              entorno de desarrollo, incluyendo el título, el conmutador de tema
 *              del DCC, el conmutador de tema visual (light/dark), el selector de
 *              idioma y el menú de herramientas de desarrollo.
 * @version 12.0.0 (Definitive Production-Ready Version)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { Container } from "@/components/ui/Container";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { ToggleTheme } from "@/components/layout/toogle-theme";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

/**
 * @interface DevHeaderProps
 * @description Contrato de props para el DevHeader.
 */
interface DevHeaderProps {
  /** El locale actual para la internacionalización y la construcción de rutas. */
  locale: Locale;
  /** Un componente React opcional para ser renderizado en la zona central del header. */
  centerComponent?: React.ReactNode;
  /** El componente opcional para el conmutador de tema del DCC. */
  devThemeSwitcher?: React.ReactNode;
}

/**
 * @component DevHeader
 * @description Componente de servidor que renderiza la cabecera para el entorno de desarrollo.
 * @returns {Promise<React.ReactElement>}
 */
export default async function DevHeader({
  locale,
  centerComponent,
  devThemeSwitcher,
}: DevHeaderProps): Promise<React.ReactElement> {
  logger.info(
    `[Observabilidad] Renderizando DevHeader (v12.0 - Production Ready)`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary?.devHeader;
  const devMenuContent = dictionary?.devRouteMenu;
  const headerTitle = content?.title ?? "Developer Command Center";

  // Guardia de resiliencia: Si el contenido esencial falta, se renderiza un estado de error claro.
  if (error || !content || !devMenuContent) {
    logger.error(
      `[DevHeader] Contenido para 'devHeader' o 'devRouteMenu' no encontrado.`,
      { error }
    );
    return (
      <header className="py-3 sticky top-0 z-50 bg-destructive/90 text-destructive-foreground">
        <Container>
          <div className="flex h-16 items-center justify-center">
            <span className="font-bold">
              Error: No se pudo cargar el contenido del DevHeader.
            </span>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-primary/20 shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 w-1/4">
            <Link
              href={routes.devDashboard.path({ locale })}
              className="flex items-center gap-3 group"
              aria-label="Volver al Developer Command Center"
            >
              <Image
                src="/img/layout/header/globalfitwell-logo-v2.svg"
                alt="Global Fitwell Logo"
                width={150}
                height={28}
                className="h-7 w-auto"
                priority
              />
              <span className="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors hidden lg:inline">
                {headerTitle}
              </span>
            </Link>
          </div>

          <div className="flex-grow w-1/2 flex items-center justify-center">
            {centerComponent}
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-shrink-0 w-1/4">
            {devThemeSwitcher}
            <ToggleTheme />
            <LanguageSwitcher
              currentLocale={locale}
              supportedLocales={supportedLocales}
            />
            <DevToolsDropdown dictionary={devMenuContent} />
          </div>
        </div>
      </Container>
    </header>
  );
}
