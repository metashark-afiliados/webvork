// app/[locale]/(dev)/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz para el Developer Command Center (DCC).
 *              Esta es la SSoT para la estructura visual de todo el entorno de desarrollo.
 *              Su función principal es proporcionar un encabezado consistente y,
 *              fundamentalmente, inyectar el sistema de theming global a través
 *              de AppProviders, solucionando la ausencia de estilos.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import AppProviders from "@/components/layout/AppProviders";
import DevHeader from "@/components/dev/DevHeader";
import { logger } from "@/lib/logging";
import { Container } from "@/components/ui/Container";

interface DevLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function DevLayout({
  children,
  params: { locale },
}: DevLayoutProps) {
  logger.info(
    `[DevLayout] Renderizando layout raíz para el entorno de desarrollo. Locale: [${locale}]`
  );

  const { dictionary, error } = await getDictionary(locale);

  if (error || !dictionary.cookieConsentBanner) {
    logger.error(
      `[DevLayout] No se pudo cargar el contenido esencial del diccionario para [${locale}].`,
      { error }
    );
    // Renderiza un estado de error si el diccionario falla
    return (
      <div className="text-destructive text-center p-8">
        Error al cargar la configuración del entorno de desarrollo.
      </div>
    );
  }

  return (
    // AppProviders es el componente clave que activa el sistema de theming global.
    <AppProviders
      locale={locale}
      cookieConsentContent={dictionary.cookieConsentBanner}
    >
      <DevHeader locale={locale} />
      <main className="py-8 md:py-12">
        <Container>{children}</Container>
      </main>
    </AppProviders>
  );
}
// app/[locale]/(dev)/layout.tsx
