// components/sections/ProductFilters.tsx
/**
 * @file ProductFilters.tsx
 * @description Barra lateral de filtros para la Tienda v2.0.
 * @version 2.1.0 (Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { z } from "zod";
import type { StorePageLocaleSchema } from "@/shared/lib/schemas/pages/store-page.schema";
import { logger } from "@/shared/lib/logging";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";

type FilterData = NonNullable<
  z.infer<typeof StorePageLocaleSchema>["storePage"]
>["filters"];

interface ProductFiltersProps {
  filters: FilterData;
  allTags: string[];
}

export function ProductFilters({
  filters,
  allTags,
}: ProductFiltersProps): React.ReactElement {
  logger.info("[ProductFilters v2.1] Renderizando componente de élite...");

  return (
    <aside className="lg:col-span-1 p-6 bg-card rounded-lg h-fit border border-border shadow-sm sticky top-24">
      <div className="space-y-8">
        <div>
          <Label
            htmlFor="search"
            className="text-lg font-bold text-primary mb-2 block"
          >
            {filters.searchLabel}
          </Label>
          <Input id="search" placeholder={filters.searchPlaceholder} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-primary mb-4">
            {filters.tagsTitle}
          </h3>
          <div className="space-y-2">
            {allTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox id={`tag-${tag}`} />
                <Label
                  htmlFor={`tag-${tag}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                >
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-primary mb-4">
            {filters.priceTitle}
          </h3>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <h3 className="text-lg font-bold text-primary">
            {filters.stockTitle}
          </h3>
          <div className="flex items-center space-x-2">
            <Switch id="stock-switch" />
            <Label htmlFor="stock-switch" className="text-sm cursor-pointer">
              {filters.inStockLabel}
            </Label>
          </div>
        </div>
      </div>
    </aside>
  );
}
