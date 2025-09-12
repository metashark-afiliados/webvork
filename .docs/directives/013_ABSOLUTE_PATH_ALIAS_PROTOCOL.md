// .docs/directives/013_ABSOLUTE_PATH_ALIAS_PROTOCOL.md
/**
 * @file 013_ABSOLUTE_PATH_ALIAS_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 013.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
# Directiva 013: Protocolo de Rutas de Importación Absolutas

## 1. Principio Fundamental: "Cero Ambigüedad"

Las importaciones relativas (ej. `import X from '../../Y'`) crean una fuerte acoplamiento y son frágiles ante la refactorización. Para garantizar la máxima mantenibilidad y prevenir errores de resolución de módulos, toda importación de un módulo que no sea estrictamente cohesivo (dentro de la misma carpeta de componente) **DEBE** utilizar un alias de ruta absoluto definido en `tsconfig.json`.

## 2. Regla Mandatoria

-   **Se DEBE usar** un alias para importar desde cualquier otro dominio del proyecto.
    -   **Correcto:** `import { Button } from "@/components/ui/Button";`
    -   **Correcto:** `import { getDictionary } from "@/lib/i18n";`
-   **Está ESTRICTAMENTE PROHIBIDO** usar rutas relativas para cruzar los límites de los directorios de `src/`.
    -   **Incorrecto:** `import { MyUtil } from "../lib/utils";`

## 3. Justificación

Este protocolo desacopla los componentes de su ubicación física en el árbol de directorios, permitiendo refactorizar la estructura del proyecto sin romper las importaciones. Asegura que el compilador siempre pueda resolver los módulos de forma predecible y erradica los errores `Module not found` causados por rutas relativas complejas.
// .docs/directives/013_ABSOLUTE_PATH_ALIAS_PROTOCOL.md