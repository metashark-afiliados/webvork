// lib/session.ts
/**
 * @file session.ts
 * @description SSoT para la configuración y gestión de sesiones encriptadas.
 * @version 2.0.0 (Type Contract Fix): Se alinea con el contrato de tipos de
 *              iron-session v8+, reemplazando la interfaz obsoleta
 *              'IronSessionData' por la correcta 'IronSession'.
 * @author RaZ Podestá - MetaShark Tech
 */
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import { getIronSession, type IronSession } from "iron-session";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { cookies } from "next/headers";

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se define primero la forma de nuestros datos de sesión.
export interface SessionData {
  isDevAuthenticated?: boolean;
}

// El tipo de la sesión ahora es IronSession<SessionData>, la forma canónica en v8.
export type AppSession = IronSession<SessionData>;
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

export const sessionOptions = {
  cookieName: "dev_session",
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export function getSession(): Promise<AppSession> {
  // Se tipa la función para que devuelva el tipo de sesión correcto.
  return getIronSession<SessionData>(cookies(), sessionOptions);
}
// lib/session.ts
