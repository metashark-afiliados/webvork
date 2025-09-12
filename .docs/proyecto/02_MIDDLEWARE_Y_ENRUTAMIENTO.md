// .docs/proyecto/02_MIDDLEWARE_Y_ENRUTAMIENTO.md
# Manifiesto de Middleware y Enrutamiento v1.0

## 1. Rol Estratégico

El middleware (`src/middleware.ts`) es el **guardián de la puerta de entrada** de la aplicación. Se ejecuta en el "borde" (Edge) para cada petición entrante, antes de que Next.js inicie el proceso de renderizado. Su propósito es inspeccionar, modificar y enrutar las peticiones basándose en un conjunto de reglas centralizadas.

La arquitectura se basa en un **Patrón Pipeline**, donde el middleware principal es un simple orquestador que ejecuta una cadena de "manejadores" atómicos.

## 2. Lógica Actual (Implementada)

### Manejador: `i18nHandler`
-   **Responsabilidad:** Garantizar que cada ruta accesible por el usuario esté correctamente localizada.
-   **Lógica de Flujo:**
    1.  Inspecciona la `pathname` de la petición.
    2.  Verifica si ya comienza con un `locale` soportado (ej. `/es-ES/...`).
    3.  Si ya tiene un `locale`, no hace nada y pasa al siguiente manejador.
    4.  Si **no** tiene un `locale`, invoca a `getLocale()` para determinar el idioma por defecto.
    5.  Construye una nueva URL con el prefijo del `locale` y emite una **redirección permanente (308)**. Esto es crucial para el SEO, ya que le indica a Google que la versión con `locale` es la URL canónica.

## 3. Visión Futura (Escalabilidad)

El patrón de pipeline nos permite añadir nuevas capas de lógica de forma desacoplada y segura.

### Manejador: `authHandler` (Placeholder)
-   **Responsabilidad Futura:** Proteger rutas y gestionar el acceso basado en la sesión del usuario.
-   **Lógica Futura:**
    1.  Leer una cookie de sesión (ej. de Supabase o NextAuth).
    2.  Consultar el `src/lib/navigation.ts` para determinar si la ruta solicitada es `Protected`, `Guest` o `Public`.
    3.  Redirigir a los usuarios no autenticados de rutas protegidas a la página de login.
    4.  Redirigir a los usuarios autenticados de rutas de invitado (login/signup) al dashboard.

### Manejador: `geoIpHandler` (Placeholder)
-   **Responsabilidad Futura:** Enriquecer la petición con datos geográficos para personalización.
-   **Lógica Futura:**
    1.  Leer la IP del usuario desde los headers de la petición.
    2.  (Opcional) Usar un servicio externo para mapear la IP a un país, ciudad, etc.
    3.  Añadir un nuevo header a la petición (ej. `x-country: 'BR'`) para que pueda ser utilizado por los Server Components para personalizar el contenido (ej. mostrar precios en la moneda local).

Este diseño convierte nuestro middleware en un sistema robusto y preparado para el futuro, donde cada pieza de lógica está perfectamente aislada.
// .docs/proyecto/02_MIDDLEWARE_Y_ENRUTAMIENTO.md