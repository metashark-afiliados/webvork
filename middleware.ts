// middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador del pipeline de middleware.
 *              v2.0.0 (Feature Toggle): La inclusión del `authHandler` ahora
 *              está controlada por la variable de entorno DCC_AUTH_ENABLED.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextRequest, NextResponse } from "next/server";
import {
  createPipeline,
  type MiddlewareHandler,
} from "@/lib/middleware/engine";
import { i18nHandler, authHandler } from "@/lib/middleware/handlers";
import { logger } from "./lib/logging";

const handlers: MiddlewareHandler[] = [i18nHandler];

// --- [INICIO] LÓGICA DE FEATURE TOGGLE ---
if (process.env.DCC_AUTH_ENABLED === "true") {
  handlers.push(authHandler);
  logger.info(
    "[Middleware] El manejador de autenticación del DCC está ACTIVADO."
  );
} else {
  logger.warn(
    "[Middleware] El manejador de autenticación del DCC está DESACTIVADO."
  );
}
// --- [FIN] LÓGICA DE FEATURE TOGGLE ---

const pipeline = createPipeline(handlers);

export async function middleware(request: NextRequest) {
  return pipeline(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
// middleware.ts
