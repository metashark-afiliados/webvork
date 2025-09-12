// /.docs/REACTBITS_INTEGRATION_MANIFESTO.md
/**
 * @file /.docs/REACTBITS_INTEGRATION_MANIFESTO.md
 * @description Manifiesto de Integración de Código Externo. SSoT que gobierna
 *              la selección, adaptación y uso de componentes de UI de terceros
 *              dentro del ecosistema de Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto de Integración de Código Externo

## 1. Visión y Filosofía

Este documento establece la doctrina para la integración de cualquier componente o fragmento de código de UI de terceros (ej. librerías de componentes, snippets de CodePen, etc.). Nuestra filosofía no es de simple consumo, sino de **"Naturalización Arquitectónica"**.

El objetivo es acelerar el desarrollo de la UI sin comprometer la integridad, resiliencia y observabilidad de nuestra arquitectura.

### Principios Rectores (No Negociables)

1.  **Aceleración, no Abandono de Principios:** Utilizamos código externo para construir *más rápido*, no para abandonar nuestros estándares. Cada componente integrado es una oportunidad para demostrar la robustez de nuestra arquitectura.
2.  **El Componente se Adapta al Sistema, no al Revés:** La arquitectura de `curcumin-simplex` es la SSoT. El componente externo **debe ser refactorizado** para conformarse a nuestros patrones definidos en la **Directiva 003: Manifiesto de Calidad de Componentes**.
3.  **Calidad sobre Cantidad:** La integración de un componente solo se considerará si aporta un valor funcional o estético significativo que justifique el coste de su "naturalización".

---

## 2. El Protocolo de "Naturalización" de Componentes

Ningún código de UI de terceros será copiado y pegado directamente en el proyecto. Cada componente seleccionado debe pasar por un riguroso proceso de "naturalización" para ser aprobado para su uso.

### **Fase 1: Extracción y Aislamiento**

1.  **Obtención del Código:** Copiar el código fuente del componente (idealmente en formato TypeScript/TSX con Tailwind CSS).
2.  **Ubicación Arquitectónica:** Crear el archivo `.tsx` del nuevo aparato en la ubicación semántica correcta dentro de `src/components/`.
3.  **Instalación de Dependencias:** Identificar y añadir cualquier dependencia externa (`npm` package) que el componente requiera (ej. `framer-motion`) a nuestro `package.json`, siguiendo la **Directiva 002**.

### **Fase 2: Nivelación Arquitectónica (El Corazón del Proceso)**

Esta fase transforma el componente de un "invitado" a un "ciudadano de primera clase" de nuestro ecosistema. El componente debe ser refactorizado para cumplir con todos los puntos de la **Directiva 003**.

-   **[ ] Checklist de Nivelación Mandatoria:**
    -   **[ ] Declaración de Entorno:** Añadir `"use client";` si el componente requiere interactividad.
    -   **[ ] Principio de Responsabilidad Única:** Asegurarse de que el componente sea de presentación pura (Dumb Component).
    -   **[ ] Integración de Logging (Observabilidad):** Añadir el `console.log` de renderizado.
    -   **[ ] Integración de Internacionalización (i18n-B):** Eliminar todo el texto hardcodeado y refactorizar el componente para que reciba todas las cadenas de texto a través de `props`.
    -   **[ ] Alineación con el Sistema de Theming:** Reemplazar todos los colores y estilos fijos con variables semánticas de nuestro sistema de Theming (ej. `bg-blue-500` -> `bg-primary`, `text-white` -> `text-foreground`).
    -   **[ ] Creación de Documentación SSoT:**
        -   Añadir **TSDoc completo** al componente, explicando su propósito y el contrato de sus `props`.
        -   Crear el **Documento Espejo** correspondiente en `/.docs-espejo/`.

### **Fase 3: Conexión y Uso**

-   **Actualizar Contratos:** Añadir las nuevas claves de texto requeridas por el componente a nuestro `i18n.schema.ts` y al archivo `es-ES.json`.
-   **Adaptar `Props`:** Modificar la interfaz de `props` del componente para que se alinee con la estructura de datos de nuestro diccionario de i18n.
-   **Integrar en la Página:** Una vez nivelado, el componente puede ser importado y utilizado en `page.tsx` o en otros componentes.

---

## 3. Gobernanza

-   **Justificación Requerida:** La decisión de integrar un componente externo debe ser justificada en términos del valor que aporta frente al tiempo que tomará su correcta naturalización.
-   **Registro Central:** Los componentes naturalizados serán listados en el inventario general de componentes del proyecto.

Este protocolo asegura que, aunque aprovechemos la velocidad del código externo, nunca sacrifiquemos la calidad, consistencia y mantenibilidad de `curcumin-simplex`.

// /.docs/REACTBITS_INTEGRATION_MANIFESTO.md