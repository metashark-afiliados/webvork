// RUTA: app/[locale]/(dev)/bavi/_components/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para el módulo atómico de componentes BAVI.
 *              v3.0.0 (Holistic Integrity Restoration): Añade la exportación
 *              para el `AssetSelectorModal`, haciéndolo disponible para
 *              consumidores externos como el `ImageField` y restaurando
 *              la integridad del build.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
export * from "./AssetUploader";
export * from "./AssetExplorer";
export * from "./AssetCard";
// --- [INICIO DE CORRECCIÓN DE INTEGRIDAD] ---
export * from "./AssetSelectorModal";
// --- [FIN DE CORRECCIÓN DE INTEGRIDAD] ---
export * from "./useAssetExplorerLogic";
