// RUTA: shared/lib/actions/auth.actions.ts
/**
 * @file auth.actions.ts
 * @description SSoT para las Server Actions relacionadas con la autenticación.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { revalidatePath } from "next/cache";
import { logger } from "@/shared/lib/logging";
import { createClient } from "@/shared/lib/supabase/server";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import { LoginSchema, type LoginFormData } from "@/shared/lib/schemas/auth/login.schema";

/**
 * @function loginWithPasswordAction
 * @description Autentica a un usuario utilizando email y contraseña a través de Supabase.
 * @param {LoginFormData} data - Los datos del formulario de login.
 * @returns {Promise<ActionResult<{ success: true }>>} Un objeto indicando el resultado de la operación.
 */
export async function loginWithPasswordAction(
  data: LoginFormData
): Promise<ActionResult<{ success: true }>> {
  logger.info("[AuthAction] Iniciando proceso de login con contraseña...");

  // 1. Validación de Entrada (Contrato de Datos)
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    logger.warn("[AuthAction] Fallo de validación de datos de entrada.", {
      errors: validation.error.flatten(),
    });
    return { success: false, error: "Datos de login inválidos." };
  }

  const { email, password } = validation.data;
  const supabase = await createClient();

  // 2. Lógica de Negocio (Comunicación con Supabase)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // 3. Manejo de Errores
  if (error) {
    logger.error("[AuthAction] Error de autenticación desde Supabase.", {
      error: error.message,
    });
    return { success: false, error: "Credenciales inválidas." }; // Mensaje genérico para el cliente
  }

  // 4. Efectos Secundarios (Revalidación de Caché)
  revalidatePath("/", "layout"); // Revalida toda la aplicación para reflejar el estado de autenticado

  logger.success(`[AuthAction] Login exitoso para el usuario: ${email}`);
  return { success: true, data: { success: true } };
}
