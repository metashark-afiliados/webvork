// app/[locale]/(dev)/raz-prompts/_hooks/usePromptVault.ts
/**
 * @file usePromptVault.ts
 * @description Hook "cerebro" para la lógica de la Bóveda de Prompts. Encapsula
 *              el estado, la obtención de datos, el filtrado y la paginación.
 * @version 1.1.0 (Type Safety & Import Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { toast } from "sonner";
import { logger } from "@/lib/logging";
import { getPromptsAction, type GetPromptsInput } from "../_actions";
import type { RaZPromptsEntry } from "@/lib/schemas/raz-prompts/entry.schema";
// --- [INICIO DE CORRECCIÓN DE IMPORTACIÓN] ---
// El tipo `RaZPromptsSesaTags` se importa desde su SSoT en `atomic.schema.ts`.
import type { RaZPromptsSesaTags } from "@/lib/schemas/raz-prompts/atomic.schema";
// --- [FIN DE CORRECCIÓN DE IMPORTACIÓN] ---

export function usePromptVault() {
  logger.trace("[Hook:usePromptVault] Inicializando lógica de la bóveda v1.1.");

  const [prompts, setPrompts] = useState<RaZPromptsEntry[]>([]);
  const [totalPrompts, setTotalPrompts] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<
    Partial<RaZPromptsSesaTags>
  >({});
  const limit = 9;

  const fetchPrompts = useCallback(
    (input: GetPromptsInput) => {
      startTransition(async () => {
        logger.trace("[usePromptVault] Iniciando fetch de prompts...", {
          input,
        });
        const result = await getPromptsAction(input);
        if (result.success) {
          setPrompts(result.data.prompts);
          setTotalPrompts(result.data.total);
        } else {
          toast.error("Error al cargar prompts", {
            description: result.error,
          });
          setPrompts([]);
          setTotalPrompts(0);
        }
      });
    },
    [startTransition]
  );

  useEffect(() => {
    fetchPrompts({
      page: currentPage,
      limit,
      query: searchQuery,
      tags: activeFilters,
    });
  }, [fetchPrompts, currentPage, searchQuery, activeFilters]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (category: keyof RaZPromptsSesaTags, value: string) => {
      // --- [INICIO DE CORRECCIÓN DE TIPO] ---
      // Se añade un tipo explícito al parámetro 'prev' para resolver el error TS7006.
      setActiveFilters((prev: Partial<RaZPromptsSesaTags>) => {
        // --- [FIN DE CORRECCIÓN DE TIPO] ---
        const newFilters = { ...prev };
        if (value === "all") {
          delete newFilters[category];
        } else {
          newFilters[category] = value;
        }
        return newFilters;
      });
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const totalPages = Math.ceil(totalPrompts / limit);

  return {
    prompts,
    isPending,
    currentPage,
    searchQuery,
    totalPages,
    handleSearch,
    handleFilterChange,
    handlePageChange,
  };
}
// app/[locale]/(dev)/raz-prompts/_hooks/usePromptVault.ts
