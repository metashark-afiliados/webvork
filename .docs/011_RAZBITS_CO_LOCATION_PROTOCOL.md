// .docs/011_RAZBITS_CO_LOCATION_PROTOCOL.md
/**
 * @file 011_RAZBITS_CO_LOCATION_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 011.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 011: Protocolo de Co-ubicación de Aparatos razBits

## 1. Principio Fundamental

La arquitectura de los componentes naturalizados (razBits) se basa en el principio de **"Módulos Autocontenidos e Indivisibles"**. Para garantizar la máxima cohesión, mantenibilidad y facilitar la comprensión de un componente de origen externo, todos sus aparatos relacionados deben residir en una única ubicación.

## 2. Regla Mandatoria

Para cada componente `razBit` (ej. `MyCoolComponent`), su carpeta dedicada dentro de `src/components/razBits/[MyCoolComponent]/` **DEBE** contener todos los archivos directamente asociados a él. Esto incluye:

*   El archivo principal del componente (`MyCoolComponent.tsx`).
*   Su archivo de esquema de validación (`my-cool-component.schema.ts`).
*   Su archivo de internacionalización (`my-cool-component.i18n.json`).
*   Cualquier hook específico (`useMyCoolComponentLogic.ts`).
*   Cualquier otra pieza de lógica o recurso que sea exclusivamente de ese componente.

**La estructura de archivos debe ser siempre:**
src/
└── components/
└── razBits/
└── MyCoolComponent/
├── MyCoolComponent.tsx
├── my-cool-component.schema.ts
├── my-cool-component.i18n.json
└── useMyCoolComponentLogic.ts (opcional)
code
Code
## 3. Justificación

Esta directiva asegura:
*   **Cohesión de Código:** Todos los elementos relacionados con un componente están juntos, facilitando su localización y comprensión.
*   **Mantenibilidad:** Los cambios en un `razBit` están confinados a su directorio, reduciendo el riesgo de efectos secundarios no deseados en otras partes del sistema.
*   **Portabilidad:** Un `razBit` puede ser extraído o reutilizado en otros proyectos con mayor facilidad, ya que es una unidad autocontenida.
*   **Adhesión al PRU (Principio de Responsabilidad Única):** La carpeta del `razBit` encapsula su responsabilidad completa, incluyendo sus contratos de datos y su contenido.
// .docs/011_RAZBITS_CO_LOCATION_PROTOCOL.md