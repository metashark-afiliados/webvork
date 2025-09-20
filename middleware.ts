// middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador del pipeline de middleware. Ahora depende exclusivamente
 *              de Supabase para la gestión de sesiones.
 * @version 4.0.0 (Supabase Auth SSoT)
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextRequest, NextResponse } from "next/server";
import {
  createPipeline,
  type MiddlewareHandler,
} from "@/shared/lib/middleware/engine";
import { i18nHandler } from "@/shared/lib/middleware/handlers";
import { logger } from "@/shared/lib/logging";
import { updateSession } from "@/shared/lib/supabase/middleware";

// El pipeline ahora es estático y más seguro. updateSession es el primer guardián.
const handlers: MiddlewareHandler[] = [updateSession, i18nHandler];

logger.info(
  "[Middleware] Pipeline de middleware inicializado (Supabase SSoT)."
);

const pipeline = createPipeline(handlers);

export async function middleware(request: NextRequest) {
  return pipeline(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
// middleware.ts
