// app/not-found.tsx
/**
 * @file not-found.tsx
 * @description Enrutador 404 de Nivel Raíz y SSoT para la gestión de errores de ruta.
 *              Este aparato NO renderiza UI. Su única responsabilidad es interceptar
 *              todas las solicitudes 404, detectar el locale del usuario y redirigir
 *              a la página 404 localizada correspondiente.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { logger } from "@/lib/logging";

export default function NotFound() {
  const headersList = headers();
  const pathname = headersList.get("x-next-pathname") || "";

  logger.warn(
    `[Root NotFound] Ruta no encontrada interceptada: "${pathname}".`
  );

  // 1. Detecta el locale a partir de la URL solicitada.
  const locale = getCurrentLocaleFromPathname(pathname);
  logger.info(
    `[Root NotFound] Locale detectado: "${locale}". Redirigiendo a la página 404 localizada.`
  );

  // 2. Redirige a la página 404 específica del locale.
  redirect(`/${locale}/not-found`);
}
// app/not-found.tsx
