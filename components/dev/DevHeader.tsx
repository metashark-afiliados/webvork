// components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Header de élite para el Developer Command Center.
 *              v10.1.0 (Full DCC Theming Integration): Ahora integra un
 *              ThemeSwitcher global para el DCC, permitiendo cambiar el tema
 *              visual completo (colores, fuentes, geometría) de toda la suite.
 * @version 10.1.0
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
// DevThemeSwitcher ya está importado en layout.tsx y se pasa como prop.
// No necesita importarse aquí directamente a menos que se use internamente.

interface DevHeaderProps {
  locale: Locale;
  centerComponent?: React.ReactNode;
  devThemeSwitcher?: React.ReactNode; // <-- Recibe el themeswitcher
}

export default async function DevHeader({
  locale,
  centerComponent,
  devThemeSwitcher,
}: DevHeaderProps): Promise<React.ReactElement> {
  logger.info(`[DevHeader] Renderizando (v10.1 - Global Theme Switcher)`);

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary?.devHeader;
  const devMenuContent = dictionary?.devRouteMenu;
  const headerTitle = content?.title ?? "Developer Command Center";

  if (error || !content || !devMenuContent) {
    logger.warn(
      `[DevHeader] Contenido para 'devHeader' o 'devRouteMenu' no encontrado.`,
      { error }
    );
    return (
      <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-red-900/80 text-white border-b border-red-500/20 shadow-lg">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <span className="font-bold">Error Loading DevHeader</span>
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

          {/* El componente central ahora ocupa el espacio principal */}
          <div className="flex-grow w-1/2 flex items-center justify-center">
            {centerComponent}
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-shrink-0 w-1/4">
            {devThemeSwitcher} {/* <-- Renderiza el ThemesSwitcher */}
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
