// app/[locale]/(dev)/bavi/_components/AssetExplorer.tsx
/**
 * @file AssetExplorer.tsx
 * @description Componente contenedor "smart" para la exploración de activos de BAVI.
 *              Orquesta la obtención de datos, el filtrado y la paginación de activos visuales.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  DynamicIcon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  CardDescription,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import { AssetCard } from "./AssetCard";
import {
  getBaviAssetsAction,
  type GetBaviAssetsInput,
} from "../_actions/getBaviAssets.action";
import type {
  BaviAsset,
  BaviManifest,
} from "@/lib/schemas/bavi/bavi.manifest.schema";
import type { RaZPromptsSesaTags } from "@/lib/schemas/raz-prompts/atomic.schema";
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema"; // Para las opciones SESA
import type { z } from "zod";
import type { Locale } from "@/lib/i18n.config";

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
    pageInfo: string; // Texto con placeholders como "Página {{currentPage}} de {{totalPages}}"
  };
  sesaOptions: CreatorContent["sesaOptions"]; // Para las opciones de filtro SESA
}

export function AssetExplorer({
  locale,
  content,
  sesaOptions,
}: AssetExplorerProps): React.ReactElement {
  logger.info("[AssetExplorer] Renderizando la bóveda de activos (v1.0).");

  const [assets, setAssets] = useState<BaviAsset[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<
    Partial<RaZPromptsSesaTags>
  >({});

  const fetchAssets = useCallback(async (input: GetBaviAssetsInput) => {
    startTransition(async () => {
      logger.trace("[AssetExplorer] Iniciando fetch de activos...", { input });
      const result = await getBaviAssetsAction(input);
      if (result.success) {
        setAssets(result.data.assets);
        setTotalAssets(result.data.total);
        logger.success("[AssetExplorer] Activos cargados con éxito.");
      } else {
        logger.error("[AssetExplorer] Fallo al cargar activos.", {
          error: result.error,
        });
        setAssets([]);
        setTotalAssets(0);
      }
    });
  }, []);

  useEffect(() => {
    fetchAssets({
      page: currentPage,
      limit: 10,
      query: searchQuery,
      tags: activeFilters,
    });
  }, [fetchAssets, currentPage, searchQuery, activeFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Resetear a la primera página en cada nueva búsqueda
    fetchAssets({
      page: 1,
      limit: 10,
      query: searchQuery,
      tags: activeFilters,
    });
  };

  const handleFilterChange = (
    category: keyof RaZPromptsSesaTags,
    value: string
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (value === "all") {
        delete newFilters[category];
      } else {
        newFilters[category] = value;
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalAssets / 10);

  const onViewAssetDetails = (assetId: string) => {
    // Implementar navegación a la página de detalles del activo o modal
    logger.info(`[AssetExplorer] Ver detalles del activo: ${assetId}`);
    // Example: router.push(`/dev/bavi/${assetId}`);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              placeholder={content.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={isPending}>
              <DynamicIcon name="Search" className="h-4 w-4 mr-2" />
              {content.searchButton}
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 mb-6">
            <Select onValueChange={(value) => handleFilterChange("ai", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={content.filterByAILabel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{content.allAIsOption}</SelectItem>
                {sesaOptions.ai.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Aquí se pueden añadir más selectores para otras categorías SESA */}
            <Select onValueChange={(value) => handleFilterChange("sty", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Estilo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estilos</SelectItem>
                {sesaOptions.sty.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isPending && assets.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <DynamicIcon
                name="LoaderCircle"
                className="w-8 h-8 animate-spin"
              />
              <p className="ml-4">{content.loadingAssets}</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <DynamicIcon
                name="FolderOpen"
                className="h-10 w-10 mx-auto mb-4"
              />
              <p className="font-semibold">{content.noAssetsFoundTitle}</p>
              <p className="text-sm mt-2">{content.noAssetsFoundDescription}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <AssetCard
                  key={asset.assetId}
                  asset={asset}
                  locale={locale}
                  onViewDetails={onViewAssetDetails}
                  sesaOptions={sesaOptions}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                disabled={currentPage === 1 || isPending}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <DynamicIcon name="ChevronLeft" className="h-4 w-4 mr-2" />
                {content.previousPageButton}
              </Button>
              <span className="flex items-center text-sm font-medium">
                {content.pageInfo
                  .replace("{{currentPage}}", String(currentPage))
                  .replace("{{totalPages}}", String(totalPages))}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages || isPending}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {content.nextPageButton}
                <DynamicIcon name="ChevronRight" className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
