// RUTA: app/[locale]/layout.tsx

/**
 * @file layout.tsx
 * @description Layout Localizado. SSoT para la estructura principal del portal.
 *              v6.3.0 (Footer Sync): Se alinea con el nuevo contrato de Footer,
 *              asumiendo la responsabilidad de la carga de su contenido.
 * @version 6.3.0
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
    `[Observabilidad][ARQUITECTURA-LOCALE] Renderizando LocaleLayout v6.3 para locale: [${safeLocale}] en ruta: [${pathname}]`
  );

  const { dictionary, error } = await getDictionary(safeLocale);
  if (error) {
    logger.error(
      `[LocaleLayout] No se pudo cargar el diccionario para [${safeLocale}].`,
      { error }
    );
  }

  const headerContent = dictionary?.header;
  const devHomepageHeaderContent = dictionary?.devHomepageHeader;
  const devRouteMenuContent = dictionary?.devRouteMenu;
  const cookieConsentContent = dictionary?.cookieConsentBanner;
  const footerContent = dictionary?.footer;
  const toggleThemeContent = dictionary?.toggleTheme;
  const languageSwitcherContent = dictionary?.languageSwitcher;

  const isHomePage = pathname === `/${safeLocale}` || pathname === "/";
  const showDevHomepageHeader =
    process.env.NODE_ENV === "development" &&
    isHomePage &&
    devHomepageHeaderContent &&
    devRouteMenuContent;

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
        ) : (
          headerContent &&
          toggleThemeContent &&
          languageSwitcherContent && (
            <Header
              content={headerContent}
              toggleThemeContent={toggleThemeContent}
              languageSwitcherContent={languageSwitcherContent}
              currentLocale={safeLocale}
              supportedLocales={supportedLocales}
              devDictionary={devRouteMenuContent}
            />
          )
        )}
        <main>{children}</main>
        {footerContent && <Footer content={footerContent} />}
      </AppProviders>
    </>
  );
}
