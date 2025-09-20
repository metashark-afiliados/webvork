// RUTA: shared/lib/schemas/entities/product.schema.ts
/**
 * @file product.schema.ts
 * @description SSoT para el contrato de datos de la entidad Producto v2.0.
 *              Este schema define la estructura completa de un producto en el
 *              ecosistema, incluyendo inventario, logística, información del
 *              productor y especificaciones detalladas.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

const InventorySchema = z.object({
  total: z.number().int().min(0),
  available: z.number().int().min(0),
  reserved: z.number().int().min(0).default(0),
});

const LogisticsSchema = z.object({
  deliveryTime: z.string(),
});

const ProducerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  checkoutUrl: z.string().url(),
});

const CategorizationSchema = z.object({
  primary: z.string(),
  secondary: z.array(z.string()).optional(),
});

const TargetProfileSchema = z.object({
  userType: z.string().optional(),
  ageRange: z.string().optional(),
});

/**
 * @description El schema principal y soberano para la entidad Producto.
 */
export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1), // Campo añadido para la navegación
  price: z.number().positive(),
  currency: z.string().length(3).default("EUR"),
  isBestseller: z.boolean().optional(),
  imageUrl: z.string().startsWith("/"),
  inventory: InventorySchema,
  logistics: LogisticsSchema,
  producerInfo: ProducerSchema,
  categorization: CategorizationSchema, // Unifica la lógica de 'tags'
  targetProfile: TargetProfileSchema,
  rating: z.number().min(0).max(5).optional(),
});

export const ProductCatalogSchema = z.object({
  products: z.array(ProductSchema),
});

export type Product = z.infer<typeof ProductSchema>;
