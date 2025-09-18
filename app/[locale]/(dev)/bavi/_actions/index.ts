// app/[locale]/(dev)/bavi/_actions/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para el módulo de Server Actions de BAVI.
 *              Este archivo es crucial para la correcta resolución de módulos.
 * @version 2.0.0 (Get BAVI Assets Action)
 * @author RaZ Podestá - MetaShark Tech
 */
export * from "./uploadAsset.action";
export * from "./addAssetToManifests.action";
export * from "./getBaviAssets.action"; // <-- NUEVA EXPORTACIÓN
