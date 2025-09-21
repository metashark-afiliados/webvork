// RUTA: app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado, ahora con el Proveedor de Carrito integrado.
 * @version 8.0.0 (Cart Context Integration)
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
import { getCart } from "@/shared/lib/commerce/cart"; // <-- NUEVA IMPORTACIÓN
import { CartProvider } from "@/components/features/cart/cart-context"; // <-- NUEVA IMPORTACIÓN

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

  logger.info(`[LocaleLayout] Renderizando v8.0 para locale: [${safeLocale}]`);

  const { dictionary, error } = await getDictionary(safeLocale);
  const cartPromise = getCart(); // Inicia la obtención del carrito

  // ... (guardia de resiliencia para el diccionario sin cambios) ...

  const pathname = headers().get("x-next-pathname") || "";
  const isHomePage = pathname === `/${safeLocale}` || pathname === "/";
  // ... (resto de la lógica de header y contenido sin cambios) ...

  return (
    <>
      <ThemeInjector />
      <AppProviders
        locale={safeLocale}
        cookieConsentContent={dictionary.cookieConsentBanner}
      >
        <CartProvider cartPromise={cartPromise}>
          {/* ... Header y otros componentes ... */}
          <main>{children}</main>
          {dictionary.footer && <Footer content={dictionary.footer} />}
        </CartProvider>
      </AppProviders>
    </>
  );
}
