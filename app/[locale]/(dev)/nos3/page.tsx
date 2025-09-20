// RUTA: app/[locale]/(dev)/nos3/page.tsx
/**
 * @file page.tsx
 * @description Página de índice para el explorador de sesiones de `nos3`.
 *              v1.1.0 (Module Resolution Fix): Se alinea con la Directiva 021
 *              utilizando un archivo de barril para una resolución de módulos robusta.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Card, CardContent } from "@/components/ui";
import { DeveloperErrorDisplay } from "@/components/dev";
import { logger } from "@/shared/lib/logging";
import { listSessionsAction } from "./_actions/list-sessions.action";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import { SessionListClient } from "./_components";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

export default async function Nos3ListPage() {
  logger.info(
    "[Nos3ListPage] Renderizando página de índice de sesiones (v1.1)."
  );

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
