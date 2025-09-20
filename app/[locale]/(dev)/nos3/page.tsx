// RUTA: app/[locale]/(dev)/nos3/page.tsx
/**
 * @file page.tsx
 * @description Página de índice para el explorador de sesiones de `nos3`.
 *              Obtiene la lista de sesiones grabadas y las pasa a un componente
 *              de cliente para su renderizado.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Card, CardContent } from "@/components/ui";
import { DeveloperErrorDisplay } from "@/components/dev";
import { logger } from "@/lib/logging";
import { listSessionsAction } from "./_actions/list-sessions.action";
import { SessionListClient } from "./_components/SessionListClient";

export default async function Nos3ListPage() {
  logger.info("[Nos3ListPage] Renderizando página de índice de sesiones.");

  const sessionsResult = await listSessionsAction();

  if (!sessionsResult.success) {
    return (
      <DeveloperErrorDisplay
        context="Nos3ListPage"
        errorMessage="No se pudieron cargar las sesiones de Nos3."
        errorDetails={sessionsResult.error}
      />
    );
  }

  return (
    <>
      <PageHeader
        content={{
          title: "Bóveda de Sesiones Nos3",
          subtitle:
            "Explora, reproduce y analiza las interacciones de los usuarios grabadas en el sitio.",
        }}
      />
      <Container className="py-8">
        <Card>
          <CardContent className="pt-6">
            <SessionListClient sessions={sessionsResult.data} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
