// app/[locale]/(dev)/raz-prompts/_components/PromptVault.tsx
/**
 * @file PromptVault.tsx
 * @description Componente contenedor "smart" para la bóveda de prompts.
 *              Orquesta la obtención de datos, el filtrado y la paginación.
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
} from "@/components/ui";
import { logger } from "@/lib/logging";
import { PromptCard } from "./PromptCard";
import { getPromptsAction, type GetPromptsInput } from "../_actions";
import type {
  RaZPromptsEntry,
  RaZPromptsSesaTags,
} from "@/lib/schemas/raz-prompts/entry.schema";
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import type { z } from "zod";
import { SesaTagsFormGroup } from "./SesaTagsFormGroup"; // Reutilizamos este componente

type Content = z.infer<typeof PromptCreatorContentSchema>; // Reutilizamos el schema de i18n para las etiquetas

interface PromptVaultProps {
  content: Content;
}

export function PromptVault({ content }: PromptVaultProps): React.ReactElement {
  logger.info("[PromptVault] Renderizando la bóveda de prompts.");

  const [prompts, setPrompts] = useState<RaZPromptsEntry[]>([]);
  const [totalPrompts, setTotalPrompts] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<
    Partial<RaZPromptsSesaTags>
  >({});

  const fetchPrompts = useCallback(async (input: GetPromptsInput) => {
    startTransition(async () => {
      logger.trace("[PromptVault] Iniciando fetch de prompts...", { input });
      const result = await getPromptsAction(input);
      if (result.success) {
        setPrompts(result.data.prompts);
        setTotalPrompts(result.data.total);
        logger.success("[PromptVault] Prompts cargados con éxito.");
      } else {
        logger.error("[PromptVault] Fallo al cargar prompts.", {
          error: result.error,
        });
        setPrompts([]);
        setTotalPrompts(0);
      }
    });
  }, []);

  useEffect(() => {
    fetchPrompts({
      page: currentPage,
      limit: 10,
      query: searchQuery,
      tags: activeFilters,
    });
  }, [fetchPrompts, currentPage, searchQuery, activeFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Resetear a la primera página en cada nueva búsqueda
    fetchPrompts({
      page: 1,
      limit: 10,
      query: searchQuery,
      tags: activeFilters,
    });
  };

  const handleFilterChange = (newFilters: Partial<RaZPromptsSesaTags>) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalPrompts / 10);

  const onViewPromptDetails = (promptId: string) => {
    // Implementar navegación a la página de detalles del prompt o modal
    logger.info(`[PromptVault] Ver detalles del prompt: ${promptId}`);
    // Example: router.push(`/dev/raz-prompts/${promptId}`);
  };

  // Prepara el contenido para SesaTagsFormGroup
  const sesaContentForFilters = {
    ...content.sesaLabels,
    options: content.sesaOptions,
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Bóveda de Prompts</CardTitle>
          <CardDescription>
            Explora y gestiona tus prompts generativos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              placeholder="Buscar por título, texto o palabras clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={isPending}>
              <DynamicIcon name="Search" className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>

          {/* Aquí se podría integrar SesaTagsFormGroup para filtros más avanzados */}
          {/* Por simplicidad inicial, dejaremos un placeholder o implementaremos un filtro simple */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Ejemplo de filtro simple por AI */}
            <Select
              onValueChange={(value) =>
                handleFilterChange({
                  ...activeFilters,
                  ai: value === "all" ? undefined : value,
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por IA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las IAs</SelectItem>
                {content.sesaOptions.ai.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Otros filtros SESA se pueden añadir aquí */}
          </div>

          {isPending && prompts.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <DynamicIcon
                name="LoaderCircle"
                className="w-8 h-8 animate-spin"
              />
              <p className="ml-4">Cargando prompts...</p>
            </div>
          ) : prompts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <DynamicIcon
                name="FolderOpen"
                className="h-10 w-10 mx-auto mb-4"
              />
              <p>
                No se encontraron prompts que coincidan con tu búsqueda o
                filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt) => (
                <PromptCard
                  key={prompt.promptId}
                  prompt={prompt}
                  onViewDetails={onViewPromptDetails}
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
                Anterior
              </Button>
              <span className="flex items-center text-sm font-medium">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages || isPending}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
                <DynamicIcon name="ChevronRight" className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
