// .docs/checklist/campaigns/00_CHECKLIST_MAESTRO_CAMPANAS.md
/**
 * @file 00_CHECKLIST_MAESTRO_CAMPANAS.md
 * @description El Checklist Maestro y SSoT para el ciclo de vida completo de la
 *              creación, implementación y lanzamiento de una campaña de marketing.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Checklist Maestro de Creación de Campañas

## Filosofía

Este checklist es el "protocolo de vuelo" para lanzar campañas de alto rendimiento. Su cumplimiento garantiza la coherencia, la calidad y la alineación entre la estrategia de marketing y la implementación técnica. Cada paso principal enlaza a su manifiesto detallado.

---

### **FASE 0: INTELIGENCIA Y FUNDAMENTOS**
*El objetivo de esta fase es comprender el terreno de juego: el producto, el mercado y las reglas.*

*   **[ ] 0.1: Recopilar Inteligencia de Campaña**
    *   **Acción:** Centralizar todos los documentos de origen (branding, informes científicos, análisis de mercado) en el **Dossier de Inteligencia de Campaña (DIC)**.
    *   **Manifiesto:** [`03a_RECOPILACION_INTELIGENCIA_CAMPANA.md`](./03a_RECOPILACION_INTELIGENCIA_CAMPANA.md)

*   **[ ] 0.2: Definir Estándares de Nomenclatura y Mapeo**
    *   **Acción:** Establecer y documentar el **Sistema de Nomenclatura Estructurada (SNEAC)** y la arquitectura del **Manifiesto de Mapeo de Activos (MMAC)**.
    *   **Manifiestos:** [`00a_SISTEMA_NOMENCLATURA_ESTRUCTURADA.md`](./00a_SISTEMA_NOMENCLATURA_ESTRUCTURADA.md), [`00b_MANIFIESTO_MAPEO_ACTIVOS.md`](./00b_MANIFIESTO_MAPEO_ACTIVOS.md)

---

### **FASE 1: ESTRATEGIA Y CONCEPTUALIZACIÓN**
*El objetivo de esta fase es diseñar el "blueprint" creativo y persuasivo de la campaña.*

*   **[ ] 1.1: Perfilar el Avatar del Cliente**
    *   **Acción:** Crear un perfil psicográfico y demográfico detallado del cliente ideal para el mercado objetivo.
    *   **Manifiesto:** [`02_DEFINICION_AVATAR_CLIENTE_ITALIA.md`](./02_DEFINICION_AVATAR_CLIENTE_ITALIA.md)

*   **[ ] 1.2: Definir el Branding Base del Producto**
    *   **Acción:** Establecer la identidad visual y tonal canónica del producto que servirá como ancla para todas las variantes.
    *   **Manifiesto:** [`03b_BRANDING_BASE_PRODUCTO.md`](./03b_BRANDING_BASE_PRODUCTO.md)

*   **[ ] 1.3: Desarrollar Variantes Estratégicas (Sub-Campañas)**
    *   **Acción:** Conceptualizar múltiples ángulos de marketing. Para cada variante, crear un manifiesto estratégico que defina su psicología, branding, layout y copy principal.
    *   **Manifiesto de Soporte:** [`05_METADATOS_Y_COPY_ESTRATEGICO.md`](./05_METADATOS_Y_COPY_ESTRATEGICO.md)

*   **[ ] 1.4: Elaborar la Estrategia de Palabras Clave**
    *   **Acción:** Investigar y asignar palabras clave relevantes a cada sub-campaña para guiar el SEO y el copywriting.
    *   **Manifiesto:** [`03c_KEYWORD_STRATEGY.md`](./03c_KEYWORD_STRATEGY.md)

---

### **FASE 2: PRODUCCIÓN DE ACTIVOS TÉCNICOS**
*El objetivo de esta fase es traducir la estrategia en los artefactos de datos que la aplicación consumirá.*

*   **[ ] 2.1: Crear los Manifiestos de Tema (`..._THEME_...json`)**
    *   **Acción:** Para cada variante, crear su archivo de tema que define el `layout` y los `colors`/`fonts`.

*   **[ ] 2.2: Crear los Manifiestos de Contenido (`..._CONTENT_...json`)**
    *   **Acción:** Para cada variante, crear su archivo de contenido soberano con todo el texto para todas las secciones y todos los idiomas.

*   **[ ] 2.3: Construir el Manifiesto de Mapeo (`campaign.map.json`)**
    *   **Acción:** Crear y/o actualizar el archivo de mapeo para que apunte a los activos de tema y contenido correctos para cada variante.

---

### **FASE 3: ENSAMBLAJE Y VERIFICACIÓN**
*El objetivo de esta fase es asegurar que la campaña se renderiza correctamente y está libre de errores.*

*   **[ ] 3.1: Verificar en el Simulador de Campañas**
    *   **Acción:** Navegar al **Developer Command Center** (`/dev/simulator`) y previsualizar cada variante de la campaña.
    *   **Criterio de Aceptación:** La página se renderiza sin errores, aplicando el tema y contenido correctos.

*   **[ ] 3.2: Ejecutar el Checklist de Verificación Manual (MVT)**
    *   **Acción:** Realizar pruebas de responsividad, compatibilidad de navegadores y, crucialmente, el flujo de conversión (envío del formulario).
    *   **Manifiesto:** `QUALITY_AND_TESTING_STRATEGY.md` (Referencia)

*   **[ ] 3.3: Compilación Exitosa (`pnpm run build`)**
    *   **Acción:** Ejecutar el comando de build de producción.
    *   **Criterio de Aceptación:** El proceso finaliza sin errores de TypeScript o ESLint.

---

### **ADENDUM 1: Metodología Aprendida y Refinamientos**

*   **Principio de "Datos Soberanos":** El aprendizaje clave ha sido la evolución de archivos de contenido fragmentados a "activos soberanos" (`CONTENT` y `THEME`). Esto simplifica drásticamente la lógica de carga y alinea el proyecto con arquitecturas de Headless CMS, asegurando la escalabilidad futura.
*   **Abstracción es Clave:** La introducción del **Manifiesto de Mapeo (MMAC)** como una capa de abstracción entre el código y los datos es la mejora arquitectónica más significativa. Proporciona flexibilidad total para versionar, testear y gestionar campañas sin modificar el código de la aplicación.
*   **La DX Impulsa la Calidad:** Un **Developer Command Center** no es un lujo, sino una necesidad. Permite la validación visual y funcional de la arquitectura de datos, reduciendo drásticamente los errores antes del despliegue.

// .docs/checklist/campaigns/00_CHECKLIST_MAESTRO_CAMPANAS.md