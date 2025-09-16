// app/not-found.tsx
/**
 * @file not-found.tsx
 * @description Enrutador 404 de Nivel Raíz, ahora con logging mejorado.
 *              v2.0.0 (Enhanced Observability): Refactorizado para proporcionar un
 *              contexto de logging más útil para activos estáticos no encontrados,
 *              resolviendo el problema de las rutas vacías.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { logger } from "@/lib/logging";

export default function NotFound() {
  const headersList = headers();
  const pathname = headersList.get("x-next-pathname") || "";

  // --- [INICIO DE MEJORA DE OBSERVABILIDAD] ---
  if (pathname) {
    logger.warn(
      `[Root NotFound] Ruta de PÁGINA no encontrada interceptada: "${pathname}".`
    );
  } else {
    // Si pathname está vacío, es probable que sea un activo estático.
    const referer = headersList.get("referer") || "N/A";
    const assetPath = headersList.get("x-invoke-path") || "Desconocido";
    logger.error(
      `[Root NotFound] Solicitud de ACTIVO ESTÁTICO no encontrada: "${assetPath}".`,
      {
        contexto: `La solicitud probablemente se originó desde la página: ${referer}`,
      }
    );
  }
  // --- [FIN DE MEJORA DE OBSERVABILIDAD] ---

  const locale = getCurrentLocaleFromPathname(pathname);
  logger.info(
    `[Root NotFound] Locale detectado: "${locale}". Redirigiendo a la página 404 localizada.`
  );

  redirect(`/${locale}/not-found`);
}
// app/not-found.tsx
