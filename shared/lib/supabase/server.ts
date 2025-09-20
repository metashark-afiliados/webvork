// RUTA: shared/lib/supabase/server.ts
/**
 * @file server.ts
 * @description SSoT para la creación del cliente de Supabase en el lado del servidor.
 *              Este cliente es consciente de las cookies y es fundamental para la
 *              autenticación en Server Components y Server Actions.
 * @version 2.0.0 (SSR-Aware & Elite Compliance)
 * @author nextjs-with-supabase (original), RaZ Podestá - MetaShark Tech (naturalización)
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { logger } from "@/shared/lib/logging";

/**
 * @function createClient
 * @description Crea y devuelve una nueva instancia del cliente de Supabase para el servidor.
 *              Es crucial crear una nueva instancia en cada petición para evitar compartir
 *              sesiones entre usuarios en entornos de "computación fluida" como Vercel.
 * @returns {SupabaseClient} Una instancia del cliente de Supabase para el servidor.
 */
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
            // Ignorar errores en Server Components como se recomienda.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Ignorar errores en Server Components.
          }
        },
      },
    }
  );
}
