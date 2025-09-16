// app/[locale]/(dev)/dev/campaign-suite/_components/shared/ComponentGallery.tsx
/**
 * @file ComponentGallery.tsx
 * @description Componente de UI atómico para mostrar una selección visual de componentes.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "../../_config/gallery.config";

interface ComponentGalleryProps {
  items: readonly GalleryItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
}

export function ComponentGallery({
  items,
  selectedValue,
  onValueChange,
}: ComponentGalleryProps) {
  return (
    <RadioGroup
      value={selectedValue ?? ""}
      onValueChange={onValueChange}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {items.map((item) => (
        <Label
          key={item.name}
          htmlFor={item.name}
          className={cn(
            "block cursor-pointer rounded-lg border-2 bg-card p-2 transition-all hover:border-primary/80",
            selectedValue === item.name
              ? "border-primary shadow-lg"
              : "border-muted/50"
          )}
        >
          <RadioGroupItem
            value={item.name}
            id={item.name}
            className="sr-only"
          />
          <div className="overflow-hidden rounded-md">
            <Image
              src={item.previewImage}
              alt={`Vista previa de ${item.name}`}
              width={200}
              height={100}
              className="aspect-[2/1] w-full object-cover object-top"
            />
          </div>
          <div className="p-2 text-center">
            <p className="font-semibold text-foreground text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/shared/ComponentGallery.tsx
