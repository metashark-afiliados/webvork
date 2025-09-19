// RUTA: components/dev/DevHeader.tsx

/**
 * @file DevHeader.tsx
 * @description Header de élite para el Developer Command Center.
 *              v12.3.0 (LanguageSwitcher Sync): Se alinea con el nuevo contrato de
 *              props del componente de élite LanguageSwitcher.
 * @version 12.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { Container } from "@/components/ui/Container";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface DevHeaderProps {
  locale: Locale;
  centerComponent?: React.ReactNode;
  devThemeSwitcher?: React.ReactNode;
  content: NonNullable<Dictionary["devHeader"]>;
  devMenuContent: NonNullable<Dictionary["devRouteMenu"]>;
  toggleThemeContent: NonNullable<Dictionary["toggleTheme"]>;
  languageSwitcherContent: NonNullable<Dictionary["languageSwitcher"]>; // <-- NUEVA PROP
}

export default function DevHeader({
  locale,
  centerComponent,
  devThemeSwitcher,
  content,
  devMenuContent,
  toggleThemeContent,
  languageSwitcherContent, // <-- NUEVA PROP
}: DevHeaderProps): React.ReactElement {
  logger.info(
    `[Observabilidad] Renderizando DevHeader (v12.3 - LanguageSwitcher Sync)`
  );

  const headerTitle = content.title ?? "Developer Command Center";

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
            <ToggleTheme content={toggleThemeContent} />
            <LanguageSwitcher
              currentLocale={locale}
              supportedLocales={supportedLocales}
              content={languageSwitcherContent} // <-- PASAR PROP
            />
            <DevToolsDropdown dictionary={devMenuContent} />
          </div>
        </div>
      </Container>
    </header>
  );
}
