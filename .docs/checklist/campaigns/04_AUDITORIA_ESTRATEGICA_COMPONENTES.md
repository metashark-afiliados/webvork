// .docs/checklist/campaigns/04_AUDITORIA_ESTRATEGICA_COMPONENTES.md
/**
 * @file 04_AUDITORIA_ESTRATEGICA_COMPONENTES.md
 * @description Fase 1, Paso 3 del Checklist. Este documento audita los
 *              componentes de UI existentes en `curcumin-simplex` contra los
 *              requisitos estratégicos de la campaña `12157`.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Auditoría Estratégica de Componentes

## 1. Propósito: Alinear Activos con Estrategia

Este checklist evalúa la eficacia de nuestros componentes de UI existentes para comunicar el mensaje definido en el **Manifiesto de Mensajería** a nuestro avatar, **"Sofia Verdi"**. El objetivo es identificar las adaptaciones necesarias en cada aparato para construir nuestra "preseller".

## 2. Checklist de Auditoría de Componentes para la Campaña `12157`

### Componente: `ScrollingBanner` (Ubicación: Superior, pre-header)

*   **[ ] Propósito Estratégico:** Generar urgencia y escasez.
*   **[ ] Mensaje a Transmitir:** "Oferta por tiempo limitado", "Stock casi agotado".
*   **[ ] Evaluación de Eficacia:** **ALTA**. Es un componente perfecto para este propósito.
*   **[ ] Acciones Requeridas:**
    *   **Copywriting:** Utilizar un texto directo y conciso alineado con la oferta.
    *   **Diseño:** Mantener el color de acento (`--color-accent`) para máximo contraste y atención.

### Componente: `Header` (Componente a ser reemplazado por `CardNav`)

*   **[ ] Propósito Estratégico:** Establecer identidad de marca y ofrecer navegación mínima.
*   **[ ] Mensaje a Transmitir:** Confianza, profesionalismo, calidad.
*   **[ ] Evaluación de Eficacia:** **MEDIA**. El header actual es para un portal. Para una "preseller" con **foco singular**, la navegación es una distracción.
*   **[ ] Acciones Requeridas:**
    *   **Sustitución:** Reemplazar el `Header` por el componente `CardNav` (naturalizado de ReactBits). `CardNav` está diseñado para landing pages, minimizando la navegación visible y enfocando la atención.
    *   **Logo:** Asegurar que el logo de "Curcumin Simplex" (a definir en el manifiesto visual) sea prominente y claro.

### Componente: `Hero` (Primera sección visible)

*   **[ ] Propósito Estratégico:** Captar la atención en < 3 segundos con la Propuesta Única de Valor.
*   **[ ] Mensaje a Transmitir:** El gancho principal (ej. "La precisión suiza, ahora aplicada a tu bienestar").
*   **[ ] Evaluación de Eficacia:** **ALTA**. La animación de cascada de palabras es excelente para generar impacto.
*   **[ ] Acciones Requeridas:**
    *   **Copywriting:** El `title` y `subtitle` deben implementar directamente los ganchos definidos en el Manifiesto de Mensajería.
    *   **Tipografía:** Usar `font-serif` (Poppins) para el titular para darle un aspecto premium y autoritario. `font-sans` (Inter) para el subtítulo para máxima legibilidad.
    *   **Visual de Fondo:** Considerar una imagen de fondo sutil y de alta calidad que evoque naturalidad y ciencia (ej. ingredientes en un entorno de laboratorio limpio).

### Componente: `SocialProofLogos`

*   **[ ] Propósito Estratégico:** Generar credibilidad instantánea.
*   **[ ] Mensaje a Transmitir:** "Este producto es confiable y reconocido".
*   **[ ] Evaluación de Eficacia:** **ALTA**.
*   **[ ] Acciones Requeridas:**
    *   **Activos:** Crear o adquirir logos de sellos de calidad (ej. "Swiss Quality", "Lab Tested", "100% Natural"). **No usar logos de medios de comunicación sin permiso explícito**, conforme a las directrices.

### Componente: `BenefitsSection`

*   **[ ] Propósito Estratégico:** Comunicar los beneficios de forma clara y escaneable.
*   **[ ] Mensaje a Transmitir:** Los resultados directos que "Sofia Verdi" obtendrá.
*   **[ ] Evaluación de Eficacia:** **ALTA**.
*   **[ ] Acciones Requeridas:**
    *   **Copywriting:** El `title` y `subtitle` deben reforzar el ángulo, y el array `benefits` debe listar los beneficios clave de forma concisa.
    *   **Iconografía:** Utilizar iconos de `lucide-react` que representen visualmente cada beneficio para mejorar la comprensión.

... (Este checklist continuaría para cada componente definido en el layout de nuestra campaña: `IngredientAnalysis`, `TestimonialGrid`, `GuaranteeSection`, `OrderSection`, etc.)

## 3. Conclusión de la Auditoría

Nuestra base de componentes es **sólida y adecuada** para la tarea. Las principales acciones requeridas no son de creación de nuevos componentes, sino de **adaptación estratégica** del contenido, el estilo y, en el caso del Header, la sustitución por un aparato más especializado.

// .docs/checklist/campaigns/04_AUDITORIA_ESTRATEGICA_COMPONENTES.md```

---
Hemos establecido el protocolo para la centralización de la inteligencia y hemos auditado nuestros componentes contra la estrategia.

El siguiente paso, ahora sí con una base sólida, es el **`04_DIRECTRICES_VISUALES_Y_BRANDING_CAMPANA.md`** (renumerado ahora como `05`). En este documento, definiremos la paleta de colores, la tipografía y el estilo de imagen específicos para nuestra landing page `12157`.