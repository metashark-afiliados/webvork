// RUTA: components/dev/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para los componentes específicos del DCC.
 *              v5.1.0 (Module Resolution Fix): Corrige la ruta de exportación
 *              de `useDevThemeManager` para alinearse con la convención de
 *              nomenclatura kebab-case y resolver un error de build.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
export * from "./DevThemeSwitcher";
export * from "./SuiteStyleComposerModal";
export * from "./SuiteStyleComposer/GranularInputControl";
export * from "./SuiteStyleComposer/SuiteColorsTab";
export * from "./SuiteStyleComposer/SuiteTypographyTab";
export * from "./SuiteStyleComposer/SuiteGeometryTab";
export * from "./SuiteStyleComposer/ComposerHeader";
export * from "./SuiteStyleComposer/ComposerFooter";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
export * from "./SuiteStyleComposer/use-dev-theme-manager";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
export * from "./DeveloperErrorDisplay";
