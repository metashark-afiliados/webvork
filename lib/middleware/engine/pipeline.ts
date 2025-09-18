// lib/middleware/engine/pipeline.ts
/**
 * @file pipeline.ts
 * @description Orquestador de middleware atómico y compatible con Vercel Edge Runtime.
 *              v1.1.0 (Code Hygiene): Limpia variables no utilizadas.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logging";

export type MiddlewareHandler = (
  req: NextRequest,
  res: NextResponse
) => NextResponse | Promise<NextResponse>;

export function createPipeline(
  handlers: MiddlewareHandler[]
): MiddlewareHandler {
  return async function (
    req: NextRequest
    // --- [INICIO DE CORRECCIÓN: @typescript-eslint/no-unused-vars] ---
    // El parámetro 'res' no se utiliza en esta implementación.
    // --- [FIN DE CORRECCIÓN] ---
  ): Promise<NextResponse> {
    let currentResponse = NextResponse.next();

    for (const handler of handlers) {
      try {
        const result = await handler(req, currentResponse);
        currentResponse = result;

        if (
          result.headers.get("x-middleware-rewrite") ||
          result.headers.get("Location")
        ) {
          logger.trace(
            `[Pipeline] Manejador '${handler.name}' ha cortocircuitado el pipeline.`
          );
          return result;
        }
      } catch (error) {
        console.error(`[Pipeline] Error en el manejador '${handler.name}':`, {
          error,
        });
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }
    return currentResponse;
  };
}
// lib/middleware/engine/pipeline.ts
