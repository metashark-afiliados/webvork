// .docs/knowledge-base/tailwind-merge-api.md
/**
 * @file /.docs/knowledge-base/tailwind-merge-api.md
 * @description Manifiesto de Conocimiento y SSoT para la librería tailwind-merge.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto de Conocimiento: `tailwind-merge`

## 1. Metadatos de la Librería

-   **Nombre:** `tailwind-merge`
-   **Versión Analizada:** `3.3.1` (según `package.json` del snapshot)
-   **Fecha de Análisis:** 2025-09-09

## 2. Diagnóstico de Integración y API Pública

El análisis del snapshot, específicamente de `dist/types.d.ts`, revela la exportación principal de la función `twMerge`.

-   **Signatura de la Función:** `twMerge(...classLists: ClassNameValue[]): string;`
-   **`ClassNameValue`**: Acepta una lista variádica de argumentos que pueden ser strings, arrays, o valores falsey, similar a `clsx`.

## 3. Estrategia de Uso en `curcumin-simplex`

`tailwind-merge` es el guardián de la consistencia estilística. Su rol es resolver conflictos en cadenas de clases de Tailwind CSS, asegurando que la última clase de una misma categoría prevalezca. Por ejemplo, `twMerge('p-4 p-2')` resultará en `p-2`.

Es mandatorio utilizar `twMerge` en el punto final de la construcción de `className` en cualquier componente que acepte una prop `className` para extender sus estilos. Esto garantiza que las sobreescrituras de estilo sean predecibles y robustas.

**Ejemplo Canónico:**
```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx construye la lista de clases y twMerge resuelve los conflictos.
const finalClassName = twMerge(clsx(baseStyles, variantStyles, props.className));
// .docs/knowledge-base/tailwind-merge-api.md