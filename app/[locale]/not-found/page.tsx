// app/[locale]/not-found/page.tsx
/**
 * @file page.tsx
 * @description Página 404 localizada.
 *              v1.3.0 (Code Hygiene): Se eliminan las importaciones no utilizadas
 *              de 'Link' y 'Dictionary' para cumplir con las reglas de ESLint.
 * @version 1.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";

interface NotFoundPageProps {
  params: { locale: Locale };
}

export default async function NotFoundPage({
  params: { locale },
}: NotFoundPageProps) {
  logger.info(`[NotFoundPage] Renderizando página 404 para locale: ${locale}`);

  const { dictionary } = await getDictionary(locale);
  const content = dictionary.notFoundPage;

  const title = content?.title ?? "Pagina Non Trovata";
  const description =
    content?.description ??
    "Spiacenti, non siamo riusciti a trovare la pagina che stai cercando.";
  const buttonText = content?.buttonText ?? "Torna alla Home";

  return (
    <Container className="flex h-[calc(100vh-10rem)] items-center justify-center text-center">
      <div>
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href={`/${locale}`}>{buttonText}</Button>
        </div>
      </div>
    </Container>
  );
}
// app/[locale]/not-found/page.tsx
