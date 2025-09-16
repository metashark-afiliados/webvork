// components/dev/DevHeader.tsx
/**
 * @file DevHeader.tsx
 * @description Header de lujo para el Developer Command Center.
 *              v7.0.0 (Holistic Refactor): Sincronizado con el nuevo contrato de
 *              `getDictionary`. Resuelve errores de tipo y mejora la resiliencia
 *              y la observabilidad ante contenido faltante.
 *              v7.1.0 (Syntax Fix): Se elimina el texto corrupto que rompía la sintaxis
 *              del componente.
 * @version 7.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
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
  logger.info(
    `[Observabilidad][DevHeader] Renderizando para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);

  // Con el schema corregido, `content` ahora tendrá el tipo correcto o será undefined.
  const content = dictionary?.devHeader;
  const devMenuContent = dictionary?.devRouteMenu;
  // La lógica de fallback maneja el caso `undefined` de forma segura.
  const headerTitle = content?.title ?? "DEV COMMAND CENTER";

  if (error || !content || !devMenuContent) {
    logger.warn(
      `[DevHeader] Contenido para 'devHeader' o 'devRouteMenu' no encontrado para [${locale}]. El menú podría estar incompleto.`,
      { error }
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
// components/dev/DevHeader.tsx
