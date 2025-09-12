// /.docs/QUALITY_AND_TESTING_STRATEGY.md
/**
 * @file /.docs/QUALITY_AND_TESTING_STRATEGY.md
 * @description Manifiesto de Estrategia de Calidad y Pruebas para Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto de Calidad y Pruebas: Curcumin Simplex

## 1. Filosofía de Calidad

Nuestra filosofía de calidad se basa en el principio de **"Resiliencia en el Build, Confianza en el Contenido"**. Para un proyecto de Generación de Sitios Estáticos (SSG) como `curcumin-simplex`, el riesgo principal no reside en la lógica de ejecución compleja, sino en la integridad de los datos y la configuración que alimentan el proceso de construcción.

La calidad no se persigue con costosas suites de pruebas automatizadas, sino que se garantiza a través de **guardianes de calidad estáticos y validación de contratos de datos** que actúan como una red de seguridad en cada build.

---

## 2. Estrategia de Calidad Estática (La Base)

Nuestra primera y más importante línea de defensa es el análisis estático. Estos guardianes se ejecutan antes y durante el proceso de build.

1.  **Seguridad de Tipos (TypeScript):**
    *   **SSoT:** `tsconfig.json`
    *   **Directiva:** La opción `"strict": true` es **no negociable**. Es la herramienta más eficaz para prevenir errores de tipo, props incorrectas y lógica inconsistente antes de que el código se ejecute.

2.  **Consistencia de Código (Linting y Formato):**
    *   **SSoT:** `eslint.config.mjs`, `prettier.config.js` (si se crea).
    *   **Directiva:** Todo el código debe adherirse a las reglas definidas por ESLint y Prettier. Los scripts `pnpm run lint` y `pnpm run format` deben ejecutarse regularmente para mantener la base de código limpia y legible.

3.  **Validación de Contratos de Datos (Zod):**
    *   **SSoT:** `src/lib/schemas/*.ts`
    *   **Directiva:** Esta es nuestra **principal herramienta de "pruebas de integración" para el contenido**. Los schemas de Zod para la configuración (`sections.config.ts`) y la internacionalización (`i18n.schema.ts`) actúan como un contrato estricto. El proceso de build **debe fallar** si cualquier archivo `.json` de contenido o variable de `.env` no cumple con la estructura definida. Esto garantiza que el contenido siempre será consistente con lo que los componentes esperan recibir.

---

## 3. Estrategia de Verificación Funcional

Dado el enfoque SSG del proyecto, las pruebas End-to-End (E2E) automatizadas son innecesarias. Se reemplazan por un protocolo de **Pruebas de Verificación Manual (MVT - Manual Verification Testing)**.

### Protocolo de MVT (Checklist Pre-Despliegue)

Antes de considerar un build como "listo para producción", se debe realizar la siguiente verificación manual en un entorno local o de vista previa:

-   **[ ] Verificación Visual Multi-Navegador:**
    -   Renderizar la página en las últimas versiones de Chrome y Safari (o un navegador basado en WebKit).
    -   Confirmar que el layout no está roto y que todos los elementos son visibles y están alineados correctamente.

-   **[ ] Verificación de Responsividad:**
    -   Utilizar las herramientas de desarrollador del navegador para simular la vista en un dispositivo móvil (ej. 375px de ancho) y una tablet (ej. 768px de ancho).
    -   Confirmar que el diseño se adapta correctamente y que no hay desbordamientos de contenido.

-   **[ ] Verificación del Funnel de Conversión (Hipotético):**
    -   Localizar el componente del formulario de pedido.
    -   Llenar los campos con datos de prueba.
    -   Abrir la pestaña "Red" de las herramientas de desarrollador.
    -   Hacer clic en el botón de envío.
    -   **Confirmar** que se realiza una petición `POST` al endpoint correcto del socio afiliado y que el `payload` contiene todos los campos esperados (visibles y ocultos).

-   **[ ] Verificación de Navegación:**
    -   Hacer clic en todos los enlaces del `Header` y `Footer`.
    -   Confirmar que navegan a las secciones o páginas correctas.

Completar este checklist garantiza que los flujos de usuario más críticos funcionan como se espera.

// /.docs/QUALITY_AND_TESTING_STRATEGY.md