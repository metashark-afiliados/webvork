// app/[locale]/not-found/page.tsx
/**
 * @file page.tsx
 * @description Página 404 localizada.
 *              - v1.2.0 (Sincronización de Contrato): Actualizado para consumir el nuevo
 *                contrato de `getDictionary`, desestructurando la respuesta para obtener
 *                el diccionario y resolver los errores de tipo.
 * @version 1.2.0
 * @author RaZ Podestá - MetaShark Tech
 * @date 2025-09-14T18:20:40.121Z
 */
import React from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface NotFoundPageProps {
  params: { locale: Locale };
}

export default async function NotFoundPage({
  params: { locale },
}: NotFoundPageProps) {
  logger.info(`[NotFoundPage] Renderizando página 404 para locale: ${locale}`);

  // --- [INICIO] CORRECCIÓN DE CONTRATO ---
  const { dictionary } = await getDictionary(locale);
  const content = dictionary.notFoundPage;
  // --- [FIN] CORRECCIÓN DE CONTRATO ---

  // La lógica de fallback existente ahora funciona correctamente.
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
