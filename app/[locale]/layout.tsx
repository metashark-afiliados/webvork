// RUTA: app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado. SSoT para la estructura principal del portal.
 *              v6.4.0 (Critical Resilience Fix): Implementa una guardia de
 *              renderizado robusta para el Header, previniendo TypeErrors fatales
 *              si alguna de sus dependencias de contenido i18n (incluyendo el
 *              carrito) no se carga correctamente.
 * @version 6.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { headers } from "next/headers";
import { getDictionary } from "@/lib/i18n";
import {
  defaultLocale,
  supportedLocales,
  type Locale,
} from "@/lib/i18n.config";
import AppProviders from "@/components/layout/AppProviders";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { logger } from "@/lib/logging";
import { ThemeInjector } from "@/components/layout/ThemeInjector";
import { DevHomepageHeader } from "@/components/layout/DevHomepageHeader";

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
  const pathname = headers().get("x-next-pathname") || "";

  logger.info(
    `[Observabilidad][ARQUITECTURA-LOCALE] Renderizando LocaleLayout v6.4 para locale: [${safeLocale}] en ruta: [${pathname}]`
  );

  const { dictionary, error } = await getDictionary(safeLocale);
  if (error) {
    logger.error(
      `[LocaleLayout] No se pudo cargar el diccionario para [${safeLocale}].`,
      { error }
    );
    // Renderiza un fallback mínimo si el diccionario falla.
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
          // --- [INICIO DE CORRECCIÓN DE BUG TS2322] ---
          // La llamada al logger se realiza, y LUEGO se retorna `null`.
          // Esto satisface el contrato de tipo `ReactNode` del componente.
          (() => {
            logger.warn(
              "[LocaleLayout] Faltan datos de i18n para renderizar el Header principal."
            );
            return null;
          })()
          // --- [FIN DE CORRECCIÓN DE BUG TS2322] ---
        )}
        <main>{children}</main>
        {footerContent && <Footer content={footerContent} />}
      </AppProviders>
    </>
  );
}
