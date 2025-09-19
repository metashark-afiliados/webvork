// app/[locale]/(dev)/bavi/_components/AssetCard.tsx
/**
 * @file AssetCard.tsx
 * @description Componente de presentación puro para visualizar un activo de BAVI.
 * @version 3.0.0 (SSoT Contract Alignment)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button, DynamicIcon } from "@/components/ui";
import type { BaviAsset } from "@/lib/schemas/bavi/bavi.manifest.schema";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import type { z } from "zod";

type CreatorContent = z.infer<typeof PromptCreatorContentSchema>;

interface AssetCardProps {
  asset: BaviAsset;
  locale: Locale;
  onViewDetails: (assetId: string) => void;
  onSelectAsset?: (asset: BaviAsset) => void;
  sesaOptions: CreatorContent["sesaOptions"];
  selectButtonText?: string;
}

export function AssetCard({
  asset,
  locale,
  onViewDetails,
  onSelectAsset,
  sesaOptions,
  selectButtonText,
}: AssetCardProps): React.ReactElement {
  logger.trace(
    `[AssetCard] Renderizando tarjeta para activo: ${asset.assetId}`
  );

  const mainVariant = asset.variants[0];
  // --- [INICIO DE CORRECCIÓN] ---
  // Se obtiene la fecha desde la SSoT correcta: el objeto 'asset'.
  const formattedDate = new Date(
    asset.createdAt || new Date()
  ).toLocaleDateString();
  // --- [FIN DE CORRECCIÓN] ---

  const getTagLabel = (category: keyof typeof sesaOptions, value: string) => {
    return (
      sesaOptions[category]?.find((opt) => opt.value === value)?.label || value
    );
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-primary/20 transition-all duration-200 ease-in-out">
      <CardHeader>
        <CardTitle className="text-lg">{asset.assetId}</CardTitle>
        <CardDescription className="flex items-center text-xs text-muted-foreground">
          <DynamicIcon name="Image" className="h-3 w-3 mr-1" />
          {asset.provider.toUpperCase()}
          <span className="mx-2">·</span>
          <DynamicIcon name="Clock" className="h-3 w-3 mr-1" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted/20 mb-4">
          {mainVariant?.publicId ? (
            <CldImage
              src={mainVariant.publicId}
              alt={asset.metadata?.altText?.[locale] || asset.assetId}
              width={mainVariant.dimensions?.width || 400}
              height={mainVariant.dimensions?.height || 225}
              crop="fill"
              gravity="auto"
              format="auto"
              quality="auto"
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <DynamicIcon name="ImageOff" className="h-6 w-6 mr-2" />
              <span>No Public ID</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {asset.metadata?.altText?.[locale] || "No alt text provided."}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between pt-0 gap-2">
        <div className="flex flex-wrap gap-1">
          {asset.tags?.ai && (
            <Badge variant="secondary" className="mr-1">
              {getTagLabel("ai", asset.tags.ai)}
            </Badge>
          )}
          {asset.tags?.sty && (
            <Badge variant="secondary" className="mr-1">
              {getTagLabel("sty", asset.tags.sty)}
            </Badge>
          )}
          {asset.tags?.fmt && (
            <Badge variant="secondary" className="mr-1">
              {getTagLabel("fmt", asset.tags.fmt)}
            </Badge>
          )}
          {asset.tags?.typ && (
            <Badge variant="secondary" className="mr-1">
              {getTagLabel("typ", asset.tags.typ)}
            </Badge>
          )}
          {asset.tags?.sbj && (
            <Badge variant="secondary" className="mr-1">
              {getTagLabel("sbj", asset.tags.sbj)}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(asset.assetId)}
          >
            <DynamicIcon name="Eye" className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
          {onSelectAsset && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onSelectAsset(asset)}
            >
              <DynamicIcon name="Check" className="h-4 w-4 mr-2" />
              {selectButtonText || "Seleccionar"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
// app/[locale]/(dev)/bavi/_components/AssetCard.tsx
