// app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado.
 *              - v4.1.0 (Sincronización de Contrato): Se actualiza para consumir la nueva
 *                firma de `getDictionary`, desestructurando la respuesta para obtener
 *                el diccionario de forma segura.
 * @version 4.1.0
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

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale?: Locale };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const safeLocale = params.locale || defaultLocale;
  logger.info(
    `[Observabilidad][ARQUITECTURA-LOCALE] Renderizando LocaleLayout para locale: [${safeLocale}]`
  );

  // --- INICIO DE CORRECCIÓN ---
  // Se desestructura la respuesta de getDictionary para acceder al objeto 'dictionary'.
  const { dictionary } = await getDictionary(safeLocale);
  // --- FIN DE CORRECCIÓN ---

  const headerContent = dictionary.header;
  const devRouteMenuContent = dictionary.devRouteMenu;
  const cookieConsentContent = dictionary.cookieConsentBanner;
  const footerContent = dictionary.footer;

  return (
    <>
      <ThemeInjector />
      <AppProviders
        locale={safeLocale}
        cookieConsentContent={cookieConsentContent}
      >
        {headerContent && (
          <Header
            content={headerContent}
            currentLocale={safeLocale}
            supportedLocales={supportedLocales}
            {...(process.env.NODE_ENV === "development" &&
              devRouteMenuContent && {
                devDictionary: devRouteMenuContent,
              })}
          />
        )}
        <main>{children}</main>
        {footerContent && <Footer content={footerContent} />}
      </AppProviders>
    </>
  );
}
