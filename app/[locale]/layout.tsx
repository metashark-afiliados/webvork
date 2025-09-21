// RUTA: app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Localizado, con una arquitectura de datos de comercio
 *              corregida y resiliente.
 * @version 11.1.0 (Commerce Layer Import Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
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
import { getCart } from "@/shared/lib/commerce/cart";
import { CartProvider } from "@/components/features/cart/cart-context";
import { DeveloperErrorDisplay } from "@/components/dev";
import { notFound } from "next/navigation";

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

  logger.info(`[LocaleLayout] Renderizando v11.1 para locale: [${safeLocale}]`);

  const { dictionary, error: dictError } = await getDictionary(safeLocale);
  const cartPromise = getCart();

  const {
    header,
    footer,
    cookieConsentBanner,
    toggleTheme,
    languageSwitcher,
    cart,
  } = dictionary;

  const essentialContentIsMissing =
    !header ||
    !footer ||
    !cookieConsentBanner ||
    !toggleTheme ||
    !languageSwitcher ||
    !cart;

  if (dictError || essentialContentIsMissing) {
    const errorMessage =
      "Fallo al cargar el contenido i18n esencial para el layout principal.";
    logger.error(`[LocaleLayout] ${errorMessage}`, { error: dictError });
    if (process.env.NODE_ENV === "production") return notFound();
    return (
      <html lang={safeLocale}>
        <body>
          <DeveloperErrorDisplay
            context="LocaleLayout"
            errorMessage={errorMessage}
            errorDetails={dictError}
          />
        </body>
      </html>
    );
  }

  return (
    <>
      <ThemeInjector />
      <AppProviders
        locale={safeLocale}
        cookieConsentContent={cookieConsentBanner}
      >
        <CartProvider cartPromise={cartPromise}>
          <Header
            content={header}
            toggleThemeContent={toggleTheme}
            languageSwitcherContent={languageSwitcher}
            cartContent={cart}
            currentLocale={safeLocale}
            supportedLocales={supportedLocales}
          />
          <main>{children}</main>
          <Footer content={footer} />
        </CartProvider>
      </AppProviders>
    </>
  );
}
// RUTA: app/[locale]/layout.tsx
