// .docs/knowledge-base/LUCIDE_REACT_MANIFESTO_SSOT.md
/**
 * @file LUCIDE_REACT_MANIFESTO_SSOT.md
 * @description Manifiesto SSoT (Single Source of Truth) para la integración
 *              con lucide-react, basado en el análisis de snapshots de la v0.542.0.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto `lucide-react` (v0.542.0)

Este documento es la **Única Fuente de Verdad** para la integración con la librería de iconos `lucide-react` en su versión `0.542.0`. Toda refactorización o desarrollo que involucre esta dependencia **debe** adherirse a los principios y contratos aquí definidos.

## 1. Arquitectura de Integración Aprobada

### Principio: Carga Dinámica Per-Icono

Para maximizar el rendimiento y minimizar el tamaño del bundle de cliente, está **prohibida la importación global de la librería**. La única estrategia aprobada es la **carga dinámica individual** de cada icono.

**Mecanismo:**
- La librería distribuye cada icono como un módulo JavaScript individual en el directorio `dist/esm/icons/`.
- Los nombres de archivo de los iconos están en `kebab-case`.
- Se debe utilizar un componente centralizador (`DynamicIcon.tsx`) que implemente `next/dynamic` para importar estos módulos bajo demanda.

## 2. Contrato de API de Componentes de Icono

Basado en el análisis de `lucide-react.d.ts`, todos los componentes de icono exportados por la librería cumplen con el siguiente contrato:

- **Tipo Base:** `LucideIcon`
- **Definición de Tipo:** `React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>`
- **Props Aceptadas (`LucideProps`):**
    - `size?: string | number`
    - `color?: string`
    - `strokeWidth?: string | number`
    - `absoluteStrokeWidth?: boolean`
    - `className?: string` (Confirmado. El error `TS2769` no se originó aquí).
    - Cualquier otro atributo estándar de SVG.

## 3. Fuente de Verdad para Nombres de Iconos

La lista canónica y completa de todos los iconos disponibles se define en el archivo `node_modules/lucide-react/dist/esm/dynamicIconImports.js`.

**Estructura del Manifiesto de Iconos:**
El archivo exporta un objeto donde:
- Las **claves** son los nombres de los iconos en formato `kebab-case`.
- Los **valores** son funciones de importación dinámica (`() => import(...)`).

**Observaciones Críticas:**
- **Alias:** El manifiesto incluye alias. Por ejemplo, la clave `'home'` y la clave `'house'` apuntan al mismo archivo de icono. Nuestro script de generación de enums debe capturar **todas las claves** para tener una lista completa.
- **Nomenclatura Interna:** Para mantener la consistencia en nuestro codebase, los nombres de los iconos se deben representar en **`PascalCase`** dentro de nuestro enum (`src/config/lucide-icon-names.ts`). La conversión a `kebab-case` es responsabilidad del componente `DynamicIcon` en el momento de la importación.

## 4. Implementación Centralizada: `DynamicIcon.tsx`

El componente `src/components/ui/DynamicIcon.tsx` es el único aparato autorizado para renderizar un icono de `lucide-react`.

**Lógica de Funcionamiento Obligatoria:**
1.  **Entrada:** Recibe una prop `name` que debe ser un miembro del enum `LucideIconName` (en `PascalCase`).
2.  **Conversión:** Transforma el nombre `PascalCase` a `kebab-case` para coincidir con el manifiesto de la librería.
3.  **Importación Dinámica:** Utiliza `next/dynamic` para construir la ruta de importación: `import(\`lucide-react/dist/esm/icons/${kebabCaseName}\`)`.
4.  **Manejo de Estados:**
    -   **`loading`:** Debe mostrar un componente de carga (ej. `Loader2`) mientras el módulo del icono se resuelve. **Punto Crítico:** La función `loading` de `next/dynamic` no acepta props directamente; se debe retornar un elemento JSX (`() => <Loader2 />`).
    -   **`error`:** Debe manejar elegantemente los fallos de importación (ej. un icono que ya no existe) renderizando un icono de fallback (ej. `HelpCircle`).
5.  **`ssr`:** Debe estar habilitado (`true`) para el renderizado en servidor.

Este manifiesto consolida todo el conocimiento verificado y debe ser el punto de referencia para cualquier duda o problema futuro con `lucide-react`.

---
// .docs/knowledge-base/LUCIDE_REACT_MANIFESTO_SSOT.md