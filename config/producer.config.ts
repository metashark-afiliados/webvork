// src/config/producer.config.ts
/**
 * @file producer.config.ts
 * @description Orquestrador de Configuração e SSoT para todas as variáveis
 *              relacionadas ao produtor e ao tracking.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

const ProducerConfigSchema = z.object({
  // Adicionamos o nosso novo interruptor ao schema.
  TRACKING_ENABLED: z.boolean(),

  ACTION_URL: z
    .string()
    .url("A URL do endpoint do produtor deve ser uma URL válida."),
  LANDING_ID: z.string().min(1, "O ID da Landing Page é obrigatório."),
  OFFER_ID: z.string().min(1, "O ID da Oferta é obrigatório."),
  TRACKING: z.object({
    YANDEX_METRIKA_ID: z.string().optional(),
    GOOGLE_ANALYTICS_ID: z.string().optional(),
    TRUFFLE_PIXEL_ID: z.string().optional(),
  }),
});

const validatedConfig = ProducerConfigSchema.safeParse({
  // Mapeamos a variável de ambiente para um booleano.
  TRACKING_ENABLED:
    process.env.NEXT_PUBLIC_PRODUCER_TRACKING_ENABLED === "enabled",

  ACTION_URL: process.env.NEXT_PUBLIC_PRODUCER_ACTION_URL,
  LANDING_ID: process.env.NEXT_PUBLIC_LANDING_ID,
  OFFER_ID: process.env.NEXT_PUBLIC_OFFER_ID,
  TRACKING: {
    YANDEX_METRIKA_ID: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID,
    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    TRUFFLE_PIXEL_ID: process.env.NEXT_PUBLIC_TRUFFLE_PIXEL_ID,
  },
});

if (!validatedConfig.success) {
  console.error(
    "❌ CONFIGURAÇÃO DE AMBIENTE INVÁLIDA:",
    validatedConfig.error.flatten().fieldErrors
  );
  throw new Error(
    "Variáveis de ambiente do produtor ausentes ou inválidas. Verifique o arquivo .env e .env.example."
  );
}

export const producerConfig = validatedConfig.data;
// src/config/producer.config.ts
