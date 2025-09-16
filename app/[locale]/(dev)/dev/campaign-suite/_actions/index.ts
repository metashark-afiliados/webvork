// app/[locale]/(dev)/dev/campaign-suite/_actions/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las Server Actions de la SDC.
 *              v1.2.0: Añade la extensión .ts a todas las exportaciones para
 *              garantizar la resolución de módulos en el build de producción.
 * @version 1.2.0
 * @author RaZ podesta - MetaShark Tech
 */

export * from "./getThemeFragments.action.ts";
export * from "./saveCampaignAsset.action.ts";
export * from "./publishCampaign.action.ts";
export * from "./packageCampaign.action.ts";
export * from "./getBaseCampaigns.action.ts";
// app/[locale]/(dev)/dev/campaign-suite/_actions/index.ts
