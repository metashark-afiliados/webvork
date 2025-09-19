// RUTA: app/api/nos3/ingest/route.ts
/**
 * @file route.ts
 * @description Endpoint de Ingestión para el sistema `nos3`. Es un Route Handler
 *              de Next.js integrado en el proyecto `webvork` y optimizado para el
 *              Vercel Edge Runtime. Su única responsabilidad es recibir lotes de
 *              eventos de `rrweb`, validarlos y persistirlos de forma asíncrona
 *              en Vercel Blob.
 * @version 1.0.1 (Contextual Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { z } from "zod";
import { logger } from "@/lib/logging";

// Define el runtime explícitamente para asegurar la ejecución en el Edge.
export const runtime = "edge";

/**
 * @const IngestPayloadSchema
 * @description SSoT para el contrato de datos que el colector del cliente
 *              DEBE enviar. Valida la estructura del payload entrante.
 *              `z.any()` se usa deliberadamente para los eventos de rrweb,
 *              ya que su estructura es compleja y la validación profunda
 *              no es necesaria en el punto de ingestión.
 */
const IngestPayloadSchema = z.object({
  sessionId: z
    .string()
    .cuid2({ message: "El ID de sesión debe ser un CUID2 válido." }),
  events: z.array(z.any()),
  metadata: z.object({
    pathname: z.string(),
    timestamp: z.number(),
  }),
});

/**
 * @function POST
 * @description Maneja las solicitudes POST entrantes del colector `nos3`.
 * @param {Request} request - La solicitud entrante.
 * @returns {Promise<NextResponse>} Una respuesta HTTP.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validation = IngestPayloadSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("[nos3-ingestor] Payload de ingestión inválido.", {
        errors: validation.error.flatten(),
      });
      return NextResponse.json(
        { error: "Bad Request: Invalid payload structure." },
        { status: 400 }
      );
    }

    const { sessionId, events, metadata } = validation.data;
    const blobPath = `sessions/${sessionId}/${metadata.timestamp}.json`;

    // No esperamos (await) a que `put` termine. La operación de subida
    // se ejecuta de forma asíncrona. Esto permite una respuesta inmediata.
    put(blobPath, JSON.stringify(events), {
      access: "private",
      contentType: "application/json",
    });

    logger.trace(
      `[nos3-ingestor] Lote de sesión ${sessionId} enviado a Vercel Blob.`,
      {
        path: blobPath,
        eventCount: events.length,
      }
    );

    // Respondemos inmediatamente con 202 Accepted para no bloquear al cliente.
    // Esto es crucial para la performance.
    return NextResponse.json(
      { message: "Payload accepted for processing." },
      { status: 202 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown ingest error";
    logger.error("[nos3-ingestor] Fallo crítico en el endpoint de ingestión.", {
      error: errorMessage,
    });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
