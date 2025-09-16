// app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado. SSoT para la estructura de la interfaz principal del portal.
 *              v5.0.0 (Holistic Refactor): Sincronizado con el nuevo contrato de `getDictionary`.
 *              Ahora desestructura la respuesta, implementa logging robusto y maneja
 *              elegantemente los casos de error de contenido, asegurando que el layout
 *              nunca se rompa por datos faltantes.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
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

  logger.info(
    `[Observabilidad][ARQUITECTURA-LOCALE] Renderizando LocaleLayout para locale: [${safeLocale}]`
  );

  // --- [INICIO] REFACTORIZACIÓN HOLÍSTICA ---
  // 1. Desestructuración del nuevo contrato de `getDictionary`.
  const { dictionary, error } = await getDictionary(safeLocale);

  // 2. Logging y manejo de errores robusto.
  if (error) {
    logger.error(
      `[LocaleLayout] No se pudo cargar el diccionario para [${safeLocale}]. Se renderizarán componentes con contenido de fallback.`,
      { error }
    );
  }

  // 3. Extracción segura de contenido. Si el diccionario falla, las variables
  //    serán `undefined`, y los componentes hijos manejarán esto sin romperse.
  const headerContent = dictionary?.header;
  const devHomepageHeaderContent = dictionary?.devHomepageHeader;
  const devRouteMenuContent = dictionary?.devRouteMenu;
  const cookieConsentContent = dictionary?.cookieConsentBanner;
  const footerContent = dictionary?.footer;
  // --- [FIN] REFACTORIZACIÓN HOLÍSTICA ---

  return (
    <>
      <ThemeInjector />
      <AppProviders
        locale={safeLocale}
        cookieConsentContent={cookieConsentContent}
      >
        {process.env.NODE_ENV === "development" &&
        devHomepageHeaderContent &&
        devRouteMenuContent ? (
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
