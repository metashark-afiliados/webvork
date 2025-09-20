// RUTA: shared/lib/supabase/client.ts
/**
 * @file client.ts
 * @description SSoT para la creación del cliente de Supabase en el navegador.
 * @version 2.0.0 (SSR-Aware & Elite Compliance)
 * @author nextjs-with-supabase (original), RaZ Podestá - MetaShark Tech (naturalización)
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Utiliza las variables de entorno canónicas y correctas.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
