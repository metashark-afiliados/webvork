// lib/schemas/pages/text-page.schema.ts
/**
 * @file text-page.schema.ts
 * @description Schema genérico para páginas de contenido estático.
 *              - v2.0.0: Refactorizado para consumir el SSoT ContentBlocksSchema,
 *                asegurando la consistencia en todo el sistema.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { ContentBlocksSchema } from "@/lib/schemas/components/content-block.schema"; // <-- IMPORTAR CONTRATO

// Define la estructura para el contenido de una página de texto en un solo locale.
export const TextPageLocaleSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: ContentBlocksSchema, // <-- UTILIZAR EL CONTRATO REUTILIZABLE
});
