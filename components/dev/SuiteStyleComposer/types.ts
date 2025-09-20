// components/dev/SuiteStyleComposer/types.ts
/**
 * @file types.ts
 * @description SSoT para los contratos de tipos compartidos del ecosistema SuiteStyleComposer.
 * @version 1.1.0 (Absolute Path Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import type { AssembledTheme } from "@/shared/lib/schemas/theming/assembled-theme.schema";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se reemplaza la ruta relativa frágil por una ruta absoluta y resiliente,
// resolviendo la cascada de errores de tipo.
import type { ThemeConfig } from "@/app/[locale]/(dev)/dev/campaign-suite/_types/draft.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

export type LoadedFragments = {
  base: Partial<AssembledTheme>;
  colors: Record<string, Partial<AssembledTheme>>;
  fonts: Record<string, Partial<AssembledTheme>>;
  radii: Record<string, Partial<AssembledTheme>>;
};

export interface SuiteThemeConfig extends ThemeConfig {
  granularColors?: Record<string, string>;
  granularFonts?: Record<string, string>;
  granularGeometry?: Record<string, string>;
}
// components/dev/SuiteStyleComposer/types.ts
