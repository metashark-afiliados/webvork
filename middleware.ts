// middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador del pipeline de middleware.
 *              v2.1.0 (Holistic Observability Audit): Auditado como parte de la
 *              refactorización holística de observabilidad. Se confirma que su
 *              lógica de composición y el feature toggle son robustos y correctos.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextRequest, NextResponse } from "next/server";
import {
  createPipeline,
  type MiddlewareHandler,
} from "@/shared/lib/middleware/engine";
import { i18nHandler, authHandler } from "@/shared/lib/middleware/handlers";
import { logger } from "@/shared/lib/logging";

const handlers: MiddlewareHandler[] = [i18nHandler];

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

const pipeline = createPipeline(handlers);

export async function middleware(request: NextRequest) {
  return pipeline(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
