// app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado. SSoT para la estructura principal del portal.
 *              v6.0.0 (Layout Context Fix): Resuelve el bug del doble header al
 *              hacer que el renderizado del DevHomepageHeader sea condicional
 *              a la ruta de la página de inicio.
 * @version 6.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { headers } from "next/headers"; // Importar headers de Next.js
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
  const pathname = headers().get("x-next-pathname") || ""; // Obtener el pathname en el servidor

  logger.info(
    `[Observabilidad][ARQUITECTURA-LOCALE] Renderizando LocaleLayout para locale: [${safeLocale}] en ruta: [${pathname}]`
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

  // --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
  const isHomePage = pathname === `/${safeLocale}` || pathname === "/";
  const showDevHomepageHeader =
    process.env.NODE_ENV === "development" &&
    isHomePage &&
    devHomepageHeaderContent &&
    devRouteMenuContent;
  // --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

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
          headerContent && (
            <Header
              content={headerContent}
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
// app/[locale]/layout.tsx
