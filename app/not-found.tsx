// app/not-found.tsx
/**
 * @file not-found.tsx
 * @description Enrutador 404 de Nivel Raíz, con lógica de detección de locale robustecida.
 * @version 3.0.0 (Static Asset 404 Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentLocaleFromPathname } from "@/shared/lib/i18n.utils";
import { logger } from "@/shared/lib/logging";
import { defaultLocale } from "@/shared/lib/i18n.config";

export default function NotFound() {
  const headersList = headers();
  const pathname = headersList.get("x-next-pathname") || "";
  const referer = headersList.get("referer") || "";
  const assetPath = headersList.get("x-invoke-path") || "";

  // --- [INICIO DE LÓGICA DE DETECCIÓN MEJORADA] ---
  let targetLocale = defaultLocale;

  // 1. Si es un error de página (tiene pathname), el locale se extrae de ahí.
  if (pathname) {
    logger.warn(
      `[Root NotFound] Ruta de PÁGINA no encontrada interceptada: "${pathname}".`
    );
    targetLocale = getCurrentLocaleFromPathname(pathname);
  }
  // 2. Si es un activo estático, extraemos el locale del 'referer' (la página que lo solicitó).
  else if (referer) {
    const refererPathname = new URL(referer).pathname;
    targetLocale = getCurrentLocaleFromPathname(refererPathname);
    logger.error(
      `[Root NotFound] Solicitud de ACTIVO ESTÁTICO no encontrada: "${assetPath}".`,
      {
        contexto: `La solicitud se originó desde la página: ${referer}`,
      }
    );
  }
  // 3. Caso de fallback (solicitud directa a un activo que no existe).
  else {
    logger.error(
      `[Root NotFound] Solicitud de ACTIVO ESTÁTICO directa no encontrada: "${assetPath}".`
    );
  }
  // --- [FIN DE LÓGICA DE DETECCIÓN MEJORADA] ---

  logger.info(
    `[Root NotFound] Locale final determinado: "${targetLocale}". Redirigiendo a la página 404 localizada.`
  );

  redirect(`/${targetLocale}/not-found`);
}
// app/not-found.tsx
