// RUTA: shared/lib/supabase/server.ts
/**
 * @file server.ts
 * @description SSoT para la creación del cliente de Supabase en el lado del servidor.
 * @version 2.2.0 (Elite Error Handling & Observability)
 * @author nextjs-with-supabase (original), RaZ Podestá - MetaShark Tech (naturalización)
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { logger } from "@/shared/lib/logging";

export function createClient() {
  logger.trace(
    "[Supabase Client] Creando nueva instancia del cliente para el servidor..."
  );
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // --- [INICIO DE REFACTORIZACIÓN DE ÉLITE] ---
            // En Server Components, esta operación fallará. Se captura y se registra
            // a nivel de 'trace' para observabilidad sin contaminar los logs principales.
            logger.trace(
              "[Supabase Server Client] Error esperado al intentar SET cookie en un Server Component. La operación se ignora de forma segura.",
              { error: (error as Error).message }
            );
            // --- [FIN DE REFACTORIZACIÓN DE ÉLITE] ---
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // --- [INICIO DE REFACTORIZACIÓN DE ÉLITE] ---
            // Misma lógica que en 'set'.
            logger.trace(
              "[Supabase Server Client] Error esperado al intentar REMOVE cookie en un Server Component. La operación se ignora de forma segura.",
              { error: (error as Error).message }
            );
            // --- [FIN DE REFACTORIZACIÓN DE ÉLITE] ---
          }
        },
      },
    }
  );
}
