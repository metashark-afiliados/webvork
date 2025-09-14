// components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Header de lujo para el Developer Command Center.
 *              - v6.2.0 (Sincronización de Contrato): Actualizado para consumir el nuevo
 *                contrato de `getDictionary`, desestructurando la respuesta y
 *                resolviendo los errores de tipo.
 * @version 6.2.0
 * @author RaZ Podestá - MetaShark Tech
 * @date 2025-09-14T18:20:40.121Z
 */
import React from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { Container } from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { ToggleTheme } from "@/components/layout/toogle-theme";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { supportedLocales } from "@/lib/i18n.config";

interface DevHeaderProps {
  locale: Locale;
}

export default async function DevHeader({
  locale,
}: DevHeaderProps): Promise<React.ReactElement> {
  logger.info(`[DevHeader] Renderizando para locale: ${locale}`);

  // --- [INICIO] CORRECCIÓN DE CONTRATO ---
  const { dictionary: t } = await getDictionary(locale);
  // --- [FIN] CORRECCIÓN DE CONTRATO ---

  const content = t?.devHeader;
  const devMenuContent = t?.devRouteMenu;

  const headerTitle = content?.title ?? "DEV COMMAND CENTER";

  if (!content || !devMenuContent) {
    logger.error(
      "[DevHeader] Contenido para devHeader o devRouteMenu no encontrado. El menú puede estar incompleto."
    );
  }

  return (
    <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-primary/20 shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href={routes.devDashboard.path({ locale })}
            className="flex items-center gap-2 group"
            aria-label="Volver al Developer Command Center"
          >
            <DynamicIcon
              name="FlaskConical"
              className="h-6 w-6 text-primary group-hover:animate-shake"
            />
            <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {headerTitle}
            </span>
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
