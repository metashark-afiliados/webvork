// app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout principal para todas las rutas localizadas. Contiene la UI
 *              compartida como el Header, Footer y el banner de cookies.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import AppProviders from "@/layout/AppProviders";
import Header from "@/layout/Header";
// Asumimos que existirá un Footer en el futuro
// import Footer from "@/layout/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Log para confirmar que el layout localizado se renderiza
  console.log(`[Observabilidad] Renderizando LocaleLayout para [${locale}]`);

  const dictionary: Partial<Dictionary> = await getDictionary(locale);

  return (
    <AppProviders
      locale={locale}
      cookieConsentContent={dictionary.cookieConsentBanner}
    >
      {/* El Header ahora vive aquí, asegurando que se muestre en todas las páginas localizadas */}
      {dictionary.header && dictionary.devRouteMenu && (
        <Header
          content={dictionary.header}
          devDictionary={dictionary.devRouteMenu}
        />
      )}

      {/* El 'children' aquí será el componente page.tsx de la ruta activa */}
      <main>{children}</main>

      {/* Aquí iría el Footer en el futuro */}
      {/* {dictionary.footer && <Footer content={dictionary.footer} />} */}
    </AppProviders>
  );
}
