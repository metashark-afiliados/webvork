// .docs/proyecto/06_DOMINIO_RAZBITS.md
/\*\*

- @file 06_DOMINIO_RAZBITS.md
- @description Manifiesto Arquitectónico para el Dominio de Componentes Naturalizados "razBits".
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto de Dominio: razBits - Componentes Naturalizados

## 1. Filosofía y Rol Estratégico

El dominio `razBits` es un **ecosistema encapsulado y soberano** dentro del proyecto `curcumin-simplex`. Su propósito es albergar todos los componentes de UI de terceros (ej. de la librería ReactBits, CodePen, etc.) que han pasado por nuestro riguroso **Protocolo de Naturalización**.

La filosofía es de **"Aislamiento Cohesivo"**:

1.  **Aislamiento:** Los componentes naturalizados y **toda su lógica de soporte** (hooks, schemas, i18n) residen dentro de la carpeta `src/components/razBits/`. Esto los aísla del código "core" de la aplicación, haciendo evidente su origen externo.
2.  **Cohesión:** Cada componente dentro de `razBits` es un módulo autocontenido. Su carpeta (`/razBits/[ComponentName]/`) contiene todos los aparatos necesarios para su funcionamiento (el `.tsx` del componente, su `.schema.ts`, su `.i18n.json`, etc.). Esto promueve una alta cohesión y facilita su mantenimiento o incluso su extracción para uso en otros proyectos.

Este dominio actúa como un "laboratorio de integración controlado", permitiéndonos acelerar el desarrollo sin comprometer la integridad de la arquitectura principal.

## 2. Estructura de Directorios (Mandatoria)

Todo componente naturalizado, por ejemplo `MyCoolComponent`, **DEBE** seguir la siguiente estructura de archivos:
src/
└── components/
└── razBits/
└── MyCoolComponent/
├── MyCoolComponent.tsx # El componente React naturalizado.
├── my-cool-component.schema.ts # El schema de Zod para su contenido.
├── my-cool-component.i18n.json # El contenido i18n del componente.
├── useMyCoolComponentLogic.ts # (Opcional) Hooks específicos.
└── README.md # (Opcional) Documentación específica.
code
Code

## 3. Proceso de Integración en la Aplicación

Aunque los aparatos de `razBits` están aislados, necesitan ser "conectados" a la aplicación principal. Esto se hace exclusivamente a través de los **aparatos ensambladores**:

1.  **Ensamblador de Tipos (`i18n.schema.ts`):** Este archivo importará el `...schema.ts` desde la carpeta del componente en `razBits` y lo fusionará al tipo `Dictionary` global.
2.  **Ensamblador de Contenido (`i18n.ts` / `campaign.i18n.ts`):** Estos archivos serán responsables de cargar dinámicamente el `...i18n.json` del componente.
3.  **Consumo en Páginas/Secciones:** Las páginas (ej. `store/page.tsx`) importarán y renderizarán el componente `.tsx` directamente desde su ubicación en `razBits`.

Esta arquitectura asegura que la integración de componentes externos sea un proceso disciplinado, documentado y arquitectónicamente sólido.
// .docs/proyecto/06_DOMINIO_RAZBITS.md
