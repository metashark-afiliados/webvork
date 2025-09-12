// .docs/components/reactbits/CardNav.md
/\*\*

- @file CardNav.md
- @description Manifiesto de Conocimiento para el componente CardNav de ReactBits.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto de Conocimiento: CardNav (ReactBits)

## 1. Descripción y Propósito

**CardNav** es un componente de navegación principal (Navbar) altamente estilizado y animado, originario de la librería de componentes de código abierto ReactBits. Su característica principal es una animación de "despliegue en tarjetas" que revela las sub-secciones de navegación de una manera visualmente atractiva al hacer clic en un menú de hamburguesa.

Su propósito estratégico en el proyecto `curcumin-simplex` es servir como el encabezado principal para las páginas de campaña, ofreciendo una experiencia de usuario premium y memorable que se alinea con una estética de alta gama.

## 2. Configuración y Dependencias

- **Librería Principal:** `gsap` (GreenSock Animation Platform)
  - **Rol:** Es el motor de toda la lógica de animación del componente. Se encarga de las transiciones de altura, opacidad y posición de los elementos.
- **Iconografía:** La implementación original utiliza `react-icons`. Durante el proceso de "naturalización", esto será reemplazado por `lucide-react` para mantener la consistencia del sistema de diseño.

## 3. Proceso de Naturalización

La integración de este componente seguirá rigurosamente el **Protocolo de Naturalización** definido en `/.docs/REACTBITS_INTEGRATION_MANIFESTO.md`. Los puntos clave de la adaptación serán:

1.  **Internacionalización (i18n):** Todo el contenido textual (etiquetas de menú, enlaces, texto del botón CTA) será extraído y gestionado a través de nuestro sistema de i18n, recibiéndolo a través de `props`.
2.  **Sistema de Theming:** Se eliminarán todas las props de color harcodeado (`baseColor`, `bgColor`, `textColor`, etc.). El componente será refactorizado para utilizar exclusivamente las clases de utilidad de Tailwind CSS y las variables semánticas de nuestro sistema de diseño (`bg-background`, `text-primary`, etc.).
3.  **Observabilidad:** Se integrará el logging de renderizado estándar.
4.  **Accesibilidad (A11y):** Se revisarán y mejorarán los atributos ARIA para asegurar que el estado del menú (abierto/cerrado) y la función de cada elemento interactivo sean comunicados correctamente a los lectores de pantalla.

## 4. Estructura de Datos (Props)

La estructura de `props` inicial del componente será adaptada para alinearse con nuestro sistema de i18n. La prop `items` será el principal objetivo, donde se centralizará todo el contenido textual navegable.

- **Entrada (Props i18n):** Un objeto de contenido validado por Zod desde nuestro diccionario.
- **Salida (Renderizado):** Un componente de navegación totalmente funcional, estilizado y animado que es un "ciudadano de primera clase" de la arquitectura `curcumin-simplex`.

// .docs/components/reactbits/CardNav.md
