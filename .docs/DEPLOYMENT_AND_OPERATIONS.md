// /.docs/DEPLOYMENT_AND_OPERATIONS.md
/**
 * @file /.docs/DEPLOYMENT_AND_OPERATIONS.md
 * @description Manifiesto de Despliegue y Operaciones para el proyecto Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto de Despliegue y Operaciones: Curcumin Simplex

## 1. Filosofía Operacional

Nuestra filosofía es **"Despliegues Simples y Predecibles"**. El despliegue de un sitio estático debe ser un proceso directo y de bajo riesgo. La automatización se centra en la calidad del código antes del build, mientras que el despliegue es un procedimiento manual y controlado.

## 2. Pipeline de Integración Continua (CI)

La SSoT para la calidad del código es **GitHub Actions**.

```mermaid
graph TD
    subgraph "Fase de Desarrollo"
        A[Desarrollador abre PR a \`main\`] --> B{Pipeline de Pull Request};
    end

    subgraph "Guardián de Calidad (CI)"
        B -- "Ejecuta en cada commit al PR" --> C[Job: Quality Check <br> (lint, format)];
        C --> D[Job: Build Validation];
    end

    subgraph "Fase de Revisión"
        D -- "Todos los jobs pasan" --> E{PR Aprobado};
        D -- "Algún job falla" --> F[PR Bloqueado];
    end
Pipeline de Guardián de Calidad (en pull_request):
Disparador: Cada commit a un Pull Request abierto contra la rama main.
Propósito: Prevenir que código de baja calidad o que rompa el build sea fusionado.
Pasos Mandatorios:
Chequeo de Calidad: Ejecuta pnpm run lint y pnpm run format.
Validación de Build: Ejecuta pnpm run build para asegurar que el proyecto compila correctamente.
Resultado: Un PR no puede ser fusionado si alguno de estos pasos falla.
3. Proceso de Despliegue Continuo (CD) - Manual
Dado el objetivo de despliegue en hostings de archivos estáticos (como Hostinger), el proceso de CD es manual.
Fusión a main: Tras un PR aprobado, el código se fusiona a la rama main.
Build Local: El desarrollador encargado ejecuta pnpm run build en su máquina local. Esto genera el output estático en el directorio /out.
Subida Manual: El contenido del directorio /out se sube al servidor de hosting a través de FTP, el panel de control del hosting, o cualquier método proporcionado por el proveedor.
4. Gestión de Entornos
Producción: El dominio en vivo (ej. www.curcumin-simplex.com). Refleja el estado de los archivos subidos manualmente desde la rama main.
Local: El entorno de desarrollo en la máquina de cada ingeniero (localhost:3000), ejecutado con pnpm run dev.
5. Gestión de Variables de Entorno
SSoT: El archivo .env en el entorno local es la única fuente de verdad para la configuración del build (idioma, secciones activas, tema).
Documentación: El repositorio debe contener un archivo .env.example que liste todas las variables de entorno necesarias para que el proyecto funcione, pero sin sus valores. Es mandatorio mantener este archivo sincronizado.
6. Estrategia de Observabilidad en Producción
Logging: La observabilidad se basa en los console.log estratégicos que dejamos en el código. En producción, estos no serán visibles a menos que se inspeccione el código fuente.
Analíticas: Se dependerá de las herramientas de analítica de tráfico proporcionadas por el proveedor de hosting o de servicios de terceros que puedan ser integrados (ej. Google Analytics).
7. Protocolos de Continuidad del Negocio
Plan de Rollback (Reversión):
En caso de que un despliegue introduzca una regresión, el procedimiento es manual.
Se debe realizar un git checkout a un commit anterior y estable de la rama main.
Ejecutar pnpm run build nuevamente.
Subir el contenido del nuevo directorio /out al servidor, sobrescribiendo los archivos problemáticos.
Plan de Recuperación ante Desastres (DRP):
Alcance: Cubre un fallo catastrófico del proveedor de hosting.
Estrategia: La prioridad es la comunicación. Confiamos en los planes de DRP y los Acuerdos de Nivel de Servicio (SLA) del proveedor para la restauración de la infraestructura.
// /.docs/DEPLOYMENT_AND_OPERATIONS.md