// app/[locale]/(dev)/dev/_components/SuiteStyleComposer/ComposerHeader.tsx
/**
 * @file ComposerHeader.tsx
 * @description Aparato de presentación puro para el encabezado del Compositor de Estilos de Suite.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { logger } from "@/shared/lib/logging";

interface ComposerHeaderProps {
  title: string;
  description: string;
}

export function ComposerHeader({
  title,
  description,
}: ComposerHeaderProps): React.ReactElement {
  logger.trace("[ComposerHeader] Renderizando.");
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );
}
