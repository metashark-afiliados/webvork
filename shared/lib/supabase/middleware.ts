// RUTA: shared/lib/supabase/middleware.ts
/**
 * @file middleware.ts
 * @description SSoT para la lógica de middleware de gestión de sesión de Supabase.
 *              Este aparato es el corazón de la autenticación SSR.
 * @version 2.0.0 (Elite Type Safety)
 * @author nextjs-with-supabase (original), RaZ Podestá - MetaShark Tech (naturalización)
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/shared/lib/logging";

/**
 * @function updateSession
 * @description Middleware handler que refresca la sesión del usuario en cada petición.
 *              También protege las rutas del DCC, redirigiendo si no hay sesión.
 * @param {NextRequest} request - La petición entrante.
 * @returns {Promise<NextResponse>} La respuesta, posiblemente con cookies de sesión actualizadas.
 */
export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({
    request,
  });

  logger.trace("[Supabase Middleware] Actualizando sesión...");

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // El tipo `CookieOptions` importado de `@supabase/ssr` es la SSoT.
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: {
              name: string;
              value: string;
              options: CookieOptions;
            }) => request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: {
              name: string;
              value: string;
              options: CookieOptions;
            }) => supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Es crucial llamar a `getUser` para refrescar la cookie de sesión si ha expirado.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isDevRoute = pathname.includes("/dev");
  const isLoginPage = pathname.includes("/dev/login");

  // Lógica de protección para el DCC
  if (isDevRoute && !isLoginPage && !user) {
    const locale = pathname.split("/")[1] || "it-IT";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/dev/login`;
    logger.warn(
      `[Supabase Middleware] Acceso denegado a ruta protegida. Redirigiendo a login.`,
      { path: pathname }
    );
    return NextResponse.redirect(url);
  }

  // Se debe devolver siempre el objeto `supabaseResponse` para persistir las cookies.
  return supabaseResponse;
}
