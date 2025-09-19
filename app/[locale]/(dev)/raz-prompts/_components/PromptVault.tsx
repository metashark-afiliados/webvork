// app/[locale]/(dev)/raz-prompts/_components/PromptVault.tsx
/**
 * @file PromptVault.tsx
 * @description Orquestador de la Bóveda de Prompts. Consume el hook de lógica
 *              y delega la presentación a componentes atómicos.
 * @version 3.1.0 (Prop Drilling Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import { usePromptVault } from "../_hooks/usePromptVault";
import { PromptGrid } from "./PromptGrid";
import { VaultFilters } from "./VaultFilters";
import { VaultPagination } from "./VaultPagination";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface PromptVaultProps {
  content: NonNullable<Dictionary["promptCreator"]>;
  vaultContent: NonNullable<Dictionary["promptVault"]>;
}

export function PromptVault({
  content,
  vaultContent,
}: PromptVaultProps): React.ReactElement {
  logger.info(
    "[Observabilidad] Renderizando orquestador PromptVault v3.1 (Prop Drilling Fix)"
  );

  const hookState = usePromptVault();

  const onViewPromptDetails = (promptId: string) => {
    logger.info(`[PromptVault] Ver detalles del prompt: ${promptId}`);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{vaultContent.title}</CardTitle>
          <CardDescription>{vaultContent.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <VaultFilters
            searchQuery={hookState.searchQuery}
            onSearch={hookState.handleSearch}
            onFilterChange={hookState.handleFilterChange}
            content={vaultContent}
            sesaOptions={content.sesaOptions}
            isPending={hookState.isPending}
          />
          <PromptGrid
            prompts={hookState.prompts}
            isLoading={hookState.isPending && hookState.prompts.length === 0}
            onViewDetails={onViewPromptDetails}
            content={vaultContent}
            // --- [INICIO DE CORRECCIÓN] ---
            // Se pasa la prop 'sesaOptions' que faltaba, cumpliendo con el contrato.
            sesaOptions={content.sesaOptions}
            // --- [FIN DE CORRECCIÓN] ---
          />
          <VaultPagination
            currentPage={hookState.currentPage}
            totalPages={hookState.totalPages}
            onPageChange={hookState.handlePageChange}
            isPending={hookState.isPending}
            content={vaultContent}
          />
        </CardContent>
      </Card>
    </div>
  );
}
// app/[locale]/(dev)/raz-prompts/_components/PromptVault.tsx
