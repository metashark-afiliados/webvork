// .docs/knowledge-base/next-link-api.md
/**
 * @file /.docs/knowledge-base/next-link-api.md
 * @description Manifiesto de Conocimiento y SSoT para el componente Link de Next.js.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto de Conocimiento: `next/link`

## 1. Metadatos del Componente

-   **Nombre:** `Link`
-   **Versión Analizada:** `Next.js 15.5.2` (según `package.json` del snapshot)
-   **Fecha de Análisis:** 2025-09-09

## 2. Diagnóstico de Integración y API Pública (`LinkProps`)

El análisis del archivo `app-dir/link.d.ts` revela el contrato de `props` del componente `Link` para el App Router. Las propiedades más relevantes para nuestro proyecto son:

| Prop      | Tipo                               | Por Defecto       | Descripción Estratégica                                                                                              |
| :-------- | :--------------------------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `href`    | `string \| UrlObject`              | **Requerido**     | La ruta o URL de destino. Es la propiedad fundamental para la navegación.                                            |
| `replace` | `boolean`                          | `false`           | Si es `true`, reemplaza el estado actual del historial en lugar de añadir uno nuevo. Útil para flujos de autenticación. |
| `scroll`  | `boolean`                          | `true`            | Si es `false`, la página no se desplazará a la parte superior tras la navegación.                                      |
| `prefetch`| `boolean \| 'auto' \| null`        | `null` (en App)   | Controla el comportamiento de pre-carga de la ruta en segundo plano.                                                 |

## 3. Estrategia de Uso en `curcumin-simplex`

El componente `Link` es la base para toda la navegación interna del sitio. Se utiliza de forma polimórfica dentro de nuestro componente atómico `Button.tsx`. Cuando a `Button` se le pasa una prop `href`, internamente renderiza un `Link` de Next.js, encapsulando así la lógica de navegación y manteniendo la consistencia visual.

Esta estrategia asegura que todos los elementos clickables que provocan una navegación se beneficien del enrutamiento del lado del cliente de Next.js.
// .docs/knowledge-base/next-link-api.md