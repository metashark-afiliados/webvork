// /.docs/USING_REACTBITS_GUIDE.md
/**
 * @file /.docs/USING_REACTBITS_GUIDE.md
 * @description Manual de Uso y Guía Táctica para la Integración de Código
 *              Externo en el Proyecto Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manual de Uso: Integrando Código Externo en Curcumin Simplex

## 1. Propósito y Filosofía

Este documento es la **guía de campo** para cualquier desarrollador que integre un componente o fragmento de código de UI de terceros en el ecosistema de `curcumin-simplex`.

Nuestra filosofía es la **Asimilación Arquitectónica**. No consumimos componentes; los "naturalizamos". Cada componente externo debe ser meticulosamente refactorizado para convertirse en un ciudadano de primera clase de nuestra arquitectura, adhiriéndose a nuestros principios de **resiliencia, observabilidad, internacionalización (i18n-B) y diseño semántico**.

**Directiva No Negociable:** Seguir este protocolo no es opcional. Garantiza que la velocidad ganada al usar componentes externos no se traduzca en deuda técnica o degradación de la calidad.

---

## 2. El Protocolo de Naturalización: Paso a Paso

Todo componente de UI de terceros debe pasar por las siguientes fases para ser considerado "listo para producción".

### **Fase 1: Extracción y Aislamiento**

1.  **Obtener Código Fuente:** Copie el código fuente del componente deseado (TSX + Tailwind CSS es el formato ideal).
2.  **Crear el Aparato:** Cree un nuevo archivo `.tsx` en la ubicación semántica correcta dentro de `src/components/`.
3.  **Instalar Dependencias:** Si el componente requiere librerías que no tenemos, instálelas usando `pnpm`, conforme a la **Directiva 002**.
4.  **Saneamiento Inicial:** Pegue el código y ejecute `pnpm run format` para alinear el estilo.

### **Fase 2: Nivelación Arquitectónica**

Esta es la fase de integración profunda. El componente es refactorizado para "hablar" el lenguaje de nuestra arquitectura, cumpliendo la **Directiva 003**.

-   **Checklist de Nivelación:**
    1.  **Declarar Entorno:** Añada `"use client";` si el componente es interactivo.
    2.  **Importar React:** Asegúrese de que `import React from "react";` esté presente.
    3.  **Añadir Logging:** Incorpore el `console.log("[Observabilidad] Renderizando [NombreComponente]");`.
    4.  **Internacionalizar (i18n-B):**
        -   **Identificar Textos:** Encuentre todas las cadenas de texto visibles para el usuario que estén hardcodeadas.
        -   **Refactorizar a Props:** Modifique la interfaz de `props` del componente para que reciba todos esos textos desde el exterior.
    5.  **Aplicar Sistema de Theming:**
        -   Revise todas las clases de Tailwind y reemplace valores fijos por nuestras variables semánticas.
        -   **Colores:** `bg-blue-500` -> `bg-primary`, `text-gray-200` -> `text-foreground/80`.
        -   **Geometría:** Asegúrese de que `border-radius`, `padding`, etc., sean consistentes con nuestro diseño.
    6.  **Crear Documentación:**
        -   Añada un bloque **TSDoc completo**.
        -   Cree el **Documento Espejo** en `/.docs-espejo/`.

### **Fase 3: Integración Final**

1.  **Actualizar Contratos:** Añada las nuevas claves de texto al `i18n.schema.ts` (como `.optional()`) y a los archivos de mensajes en `src/messages/`.
2.  **Consumir el Componente:** Importe y utilice el componente ahora nivelado en `page.tsx` o donde sea necesario, pasándole las traducciones desde el diccionario.

---

## 3. Ejemplo Práctico: Naturalización de un Componente `Card`

**Objetivo:** Integrar un componente `Card` simple encontrado en una fuente externa.

**Código Original (Externo):**
```tsx
export const Card = () => (
  <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
    <h3 className="text-lg text-white font-bold">Título de la Tarjeta</h3>
    <p className="text-slate-300 mt-2">Este es un texto de ejemplo para la tarjeta.</p>
  </div>
);
Proceso de Naturalización:
Fase 1: Se crea src/components/data-display/Card.tsx. No hay nuevas dependencias.
Fase 2 (Nivelación): El archivo se refactoriza:
code
TypeScript
// src/components/data-display/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  content: string;
}

export function Card({ title, content }: CardProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando Card");
  return (
    <div className="bg-background/50 p-4 rounded-lg border border-white/10">
      <h3 className="text-lg text-primary font-bold">{title}</h3>
      <p className="text-foreground/80 mt-2">{content}</p>
    </div>
  );
}
Se añade TSDoc y se crea el documento espejo.
Fase 3 (Integración):
Se añade card: z.object({ title: z.string(), content: z.string() }).optional() a i18n.schema.ts.
Se añade el contenido correspondiente a es-ES.json.
Se utiliza en page.tsx: <Card title={t.card.title} content={t.card.content} />.
Resultado: El componente Card ahora es un ciudadano nativo de nuestro ecosistema, 100% alineado con nuestra arquitectura y listo para ser usado de forma segura.
// /.docs/USING_REACTBITS_GUIDE.md`