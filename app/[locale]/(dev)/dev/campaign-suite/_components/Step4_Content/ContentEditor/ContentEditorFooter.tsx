// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditorFooter.tsx
/**
 * @file ContentEditorFooter.tsx
 * @description Aparato de presentación atómico para el pie del editor de contenido.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { Button } from "@/components/ui";
import { logger } from "@/lib/logging";

interface ContentEditorFooterProps {
  onClose: () => void;
  onSubmit: () => void;
}

export function ContentEditorFooter({
  onClose,
  onSubmit,
}: ContentEditorFooterProps): React.ReactElement {
  logger.trace("[ContentEditorFooter] Renderizando.");
  return (
    <footer className="p-4 border-t flex justify-end gap-2 flex-shrink-0">
      <Button variant="outline" onClick={onClose}>
        Cancelar
      </Button>
      <Button onClick={onSubmit}>Finalizar Edición</Button>
    </footer>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditorFooter.tsx
