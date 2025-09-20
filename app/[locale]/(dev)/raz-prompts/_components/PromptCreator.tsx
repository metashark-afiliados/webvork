// RUTA: app/[locale]/(dev)/raz-prompts/_components/PromptCreator.tsx
/**
 * @file PromptCreator.tsx
 * @description Componente contenedor "smart" para la creación de prompts,
 *              ahora cumpliendo con los estándares de calidad del proyecto
 *              y las directivas de nomenclatura.
 * @version 2.1.0 (Module Resolution Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { logger } from "@/lib/logging";
import { usePromptCreator } from "../_hooks/use-prompt-creator";
import { PromptCreatorForm } from "./PromptCreatorForm";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface PromptCreatorProps {
  content: NonNullable<Dictionary["promptCreator"]>;
}

export function PromptCreator({ content }: PromptCreatorProps) {
  logger.info("[Observabilidad] Renderizando PromptCreator v2.1");
  const { form, onSubmit, isPending } = usePromptCreator();

  return (
    <PromptCreatorForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      content={content}
    />
  );
}
