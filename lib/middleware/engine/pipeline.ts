// lib/middleware/engine/pipeline.ts
/**
 * @file pipeline.ts
 * @description Orquestador de middleware atómico y compatible con Vercel Edge Runtime.
 *              Su única responsabilidad es ejecutar una cadena de manejadores de
 *              middleware de forma secuencial y predecible.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see roadmap-v2.md - Tarea 5.1
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
    req: NextRequest,
    res: NextResponse
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
