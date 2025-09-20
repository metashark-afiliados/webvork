// RUTA: lib/schemas/pages/dev-login-page.schema.ts
/**
 * @file dev-login-page.schema.ts
 * @description Esquema de Zod para el contenido i18n de la página de login
 *              del Developer Command Center.
 * @version 2.0.0 (Contract Integrity Restoration)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const DevLoginPageLocaleSchema = z.object({
  devLoginPage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      // --- INICIO DE CORRECCIÓN DE INTEGRIDAD DE CONTRATO ---
      usernameLabel: z.string(),
      usernamePlaceholder: z.string(),
      // --- FIN DE CORRECCIÓN DE INTEGRIDAD DE CONTRATO ---
      passwordLabel: z.string(),
      passwordPlaceholder: z.string(),
      buttonText: z.string(),
      buttonLoadingText: z.string(),
      footerHtml: z.string(), // Usaremos HTML para los enlaces
    })
    .optional(),
});
