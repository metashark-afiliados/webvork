// RUTA: shared/lib/supabase/middleware.ts
/**
 * @file middleware.ts
 * @description SSoT para la lógica de middleware de gestión de sesión de Supabase.
 * @version 2.1.0 (Elite Type Safety & Code Hygiene)
 * @author nextjs-with-supabase (original), RaZ Podestá - MetaShark Tech (naturalización)
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/shared/lib/logging";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isDevRoute = pathname.includes("/dev");
  const isLoginPage = pathname.includes("/dev/login");

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

  return supabaseResponse;
}
