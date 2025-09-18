// lib/schemas/pages/bavi-asset-explorer.i18n.schema.ts
/**
 * @file bavi-asset-explorer.i18n.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n del AssetExplorer de BAVI.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const BaviAssetExplorerContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  searchPlaceholder: z.string(),
  searchButton: z.string(),
  filterByAILabel: z.string(),
  allAIsOption: z.string(),
  loadingAssets: z.string(),
  noAssetsFoundTitle: z.string(),
  noAssetsFoundDescription: z.string(),
  previousPageButton: z.string(),
  nextPageButton: z.string(),
  pageInfo: z.string(),
  viewDetailsButton: z.string(),
});

export const BaviAssetExplorerLocaleSchema = z.object({
  assetExplorer: BaviAssetExplorerContentSchema.optional(),
});
