// lib/middleware/pipeline.ts
/**
 * @file pipeline.ts
 * @description Orquestador de middleware atómico y compatible con Vercel Edge Runtime.
 *              Su única responsabilidad es ejecutar una cadena de manejadores de
 *              middleware de forma secuencial y predecible.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see roadmap.md - Tarea 3.1 (Revisada)
 */

import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logging"; // Asumiendo que el logger es Edge-compatible

/**
 * @type MiddlewareHandler
 * @description Define el contrato que todo manejador de middleware debe cumplir.
 *              Debe aceptar un `NextRequest` y un `NextResponse` y devolver un `NextResponse`.
 */
export type MiddlewareHandler = (
  req: NextRequest,
  res: NextResponse
) => NextResponse | Promise<NextResponse>;

/**
 * @function createPipeline
 * @description Fábrica que crea una única función de middleware a partir de una lista de manejadores.
 * @param {MiddlewareHandler[]} handlers - Un array de funciones manejadoras a ejecutar en secuencia.
 * @returns {MiddlewareHandler} Una nueva función de middleware que orquesta el pipeline.
 */
export function createPipeline(
  handlers: MiddlewareHandler[]
): MiddlewareHandler {
  // Retorna el orquestador final.
  return async function (
    req: NextRequest,
    res: NextResponse
  ): Promise<NextResponse> {
    // Inicia un NextResponse limpio en cada ejecución.
    let currentResponse = NextResponse.next();

    // Itera sobre los manejadores en secuencia, esperando a que cada uno termine.
    for (const handler of handlers) {
      try {
        const result = await handler(req, currentResponse);

        // Actualiza la respuesta actual con el resultado del manejador.
        currentResponse = result;

        // --- Lógica de Cortocircuito ---
        // Si un manejador devuelve una redirección o una reescritura, la cabecera 'x-middleware-rewrite'
        // o 'Location' estará presente. En ese caso, detenemos el pipeline y devolvemos la
        // respuesta inmediatamente.
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
        // Logueo de errores compatible con el Edge Runtime.
        console.error(`[Pipeline] Error en el manejador '${handler.name}':`, {
          error,
        });
        // En caso de error, devolvemos una respuesta genérica de error 500.
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }

    // Si ningún manejador cortocircuitó, devuelve la respuesta final.
    return currentResponse;
  };
}
// lib/middleware/pipeline.ts
