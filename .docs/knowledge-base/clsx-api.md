// .docs/knowledge-base/clsx-api.md
/**
 * @file /.docs/knowledge-base/clsx-api.md
 * @description Manifiesto de Conocimiento y SSoT para la librería clsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto de Conocimiento: `clsx`

## 1. Metadatos de la Librería

-   **Nombre:** `clsx`
-   **Versión Analizada:** `2.1.1` (según `package.json` del snapshot)
-   **Fecha de Análisis:** 2025-09-09

## 2. Diagnóstico de Integración y API Pública

El análisis del fichero de declaración de tipos (`clsx.d.ts`) confirma que la librería exporta una única función `clsx` por defecto.

-   **Signatura de la Función:** `clsx(...inputs: ClassValue[]): string;`
-   **`ClassValue`**: Es un tipo recursivo que puede ser `string`, `number`, `null`, `boolean`, `undefined`, un objeto cuyas claves son nombres de clase y sus valores booleanos (`ClassDictionary`), o un array de `ClassValue` (`ClassArray`).

## 3. Estrategia de Uso en `curcumin-simplex`

`clsx` es una utilidad fundamental para la construcción condicional de `className`. Se utiliza en conjunto con `tailwind-merge` para resolver conflictos de clases de Tailwind de manera predecible. Su uso es clave en componentes de UI atómicos como `Button.tsx` y `Container.tsx` para permitir la extensión de estilos a través de la prop `className`.

**Ejemplo Canónico:**
```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const finalClassName = twMerge(clsx(baseStyles, conditionalStyles, props.className));
// .docs/knowledge-base/clsx-api.md