// .docs/components/reactbits/MagicBento.md
/\*\*

- @file MagicBento.md
- @description Manifiesto de Conocimiento para el componente MagicBento de ReactBits.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto de Conocimiento: MagicBento (ReactBits)

## 1. Descripción y Propósito

**MagicBento** es una sección de UI interactiva y visualmente rica que presenta contenido en una cuadrícula de estilo "bento box". Su característica principal es una suite de micro-interacciones y efectos visuales (partículas, spotlight, brillo de borde, efecto 3D tilt) que responden al movimiento del cursor del usuario, creando una experiencia inmersiva y "mágica".

Su propósito estratégico es servir como una sección destacada en páginas clave (como la Homepage o la página de la Tienda) para mostrar características o categorías de productos de una manera que genere un alto impacto y compromiso del usuario.

## 2. Configuración y Dependencias

- **Librería Principal:** `gsap` (GreenSock Animation Platform)
  - **Rol:** Es el motor de las animaciones suaves como el efecto "tilt" 3D, el magnetismo del cursor y el efecto de onda al hacer clic.

## 3. Proceso de Naturalización

1.  **Atomización Radical:** El componente monolítico original será deconstruido en tres aparatos distintos: un hook de lógica (`useBentoGridInteraction`), un componente de tarjeta puro (`BentoCard`), y un componente orquestador (`MagicBento`).
2.  **Configuración Centralizada:** Todas las `props` de configuración de efectos serán extraídas a un único objeto `config` gestionado a través de nuestro sistema de i18n y validado por Zod.
3.  **Theming Semántico:** Todos los colores harcodeados serán reemplazados por variables de nuestro sistema de diseño para una integración visual perfecta.

// .docs/components/reactbits/MagicBento.md
