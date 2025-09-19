// lib/middleware/handlers/auth.handler.ts
/**
 * @file auth.handler.ts
 * @description Manejador de middleware para proteger rutas del DCC.
 *              v3.0.0 (Elite Observability): Refactorizado para un logging de
 *              alta verbosidad, registrando explícitamente las rutas omitidas,
 *              las redirecciones y los accesos concedidos con su contexto.
 * @version 3.0.0
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
        "[AuthHandler] ERROR CRÍTICO: La variable de entorno SESSION_PASSWORD no está definida. La autenticación del DCC se ha desactivado por seguridad."
      );
      return res;
    }

    const { pathname } = req.nextUrl;
    const locale = pathname.split("/")[1] || "it-IT";
    const isDevRoute = pathname.includes("/dev");
    const isLoginPage = pathname.includes("/dev/login");

    // --- [INICIO DE MEJORA DE OBSERVABILIDAD] ---
    if (!isDevRoute || isLoginPage) {
      logger.trace(
        `[authHandler] Ruta pública o de login. Omitiendo verificación de sesión.`,
        { pathname }
      );
      return res;
    }
    // --- [FIN DE MEJORA DE OBSERVABILIDAD] ---

    const session = await getSession();

    if (!session.isDevAuthenticated) {
      const loginUrl = new URL(req.nextUrl.origin);
      loginUrl.pathname = `/${locale}/dev/login`;

      // --- [INICIO DE MEJORA DE OBSERVABILIDAD] ---
      logger.warn(
        `[authHandler] Sesión no autenticada. Redirigiendo a página de login.`,
        { from: pathname, to: loginUrl.toString() }
      );
      // --- [FIN DE MEJORA DE OBSERVABILIDAD] ---
      return NextResponse.redirect(loginUrl);
    }

    // --- [INICIO DE MEJORA DE OBSERVABILIDAD] ---
    logger.success(`[authHandler] Sesión autenticada. Acceso concedido.`, {
      pathname,
    });
    // --- [FIN DE MEJORA DE OBSERVABILIDAD] ---
    return res;
  } catch (error) {
    logger.error("[authHandler] Error inesperado durante la ejecución.", {
      error: error instanceof Error ? error.message : String(error),
    });
    return res;
  } finally {
    logger.endTrace(traceId);
  }
};
