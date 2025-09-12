// src/components/razBits/Dock/dock.schema.ts
/**
 * @file dock.schema.ts
 * @description Esquema de Zod para la configuración del componente Dock.
 * @version 1.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import { z } from "zod";

const DockItemDataSchema = z.object({
  // icon y label son React.ReactNode, Zod no los valida directamente.
  // Aquí se valida la existencia de la función onClick.
  onClick: z.function(),
  className: z.string().optional(),
});

export const DockConfigSchema = z.object({
  distance: z.number().default(200),
  panelHeight: z.number().default(68),
  baseItemSize: z.number().default(50),
  dockHeight: z.number().default(256),
  magnification: z.number().default(70),
  // SpringOptions no se validan directamente con Zod ya que son un objeto arbitrario.
  // Se asume que Motion/React lo manejará correctamente.
});

export const DockLocaleSchema = z.object({
  dock: z
    .object({
      config: DockConfigSchema.optional(), // Configuración del dock
      // Los items no se validan aquí con Zod a nivel de contenido i18n
      // ya que su estructura (icon, label, onClick) no es directamente texto i18n.
      // Solo validamos la configuración del Dock en sí.
    })
    .optional(),
});
// src/components/razBits/Dock/dock.schema.ts
