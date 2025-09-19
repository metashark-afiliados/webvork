// app/[locale]/(dev)/raz-prompts/_hooks/usePromptCreator.ts
/**
 * @file usePromptCreator.ts
 * @description Hook "cerebro" para la lógica de creación de prompts.
 *              v2.0.0 (Ideogram Parameters Integration): Ahora integra todos los
 *              parámetros de Ideogram.ai y el prompt negativo, alineando el formulario
 *              con el "genoma del prompt" de élite.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createPromptEntryAction } from "../_actions";
import {
  RaZPromptsSesaTagsSchema,
  PromptParametersSchema,
} from "@/lib/schemas/raz-prompts/atomic.schema";
import { logger } from "@/lib/logging";

export const CreatePromptFormSchema = z.object({
  title: z.string().min(3, "Il titolo è richiesto."),
  promptText: z.string().min(10, "Il prompt è richiesto."),
  negativePrompt: z.string().optional(), // <-- NUEVO
  tags: RaZPromptsSesaTagsSchema,
  parameters: PromptParametersSchema.deepPartial(), // <-- NUEVO: Para permitir valores parciales del formulario
  keywords: z.string().min(1, "Almeno una parola chiave è richiesta."),
});

export type CreatePromptFormData = z.infer<typeof CreatePromptFormSchema>;

export function usePromptCreator() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreatePromptFormData>({
    resolver: zodResolver(CreatePromptFormSchema),
    defaultValues: {
      title: "",
      promptText: "",
      negativePrompt: "", // <-- NUEVO
      tags: { ai: "ideo", sty: "pht", fmt: "16-9", typ: "ui", sbj: "abs" },
      parameters: {
        // <-- NUEVO: Valores por defecto para los parámetros
        renderingSpeed: "DEFAULT",
        styleType: "REALISTIC",
        aspectRatio: "16x9",
        numImages: 1,
        size: "1280x768",
      },
      keywords: "",
    },
  });

  const onSubmit = (data: CreatePromptFormData) => {
    logger.startGroup("[usePromptCreator] Tentativo di creazione prompt...");
    startTransition(async () => {
      // Extraer width y height de 'size' si está presente
      let finalParameters = data.parameters;
      if (data.parameters?.size) {
        const [width, height] = data.parameters.size.split("x").map(Number);
        // Asumiendo que el backend de Ideogram.ai espera 'width' y 'height' si 'size' se usa.
        // Para Ideogram, la resolución se gestiona por 'aspect_ratio' y la IA internamente,
        // pero si tuviéramos un campo 'width' y 'height' explícito en el schema de Ideogram,
        // los mapearíamos aquí. Por ahora, 'size' es más una referencia de display.
        // Si el schema de Ideogram requiriera width/height, los añadiríamos a PromptParametersSchema
        // y haríamos el mapeo aquí.
      }

      const result = await createPromptEntryAction({
        title: data.title,
        versions: [
          {
            version: 1,
            promptText: data.promptText,
            negativePrompt: data.negativePrompt, // <-- NUEVO
            parameters: finalParameters as z.infer<
              typeof PromptParametersSchema
            >, // Asegurar el tipo
            createdAt: new Date().toISOString(),
          },
        ],
        tags: data.tags,
        keywords: data.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      });

      if (result.success) {
        toast.success("Voce del prompt creata!", {
          description: `ID: ${result.data.promptId}. Copialo per collegare la tua immagine.`,
          duration: 10000,
        });
        logger.success(
          `[usePromptCreator] Prompt creato con successo: ${result.data.promptId}`
        );
        form.reset();
      } else {
        toast.error("Errore nella creazione del prompt", {
          description: result.error,
        });
        logger.error(
          "[usePromptCreator] Fallimento nella creazione del prompt.",
          { error: result.error }
        );
      }
      logger.endGroup();
    });
  };

  return { form, onSubmit, isPending };
}
