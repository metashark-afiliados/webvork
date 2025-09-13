// .docs/checklist/campaigns/00_CHECKLIST_MAESTRO_CAMPANAS.md
/**
 * @file 00_CHECKLIST_MAESTRO_CAMPANAS.md
 * @description El Checklist Maestro y SSoT para el ciclo de vida completo de la
 *              creación, implementación y lanzamiento de una campaña de marketing.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Checklist Maestro de Creación de Campañas v2.0

## Filosofía

Este checklist es el "protocolo de vuelo" para lanzar campañas de alto rendimiento. Su cumplimiento garantiza la coherencia, la calidad y la alineación entre la estrategia y la implementación técnica. La versión 2.0 formaliza el uso de la **Suite de Diseño de Campañas (SDC)** como la herramienta central para la creación de activos.

---

### **FASE 0: INTELIGENCIA Y FUNDAMENTOS (Sin cambios)**
*El objetivo es comprender el terreno de juego: el producto, el mercado y las reglas.*

*   **[ ] 0.1: Recopilar Inteligencia de Campaña** (`03a_RECOPILACION_INTELIGENCIA_CAMPANA.md`)
*   **[ ] 0.2: Definir Estándares de Nomenclatura y Mapeo** (`00a_...`, `00b_...`)

---

### **FASE 1: ESTRATEGIA Y CONCEPTUALIZACIÓN (Sin cambios)**
*El objetivo es diseñar el "blueprint" creativo y persuasivo de la campaña.*

*   **[ ] 1.1: Perfilar el Avatar del Cliente** (`02_DEFINICION_AVATAR_CLIENTE_ITALIA.md`)
*   **[ ] 1.2: Definir el Branding Base del Producto** (`03b_BRANDING_BASE_PRODUCTO.md`)
*   **[ ] 1.3: Desarrollar Variantes Estratégicas (Sub-Campañas)** (`05_METADATOS_Y_COPY_ESTRATEGICO.md`)
*   **[ ] 1.4: Elaborar la Estrategia de Palabras Clave (SEO)** (`03c_KEYWORD_STRATEGY.md`)

---

### **FASE 2: PRODUCCIÓN DE ACTIVOS CON LA SUITE DE DISEÑO (Flujo Refactorizado)**
*El objetivo es utilizar el asistente guiado del DCC para generar activos de campaña validados, eliminando la edición manual de archivos JSON.*

*   **[ ] 2.1: Iniciar el Asistente de Creación de Campañas**
    *   **Acción:** Navegar a la **Suite de Diseño de Campañas** en el Developer Command Center (`/dev/campaigns/create`).
    *   **Manifiesto de Soporte:** `03_CAMPAIGN_DESIGN_SUITE_WORKFLOW.md` (Nuevo documento)

*   **[ ] 2.2: Definir Metadatos y SEO de la Variante**
    *   **Acción:** En el asistente, introducir el Nombre de la Variante, Descripción y Palabras Clave para la generación del slug de URL semántico.

*   **[ ] 2.3: Configurar Layout y Tema**
    *   **Acción:** Seleccionar un tema base (preset) y personalizar el layout (orden y selección de secciones) a través de la interfaz drag-and-drop del asistente.

*   **[ ] 2.4: Rellenar Contenido por Sección**
    *   **Acción:** Utilizar los formularios generados dinámicamente por el asistente para introducir todo el contenido textual (i18n) para cada sección del layout definido.

*   **[ ] 2.5: Generar y Validar Activos**
    *   **Acción:** Utilizar la función "Generar Activos" del asistente. El sistema creará automáticamente los archivos `..._THEME_...json`, `..._CONTENT_...json` y actualizará el `campaign.map.json`.
    *   **Criterio de Aceptación:** El proceso finaliza con éxito, confirmando que los activos generados han pasado la validación de Zod.

---

### **FASE 3: ENSAMBLAJE Y VERIFICACIÓN (Flujo Refactorizado)**
*El objetivo es asegurar que la campaña se renderiza y funciona correctamente antes del despliegue.*

*   **[ ] 3.1: Verificación Primaria en el Simulador de Campañas**
    *   **Acción:** Navegar al **Simulador de Campañas** (`/dev/simulator`). La nueva variante debe aparecer automáticamente.
    *   **Criterio de Aceptación:** Hacer clic en la nueva variante. La página se renderiza sin errores, aplicando el tema y contenido generados. La URL debe reflejar el nuevo slug semántico.

*   **[ ] 3.2: Ejecutar el Checklist de Verificación Manual (MVT)**
    *   **Acción:** Realizar pruebas de responsividad, compatibilidad de navegadores y, crucialmente, el flujo de conversión (envío del formulario).
    *   **Manifiesto de Soporte:** `QUALITY_AND_TESTING_STRATEGY.md`

*   **[ ] 3.3: Compilación Exitosa (`pnpm run build`)**
    *   **Acción:** Ejecutar el comando de build de producción.
    *   **Criterio de Aceptación:** El proceso finaliza sin errores de TypeScript o ESLint.

---

### **ADENDUM 1: Metodología Aprendida y Refinamientos (Actualizado)**

*   **Evolución a DX de Élite:** La transición de la edición manual de JSON a una **Suite de Diseño de Campañas (SDC)** guiada es la evolución clave. Este enfoque de "calidad por diseño" previene errores de sintaxis y de contrato de datos, y empodera al equipo de marketing para iterar con una velocidad y seguridad sin precedentes.
*   **SEO Semántico en el Núcleo:** La nueva arquitectura de enrutamiento (`/c/[id]/[slug-semantico]`) integra el SEO directamente en el proceso de creación de la campaña, transformándolo de una ocurrencia tardía a un pilar fundamental de la estrategia.
// .docs/checklist/campaigns/00_CHECKLIST_MAESTRO_CAMPANAS.md