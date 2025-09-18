// app/[locale]/(dev)/raz-prompts/_components/PromptCreator.tsx
/**
 * @file PromptCreator.tsx
 * @description Componente contenedor "smart" para la creación de prompts.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { logger } from "@/lib/logging";
import { usePromptCreator } from "../_hooks/usePromptCreator";
import { PromptCreatorForm } from "./PromptCreatorForm";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface PromptCreatorProps {
  content: NonNullable<Dictionary["promptCreator"]>;
}

export function PromptCreator({ content }: PromptCreatorProps) {
  logger.info("[PromptCreator] Renderizzando contenedor principal.");
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
// app/[locale]/(dev)/raz-prompts/_components/PromptCreator.tsx
