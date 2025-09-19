// lib/middleware/handlers/auth.handler.ts
/**
 * @file auth.handler.ts
 * @description Manejador de middleware para proteger rutas del DCC.
 * @version 2.1.0 (Code Hygiene): Se elimina la importación no utilizada
 *              de 'NextRequest' para cumplir con las reglas de linting.
 * @author RaZ Podestá - MetaShark Tech
 */
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import type { MiddlewareHandler } from "../engine";
import { logger } from "@/lib/logging";

export const authHandler: MiddlewareHandler = async (req, res) => {
  const traceId = logger.startTrace("authHandler");
  try {
    if (!process.env.SESSION_PASSWORD) {
      logger.error(
        "[AuthHandler] ERROR CRÍTICO: La variable de entorno SESSION_PASSWORD no está definida. La autenticación del DCC se ha desactivado por seguridad. Por favor, defínala en tu archivo .env.",
        {}
      );
      return res;
    }

    const { pathname } = req.nextUrl;
    const isDevRoute = pathname.includes("/dev");
    const isLoginPage = pathname.includes("/dev/login");

    logger.trace("[AuthHandler] Verificando ruta.", { pathname });

    if (!isDevRoute || isLoginPage) {
      logger.trace("[AuthHandler] Ruta no requiere autenticación. Omitiendo.");
      return res;
    }

    const session = await getSession();

    if (!session.isDevAuthenticated) {
      const loginUrl = new URL(req.nextUrl.origin);
      const locale = pathname.split("/")[1] || "it-IT";
      loginUrl.pathname = `/${locale}/dev/login`;
      logger.warn(
        `[AuthHandler] Sesión no autenticada. Redirigiendo a página de login.`,
        { redirectTo: loginUrl.toString() }
      );
      return NextResponse.redirect(loginUrl);
    }

    logger.success("[AuthHandler] Sesión autenticada. Acceso concedido.", {});
    return res;
  } catch (error) {
    logger.error("[AuthHandler] Error inesperado durante la ejecución.", {
      error: error instanceof Error ? error.message : String(error),
    });
    return res;
  } finally {
    logger.endTrace(traceId);
  }
};
// lib/middleware/handlers/auth.handler.ts
