// app/[locale]/(dev)/dev/test-page/_types/themes.types.ts
/**
 * @file themes.types.ts
 * @description SSoT para los tipos de datos compartidos entre los componentes
 *              de servidor y cliente de la página de prueba de temas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";

export interface AvailableTheme {
  id: string;
  name: string;
  themeData: AssembledTheme;
}
// app/[locale]/(dev)/dev/test-page/_types/themes.types.ts
