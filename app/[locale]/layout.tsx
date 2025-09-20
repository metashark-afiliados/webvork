// RUTA: app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado. SSoT para la estructura del portal, ahora
 *              con una capa de resiliencia de élite para el manejo de errores.
 * @version 7.0.0 (Resilience Layer & Holistic Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { headers } from "next/headers";
import { getDictionary } from "@/shared/lib/i18n";
import {
  defaultLocale,
  supportedLocales,
  type Locale,
} from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import AppProviders from "@/components/layout/AppProviders";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeInjector } from "@/components/layout/ThemeInjector";
import { DevHomepageHeader } from "@/components/layout/DevHomepageHeader";
import { DeveloperErrorDisplay } from "@/components/dev";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale?: Locale };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const safeLocale = supportedLocales.includes(params.locale as Locale)
    ? params.locale!
    : defaultLocale;

  logger.info(`[LocaleLayout] Renderizando v7.0 para locale: [${safeLocale}]`);

  const { dictionary, error } = await getDictionary(safeLocale);

  // --- CAPA DE RESILIENCIA ---
  if (error) {
    const errorMessage = `No se pudo cargar el diccionario para [${safeLocale}].`;
    logger.error(`[LocaleLayout] ${errorMessage}`, { error });

    // En producción, muestra un fallback mínimo en lugar de una página rota.
    if (process.env.NODE_ENV === "production") {
      return (
        <html lang={safeLocale}>
          <body>
            <div style={{ color: "hsl(var(--destructive))", padding: "20px" }}>
              Error crítico al cargar el contenido del sitio.
            </div>
          </body>
        </html>
      );
    }

    // En desarrollo, muestra el error detallado para facilitar la depuración.
    return (
      <html lang={safeLocale}>
        <body>
          <DeveloperErrorDisplay
            context="LocaleLayout"
            errorMessage={errorMessage}
            errorDetails={error}
          />
        </body>
      </html>
    );
  }

  const pathname = headers().get("x-next-pathname") || "";

  const headerContent = dictionary?.header;
  const devHomepageHeaderContent = dictionary?.devHomepageHeader;
  const devRouteMenuContent = dictionary?.devRouteMenu;
  const cookieConsentContent = dictionary?.cookieConsentBanner;
  const footerContent = dictionary?.footer;
  const toggleThemeContent = dictionary?.toggleTheme;
  const languageSwitcherContent = dictionary?.languageSwitcher;
  const cartContent = dictionary?.cart;

  const isHomePage = pathname === `/${safeLocale}` || pathname === "/";
  const showDevHomepageHeader =
    process.env.NODE_ENV === "development" &&
    isHomePage &&
    devHomepageHeaderContent &&
    devRouteMenuContent;

  const canRenderHeader =
    headerContent &&
    toggleThemeContent &&
    languageSwitcherContent &&
    cartContent;

  return (
    <>
      <ThemeInjector />
      <AppProviders
        locale={safeLocale}
        cookieConsentContent={cookieConsentContent}
      >
        {showDevHomepageHeader ? (
          <DevHomepageHeader
            dictionary={devHomepageHeaderContent}
            devRouteMenuDictionary={devRouteMenuContent}
          />
        ) : canRenderHeader ? (
          <Header
            content={headerContent}
            toggleThemeContent={toggleThemeContent}
            languageSwitcherContent={languageSwitcherContent}
            cartContent={cartContent}
            currentLocale={safeLocale}
            supportedLocales={supportedLocales}
            devDictionary={devRouteMenuContent}
          />
        ) : (
          (() => {
            logger.warn(
              "[LocaleLayout] Faltan datos de i18n para renderizar el Header principal."
            );
            return null;
          })()
        )}
        <main>{children}</main>
        {footerContent && <Footer content={footerContent} />}
      </AppProviders>
    </>
  );
}
