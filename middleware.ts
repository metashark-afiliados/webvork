// middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de Middleware de Élite.
 *              Consume la fachada pública del motor y de los manejadores.
 * @version 2.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextRequest, NextResponse } from "next/server";
// --- INICIO DE REFACTORIZACIÓN: Importaciones semánticas ---
import {
  createPipeline,
  type MiddlewareHandler,
} from "@/lib/middleware/engine";
import { i18nHandler } from "@/lib/middleware/handlers";
// --- FIN DE REFACTORIZACIÓN ---

const handlers: MiddlewareHandler[] = [i18nHandler];

const pipeline = createPipeline(handlers);

export async function middleware(request: NextRequest) {
  return pipeline(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
// middleware.ts
