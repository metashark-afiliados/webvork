// RUTA: shared/lib/supabase/server.ts
/**
 * @file server.ts
 * @description SSoT para la creación del cliente de Supabase en el lado del servidor.
 * @version 2.1.0 (SSR-Aware & Elite Compliance)
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
