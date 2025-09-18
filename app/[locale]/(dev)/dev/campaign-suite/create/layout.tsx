// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
/**
 * @file layout.tsx
 * @description Layout de Servidor para la SDC.
 * @version 6.0.0 (Build Stability & Named Import): Se alinea con la exportación
 *              nombrada de WizardClientLayout para garantizar la estabilidad.
 * @version 6.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";
import { WizardClientLayout } from "../_components/WizardClientLayout";

interface WizardLayoutProps {
  children: React.ReactNode;
}

export default async function WizardLayout({ children }: WizardLayoutProps) {
  logger.info(
    `[WizardLayout] Renderizando layout específico de la SDC (v6.0).`
  );

  return <WizardClientLayout>{children}</WizardClientLayout>;
}
// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
