// app/[locale]/(dev)/bavi/_components/AssetExplorer.tsx
/**
 * @file AssetExplorer.tsx
 * @description Orquestador de élite para la exploración de activos de BAVI.
 * @version 3.3.0 (Prop Contract Sync): Sincronizado con el contrato
 *              actualizado de AssetExplorerDisplay.
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { logger } from "@/lib/logging";
import type { BaviAsset } from "@/lib/schemas/bavi/bavi.manifest.schema";
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import type { z } from "zod";
import type { Locale } from "@/lib/i18n.config";
import { useAssetExplorerLogic } from "./useAssetExplorerLogic";
import { AssetExplorerDisplay } from "./AssetExplorerDisplay";

type CreatorContent = z.infer<typeof PromptCreatorContentSchema>;

interface AssetExplorerProps {
  locale: Locale;
  content: {
    title: string;
    description: string;
    searchPlaceholder: string;
    searchButton: string;
    filterByAILabel: string;
    allAIsOption: string;
    loadingAssets: string;
    noAssetsFoundTitle: string;
    noAssetsFoundDescription: string;
    previousPageButton: string;
    nextPageButton: string;
    pageInfo: string;
    selectAssetButton: string;
  };
  sesaOptions: CreatorContent["sesaOptions"];
  onAssetSelect?: (asset: BaviAsset) => void;
}

export function AssetExplorer({
  locale,
  content,
  sesaOptions,
  onAssetSelect,
}: AssetExplorerProps): React.ReactElement {
  logger.info(
    "[AssetExplorer] Renderizando orquestador (v3.3 - Prop Contract Synced)."
  );

  const {
    assets,
    isPending,
    currentPage,
    searchQuery,
    activeFilters,
    totalPages,
    setSearchQuery,
    handleSearch,
    handleFilterChange,
    handlePageChange,
  } = useAssetExplorerLogic();

  return (
    <AssetExplorerDisplay
      locale={locale}
      content={content}
      sesaOptions={sesaOptions}
      assets={assets}
      isPending={isPending}
      currentPage={currentPage}
      searchQuery={searchQuery}
      activeFilters={activeFilters}
      totalPages={totalPages}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
      handleFilterChange={handleFilterChange}
      handlePageChange={handlePageChange}
      onAssetSelect={onAssetSelect}
    />
  );
}
// app/[locale]/(dev)/bavi/_components/AssetExplorer.tsx
