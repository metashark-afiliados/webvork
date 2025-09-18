// app/[locale]/(dev)/raz-prompts/_components/PromptCard.tsx
/**
 * @file PromptCard.tsx
 * @description Componente de presentación puro para visualizar un prompt en la bóveda.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DynamicIcon } from "@/components/ui";
import type { RaZPromptsEntry } from "@/lib/schemas/raz-prompts/entry.schema";
import { logger } from "@/lib/logging";

interface PromptCardProps {
  prompt: RaZPromptsEntry;
  onViewDetails: (promptId: string) => void;
}

export function PromptCard({
  prompt,
  onViewDetails,
}: PromptCardProps): React.ReactElement {
  logger.trace(`[PromptCard] Renderizando tarjeta para prompt: ${prompt.title}`);

  const latestVersion = prompt.versions[prompt.versions.length - 1];
  const formattedDate = new Date(prompt.createdAt).toLocaleDateString();

  // Mapeo simple de tags SESA a etiquetas legibles (para demostración)
  const tagLabels: Record<string, string> = {
    ideo: "Ideogram",
    mj: "Midjourney",
    sdxl: "Stable Diffusion",
    pht: "Fotorealístico",
    cin: "Cinemático",
    ill: "Ilustración",
    "1x1": "Cuadrado",
    "16-9": "Horizontal",
    "9-16": "Vertical",
    ui: "UI",
    abs: "Abstracto",
    wom: "Mujer",
    man: "Hombre",
    lsc: "Paisaje",
  };

  const getTagDisplay = (tagKey: keyof RaZPromptsSesaTags, tagValue: string | string[] | undefined) => {
    if (!tagValue) return null;
    const value = Array.isArray(tagValue) ? tagValue[0] : tagValue; // Tomar el primero si es array

    if (value && tagLabels[value]) {
        return <Badge key={tagKey} variant="secondary" className="mr-1">{tagLabels[value]}</Badge>;
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-primary/20 transition-all duration-200 ease-in-out">
      <CardHeader>
        <CardTitle className="text-lg">{prompt.title}</CardTitle>
        <CardDescription className="flex items-center text-xs text-muted-foreground">
          <DynamicIcon name="BrainCircuit" className="h-3 w-3 mr-1" />
          {prompt.aiService.toUpperCase()}
          <span className="mx-2">·</span>
          <DynamicIcon name="Clock" className="h-3 w-3 mr-1" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted/20 mb-4">
          {prompt.imageUrl ? (
            <Image
              src={prompt.imageUrl}
              alt={prompt.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <DynamicIcon name="ImageOff" className="h-6 w-6 mr-2" />
              <span>No image yet</span>
            </div>
          )}
          {prompt.status === "pending_generation" && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 bg-yellow-500/20 text-yellow-600 border-yellow-500"
            >
              <DynamicIcon name="Hourglass" className="h-3 w-3 mr-1 animate-pulse" />
              <span>Pending Generation</span>
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {latestVersion.promptText}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between pt-0 gap-2">
        <div className="flex flex-wrap gap-1">
          {getTagDisplay('ai', prompt.tags.ai)}
          {getTagDisplay('sty', prompt.tags.sty)}
          {getTagDisplay('fmt', prompt.tags.fmt)}
          {getTagDisplay('typ', prompt.tags.typ)}
          {getTagDisplay('sbj', prompt.tags.sbj)}
        </div>
        <Button variant="outline" size="sm" onClick={() => onViewDetails(prompt.promptId)}>
          <DynamicIcon name="Eye" className="h-4 w-4 mr-2" />
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
